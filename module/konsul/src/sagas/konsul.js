import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import {
  toastr,
  models as apiCommon,
  validator as commonValidator,
  formatter,
} from '@simrs/common';
import { loaderActions, datatableActions, messageBox } from '@simrs/components';
import api, { validationRules } from '../services/models/model';

import { actionTypes, actions, staticConst } from '../pages/index';
import {
  showCariKunjunganSelector,
  postSelector,
  kunjunganSelector,
} from '../pages/index/redux/selector';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(datatableActions.onInitialize(staticConst.TABLE_KUNJUNGAN));
  yield put(actions.populateForm.request(meta.resource));
  yield put(actions.onReady(meta.resource));
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show());
    let { populateForm } = actions;
    let response = yield call(api.init);
    if (response.status) {
      yield put(populateForm.requestSuccess(meta.resource, response.data));
    } else {
      yield put(populateForm.requestFailure(meta.resource, response.message));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* getPasienRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const response = yield call(api.getPasienByNorm, payload.data.norm);
    if (response.status) {
      const data = response.data;
      yield put(actions.getPasien.requestSuccess(meta.resource, data));
      yield put(
        actions.getKunjungan.request(meta.resource, { idPasien: data.id })
      );
    } else {
      yield put(
        actions.getPasien.requestFailure(meta.resource, response.message)
      );
      messageBox({
        title: 'Info',
        message: response.message,
      });
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* getKunjunganRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const response = yield call(api.getKunjungan, payload.data.idPasien);
    if (response.status) {
      yield put(
        actions.getKunjungan.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.getKunjungan.requestFailure(meta.resource, response.message)
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* getKunjunganRequestSuccessHandler({ meta, payload }) {
  const data = payload.data || [];
  if (data.length > 1) {
    yield put(actions.showCariKunjungan(meta.resource));
  } else {
    yield put(actions.onSelectKunjungan(meta.resource, data[0]));
  }
}

function* selectedKunjunganHandler({ meta, payload }) {
  const isShowKunjungan = yield select(showCariKunjunganSelector);
  if (isShowKunjungan) {
    yield put(actions.hideCariKunjungan(meta.resource));
  }
  yield put(
    actions.kunjunganDetail.request(meta.resource, { id: payload.data.id })
  );
  // Jika konsul ambil data kunjungan unit sebelumnya
  if (payload.data.st_konsul === 1) {
    yield put(
      actions.kunjunganUnitDetail.request(meta.resource, {
        id: payload.data.id_kunjungan_unit,
      })
    );
  }
  yield put(actions.onFocusElement(meta.resource, 'add'));
}

function* addHandler({ meta }) {
  try {
    yield put(actions.onFocusElement(meta.resource, 'id_kelompok'));
    const response = yield call(apiCommon.getInfoSystem);
    if (response.status) {
      yield put(actions.populateAdd(meta.resource, response.data));
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* cancelSelectedKunjunganHandler({ meta }) {
  yield put(actions.hideCariKunjungan(meta.resource));
  yield put(actions.onFocusElement(meta.resource, 'norm'));
}

function* saveHandler({ payload, meta }) {
  const { resource } = meta;
  try {
    yield put(loaderActions.show('Proses simpan...'));
    yield put(actions.onFocusElement(resource, ''));
    const { rules, messages } = validationRules(resource);
    const post = payload.data;
    const method = post.id ? 'koreksi' : 'tambah';
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      const response = yield call(api.save, method, post);
      if (response.status) {
        yield toastr.success(response.message);
        response.action = method;
        yield put(actions.save.requestSuccess(resource, response));
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield toastr.warning(getFirstError(errors));
      yield put(actions.save.requestFailure(resource, errors));
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* saveSuccessHandler({ meta }) {
  yield put(actions.kunjunganDetail.request(meta.resource));
}

function* saveFailureHandler({ payload, meta }) {
  let { resource } = meta;
  yield put(
    actions.onFocusElement(resource, getFirstElementError(payload.errors))
  );
}

function* deleteHandler({ payload, meta }) {
  try {
    yield put(loaderActions.show('Proses hapus...'));
    let post = payload.data;

    let response = yield call(api.delete, { id: post.id });
    if (response.status) {
      yield put(actions.delete.requestSuccess(meta.resource, response));
    } else {
      if (response.info.type === 'warning') {
        yield toastr.warning(response.message);
      } else {
        yield toastr.error(response.message);
      }
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* deleteSuccessHandler({ payload, meta }) {
  yield toastr.success(payload.data.message);
  yield put(actions.kunjunganDetail.request(meta.resource));
}

function* kunjunganDetailRequestHandler({ meta, payload }) {
  try {
    const response = yield call(api.getKunjunganDetail, payload.data.id);
    if (response.status) {
      yield put(
        actions.kunjunganDetail.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.kunjunganDetail.requestFailure(meta.resource, response.message)
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* kunjunganUnitDetailRequestHandler({ meta, payload }) {
  try {
    const response = yield call(api.getKunjunganUnitDetail, payload.data.id);
    if (response.status) {
      yield put(
        actions.kunjunganUnitDetail.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.kunjunganUnitDetail.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* changeSelect2({ meta, payload }) {
  try {
    switch (payload.name) {
      case 'id_unit_layanan': {
        const kunjungan = yield select(kunjunganSelector);
        const post = yield select(postSelector);
        const data = {
          id_unit_layanan: payload.data.value,
          id_kelas: kunjungan.id_kelas,
          id_instalasi: post.id_instalasi,
          tgl_kunjungan: formatter.dateFormatDB(kunjungan.tgl_kunjungan),
        };
        yield put(actions.getAdministrasiKonsul.request(meta.resource, data));
        break;
      }
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* administrasiKonsulRequestHandler({ meta, payload }) {
  try {
    let response = yield call(api.getAdministrasiKonsul, payload.data);
    if (response.status) {
      yield put(
        actions.getAdministrasiKonsul.requestSuccess(
          meta.resource,
          response.data
        )
      );
    } else {
      yield put(
        actions.getAdministrasiKonsul.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

export default function* watchActions() {
  yield all([
    takeLatest(actionTypes.OPEN_FORM, openForm),
    takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
    takeLatest(actionTypes.GET_PASIEN_REQUEST, getPasienRequestHandler),
    takeLatest(actionTypes.GET_KUNJUNGAN_REQUEST, getKunjunganRequestHandler),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_SUCCESS,
      getKunjunganRequestSuccessHandler
    ),
    takeLatest(actionTypes.SELECTED_KUNJUNGAN, selectedKunjunganHandler),
    takeLatest(actionTypes.ADD, addHandler),
    takeLatest(
      actionTypes.CANCEL_SELECTED_KUNJUNGAN,
      cancelSelectedKunjunganHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST,
      kunjunganDetailRequestHandler
    ),
    takeLatest(actionTypes.SAVE_REQUEST, saveHandler),
    takeLatest(actionTypes.SAVE_SUCCESS, saveSuccessHandler),
    takeLatest(actionTypes.SAVE_FAILURE, saveFailureHandler),
    takeLatest(actionTypes.DELETE_REQUEST, deleteHandler),
    takeLatest(actionTypes.DELETE_SUCCESS, deleteSuccessHandler),
    takeLatest(actionTypes.CHANGE_SELECT2, changeSelect2),
    takeLatest(
      actionTypes.GET_ADMINISTRASI_KONSUL_REQUEST,
      administrasiKonsulRequestHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_UNIT_DETAIL_REQUEST,
      kunjunganUnitDetailRequestHandler
    ),
  ]);
}
