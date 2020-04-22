import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';

import { validator as commonValidator, toastrActions } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  constDatatable,
  datatableActionTypes,
} from '@simrs/components';
import api from '../../services/models/kotaModel';
import {
  moduleActionTypes,
  moduleActions,
  filterActionTypes,
} from '@simrs/main/src/modules/master/nested';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

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
  yield put(datatableActions.onReloaded(meta.subResource, pastAction));
}

function* handleSave({ payload, meta }) {
  let { resource, subResource } = meta;
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
      yield put(toastrActions.warning(getFirstError(errors)));
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
  yield put(
    moduleActions.onFocusElement(
      resource,
      subResource,
      getFirstElementError(payload.errors)
    )
  );
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
  yield put(
    moduleActions.onFocusElement(meta.resource, meta.subResource, 'kode_kota')
  );
}

function* handleEdit({ meta }) {
  yield put(
    moduleActions.onFocusElement(meta.resource, meta.subResource, 'kode_kota')
  );
}

export default function* watchActions() {
  yield all([
    takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
    takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(moduleActionTypes.SAVE_FAILURE, handleSaveFailure),
    takeLatest(moduleActionTypes.DELETE_REQUEST, handleDelete),
    takeLatest(moduleActionTypes.DELETE_SUCCESS, handleDeleteSuccess),
    takeLatest(moduleActionTypes.ADD, handleAdd),
    takeLatest(moduleActionTypes.EDIT, handleEdit),
    takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
  ]);
}
