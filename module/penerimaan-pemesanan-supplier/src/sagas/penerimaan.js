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

import {
  masterActions,
  masterActionTypes,
  detailActions,
  detailActionTypes,
  filterActions,
  filterActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

import api, {
  validationMaster,
  validationDetail,
  validateFinish,
  validateHapus,
} from '../services/models/model';

import {
  cariPemsanan,
  afterMaster,
  postDetail,
  postMaster,
  selectedData,
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
  yield put(datatableActions.onInitialize(tableName.CARI_PEMESANAN));
  yield put(datatableActions.onInitialize(tableName.CARI_TRANSAKSI));
  yield put(datatableActions.onInitialize(tableName.BARANG_LIST));
  yield put(datatableActions.onInitialize(tableName.DETAIL_PEMESANAN));
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

function* loadItemPemesanan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const afterSave = yield select(afterMaster);

  try {
    if (afterSave.data && payload.data.filter_value) {
      let postDetail = {
        ...payload.data,
        nama_barang: payload.data.filter_value,
        id_pembelian: afterSave.data.id,
      };

      let response = yield call(api.getListBarang, postDetail);

      if (response.status) {
        yield put(filterActions.loadItemSuccess(meta.resource, response.data));
        successCallback(response.data, response.data.length);
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

function* loadPemesanan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const post = yield select(cariPemsanan);

  try {
    let response = yield call(api.getListPemesanan, {
      ...payload.data,
      ...post,
    });

    if (response.info.type === 'success') {
      yield put(
        localAction.findPemesanan.requestSuccess(meta.resource, response.data)
      );
      successCallback(response.data, response.data.length);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }

  yield put(datatableActions.onReloaded(tableName.CARI_PEMESANAN));
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

function* loadInfoBarang({ meta, payload, type }) {
  const afterSave = yield select(afterMaster);

  try {
    if (afterSave.data) {
      let postData = {
        id_barang:
          detailActionTypes.SET_DATA_DETAIL === type
            ? payload.data.id
            : payload.data.id_barang,
        id_pemesanan: afterSave.data.id_pemesanan,
        id_pembelian: afterSave.data.id,
      };

      let response = yield call(api.getInfotBarang, postData);

      if (response.status) {
        yield put(localAction.setInfoBarang(meta.resource, response.data));
      }
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* searchPemesanan() {
  try {
    yield put(
      datatableActions.onReload(
        tableName.CARI_PEMESANAN,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
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

function* selectItemPemesanan() {
  try {
    yield put(
      datatableActions.onReload(
        tableName.DETAIL_PEMESANAN,
        constDatatable.reloadType.purge
      )
    );
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* setItemPemesanan({ meta, payload }) {
  const { successCallback, failCallback } = meta.tableParams;
  const selected = yield select(selectedData);

  let data = {
    items: [],
    itemCount: 0,
  };

  if (_.isArray(selected.cari_pemesanan.item)) {
    data = {
      items: selected.cari_pemesanan.item,
      ltemCount: selected.cari_pemesanan.item.length,
    };
  }

  successCallback(data.items, data.itemCount);

  yield put(datatableActions.onReloaded(tableName.DETAIL_PEMESANAN));
}

function* onReadyForm({ meta }) {
  yield put(masterActions.onFocusElement(meta.resource, 'addMaster'));
}

function* onActiveMaster({ meta }) {
  yield put(masterActions.onFocusElement(meta.resource, 'cari_transaksi'));
  yield put(detailActions.onReset(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* onFocusFactur({ meta, payload }) {
  yield put(masterActions.onFocusElement(meta.resource, 'nomor_faktur'));
}

function* onFoucusNoBatch({ meta }) {
  yield put(detailActions.onFocusElement(meta.resource, 'no_batch'));
}

function* handleSave({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const { rules, messages } = validationMaster(meta.resource);
    const method = 'tambah';

    let posted = {
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
    const { rules, messages } = validationDetail(meta.resource);
    const method = payload.data.id ? 'koreksi' : 'tambah';

    let posted = {
      id: payload.data.id,
      id_barang: payload.data.id_barang,
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

  try {
    yield put(loaderActions.show());

    if (afterSave.data) {
      const { rules, messages } = validateFinish(meta.resource);

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

    const { rules, messages } = validateHapus(meta.resource);

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

function* onDeleteSuccess({ meta }) {
  yield put(masterActions.onReset(meta.resource));
  yield put(detailActions.onReset(meta.resource));
  yield put(
    datatableActions.onReload(
      tableName.DETAIL_LIST,
      constDatatable.reloadType.purge
    )
  );
}

function* countItem({ meta }) {
  const post = yield select(postDetail);
  const postMas = yield select(postMaster);

  yield put(
    localAction.countAll(meta.resource, { post, hitungPPN: postMas.hitung_ppn })
  );
}

function* resetFilterenData({ meta }) {
  yield put(
    localAction.resetFilteredData(meta.resource, { form: 'cari_pemesanan' })
  );
}

export default function* watchActions() {
  yield all([
    takeLatest(filterActionTypes.ON_SUBMIT_TRANSAKSI, onSeacrhTransaksi),
    takeLatest(filterActionTypes.ON_SUBMIT_DETAIL, onSeacrhItem),
    takeLatest(filterActionTypes.CARI_TRANSAKSI_REQUEST, loadAllTransaksi),
    takeLatest(filterActionTypes.CARI_ITEM_REQUEST, loadItemPemesanan),
    takeLatest(filterActionTypes.CLOSE_DIALOG, resetFilterenData),

    takeLatest(masterActionTypes.OPEN_FORM, openForm),
    takeLatest(masterActionTypes.GET_INITIAL_FORM_REQUEST, populateForm),
    takeLatest(masterActionTypes.GET_INITIAL_FORM_SUCCESS, populateFormSuccess),
    takeLatest(masterActionTypes.READY, onReadyForm),
    takeLatest(masterActionTypes.ADD, onActiveMaster),
    takeLatest(masterActionTypes.SAVE_REQUEST, handleSave),
    takeLatest(masterActionTypes.DELETE_REQUEST, handleDelete),
    takeLatest(masterActionTypes.DELETE_SUCCESS, onDeleteSuccess),
    takeLatest(masterActionTypes.SAVE_SUCCESS, onSaveSuccess),
    takeLatest(masterActionTypes.BATAL, handleBatal),
    takeLatest(masterActionTypes.FINISH_REQUEST, handleSelesai),
    takeLatest(masterActionTypes.SET_DATA_MASTER, onSeacrhTransaksiSuccess),

    takeLatest(actionTypes.PEMESANAN_REQUEST, loadPemesanan),
    takeLatest(actionTypes.ON_SUBMIT_CARI_PEMESANAN, searchPemesanan),
    takeLatest(actionTypes.GENERATE_REQUEST, generateNomor),
    takeLatest(actionTypes.SELECTED_DATA, selectItemPemesanan),
    takeLatest(actionTypes.SET_PEMESANAN, onFocusFactur),
    takeLatest(actionTypes.SET_ITEM_PEMESANAN, setItemPemesanan),

    takeLatest(detailActionTypes.GET_DETAIL_REQUEST, loadAllDetail),
    takeLatest(detailActionTypes.EDIT, onFoucusNoBatch),
    takeLatest(detailActionTypes.CHANGE_INPUT, countItem),
    takeLatest(detailActionTypes.SAVE_REQUEST, handleSaveDetail),
    takeLatest(detailActionTypes.SAVE_SUCCESS, onSaveDetailSuccess),
    takeLatest(detailActionTypes.SELECTED, loadInfoBarang),
    takeLatest(detailActionTypes.SET_DATA_DETAIL, loadInfoBarang),
  ]);
}
