import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';

import { toastrActions, formatter } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  datatableActionTypes,
} from '@simrs/components';
import api from '../../services/models/koreksiTarifKelasModel';
import {
  moduleActionTypes,
  moduleActions,
} from '@simrs/main/src/modules/master/nested';
import { actions, actionTypes, isEditTindakan, getTotalTarif } from './index';

function* loadAll({ payload, meta }) {
  const { successCallback, failCallback, pastAction } = meta.tableParams;

  try {
    let response = yield call(api.getAllTindakanKomponen, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
      yield put(
        actions.loadAll.requestSuccess(
          meta.resource,
          meta.subResource,
          response.data
        )
      );
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
    let listTindakanKomponen = [];
    payload.data.list_tindakan_komponen.forEach((row) => {
      listTindakanKomponen.push(row);
    });
    let post = {
      ...payload.data,
      list_tindakan_komponen: listTindakanKomponen,
    };
    let errors = {};

    let totalTarifKomponen = yield select(getTotalTarif);
    let tarifTindakan = formatter.numFormatDb(post.tarif_tindakan);
    if (
      totalTarifKomponen > tarifTindakan ||
      totalTarifKomponen < tarifTindakan
    ) {
      errors.tarif = 'Total tarif komponen tidak sama dengan tarif tindakan!';
    }

    let isError = false;
    let message = '';

    if (_.isEmpty(errors)) {
      let response = yield call(api.saveTindakanKomponen, post);
      if (response.status) {
        yield put(
          moduleActions.save.requestSuccess(resource, subResource, response)
        );
      } else {
        isError = true;
        message = response.message;
      }
    } else {
      isError = true;
      message = errors.tarif;
    }

    if (isError) {
      yield put(
        moduleActions.save.requestFailure(resource, subResource, { message })
      );
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield put(toastrActions.error(error.message));
  }
}

function* handleSaveSuccess({ payload, meta }) {
  let isEdit = yield select(isEditTindakan);
  if (isEdit) {
    yield put(
      actions.onRedirectTindakan(meta.resource, meta.subResource, {
        isRedirect: true,
      })
    );
  } else {
    yield put(toastrActions.success(payload.data.message));
    yield put(datatableActions.onReload(meta.subResource));
  }
}

function* handleSaveFailure({ payload }) {
  yield put(toastrActions.warning(payload.errors.message));
}

function* handleReloaded({ meta }) {
  yield put(moduleActions.onReady(meta.resource, meta.subResource));
}

export default function* watchActions() {
  yield all([
    takeLatest(actionTypes.LOAD_ALL_REQUEST, loadAll),
    takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(moduleActionTypes.SAVE_FAILURE, handleSaveFailure),
    takeLatest(datatableActionTypes.RELOADED, handleReloaded),
  ]);
}
