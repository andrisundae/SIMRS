import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import _ from 'lodash';

import { validator as commonValidator, toastrActions } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  constDatatable,
  datatableActionTypes,
} from '@simrs/components';
import api from '../../services/models/koreksiTarifKelasModel';
import {
  moduleActionTypes,
  moduleActions,
  filterActionTypes,
} from '@simrs/main/src/modules/master/nested';
import {
  selectors,
  context,
} from '@simrs/main/src/modules/setting/aturan-aplikasi';
import { actions, actionTypes } from '../tindakan-layanan';

const { getFirstElementError, getFirstError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(actions.populateForm.request(meta.resource, meta.subResource));
}

function* loadAll({ payload, meta }) {
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
  yield put(datatableActions.onReloaded(meta.subResource));
}

function* handleReloaded({ meta }) {
  yield put(moduleActions.onReady(meta.resource, meta.subResource));
}

function* handleSearch({ meta }) {
  yield put(
    datatableActions.onReload(meta.subResource, constDatatable.reloadType.purge)
  );
}

function* handleChangeKlasifikasi({ meta, payload }) {
  try {
    yield put(loaderActions.show('Load klasifikasi...'));
    let { getKelompok } = actions;
    let params = { id: payload.data.value };

    yield put(getKelompok.request(meta.resource, meta.subResource, params));

    let response = yield call(api.getKelompok, params);
    if (response.status) {
      yield put(
        getKelompok.requestSuccess(
          meta.resource,
          meta.subResource,
          response.data
        )
      );
    } else {
      yield put(
        getKelompok.requestFailure(
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

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show('Load data form...'));
    let { populateForm } = actions;

    let message = '';
    let data = {
      versiTarif: [],
      klasifikasi: [],
      kelas: [],
    };

    let versiTarif = yield call(api.getVersiTarif);
    if (versiTarif.status) {
      data.versiTarif = versiTarif.data;
    } else {
      message = versiTarif.message;
    }

    let klasifikasi = yield call(api.getKlasifikasi);
    if (klasifikasi.status) {
      data.klasifikasi = klasifikasi.data;
    } else {
      message = klasifikasi.message;
    }

    let kelas = yield call(api.getKelas);
    if (kelas.status) {
      data.kelas = kelas.data;
    } else {
      message = kelas.message;
    }

    if (data.versiTarif || data.klasifikasi || data.kelas) {
      yield put(
        populateForm.requestSuccess(meta.resource, meta.subResource, data)
      );
    } else {
      yield put(
        populateForm.requestFailure(meta.resource, meta.subResource, message)
      );
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
  }
}

function* handleChangeTarif({ meta, payload }) {
  yield put(
    moduleActions.save.request(meta.resource, meta.subResource, {
      ...payload.data.post,
    })
  );
}

function* handleSave({ payload, meta }) {
  let { resource, subResource } = meta;
  try {
    yield put(loaderActions.show('Proses simpan...'));

    let response = yield call(api.save, payload.data);
    if (response.status) {
      yield put(
        moduleActions.save.requestSuccess(resource, subResource, response)
      );
    } else {
      yield put(
        moduleActions.save.requestFailure(resource, subResource, response.data)
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
  }
}

function* handleSaveSuccess({ payload, meta }) {
  try {
    yield put(toastrActions.success(payload.data.message));
    yield put(datatableActions.onReload(meta.subResource));
    if (payload.data.data.isNotBalance) {
      yield ipcRenderer.send('focusing-cell');
    }
  } catch (error) {
    yield put(toastrActions.error(error.message));
  }
}

function* handleSaveFailure({ payload, meta }) {
  let { resource, subResource } = meta;
  let elementError = getFirstElementError(payload.errors);
  yield put(moduleActions.onFocusElement(resource, subResource, elementError));
  if (elementError === 'total_tarif') {
    yield ipcRenderer.send('status-not-balance');
  }
}

function* handleFilter({ payload, meta }) {
  let { resource, subResource } = meta;
  try {
    let errors = yield call(validation, payload.data);

    if (_.isEmpty(errors) || payload.data.nama_layanan.length <= 0) {
      yield put(
        actions.filter.onSubmitSuccess(resource, subResource, payload.data)
      );
    } else {
      yield put(actions.filter.onSubmitFailure(resource, subResource, errors));
    }
  } catch (error) {
    yield put(toastrActions.error(error.message));
  }
}

function* handleSubmitFailure({ payload, meta }) {
  yield put(toastrActions.warning(getFirstError(payload.errors)));
  yield put(
    actions.onFocusElement(meta.resource, meta.subResource, 'nama_layanan')
  );
}

function* validation(post) {
  const minlength = yield select(selectors.get, context.MINCHARPENCARIANMASTER);
  const rules = {
    [context.MINCHARPENCARIANMASTER]: { minlength },
  };
  const messages = {
    [context.MINCHARPENCARIANMASTER]: {
      minlength: `Minimal karakter pencarian ${minlength} huruf`,
    },
  };

  let errors = yield validator(
    { [context.MINCHARPENCARIANMASTER]: post.nama_layanan },
    rules,
    messages
  );

  return errors;
}

function* handleFocusElement() {
  yield ipcRenderer.send('focusing-field');
}

export default function* watchActions() {
  yield all([
    takeLatest(actionTypes.LOAD_ALL_REQUEST, loadAll),
    takeLatest(moduleActionTypes.OPEN_FORM, openForm),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
    takeLatest(actionTypes.CHANGE_KLASIFIKASI, handleChangeKlasifikasi),
    takeLatest(actionTypes.CHANGE_TARIF, handleChangeTarif),
    takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(moduleActionTypes.SAVE_FAILURE, handleSaveFailure),

    takeLatest(filterActionTypes.FILTER_SUBMIT, handleFilter),
    takeLatest(actionTypes.FILTER_SUBMIT_SUCCESS, handleSearch),
    takeLatest(actionTypes.FILTER_SUBMIT_FAILURE, handleSubmitFailure),
    takeLatest(actionTypes.ON_FOCUS_ELEMENT, handleFocusElement),
  ]);
}
