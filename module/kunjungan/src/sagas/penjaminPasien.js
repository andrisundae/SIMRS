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
import api from '../services/models/penjaminPasienModel';
import apiKunjungan from '../services/models/kunjunganModel';
import * as actions from '../pages/index/redux/penjaminPasienActions';
import * as actionTypes from '../pages/index/redux/penjaminPasienActionTypes';
import { staticConst } from '../pages/index/static';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

// function* populateForm({ meta }) {
//   try {
//     yield put(loaderActions.show());
//     let { populateForm } = actions;
//     let response = yield call(api.init);
//     if (response.status) {
//       yield put(populateForm.requestSuccess(meta.resource, response.data));
//     } else {
//       yield put(populateForm.requestFailure(meta.resource, response.message));
//     }

//     yield put(loaderActions.hide());
//   } catch (error) {
//     yield put(loaderActions.hide());
//     yield toastr.error(error.message);
//   }
// }

function* loadAllPenjaminPasien({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getAll, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
      yield put(
        actions.getAllPenjaminPasien.requestSuccess(
          meta.resource,
          response.data
        )
      );
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.PENJAMIN_PASIEN_RESOURCE));
}

function* changeSelect2({ meta, payload }) {
  try {
    switch (payload.name) {
      case 'id_penjamin':
        yield put(
          actions.settingKelasPenjamin.request(meta.resource, payload.data)
        );
        break;
      default:
        break;
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* settingKelasPenjaminRequestHandler({ meta, payload }) {
  try {
    let response = yield call(
      apiKunjungan.getSettingKelasPenjamin,
      payload.data.value
    );
    if (response.status) {
      yield put(
        actions.settingKelasPenjamin.requestSuccess(
          meta.resource,
          response.data
        )
      );
    } else {
      yield put(
        actions.settingKelasPenjamin.requestFailure(
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
  yield put(actions.onFocusElement(meta.resource, 'id_penjamin'));
}

function* editHandler({ meta, payload }) {
  yield put(
    actions.settingKelasPenjamin.request(meta.resource, {
      value: payload.data.id_penjamin,
    })
  );
  yield put(actions.onFocusElement(meta.resource, 'id_penjamin'));
}

function* handleSave({ payload, meta }) {
  let { resource } = meta;
  try {
    yield put(loaderActions.show('Proses simpan...'));
    let { rules, messages } = api.validationRules(resource);
    let post = payload.data;
    let method = post.id ? 'koreksi' : 'tambah';
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      let response = yield call(api.save, method, post);
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

function* handleSaveSuccess({ payload, meta }) {
  try {
    yield put(datatableActions.onReload(meta.resource));
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
  if (meta.resource === staticConst.PENJAMIN_PASIEN_RESOURCE) {
    yield put(actions.onReady(meta.resource));
  }
}

function* handleDelete({ payload, meta }) {
  try {
    yield put(loaderActions.show('Proses hapus...'));
    let post = payload.data;

    let response = yield call(api.delete, { id: post.id });
    if (response.status) {
      yield put(actions.deletePenjamin.requestSuccess(meta.resource, response));
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

function* handleDeleteSuccess({ payload, meta }) {
  try {
    yield put(datatableActions.onReload(meta.resource));
    yield toastr.success(payload.data.message);
  } catch (error) {
    yield toastr.error(error.message);
  }
}

export default function* watchAuthActions() {
  yield all([
    takeLatest(
      actionTypes.GET_ALL_PENJAMIN_PASIEN_REQUEST,
      loadAllPenjaminPasien
    ),
    takeLatest(actionTypes.CHANGE_SELECT2_PENJAMIN_PASIEN, changeSelect2),
    takeLatest(actionTypes.ADD_PENJAMIN_PASIEN, addHandler),
    takeLatest(actionTypes.EDIT_PENJAMIN_PASIEN, editHandler),
    takeLatest(
      actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_REQUEST,
      settingKelasPenjaminRequestHandler
    ),
    takeLatest(actionTypes.SAVE_PENJAMIN_PASIEN_REQUEST, handleSave),
    takeLatest(actionTypes.SAVE_PENJAMIN_PASIEN_SUCCESS, handleSaveSuccess),
    takeLatest(actionTypes.SAVE_PENJAMIN_PASIEN_FAILURE, handleSaveFailure),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    takeLatest(actionTypes.DELETE_PENJAMIN_PASIEN_REQUEST, handleDelete),
    takeLatest(actionTypes.DELETE_PENJAMIN_PASIEN_SUCCESS, handleDeleteSuccess),
  ]);
}
