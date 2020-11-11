import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import { toastr, models as apiCommon, validator as commonValidator } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  datatableActionTypes,
  messageBox,
  constDatatable
} from '@simrs/components';
import api, { validationRules } from '../services/models/model';

import { actionTypes, actions, staticConst } from '../pages/index';
import { showCariKunjunganSelector, postSelector } from '../pages/index/redux/selector';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(datatableActions.onInitialize(staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL));
  yield put(datatableActions.onInitialize(staticConst.TABLE_KUNJUNGAN));
  yield put(datatableActions.onInitialize(staticConst.TABLE_SEARCH_TINDAKAN));
  yield put(actions.populateForm.request(meta.resource));
  yield put(actions.onReady(meta.resource));
}

function* loadTindakanUnitHandler({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    if (payload.data.id_kunjungan_unit) {
      const response = yield call(api.getKunjunganUnitDetail, payload.data.id_kunjungan_unit, payload.data);
      if (response.status) {
        successCallback(response.data, response.data.length);
      } else {
        yield toastr.error(response.message);
        failCallback();
      }
    } else {
      successCallback([], 0);
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL));
}

function* loadTindakanSuggestionHandler({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    const response = yield call(api.tindakanSuggestion, payload.data);
    if (response.status) {
      successCallback(response.data, response.data.length);
    } else {
      yield toastr.error(response.message);
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.TABLE_SEARCH_TINDAKAN));
}

function* handleReloaded({ meta }) {
  // yield put(actions.onReady(meta.resource));
}

function* populateForm({ meta }) {
  // try {
  //   yield put(loaderActions.show());
  //   let { populateForm } = actions;
  //   let response = yield call(api.init);
  //   if (response.status) {
  //     yield put(populateForm.requestSuccess(meta.resource, response.data));
  //   } else {
  //     yield put(populateForm.requestFailure(meta.resource, response.message));
  //   }

  //   yield put(loaderActions.hide());
  // } catch (error) {
  //   yield put(loaderActions.hide());
  //   yield toastr.error(error.message);
  // }
}

function* getPasienRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const response = yield call(api.getPasienByNorm, payload.data.norm);
    if (response.status) {
      const data = response.data;
      yield put(actions.getPasien.requestSuccess(meta.resource, data));
      yield put(actions.getKunjungan.request(meta.resource, { idPasien: data.id }));
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
        actions.getKunjungan.requestSuccess(
          meta.resource,
          response.data
        )
      );
    } else {
      yield put(
        actions.getKunjungan.requestFailure(
          meta.resource,
          response.message
        )
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

function* selectedKunjunganHandler({ meta }) {
  const isShowKunjungan = yield select(showCariKunjunganSelector);
  if (isShowKunjungan) {
    yield put(actions.hideCariKunjungan(meta.resource));
  }
  yield put(
    datatableActions.onReload(
      staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL,
      constDatatable.reloadType.purge
    )
  );
  yield put(actions.onFocusElement(meta.resource, 'add'));
  yield put(actions.optionsByUnitLayanan.request(meta.resource));
}

function* finishHandler() {
  yield put(
    datatableActions.onReload(
      staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL,
      constDatatable.reloadType.purge
    )
  );
}

function* addHandler({ meta }) {
  try {
    yield put(actions.onFocusElement(meta.resource, 'id_tindakan'));
    const response = yield call(apiCommon.getInfoSystem);
    if (response.status) {
      yield put(actions.populateAdd(meta.resource, response.data));
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* editHandler({ meta }) {
  try {
    yield put(actions.onFocusElement(meta.resource, 'id_tindakan'));
    // const response = yield call(apiCommon.getInfoSystem);
    // if (response.status) {
    //   yield put(actions.populateAdd(meta.resource, response.data));
    // }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* cancelSelectedKunjunganHandler({ meta }) {
  yield put(actions.hideCariKunjungan(meta.resource));
  yield put(actions.onFocusElement(meta.resource, 'norm'));
}

function* submitFilterTindakanSuggestionHandler() {
  yield put(
    datatableActions.onReload(
      staticConst.TABLE_SEARCH_TINDAKAN,
      constDatatable.reloadType.purge
    )
  );
}

function* showTindakanSuggestionHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'search_tindakan'));
}

function* selectedTindakanSuggestionHandler({ meta }) {
  yield put(actions.hideCariTindakan(meta.resource));
  yield put(actions.onFocusElement(meta.resource, 'id_pelaksana'));
}

function* optionsByUnitLayananRequestHandler({ meta }) {
  try {
    const post = yield select(postSelector);
    const response = yield call(api.getOptionsByUnitLayanan, post.id_unit_layanan);
    if (response.status) {
      yield put(
        actions.optionsByUnitLayanan.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.optionsByUnitLayanan.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* saveHandler({ payload, meta }) {
  let { resource } = meta;
  try {
    yield put(loaderActions.show('Proses simpan...'));
    yield put(
      actions.onFocusElement(resource, '')
    );
    let { rules, messages } = validationRules(resource);
    let post = payload.data;
    let method = post.id ? 'koreksi' : 'tambah';
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      let response = yield call(api.save, method, post);
      if (response.status) {
        yield toastr.success(response.data.message);
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
  yield put(datatableActions.onReload(staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL));
  yield put(
    actions.kunjunganDetail.request(meta.resource)
  );
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
  yield put(datatableActions.onReload(staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL));
  yield toastr.success(payload.data.message);
  yield put(
    actions.kunjunganDetail.request(meta.resource)
  );
}

function* kunjunganDetailRequestHandler({ meta }) {
  try {
    const post = yield select(postSelector);
    const response = yield call(api.getKunjunganDetail, post.id);
    if (response.status) {
      yield put(
        actions.kunjunganDetail.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        actions.kunjunganDetail.requestFailure(
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
    takeLatest(actionTypes.GET_KUNJUNGAN_UNIT_DETAIL_REQUEST, loadTindakanUnitHandler),
    takeLatest(actionTypes.OPEN_FORM, openForm),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
    takeLatest(actionTypes.GET_PASIEN_REQUEST, getPasienRequestHandler),
    takeLatest(actionTypes.GET_KUNJUNGAN_REQUEST, getKunjunganRequestHandler),
    takeLatest(actionTypes.GET_KUNJUNGAN_SUCCESS, getKunjunganRequestSuccessHandler),
    takeLatest(actionTypes.SELECTED_KUNJUNGAN, selectedKunjunganHandler),
    takeLatest(actionTypes.FINISH, finishHandler),
    takeLatest(actionTypes.ADD, addHandler),
    takeLatest(actionTypes.CANCEL_SELECTED_KUNJUNGAN, cancelSelectedKunjunganHandler),
    takeLatest(actionTypes.GET_TINDAKAN_SUGGESTION_REQUEST, loadTindakanSuggestionHandler),
    takeLatest(actionTypes.SUBMIT_FILTER_TINDAKAN_SUGGESTION, submitFilterTindakanSuggestionHandler),
    takeLatest(actionTypes.SHOW_CARI_TINDAKAN, showTindakanSuggestionHandler),
    takeLatest(actionTypes.SELECTED_TINDAKAN_SUGGESTION, selectedTindakanSuggestionHandler),
    takeLatest(actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST, optionsByUnitLayananRequestHandler),
    takeLatest(actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST, kunjunganDetailRequestHandler),
    takeLatest(actionTypes.SAVE_REQUEST, saveHandler),
    takeLatest(actionTypes.SAVE_SUCCESS, saveSuccessHandler),
    takeLatest(actionTypes.SAVE_FAILURE, saveFailureHandler),
    takeLatest(actionTypes.EDIT, editHandler),
    takeLatest(actionTypes.DELETE_REQUEST, deleteHandler),
    takeLatest(actionTypes.DELETE_SUCCESS, deleteSuccessHandler),
  ]);
}
