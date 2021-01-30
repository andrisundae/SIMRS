import produce from 'immer';
import _ from 'lodash';
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
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case actionTypes.OPEN_FORM:
        draft.post = initialState.post;
        draft.postItem = initialState.postItem;
        draft.selectedOption = initialState.selectedOption;
        draft.selectedRow = initialState.selectedRow;
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
        return;
      }

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case actionTypes.FINISH:
      case actionTypes.READY: {
        draft.statusForm = actionTypes.READY;
        draft.post = { ...initialState.post };
        draft.data = { ...initialState.data };
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
        draft.selectedOption.id_pelaksana = null;
        return;
      }

      case actionTypes.EDIT:
        draft.statusForm = actionTypes.EDIT;
        return;

      case actionTypes.POPULATE_ADD: {
        const data = payload.data;
        draft.postItem = {
          ...state.postItem,
          tanggal: data.tgl_sekarang_formatted,
        };
        return;
      }

      case actionTypes.SELECTED: {
        const data = payload.data;
        draft.statusForm = actionTypes.SELECTED;
        draft.postItem = {
          ...state.postItem,
          ...data,
          tanggal: formatter.dateFormatDB(data.tanggal, 'YYYY-MM-DD HH:mm'),
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
          umur: makeDisplayAge(data),
        };
        draft.focusElement = '';
        return;
      }

      case actionTypes.GET_PASIEN_REQUEST: {
        draft.isRequestingPasien = true;
        return;
      }

      case actionTypes.GET_PASIEN_FAILURE: {
        draft.isRequestingPasien = false;
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
        };
        draft.isRequestingPasien = false;
        return;
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

      case actionTypes.GET_PELAKSANA_KOMPONEN_SUCCESS: {
        draft.data.pelaksanaKomponen = payload.data.map((row) => {
          const newRow = { ...row };
          if (!row.id && row.id_penanggung_jawab) {
            newRow.id_pelaksana = row.id_penanggung_jawab;
            newRow.nama_pelaksana = row.nama_penanggung_jawab;
            newRow.id_spesialisasi = row.id_spesialisasi_penanggung_jawab;
            newRow.nama_spesialisasi = row.nama_spesialisasi_penanggung_jawab;
          }
          return newRow;
        });
        return;
      }

      case actionTypes.GET_KUNJUNGAN_UNIT_SUCCESS: {
        draft.post = {
          ...state.post,
          id_dp: payload.data.id_dpjp,
          nama_dpjp: payload.data.nama_dpjp,
        };
        return;
      }

      case actionTypes.GET_PELAKSANA_KOMPONEN_FAILURE: {
        draft.data.pelaksanaKomponen = [];
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

      case actionTypes.SHOW_PELAKSANA_TAMBAHAN:
        draft.showPelaksanaTambahan = true;
        return;
      case actionTypes.HIDE_PELAKSANA_TAMBAHAN:
        draft.showPelaksanaTambahan = false;
        return;

      case actionTypes.SHOW_PELAKSANA_KOMPONEN:
        draft.showPelaksanaKomponen = true;
        return;
      case actionTypes.HIDE_PELAKSANA_KOMPONEN:
        draft.showPelaksanaKomponen = false;
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
        draft.selectedOption.id_pelaksana = null;
        return;
      }

      case actionTypes.GET_PELAKSANA_SUCCESS: {
        draft.data.pelaksana = payload.data;
        draft.selectedOption.id_pelaksana = null;
        return;
      }

      case actionTypes.GET_PELAKSANA_FAILURE: {
        draft.data.pelaksana = [];
        draft.selectedOption.id_pelaksana = null;
        return;
      }

      case actionTypes.GET_PELAKSANA_OPTIONS_SUCCESS: {
        const pelaksanaKomponen = state.data.pelaksanaKomponen;
        const findIndex = _.findIndex(
          pelaksanaKomponen,
          (row) => row.id_komponen_tarif === payload.data.idKomponen
        );
        if (pelaksanaKomponen[findIndex]) {
          pelaksanaKomponen[findIndex].pelaksanaOptions = payload.data.data;
        }
        draft.data.pelaksanaKomponen = pelaksanaKomponen;
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

      case actionTypes.TOGGLE_STATUS_FROM_ANTRIAN: {
        draft.isFromAntrian = !state.isFromAntrian;
        return;
      }

      case actionTypes.RESET:
      default:
        return state;
    }
  });
