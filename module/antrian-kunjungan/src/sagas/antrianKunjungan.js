import { put, call, takeLatest, all } from 'redux-saga/effects';
// import { ipcRenderer } from 'electron';

import { toastr } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  constDatatable,
  datatableActionTypes,
} from '@simrs/components';
import api from '../services/models/antrianKunjunganModel';

import { actionTypes, actions } from '../pages/index';

function* openForm({ meta }) {
  yield put(actions.populateForm.request(meta.resource));
}

function* loadAll({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getAll, payload.data);
    if (response.status) {
      successCallback(response.data, response.data.length);
    } else {
      yield toastr.error(response.message);
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(meta.resource));
}

function* handleReloaded({ meta }) {
  yield put(actions.onReady(meta.resource));
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

function* changeSelect2Handler({ meta, payload }) {
  try {
    switch (payload.name) {
      case 'instalasi_id': {
        if (payload.data) {
          yield put(actions.dpjp.request(meta.resource, payload.data));
        }
        break;
      }
      default:
        break;
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* dpjpRequestHandler({ meta, payload }) {
  try {
    let response = yield call(api.getDpjp, payload.data.value);
    if (response.status) {
      yield put(actions.dpjp.requestSuccess(meta.resource, response.data));
    } else {
      yield put(actions.dpjp.requestFailure(meta.resource, response.message));
    }
  } catch (error) {
    yield toastr.error(error.message);
    yield put(actions.dpjp.requestFailure(meta.resource, error.message));
  }
}

export default function* watchActions() {
  yield all([
    takeLatest(actionTypes.LOAD_ALL, loadAll),
    takeLatest(actionTypes.OPEN_FORM, openForm),
    takeLatest(actionTypes.SUBMIT_FILTER, handleSearch),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
    takeLatest(actionTypes.CHANGE_SELECT2, changeSelect2Handler),
    takeLatest(actionTypes.GET_DPJP_REQUEST, dpjpRequestHandler),
  ]);
}
