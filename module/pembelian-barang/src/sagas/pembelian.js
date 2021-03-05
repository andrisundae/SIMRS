import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import i18n from 'i18next';
import { toastr, validator as commonValidator } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  datatableActionTypes,
  constDatatable,
} from '@simrs/components';

import { dateFormatDB } from '@simrs/common/src/utils';

import {
  masterActions,
  masterActionTypes,
  detailActions,
  detailActionTypes,
  filterActions,
  filterActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

import api from '../services/models/model';
import validation from '../services/validations/validation';

import {
  afterMaster,
  dataItemDetail,
  afterDetail,
} from '../pages/index/redux/selector';

import { actionTypes, actions as localAction } from '../pages/index';
import { settingNoTransaksi, tableName } from '../pages/static';
import { dateFormatClient } from '@simrs/common/src/utils/formatter';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(localAction.generateNoTransaksi.request(meta.resource));
  yield put(masterActions.initialForm.request(meta.resource));
  yield put(datatableActions.onInitialize(tableName.DETAIL_LIST));
  yield put(datatableActions.onInitialize(tableName.CARI_TRANSAKSI));
  yield put(datatableActions.onInitialize(tableName.BARANG_LIST));
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show());
    let { initialForm } = masterActions;
    let response = yield call(api.init);
    if (response.info.type === 'success') {
      yield put(initialForm.requestSuccess(meta.resource, response.data));
    } else {
      yield put(initialForm.requestFailure(meta.resource, response.message));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* populateFormSuccess({ meta, payload }) {
  yield put(localAction.setInitForm(meta.resource, payload.data));
  yield put(masterActions.onReady(meta.resource));
}

function* generateNomor({ meta }) {
  try {
    let { generateNoTransaksi } = localAction;

    let response = yield call(api.getNormorTransaksi, settingNoTransaksi);
    if (response.info.type === 'success') {
      yield put(
        generateNoTransaksi.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(
        generateNoTransaksi.requestFailure(meta.resource, response.message)
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* loadAllDetail({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const afterSave = yield select(afterMaster);

  try {
    if (afterSave.data) {
      let postData = {
        ...afterSave.data,
        length: payload.data.length,
        start: payload.data.start,
        sort_name: payload.data.sort_name,
        sort_order: payload.data.sort_order,
        id_pembelian: afterSave.data.id,
      };

      let response = yield call(api.getListDetail, postData);

      if (response.status) {
        yield put(
          detailActions.loadDetailSuccess(meta.resource, response.data)
        );
        successCallback(response.data, response.data.length);
      } else {
        failCallback();
      }
    } else {
      successCallback([], 0);
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.DETAIL_LIST));
}

function* loadAllItem({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const afterSave = yield select(afterMaster);

  try {
    if (payload.data.filter_value) {
      let postData = {
        ...payload.data,
        id_supplier: afterSave.data.id_supplier,
        id_unit: afterSave.data.id_unit,
        ts_barang_supplier: true,
      };
      let response = yield call(api.getListBarang, postData);
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
    let response = yield call(api.getListTransaksi, payload.data);

    if (response.status) {
      yield put(
        filterActions.loadTransaksiSuccess(meta.resource, response.data)
      );
      successCallback(response.data, response.data.length);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.CARI_TRANSAKSI));
}

function* onSeacrhTransaksi() {
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

function* onSeacrhTransaksiSuccess() {
  try {
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

function* onSeacrhItem() {
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

function* onReadyForm({ meta }) {
  yield put(masterActions.onFocusElement(meta.resource, 'addMaster'));
}

function* onActiveMaster({ meta }) {
  yield put(masterActions.onFocusElement(meta.resource, 'supplier'));
  yield put(detailActions.onReset(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* onFoucusNoBatch({ meta }) {
  yield put(detailActions.onFocusElement(meta.resource, 'no_batch'));
}

function* handleSave({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const { rules, messages } = validation.master(meta.resource);
    const method = 'tambah';

    let posted = {
      id_supplier: payload.data.id_supplier,
      id_unit: payload.data.id_unit,
      supplier: payload.data.supplier,
      unit_penerima: payload.data.unit_penerima,
      id_pemesanan: payload.data.id_pemesanan,
      nomor_faktur: payload.data.nomor_faktur,
      tanggal_faktur: dateFormatClient(
        payload.data.tanggal_faktur,
        'YYYY/MM/DD'
      ),
      tanggal_jatuh_tempo: dateFormatClient(
        payload.data.tanggal_jatuh_tempo,
        'YYYY/MM/DD'
      ),
      hitung_ppn: payload.data.hitung_ppn,
    };

    let errors = validator(posted, rules, messages);

    if (_.isEmpty(errors)) {
      let response = yield call(api.save, method, posted);

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
  const afterSave = yield select(afterMaster);
  try {
    yield put(loaderActions.show());
    const { rules, messages } = validation.detail(meta.resource);
    const method = payload.data.id ? 'koreksi' : 'tambah';

    let posted = {
      id: payload.data.id,
      id_barang: payload.data.id_barang,
      nama_satuan_terkecil: payload.data.satuan_terkecil,
      nama_barang: payload.data.nama_barang,
      id_pembelian: afterSave.data.id,
      no_batch: payload.data.no_batch,
      expired_date: dateFormatDB(payload.data.expired_date),
      jumlah_beli: payload.data.jumlah_terima,
      harga_satuan: payload.data.harga_satuan,
      diskon: payload.data.diskon,
      diskon_rp: payload.data.diskon_rp,
      hitung_ppn: afterSave.data.hitung_ppn,
    };

    let errors = validator(posted, rules, messages);

    if (_.isEmpty(errors)) {
      let response = yield call(api.saveDetail, method, posted);

      if (response.status) {
        yield put(detailActions.save.requestSuccess(meta.resource, response));
      } else {
        yield toastr.warning(response.message);
        errors = response.data;
      }
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

function* handleSelesai({ meta, payload }) {
  const afterSave = yield select(afterMaster);
  const itemDetail = yield select(dataItemDetail);

  try {
    yield put(loaderActions.show());

    if (itemDetail.length === 0) {
      yield toastr.warning(i18n.t(`${meta.resource}:validator.item.required`));
    }

    if (afterSave.data && itemDetail.length > 0) {
      const { rules, messages } = validation.finish(meta.resource);

      let posted = {
        id: afterSave.data.id,
      };

      let errors = validator(posted, rules, messages);

      if (_.isEmpty(errors)) {
        let response = yield call(api.finish, posted);

        if (response.status) {
          yield put(
            masterActions.finish.requestSuccess(meta.resource, response)
          );
        } else {
          yield toastr.warning(response.message);
          errors = response.data;
        }
      }

      if (!_.isEmpty(errors)) {
        yield toastr.warning(getFirstError(errors));
        yield put(masterActions.finish.requestFailure(meta.resource, errors));
      }
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* handleBatal({ meta }) {
  yield put(masterActions.onReset(meta.resource));
  yield put(detailActions.onReset(meta.resource));
}

function* handleDelete({ meta, payload }) {
  try {
    yield put(loaderActions.show());

    const { rules, messages } = validation.hapus(meta.resource);

    let errors = validator(payload.data, rules, messages);

    if (_.isEmpty(errors)) {
      let response = yield call(api.delete, payload.data);

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

function* onSaveSuccess({ meta, payload }) {
  yield toastr.success(payload.data.message);
  yield put(detailActions.onReady(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* onSaveDetailSuccess({ meta, payload }) {
  yield toastr.success(payload.data.message);
  yield put(detailActions.onReady(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* onDeleteSuccess({ meta, payload }) {
  yield toastr.success(payload.data.message);
  yield put(masterActions.onReset(meta.resource));
  yield put(detailActions.onReset(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* focusFilterElement({ meta, payload }) {
  if (payload.data.form === 'detail_modal') {
    yield put(filterActions.onFocusElement(meta.resource, 'filter_value'));
  }
}

function* selectActiveRow({ meta }) {
  const afterSave = yield select(afterDetail);

  if (meta.resource === tableName.DETAIL_LIST && afterSave.data) {
    yield put(detailActions.onSelected(meta.resource, afterSave.data));
  }
}

export default function* watchActions() {
  yield all([
    takeLatest(filterActionTypes.ON_SUBMIT_TRANSAKSI, onSeacrhTransaksi),
    takeLatest(filterActionTypes.ON_SUBMIT_DETAIL, onSeacrhItem),
    takeLatest(filterActionTypes.CARI_TRANSAKSI_REQUEST, loadAllTransaksi),
    takeLatest(filterActionTypes.CARI_ITEM_REQUEST, loadAllItem),
    takeLatest(filterActionTypes.OPEN_DIALOG, focusFilterElement),

    takeLatest(masterActionTypes.OPEN_FORM, openForm),
    takeLatest(masterActionTypes.GET_INITIAL_FORM_REQUEST, populateForm),
    takeLatest(masterActionTypes.GET_INITIAL_FORM_SUCCESS, populateFormSuccess),
    takeLatest(masterActionTypes.READY, onReadyForm),
    takeLatest(masterActionTypes.ADD, onActiveMaster),
    takeLatest(masterActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(masterActionTypes.SAVE_SUCCESS, onSaveSuccess),
    takeLatest(masterActionTypes.DELETE_REQUEST, handleDelete),
    takeLatest(masterActionTypes.DELETE_SUCCESS, onDeleteSuccess),
    takeLatest(masterActionTypes.BATAL, handleBatal),
    takeLatest(masterActionTypes.FINISH_REQUEST, handleSelesai),
    takeLatest(masterActionTypes.SET_DATA_MASTER, onSeacrhTransaksiSuccess),

    takeLatest(actionTypes.GENERATE_REQUEST, generateNomor),
    takeLatest(datatableActionTypes.RELOADED, selectActiveRow),

    takeLatest(detailActionTypes.GET_DETAIL_REQUEST, loadAllDetail),
    takeLatest(detailActionTypes.SET_DATA_DETAIL, onFoucusNoBatch),
    takeLatest(detailActionTypes.SAVE_REQUEST, handleSaveDetail),
    takeLatest(detailActionTypes.SAVE_SUCCESS, onSaveDetailSuccess),
  ]);
}
