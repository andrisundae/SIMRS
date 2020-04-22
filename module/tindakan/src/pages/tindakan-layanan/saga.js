import { put, call, takeLatest, select, all } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';

import {
  validator as commonValidator,
  toastrActions,
  formatter,
} from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  constDatatable,
  datatableActionTypes,
} from '@simrs/components';
import api from '../../services/models/tindakanModel';
import {
  moduleActionTypes,
  moduleActions,
  filterActionTypes,
} from '@simrs/main/src/modules/master/nested';
import { actions, actionTypes, getReference } from '../tindakan-layanan';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

const TABLE_KELAS = 'data_kelas';

function* openForm({ meta }) {
  yield put(actions.populateForm(meta.resource, meta.subResource));
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

    let data = { show: false };
    if (response.recordsTotal <= 0) {
      data.show = true;
    }

    yield put(
      actions.showButtonImportKelas(meta.resource, meta.subResource, data)
    );
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(meta.subResource, pastAction));
}

function* loadAllKelas({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getAllKelas, payload.data);

    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(TABLE_KELAS));
}

function* handleSave({ payload, meta }) {
  let { resource, subResource } = meta;
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
        yield put(
          moduleActions.save.requestSuccess(resource, subResource, response)
        );
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield put(
        moduleActions.save.requestFailure(resource, subResource, errors)
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
    yield ipcRenderer.send('enable-header');
  }
}

function* handleSaveSuccess({ payload, meta }) {
  try {
    yield put(toastrActions.success(payload.data.message));
    yield put(datatableActions.onReload(meta.subResource));
    yield ipcRenderer.send('enable-header');
  } catch (error) {
    yield put(toastrActions.error(error.message));
  }
}

function* handleSaveFailure({ payload, meta }) {
  let { resource, subResource } = meta;
  let elementError = getFirstElementError(payload.errors);
  yield put(moduleActions.onFocusElement(resource, subResource, elementError));
  if (elementError === 'total_tarif') {
    yield ipcRenderer.send('enable-header');
    yield ipcRenderer.send('status-not-balance');
  } else {
    yield put(toastrActions.warning(getFirstError(payload.errors)));
  }
}

function* handleReloaded({ meta }) {
  yield put(moduleActions.onReady(meta.resource, meta.subResource));
}

function* handleDelete({ payload, meta }) {
  try {
    yield put(loaderActions.show('Proses hapus...'));
    let post = payload.data;

    let response = yield call(api.delete, { id: post.id });
    if (response.status) {
      yield put(
        moduleActions.delete.requestSuccess(
          meta.resource,
          meta.subResource,
          response
        )
      );
    } else {
      if (response.info.type === 'warning') {
        yield put(toastrActions.warning(response.message));
      } else {
        yield put(toastrActions.error(response.message));
      }
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
  }
}

function* handleDeleteSuccess({ payload, meta }) {
  try {
    yield put(toastrActions.success(payload.data.message));
    yield put(datatableActions.onReload(meta.subResource));
  } catch (error) {
    yield put(toastrActions.error(error.message));
  }
}

function* handleSearch({ meta }) {
  try {
    yield put(
      datatableActions.onReload(
        meta.subResource,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield put(toastrActions.error(error.message));
  }
}

function* handleAdd({ meta }) {
  try {
    yield put(loaderActions.show('Load data versi tarif...'));
    let { getKodePanggil } = actions;
    let reference = yield select(getReference);
    yield put(
      getKodePanggil.request(meta.resource, meta.subResource, reference)
    );
    let response = yield call(api.getKodePanggil, reference);
    if (response.status) {
      yield put(
        getKodePanggil.requestSuccess(
          meta.resource,
          meta.subResource,
          response.data
        )
      );
    } else {
      yield put(
        getKodePanggil.requestFailure(
          meta.resource,
          meta.subResource,
          response.message
        )
      );
    }
    yield put(loaderActions.hide());
    yield put(
      moduleActions.onFocusElement(
        meta.resource,
        meta.subResource,
        'kode_panggil'
      )
    );
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
  }
}

function* handleEdit({ meta }) {
  yield put(
    moduleActions.onFocusElement(
      meta.resource,
      meta.subResource,
      'kode_panggil'
    )
  );
}

function* handleChangeTglAktifTarif({ meta }) {
  yield put(
    moduleActions.onFocusElement(
      meta.resource,
      meta.subResource,
      'jam_aktif_tarif'
    )
  );
}

function* handleChangeJamAktifTarif({ meta }) {
  yield put(
    moduleActions.onFocusElement(meta.resource, meta.subResource, 'aktif')
  );
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show('Load data form...'));
    let { getKelas } = actions;
    yield put(getKelas.request(meta.resource, meta.subResource));
    let response = yield call(api.getKelas);
    if (response.status) {
      yield put(
        getKelas.requestSuccess(meta.resource, meta.subResource, response.data)
      );
    } else {
      yield put(
        getKelas.requestFailure(
          meta.resource,
          meta.subResource,
          response.message
        )
      );
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
  }
}

function* handleImportKelas({ payload, meta }) {
  let { resource, subResource } = meta;
  try {
    yield put(loaderActions.show('Proses impor kelas...'));
    let { rules, messages } = api.validationImportKelasRules(resource);
    let post = payload.data;
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      let response = yield call(api.importKelas, post);
      if (response.status) {
        yield put(
          actions.importKelas.requestSuccess(resource, subResource, response)
        );
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield put(
        actions.importKelas.requestFailure(resource, subResource, errors)
      );
      yield put(toastrActions.error(getFirstError(errors)));
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
  }
}

function* handleImportKelasSuccess({ payload, meta }) {
  try {
    yield put(toastrActions.success(payload.data.message));
    yield put(actions.onCancelImportKelas(meta.resource, meta.subResource));
    yield put(datatableActions.onReload(meta.subResource));
  } catch (error) {
    yield put(toastrActions.error(error.message));
  }
}

export default function* watchActions() {
  yield all([
    takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
    takeLatest(moduleActionTypes.OPEN_FORM, openForm),
    takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(moduleActionTypes.SAVE_FAILURE, handleSaveFailure),
    takeLatest(moduleActionTypes.DELETE_REQUEST, handleDelete),
    takeLatest(moduleActionTypes.DELETE_SUCCESS, handleDeleteSuccess),
    takeLatest(moduleActionTypes.ADD, handleAdd),
    takeLatest(moduleActionTypes.EDIT, handleEdit),
    takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    takeLatest(actionTypes.POPULATE_FORM, populateForm),
    takeLatest(actionTypes.LOAD_DATA_ON_IMPORT_KELAS, loadAllKelas),
    takeLatest(actionTypes.IMPORT_KELAS_REQUEST, handleImportKelas),
    takeLatest(actionTypes.IMPORT_KELAS_SUCCESS, handleImportKelasSuccess),
    takeLatest(actionTypes.CHANGE_TANGGALAKTIF, handleChangeTglAktifTarif),
    takeLatest(actionTypes.CHANGE_JAMAKTIF, handleChangeJamAktifTarif),
  ]);
}
