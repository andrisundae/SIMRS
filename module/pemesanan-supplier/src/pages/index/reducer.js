import produce from 'immer';

import { masterState, detailState, filterState } from './state';
import { dateFormatClient } from '@simrs/common/src/utils/formatter';
import {
  masterReducer as defautlMasterReducer,
  detailReducer as defaultDetailReducer,
  filterReducer as defaultFilterReducer,
} from '@simrs/main/src/modules/transaksi/farmasi';

import {
  masterActionTypes,
  detailActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';
import actionTypes from './actionTypes';
import { dateFormatDB } from '@simrs/common/src/utils';

const masterReducer = (state = masterState, action) => {
  let { type, payload } = action;

  switch (type) {
    case masterActionTypes.GET_INITIAL_FORM_SUCCESS:
      return produce(state, (draft) => {
        draft.data.initial.nomor_transaksi = payload.data.nomor;
        draft.data.initial.tanggal_transaksi = dateFormatClient(
          payload.data.tanggal,
          'DD/MM/YYYY HH:mm:ss'
        );
        draft.data.initial.option_supplier = payload.data.supplier;
        draft.data.initial.option_unit = payload.data.unit_pemesan;
      });

    case actionTypes.CHANGE_SELECT:
      return produce(state, (draft) => {
        draft.post[payload.data.idx] = payload.data.selected.value;
        draft.post[payload.data.val] = payload.data.selected.label;
      });

    case masterActionTypes.SET_DATA_MASTER:
      return produce(state, (draft) => {
        draft.post.id = payload.data.id;
        draft.post.id_supplier = payload.data.id_supplier;
        draft.post.id_unit = payload.data.id_unit;
        draft.post.nama_supplier = payload.data.nama_supplier;
        draft.post.nama_unit = payload.data.nama_unit;
        draft.post.no_transaksi = payload.data.no_transaksi;
        draft.post.tanggal_transaksi = payload.data.tanggal_transaksi;
        draft.statusForm = masterActionTypes.MANAGE;
      });

    default:
      return defautlMasterReducer(state, action, masterState);
  }
};

const detailReducer = (state = detailState, action) => {
  let { type, payload } = action;

  switch (type) {
    case detailActionTypes.SET_DATA_DETAIL:
      return produce(state, (draft) => {
        draft.post.kode_barang = payload.data.kode_barang;
        draft.post.nama_barang = payload.data.nama_barang;
        draft.post.id_barang = payload.data.id;
        draft.post.harga_satuan = payload.data.harga_satuan;
        draft.post.satuan_terkecil = payload.data.satuan_terkecil;
        draft.statusForm = detailActionTypes.EDIT;
      });
    case actionTypes.SET_STOK:
      return produce(state, (draft) => {
        draft.post.stok = payload.data.stok;
      });
    default:
      return defaultDetailReducer(state, action, detailState);
  }
};

const filterReducer = (state = filterState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionTypes.FILTER_CHANGE_SELECT:
      return produce(state, (draft) => {
        draft.cari_master.filter = payload.data.selected.label;
        draft.cari_master.filter_idx = payload.data.selected.value;
      });
    case actionTypes.SET_DEFAULT_FILTER:
      return produce(state, (draft) => {
        draft.data.initial.option_filter = payload.data.filter;
      });
    case actionTypes.SET_FILTER_DETAIL:
      return produce(state, (draft) => {
        draft.cari_detail.id_unit = payload.data.id_unit;
        draft.cari_detail.id_supplier = payload.data.id_supplier;
      });
    case actionTypes.FILTER_CHANGE_TANGGAL:
      return produce(state, (draft) => {
        draft.cari_master[payload.data.field] = payload.data.tgl;

        if (payload.data.field === 'tgl_awal') {
          draft.cari_master.tglAwal = dateFormatDB(payload.data.tgl);
        }

        if (payload.data.field === 'tgl_akhir') {
          draft.cari_master.tglAkhir = dateFormatDB(payload.data.tgl);
        }
      });
    default:
      return defaultFilterReducer(state, action, filterState);
  }
};

export { detailReducer, masterReducer, filterReducer };
