import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';

import { validator as commonValidator, toastr } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  constDatatable,
  datatableActionTypes,
} from '@simrs/components';
import api from '../services/models/hargaJualModel';
import {
  moduleActionTypes,
  moduleActions,
  filterActionTypes,
} from '@simrs/main/src/modules/master/default';
import actionTypes from '../pages/index/actionnsTypes';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;
const TABLE_HISTORY = 'table_history';

function* openForm({ meta }) {
  yield put(datatableActions.onInitialize(meta.resource));
  yield put(datatableActions.onInitialize(TABLE_HISTORY));
}

function* loadAll({ payload, meta }) {
  const { successCallback, failCallback, pastAction } = meta.tableParams;

  try {
    let response = yield call(api.getAll, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(meta.resource, pastAction));
}

function* loadLogHarga({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getLog, payload.data);

    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(TABLE_HISTORY));
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
        yield put(moduleActions.save.requestSuccess(resource, response));
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield toastr.warning(getFirstError(errors));
      yield put(moduleActions.save.requestFailure(resource, errors));
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
    yield ipcRenderer.send('enable-header');
  }
}

function* handleSaveSuccess({ payload, meta }) {
  try {
    yield put(datatableActions.onReload(meta.resource));
    yield toastr.success(payload.data.message);
    yield ipcRenderer.send('enable-header');
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* handleSaveFailure({ payload, meta }) {
  let { resource } = meta;
  yield put(
    moduleActions.onFocusElement(resource, getFirstElementError(payload.errors))
  );
}

function* handleReloaded({ meta }) {
  if (meta.resource !== TABLE_HISTORY) {
    yield put(moduleActions.onReady(meta.resource));
  }
}

function* handleSearch({ meta }) {
  try {
    yield put(
      datatableActions.onReload(meta.resource, constDatatable.reloadType.purge)
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* handleEdit({ meta }) {
  yield put(moduleActions.onFocusElement(meta.resource, 'harga_jual'));
}

export default function* watchActions() {
  yield all([
    takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
    takeLatest(actionTypes.GET_LOG_HARGA_REQUEST, loadLogHarga),
    takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(moduleActionTypes.SAVE_FAILURE, handleSaveFailure),
    takeLatest(moduleActionTypes.EDIT, handleEdit),
    takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
  ]);
}
