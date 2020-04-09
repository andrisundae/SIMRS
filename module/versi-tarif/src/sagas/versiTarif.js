import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';

import { validator as commonValidator, toastr, formatter } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  constDatatable,
  datatableActionTypes,
} from '@simrs/components';
import api from '../services/models/versiTarifModel';
import {
  moduleActionTypes,
  moduleActions,
  filterActionTypes,
} from '@simrs/main/src/modules/master/default';
import { actionTypes, actions } from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;
const TABLE_DUPLICATION = 'data_duplication';

function* openForm({ meta }) {
  yield put(datatableActions.onInitialize(meta.resource));
  yield put(datatableActions.onInitialize(TABLE_DUPLICATION));
  yield put(actions.populateForm(meta.resource));
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

function* loadAllOnDuplication({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

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
  yield put(datatableActions.onReloaded(TABLE_DUPLICATION));
}

function* handleSave({ payload, meta }) {
  let { resource } = meta;
  try {
    yield put(loaderActions.show('Proses simpan...'));
    let { rules, messages } = api.validationRules(resource);
    let post = {
      ...payload.data,
      tgl_aktif_tarif: formatter.dateFormatDB(
        payload.data.tgl_aktif_tarif,
        'YYYY-MM-DD'
      ),
      jam_aktif_tarif: formatter.dateFormatDB(
        payload.data.jam_aktif_tarif,
        'HH:mm'
      ),
    };
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
    yield toastr.success(payload.data.message);
    yield put(datatableActions.onReload(meta.resource));
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
  if (meta.resource !== TABLE_DUPLICATION) {
    yield put(moduleActions.onReady(meta.resource));
  }
}

function* handleDelete({ payload, meta }) {
  try {
    yield put(loaderActions.show('Proses hapus...'));
    let post = payload.data;

    let response = yield call(api.delete, { id: post.id });
    if (response.status) {
      yield put(moduleActions.delete.requestSuccess(meta.resource, response));
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
    yield toastr.success(payload.data.message);
    yield put(datatableActions.onReload(meta.resource));
  } catch (error) {
    yield toastr.error(error.message);
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

function* handleAdd({ meta }) {
  yield put(moduleActions.onFocusElement(meta.resource, 'nama'));
}

function* handleEdit({ meta }) {
  yield put(moduleActions.onFocusElement(meta.resource, 'nama'));
}

function* handleChangeTglAktifTarif({ meta }) {
  yield put(moduleActions.onFocusElement(meta.resource, 'jam_aktif_tarif'));
}

function* handleChangeJamAktifTarif({ meta }) {
  yield put(moduleActions.onFocusElement(meta.resource, 'aktif'));
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show('Load data form...'));
    let { getStatusAktifKunjungan } = actions;
    yield put(getStatusAktifKunjungan.request(meta.resource));
    let response = yield call(api.getStatusAktifKunjungan);
    if (response.status) {
      yield put(
        getStatusAktifKunjungan.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        getStatusAktifKunjungan.requestFailure(meta.resource, response.message)
      );
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error('Error', error.message);
  }
}

function* handleDuplication({ payload, meta }) {
  let { resource } = meta;
  try {
    yield put(loaderActions.show('Proses duplikasi...'));
    let { rules, messages } = api.duplicationRules(resource);
    let post = payload.data;
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      let response = yield call(api.duplication, post);
      if (response.status) {
        yield put(actions.duplication.requestSuccess(resource, response));
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield put(actions.duplication.requestFailure(resource, errors));
      yield toastr.error('Error', getFirstError(errors));
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error('Error', error.message);
  }
}

function* handleDuplicationSuccess({ payload, meta }) {
  try {
    yield put(actions.onCancelDuplication(meta.resource));
    yield toastr.success('Success', payload.data.message);
    yield put(datatableActions.onReload(meta.resource));
  } catch (error) {
    yield toastr.error('Error', error.message);
  }
}

export default function* watchActions() {
  yield all([
    takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
    takeLatest(actionTypes.LOAD_DATA_ON_DUPLICATION, loadAllOnDuplication),
    takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(moduleActionTypes.SAVE_FAILURE, handleSaveFailure),
    takeLatest(moduleActionTypes.DELETE_REQUEST, handleDelete),
    takeLatest(moduleActionTypes.DELETE_SUCCESS, handleDeleteSuccess),
    takeLatest(moduleActionTypes.ADD, handleAdd),
    takeLatest(moduleActionTypes.EDIT, handleEdit),
    takeLatest(moduleActionTypes.OPEN_FORM, openForm),
    takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    takeLatest(actionTypes.POPULATE_FORM, populateForm),
    takeLatest(actionTypes.DUPLICATION_REQUEST, handleDuplication),
    takeLatest(actionTypes.DUPLICATION_SUCCESS, handleDuplicationSuccess),
    takeLatest(actionTypes.CHANGE_TANGGALAKTIF, handleChangeTglAktifTarif),
    takeLatest(actionTypes.CHANGE_JAMAKTIF, handleChangeJamAktifTarif),
  ]);
}
