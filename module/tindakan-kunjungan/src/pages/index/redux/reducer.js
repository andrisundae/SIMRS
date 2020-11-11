import produce from 'immer';
import initialState from './state';
import actionTypes from './actionTypes';
import { formatter, utils } from '@simrs/common';

const makeDisplayAge = (data) => {
  if (!data) {
    return '-';
  }

  let tglSelesai = data.tgl_sekarang;
  if (data.st_pulang) {
    tglSelesai = data.tgl_pulang;
  }
  return utils.displayAge(data.tgl_lahir, tglSelesai);
} 

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case actionTypes.OPEN_FORM:
        draft.post = initialState.post;
        return;

      case actionTypes.INPUT_CHANGE_IDENTITAS:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.INPUT_CHANGE_TINDAKAN:
        draft.postItem[payload.data.name] = payload.data.value;
        if (payload.data.name === 'jumlah') {
          draft.postItem.biaya = payload.data.value * state.postItem.harga;
        }
        draft.focusElement = '';
        return;

      case actionTypes.POPULATE_FORM_SUCCESS: {
        draft.data.instalasi = payload.data.instalasi;
        draft.data.penjamin = payload.data.penjamin;
        draft.data.unitLayanan = payload.data.unit_layanan;
        return
      }

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;
      
      case actionTypes.FINISH:
      case actionTypes.READY: {
        draft.statusForm = actionTypes.READY;
        draft.post = {...initialState.post};
        draft.data = {...initialState.data};
        draft.focusElement = 'norm';
        return;
      }

      case actionTypes.ADD: {
        draft.statusForm = actionTypes.ADD;
        draft.postItem = { ...initialState.postItem };
        draft.selectedOption.id_pelaksana = null;
        return;
      }

      case actionTypes.CANCEL: {
        draft.statusForm = actionTypes.SELECTED_KUNJUNGAN;
        draft.postItem = { ...initialState.postItem };
        draft.focusElement = '';
        return;
      }

      case actionTypes.EDIT:
        draft.statusForm = actionTypes.EDIT;
        return;

      case actionTypes.POPULATE_ADD: {
        const data = payload.data;
        draft.postItem = {
          ...state.postItem,
          tanggal: data.tgl_sekarang_formatted
        };
        return;
      }

      case actionTypes.SELECTED: {
        const data = payload.data;
        draft.statusForm = actionTypes.SELECTED;
        draft.postItem = {
          ...state.postItem,
          ...data,
          tanggal: formatter.dateFormatDB(data.tanggal, 'YYYY-MM-DD HH:mm')
        };
        draft.selectedRow = data.id;
        draft.selectedOption.id_pelaksana = {
          value: data.id_pelaksana,
          label: data.nama_pelaksana,
        };
        draft.focusElement = '';
        return;
      }

      case actionTypes.SELECTED_KUNJUNGAN: {
        draft.statusForm = actionTypes.SELECTED_KUNJUNGAN;
        const data = payload.data;
        data.tgl_lahir = state.post.tgl_lahir;
        draft.post = {
          ...state.post,
          ...data,
          umur: makeDisplayAge(data)
        }
        draft.focusElement = '';
        return;
      }

      case actionTypes.GET_PASIEN_SUCCESS: {
        const data = payload.data;
        draft.post = {
          ...state.post,
          id_pasien: data.id,
          nama_pasien: data.nama,
          nama_ortu: data.nama_ortu,
          norm: data.norm,
          alamat: data.alamat,
          jenis_kelamin: data.jenis_kelamin,
          tgl_lahir: data.tgl_lahir,
        }
        return
      }

      case actionTypes.GET_KUNJUNGAN_SUCCESS: {
        draft.data.kunjungan = payload.data.map((row) => {
          return {
            ...row,
            nama_pasien: state.post.nama_pasien,
          };
        });
        return;
      }

      case actionTypes.SHOW_CARI_KUNJUNGAN:
        draft.showCariKunjungan = true;
        return;
      case actionTypes.HIDE_CARI_KUNJUNGAN:
        draft.showCariKunjungan = false;
        return;

      case actionTypes.SHOW_CARI_TINDAKAN:
        draft.showCariTindakan = true;
        return;
      case actionTypes.HIDE_CARI_TINDAKAN:
        draft.showCariTindakan = false;
        return;

      case actionTypes.SELECTED_TINDAKAN_SUGGESTION: {
        const data = payload.data;
        draft.postItem = {
          ...state.postItem,
          kode_panggil: data.kode_panggil,
          nama_kelompok: data.nama_kelompok,
          nama_layanan: data.nama_layanan,
          nama_kelas: data.nama_kelas,
          biaya: data.tarif * 1,
          harga: data.tarif,
          id_tindakan: data.id,
          id_kelas: data.id_kelas,
          id_kelompok: data.id_kelompok,
          id_layanan: data.id_layanan,
          jumlah: 1,
        };
        return;
      }

      case actionTypes.OPTIONS_BY_UNITLAYANAN_SUCCESS: {
        draft.data.pelaksana = payload.data.pelaksana;
        return;
      }

      case actionTypes.GET_KUNJUNGAN_DETAIL_SUCCESS: {
        const data = payload.data;
        draft.post = {
          ...state.post,
          keringanan: data.keringanan || 0,
          bayar: data.bayar || 0,
          pengembalian: data.pengembalian || 0,
          biaya: data.biaya || 0,
          total_biaya: data.total_biaya || 0,
        };
        return;
      }

      case actionTypes.CHANGE_PELAKSANA: {
        draft.selectedOption.id_pelaksana = payload.data;
        draft.postItem.id_pelaksana = payload.data.value;
        draft.focusElement = '';
        return;
      }

      case actionTypes.SAVE_REQUEST:
        draft.saveSuccess = false;
        // draft.focusElement = '';
        return;

      case actionTypes.SAVE_FAILURE:
        draft.errors = payload.errors;
        draft.saveSuccess = false;
        return;

      case actionTypes.SAVE_SUCCESS:
        draft.statusForm = actionTypes.SELECTED_KUNJUNGAN;
        draft.selectedRow = payload.data.data.id;
        draft.saveSuccess = true;
        draft.focusElement = '';
        return;

      case actionTypes.RESET:
      default:
        return state;
    }
  });
