import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import dayjs from 'dayjs';

import { validator as commonValidator, toastr } from '@simrs/common';
import {
  loaderActions,
  messageBox,
  constDatatable,
  datatableActions,
  datatableActionTypes,
} from '@simrs/components';
import api from '../services/models/pelaksanaTambahanModel';
import {
  pelaksanaTambahanActions as actions,
  pelaksanaTambahanActionTypes as actionTypes,
} from '../pages/index';
import { staticConst } from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(
    datatableActions.onInitialize(staticConst.TABLE_PELAKSANA_TAMBAHAN)
  );
  // yield put(actions.populateForm.request(meta.resource));
  yield put(actions.onReady(meta.resource));
}

function* populateForm({ meta }) {
  try {
    let { populateForm } = actions;
    let response = yield call(api.init);
    if (response.status) {
      yield put(populateForm.requestSuccess(meta.resource, response.data));
    } else {
      yield put(populateForm.requestFailure(meta.resource, response.message));
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* loadAllPelaksanaTambahan({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(
      api.getKunjunganUnitDetailPelaksana,
      payload.data
    );
    if (response.status) {
      successCallback(response.data.data, response.data.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.TABLE_PELAKSANA_TAMBAHAN));
}

function* changeSelect2({ meta, payload }) {
  try {
    switch (payload.name) {
      case 'id_spesialisasi':
        yield put(
          actions.pelaksanaTambahan.request(meta.resource, {
            ...payload.data,
            clearSelected: true,
          })
        );
        break;
      default:
        break;
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* pelaksanaRequestHandler({ meta, payload }) {
  try {
    const response = yield call(
      api.getPelaksana,
      payload.data.value,
      payload.data.id_unit_layanan
    );
    if (response.status) {
      const data = {
        data: response.data,
        clearSelected: payload.data.clearSelected,
      };
      yield put(actions.pelaksanaTambahan.requestSuccess(meta.resource, data));
    } else {
      yield put(
        actions.pelaksanaTambahan.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* addHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'id_spesialisasi'));
}

function* editHandler({ meta, payload }) {
  yield put(
    actions.pelaksanaTambahan.request(meta.resource, {
      value: payload.data.id_spesialisasi,
      id_unit_layanan: payload.data.id_unit_layanan,
      clearSelected: false,
    })
  );
  // yield put(actions.onChangeSelect2(meta.resource, 'id_pelaksana', {
  //   value: payload.data.id_pelaksana,
  //   label: payload.data.nama_pelaksana,
  // }))
  yield put(actions.onFocusElement(meta.resource, 'id_spesialisasi'));
}

function* handleSave({ payload, meta }) {
  const { resource } = meta;
  try {
    yield put(loaderActions.show('Proses simpan...'));
    const { rules, messages } = api.validationRules(resource);
    const post = payload.data;
    const method = post.id ? 'koreksi' : 'tambah';
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      const response = yield call(api.save, method, post);
      if (response.status) {
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

function* handleSaveSuccess({ payload }) {
  try {
    yield put(datatableActions.onReload(staticConst.TABLE_PELAKSANA_TAMBAHAN));
    yield toastr.success(payload.data.message);
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* handleSaveFailure({ payload, meta }) {
  let { resource } = meta;
  yield put(
    actions.onFocusElement(resource, getFirstElementError(payload.errors))
  );
}

function* handleReloaded({ meta }) {
  yield put(actions.onReady(meta.resource));
}

function* handleDelete({ payload, meta }) {
  try {
    yield put(loaderActions.show('Proses hapus...'));
    let post = payload.data;

    let response = yield call(api.delete, { id: post.id });
    if (response.status) {
      yield put(
        actions.deletePelaksanaTambahan.requestSuccess(meta.resource, response)
      );
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

function* handleDeleteSuccess({ payload }) {
  try {
    yield put(datatableActions.onReload(staticConst.TABLE_PELAKSANA_TAMBAHAN));
    yield toastr.success(payload.data.message);
  } catch (error) {
    yield toastr.error(error.message);
  }
}

export default function* watchAuthActions() {
  yield all([
    takeLatest(
      actionTypes.GET_ALL_PELAKSANA_TAMBAHAN_REQUEST,
      loadAllPelaksanaTambahan
    ),
    takeLatest(actionTypes.CHANGE_SELECT2_PELAKSANA_TAMBAHAN, changeSelect2),
    takeLatest(actionTypes.ADD_PELAKSANA_TAMBAHAN, addHandler),
    takeLatest(actionTypes.EDIT_PELAKSANA_TAMBAHAN, editHandler),
    takeLatest(actionTypes.SAVE_PELAKSANA_TAMBAHAN_REQUEST, handleSave),
    takeLatest(actionTypes.SAVE_PELAKSANA_TAMBAHAN_SUCCESS, handleSaveSuccess),
    takeLatest(actionTypes.SAVE_PELAKSANA_TAMBAHAN_FAILURE, handleSaveFailure),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    takeLatest(actionTypes.DELETE_PELAKSANA_TAMBAHAN_REQUEST, handleDelete),
    takeLatest(
      actionTypes.DELETE_PELAKSANA_TAMBAHAN_SUCCESS,
      handleDeleteSuccess
    ),
    takeLatest(actionTypes.OPEN_FORM_PELAKSANA_TAMBAHAN, openForm),
    takeLatest(
      actionTypes.POPULATE_FORM_PELAKSANA_TAMBAHAN_REQUEST,
      populateForm
    ),
    takeLatest(
      actionTypes.GET_PELAKSANA_TAMBAHAN_REQUEST,
      pelaksanaRequestHandler
    ),
  ]);
}
