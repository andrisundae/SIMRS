import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import { toastr, validator as commonValidator } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  datatableActionTypes,
  constDatatable,
} from '@simrs/components';

import { dateFormatDB } from '@simrs/common/src/utils';

import { filterMaster, listData } from '../pages/index/redux/selector';

import {
  detailPemesanan,
  penerimaan,
  detailPenerimaan,
  selectedPenerimaan,
} from '../pages/detail/redux/selector';

import api from '../service/model/model';

import { tableName } from '../pages/static';

import localActions from '../pages/index/redux/actions';
import detailActions from '../pages/detail/redux/actions';
import actionTypes from '../pages/index/redux/actionTypes';
import detailActionTypes from '../pages/detail/redux/actionsTypes';

function* openForm({ meta }) {
  yield put(localActions.initialForm.request(meta.resource));
  yield put(datatableActions.onInitialize(tableName.PEMESANAN));
  yield put(datatableActions.onInitialize(tableName.ITEM_PEMESANAN));
  yield put(datatableActions.onInitialize(tableName.PENERIMAAN));
  yield put(datatableActions.onInitialize(tableName.ITEM_PENERIMAAN));
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show());
    let { initialForm } = localActions;

    let response = yield call(api.getInitialForm);
    if (response.status) {
      yield put(initialForm.requestSuccess(meta.resource, response.data));
    } else {
      yield put(initialForm.requestFailure(meta.resource, response.message));
      yield toastr.error(response.message);
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* onFormReady({ meta, payload }) {
  let {
    data: { supplier, unit },
  } = payload;

  yield put(localActions.setInitForm(meta.resource, { supplier, unit }));
}

function* onCariPemesanan({ meta, payload }) {
  yield put(
    datatableActions.onReload(
      tableName.PEMESANAN,
      constDatatable.reloadType.purge
    )
  );
}

function* loadPemesanan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const filter = yield select(filterMaster);

  try {
    let response = yield call(api.getListPemesanan, {
      ...filter,
      ...payload.data,
    });

    if (response.status) {
      yield put(
        localActions.findPemesanan.requestSuccess(
          meta.resource,
          response.data,
          meta.tableParams
        )
      );
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.PEMESANAN));
}

function* loadItemPemesanan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getDetailPemesanan, { ...payload.data });

    if (response.status === true) {
      yield put(
        detailActions.loadItemPemesanan.requestSuccess(
          meta.resource,
          response.data,
          meta.tableParams
        )
      );
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.PEMESANAN));
}

function* loadPenerimaan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getListPenerimaan, { ...payload.data });

    if (response.info.type === 'success') {
      yield put(
        detailActions.loadPenerimaan.requestSuccess(
          meta.resource,
          response.data,
          meta.tableParams
        )
      );
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.PEMESANAN));
}

function* loadItemPenerimaan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;

  const itemPenerimaan = yield select(selectedPenerimaan);
  let itemId = itemPenerimaan.id ? itemPenerimaan.id : 0;

  try {
    let response = yield call(api.getDetailPenerimaan, {
      ...payload.data,
      id_pembelian: itemId,
    });

    if (response.status === true) {
      yield put(
        detailActions.loadItemPenerimaan.requestSuccess(
          meta.resource,
          response.data,
          meta.tableParams
        )
      );
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.ITEM_PENERIMAAN));
}

function* updateListData({ meta }) {
  const { successCallback, failCallback } = meta.tableParams;
  const filter = yield select(filterMaster);
  const data = yield select(listData);

  if (filter.idSupplier) {
    data = data.find(
      (pemesanan) => pemesanan.id_supplier === filter.isSupplier
    );
  }

  if (filter.idUnitPenerima) {
    data = data.find(
      (pemesanan) => pemesanan.id_unit === filter.idUnitPenerima
    );
  }

  successCallback(data, data.length);
}

function* updateItemPemesanan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const items = yield select(detailPemesanan);

  successCallback(items, items.length);
}

function* updatePenerimaan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const items = yield select(penerimaan);

  successCallback(items, items.length);
}

function* updateItemPenerimaan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const items = yield select(detailPenerimaan);

  successCallback(items, items.length);
}

function* searchItemPenerimaan() {
  try {
    yield put(
      datatableActions.onReload(
        tableName.ITEM_PENERIMAAN,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

export default function* watchActions() {
  yield all([
    takeLatest(actionTypes.OPEN_FORM, openForm),
    takeLatest(actionTypes.INIT_REQUEST, populateForm),
    takeLatest(actionTypes.INIT_SUCCESS, onFormReady),
    takeLatest(actionTypes.SUBMIT_TAMPIL_PEMESANAN, onCariPemesanan),

    takeLatest(actionTypes.PEMESANAN_REQUEST, loadPemesanan),
    takeLatest(actionTypes.PEMESANAN_SUCCESS, updateListData),
    takeLatest(detailActionTypes.PEMESANAN_ITEM_REQUEST, loadItemPemesanan),
    takeLatest(detailActionTypes.PEMESANAN_ITEM_SUCCESS, updateItemPemesanan),
    takeLatest(detailActionTypes.PENERIMAAN_REQUEST, loadPenerimaan),
    takeLatest(detailActionTypes.PENERIMAAN_SUCCESS, updatePenerimaan),
    takeLatest(detailActionTypes.PENERIMAAN_ITEM_REQUEST, loadItemPenerimaan),
    takeLatest(detailActionTypes.PENERIMAAN_ITEM_SUCCESS, updateItemPenerimaan),
    takeLatest(detailActionTypes.SELECT_ITEM_PENERIMAAN, searchItemPenerimaan),
  ]);
}
