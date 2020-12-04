import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';

import {
  masterActions,
  masterActionTypes,
  detailActions,
  detailActionTypes,
  filterActions,
  filterActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';
import { validator as commonValidator, toastr } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  constDatatable,
} from '@simrs/components';

import localActions from '../pages/index/actions';

import api from '../service/models/pemesananSupplierModel';
import { tableName } from '../static/staticConst';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(masterActions.initialForm.request(meta.resource));
  yield put(datatableActions.onInitialize(tableName.CARI_TRANSAKSI));
  yield put(datatableActions.onInitialize(tableName.DETAIL_LIST));
  yield put(datatableActions.onInitialize(tableName.BARANG_LIST));
}

function* onReadyForm({ meta }) {
  yield put(masterActions.onFocusElement(meta.resource, 'addMaster'));
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show());
    let { initialForm } = masterActions;

    let response = yield call(api.getInitialForm);
    if (response.status) {
      yield put(initialForm.requestSuccess(meta.resource, response.data));
      yield put(
        localActions.setDefaultFilterData(meta.resource, response.data)
      );
    } else {
      yield put(initialForm.requestFailure(meta.resource, response.message));
      yield toastr.error(response.message);
    }
    yield put(masterActions.onReady(meta.resource));
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleSeacrhTransaksi() {
  try {
    yield put(
      datatableActions.onReload(
        tableName.CARI_TRANSAKSI,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* handleSeacrhItem() {
  try {
    yield put(
      datatableActions.onReload(
        tableName.BARANG_LIST,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* loadAllItem({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  try {
    if (payload.data.filter_value) {
      let response = yield call(api.getDataBarang, payload.data);
      let result = response.data;

      if (response.status) {
        yield put(filterActions.loadItemSuccess(meta.resource, result.data));
        successCallback(result.data, result.recordTotal);
      } else {
        failCallback();
      }
    } else {
      successCallback([], 0);
    }
  } catch (error) {
    failCallback;
  }

  yield put(datatableActions.onReloaded(tableName.BARANG_LIST));
}

function* loadAllTransaksi({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getDataTransaksi, payload.data);
    let result = response.data;

    if (response.status) {
      yield put(filterActions.loadTransaksiSuccess(meta.resource, result.data));
      successCallback(result.data, result.recordTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.CARI_TRANSAKSI));
}

function* loadAllDetail({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  try {
    let response = yield call(api.getDataDetail, payload.data);
    let result = response.data;
    if (response.status) {
      yield put(detailActions.loadDetailSuccess(meta.resource, result.data));
      successCallback(result.data, result.recordTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.DETAIL_LIST));
}

function* handleSave({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const { rules, messages } = api.validationRules(meta.resource);
    const method = 'tambah';

    let errors = validator(payload.data, rules, messages);

    if (_.isEmpty(errors)) {
      let response = yield call(api.save, method, payload.data);

      if (response.status) {
        yield put(masterActions.save.requestSuccess(meta.resource, response));
      } else {
        yield toastr.warning(response.message);
        errors = response.data;
      }
    }

    if (!_.isEmpty(errors)) {
      yield toastr.warning(getFirstError(errors));
      yield put(masterActions.save.requestFailure(meta.resource, errors));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleSaveDetail({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const { rules, messages } = api.validationDetailRules(meta.resource);
    const method = payload.data.id ? 'koreksi-detail' : 'tambah-detail';

    let errors = validator(payload.data, rules, messages);

    if (_.isEmpty(errors)) {
      let response = yield call(api.save, method, payload.data);

      if (response.status) {
        yield put(detailActions.save.requestSuccess(meta.resource, response));
      } else {
        yield toastr.warning(response.message);
        errors = response.data;
      }

      yield put(detailActions.onReady(meta.resource));
    }

    if (!_.isEmpty(errors)) {
      yield toastr.warning(getFirstError(errors));
      yield put(detailActions.save.requestFailure(meta.resource, errors));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleDeleteDetail({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    let response = yield call(api.deleteDetail, payload.data);

    if (response.status) {
      yield put(detailActions.delete.requestSuccess(meta.resource, response));
    } else {
      yield toastr.warning(response.message);
    }

    yield put(detailActions.onReady(meta.resource));
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleSelesai({ meta, payload }) {
  try {
    yield put(loaderActions.show());

    const { rules, messages } = api.validateFinish(meta.resource);

    let errors = validator(payload.data, rules, messages);

    if (_.isEmpty(errors)) {
      let response = yield call(api.finish, payload.data);

      if (response.status) {
        yield put(masterActions.finish.requestSuccess(meta.resource, response));
      } else {
        yield toastr.warning(response.message);
        errors = response.data;
      }
    }

    if (!_.isEmpty(errors)) {
      yield toastr.warning(getFirstError(errors));
      yield put(masterActions.finish.requestFailure(meta.resource, errors));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleHapusSuccess({ meta }) {
  yield put(masterActions.onReset(meta.resource));
  yield put(detailActions.onReset(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* handleHapus({ meta, payload }) {
  try {
    yield put(loaderActions.show());

    const { rules, messages } = api.validateHapus(meta.resource);

    let errors = validator(payload.data, rules, messages);

    if (_.isEmpty(errors)) {
      let response = yield call(api.hapus, payload.data);

      if (response.status) {
        yield put(masterActions.delete.requestSuccess(meta.resource, response));
      } else {
        yield toastr.warning(response.message);
        errors = response.data;
      }
    }

    if (!_.isEmpty(errors)) {
      yield toastr.warning(getFirstError(errors));
      yield put(masterActions.delete.requestFailure(meta.resource, errors));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleSaveSuccess({ meta, payload }) {
  yield toastr.success(payload.data.message);
  yield put(detailActions.onReady(meta.resource));
  yield put(localActions.setFilterDetail(meta.resource, payload.data.data));
}

function* handleSaveDetailSuccess({ payload }) {
  yield toastr.success(payload.data.message);
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* handleSelectedMaster({ meta, payload }) {
  try {
    yield put(localActions.setFilterDetail(meta.resource, payload.data));
    yield put(
      datatableActions.onReload(
        tableName.DETAIL_LIST,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* handleSelectedDetail({ meta, payload }) {
  try {
    let response = yield call(api.getDataStok, payload.data);

    if (response.status) {
      yield put(localActions.setStok(meta.resource, response.data));
      yield put(detailActions.onFocusElement(meta.resource, 'jumlah_pesan'));
    } else {
      yield toastr.error(response.message);
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* handleSaveFailure({ payload, meta }) {
  yield put(
    masterActions.onFocusElement(
      meta.resource,
      getFirstElementError(payload.errors)
    )
  );
}

function* handleAdd({ meta }) {
  yield put(masterActions.onFocusElement(meta.resource, 'id_supplier'));
  yield put(detailActions.onReset(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* handleEditDetail({ meta }) {
  yield put(detailActions.onFocusElement(meta.resource, 'jumlah_pesan'));
}

function* handleBatal({ meta }) {
  yield put(masterActions.onReset(meta.resource));
  yield put(detailActions.onReset(meta.resource));
}

function* showWarning({ payload }) {
  yield toastr.warning(payload.message);
}

function* handleOpenDialog({ meta, payload }) {
  let nextElement = 'btnCari';
  if (payload.data.form !== 'master_modal') {
    nextElement = 'filter_value';
  }
  yield put(filterActions.onFocusElement(meta.resource, nextElement));
}

export default function* watchActions() {
  yield all([
    takeLatest(filterActionTypes.CARI_TRANSAKSI_REQUEST, loadAllTransaksi),
    takeLatest(filterActionTypes.CARI_ITEM_REQUEST, loadAllItem),
    takeLatest(filterActionTypes.ON_SUBMIT_TRANSAKSI, handleSeacrhTransaksi),
    takeLatest(filterActionTypes.ON_SUBMIT_DETAIL, handleSeacrhItem),
    takeLatest(filterActionTypes.OPEN_DIALOG, handleOpenDialog),
    takeLatest(masterActionTypes.OPEN_FORM, openForm),
    takeLatest(masterActionTypes.ADD, handleAdd),
    takeLatest(masterActionTypes.GET_INITIAL_FORM_REQUEST, populateForm),
    takeLatest(masterActionTypes.GET_INITIAL_FORM_SUCCESS, onReadyForm),
    takeLatest(masterActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(masterActionTypes.SAVE_SUCCESS, handleSaveSuccess),
    takeLatest(masterActionTypes.SAVE_FAILURE, handleSaveFailure),
    takeLatest(masterActionTypes.SET_DATA_MASTER, handleSelectedMaster),
    takeLatest(masterActionTypes.BATAL, handleBatal),
    takeLatest(masterActionTypes.FINISH_REQUEST, handleSelesai),
    takeLatest(masterActionTypes.DELETE_REQUEST, handleHapus),
    takeLatest(masterActionTypes.DELETE_SUCCESS, handleHapusSuccess),
    takeLatest(detailActionTypes.SET_DATA_DETAIL, handleSelectedDetail),
    takeLatest(detailActionTypes.GET_DETAIL_REQUEST, loadAllDetail),
    takeLatest(detailActionTypes.SAVE_REQUEST, handleSaveDetail),
    takeLatest(detailActionTypes.SAVE_SUCCESS, handleSaveDetailSuccess),
    takeLatest(detailActionTypes.EDIT, handleEditDetail),
    takeLatest(detailActionTypes.WARNING, showWarning),
    takeLatest(detailActionTypes.DELETE_REQUEST, handleDeleteDetail),
    takeLatest(detailActionTypes.DELETE_SUCCESS, handleSaveDetailSuccess),
  ]);
}
