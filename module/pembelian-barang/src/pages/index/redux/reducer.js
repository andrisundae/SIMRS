import produce from 'immer';
import dayjs from 'dayjs';

import { masterState, detailState, filterState } from './state';
import {
  dateFormatDB,
  dateFormatClient,
} from '@simrs/common/src/utils/formatter';
import {
  masterReducer as defautlMasterReducer,
  detailReducer as defaultDetailReducer,
  filterReducer as defaultFilterReducer,
} from '@simrs/main/src/modules/transaksi/farmasi';
import actionTypes from './actionTypes';

import {
  masterActionTypes,
  detailActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

const masterReducer = (state = masterState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionTypes.INIT_FORM:
      return produce(state, (draft) => {
        draft.data.initial.tanggal_transaksi = dateFormatClient(
          payload.data.tanggal,
          'DD/MM/YYYY HH:mm:ss'
        );
        draft.data.initial.options_hitung_ppn = payload.data.options_hitung_ppn;
        draft.data.initial.options_supplier = payload.data.options_supplier;
        draft.data.initial.options_unit = payload.data.options_unit;
      });
    case actionTypes.GENERATE_SUCCESS:
      return produce(state, (draft) => {
        draft.data.initial.nomor_transaksi = payload.data;
      });
    case actionTypes.CHANGE_SELECT:
      return produce(state, (draft) => {
        if (payload.data.field === 'hitung_ppn') {
          draft.post.hitung_ppn = payload.data.value;
          draft.post.hitung_ppn_label = payload.data.label;
        }

        if (payload.data.field === 'supplier') {
          draft.post.id_supplier = payload.data.value;
          draft.post.supplier = payload.data.label;
        }

        if (payload.data.field === 'unit_penerima') {
          draft.post.id_unit = payload.data.value;
          draft.post.unit_penerima = payload.data.label;
        }
      });
    case masterActionTypes.SET_DATA_MASTER:
      return produce(state, (draft) => {
        draft.post.id = payload.data.id;
        draft.post.no_transaksi = payload.data.nomor_transaksi;
        draft.post.tanggal_transaksi = dateFormatClient(payload.data.tanggal);
        draft.post.id_supplier = payload.data.id_supplier;
        draft.post.id_unit = payload.data.id_unit;
        draft.post.supplier = payload.data.nama_supplier;
        draft.post.unit_penerima = payload.data.nama_unit;
        draft.post.nomor_faktur = payload.data.nomor_faktur;
        draft.post.tanggal_faktur = dayjs(payload.data.tanggal_faktur).toDate();
        draft.post.tanggal_jatuh_tempo = dayjs(
          payload.data.tanggal_jatuh_tempo
        ).toDate();
        draft.post.hitung_ppn = payload.data.hitung_ppn;
        draft.post.hitung_ppn_label =
          payload.data.hitung_ppn === 1 ? 'Ya' : 'Tidak';
        draft.dataAfterSave = { data: payload.data };

        draft.statusForm = masterActionTypes.MANAGE;
        draft.focusElement = '';
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
    case detailActionTypes.SELECTED:
      let selectedData = {
        ...payload.data,
        expired_date: payload.data.expired_date
          ? dayjs(payload.data.expired_date).toDate()
          : '',
        satuan_terkecil: payload.data.nama_satuan_terkecil,
      };
      return produce(state, (draft) => {
        draft.post = selectedData;
        draft.statusForm = detailActionTypes.SELECTED;
      });
    case actionTypes.COUNT_ALL:
      let { post, hitungPPN } = payload.data;
      return produce(state, (draft) => {
        let total = post.harga_satuan * post.jumlah_terima;
        let rpDiskon = post.diskon_rp > 0 ? post.diskon_rp : 0;
        let rpPPN = hitungPPN === 1 ? ((total - rpDiskon) * post.ppn) / 100 : 0;
        let sumHarga = total - rpDiskon + rpPPN;

        draft.post.total_harga = sumHarga;
        draft.post.ppn_rp = rpPPN;
      });
    case actionTypes.COUNT_DISKON:
      return produce(state, (draft) => {
        let diskon = 0;
        let total = draft.post.harga_satuan * draft.post.jumlah_terima;
        if (payload.data.name === 'diskon_rp') {
          diskon = (total * payload.data.diskon) / 100;
        } else {
          diskon = (payload.data.diskon / total) * 100;
        }

        draft.post[payload.data.name] = diskon;
      });
    default:
      return defaultDetailReducer(state, action, detailState);
  }
};

const filterReducer = (state = filterState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionTypes.INIT_FORM:
      return produce(state, (draft) => {
        draft.data.initial.option_filter_transaksi =
          payload.data.option_filter_transaksi;
      });
    case actionTypes.FILTER_CHANGE_TANGGAL:
      return produce(state, (draft) => {
        draft[payload.data.form][payload.data.field] = payload.data.tgl;

        if (payload.data.field === 'tgl_awal') {
          draft[payload.data.form].tglAwal = dateFormatDB(payload.data.tgl);
        }

        if (payload.data.field === 'tgl_akhir') {
          draft[payload.data.form].tglAkhir = dateFormatDB(payload.data.tgl);
        }
      });
    case actionTypes.SELECTED_DATA:
      return produce(state, (draft) => {
        draft.data.selectedData[payload.data.form] = payload.data.value;
      });
    case actionTypes.CHANGE_SELECT_FILTER:
      return produce(state, (draft) => {
        draft[payload.data.form].filter = payload.data.label;
        draft[payload.data.form].filter_idx = payload.data.value;
      });
    case actionTypes.PEMESANAN_SUCCESS:
      return produce(state, (draft) => {
        draft.cari_pemesanan.filtered_data = payload.data.length;
      });
    case actionTypes.RESET_FILTERED_DATA:
      return produce(state, (draft) => {
        draft[payload.data.form].filtered_data = 0;
      });
    default:
      return defaultFilterReducer(state, action, filterState);
  }
};

export { masterReducer as default, detailReducer, filterReducer };
