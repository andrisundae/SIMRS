import produce from 'immer';
import dayjs from 'dayjs';
import initialState from './state';
import actionTypes from './actionTypes';
import { utils } from '@simrs/common';

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
        return;

      case actionTypes.INPUT_CHANGE_IDENTITAS:
        draft.kunjungan[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.INPUT_CHANGE_KONSUL:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.POPULATE_FORM_SUCCESS: {
        draft.data.instalasi = payload.data.instalasi;
        draft.data.kelompok = payload.data.kelompok;
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
        draft.kunjungan = { ...initialState.kunjungan };
        draft.selectedOption = { ...initialState.selectedOption };
        draft.focusElement = 'norm';
        return;
      }

      case actionTypes.ADD: {
        draft.statusForm = actionTypes.ADD;
        draft.post = { ...initialState.post };
        draft.selectedOption = { ...initialState.selectedOption };
        return;
      }

      case actionTypes.CANCEL: {
        draft.statusForm = actionTypes.SELECTED_KUNJUNGAN;
        draft.post = { ...initialState.post };
        draft.focusElement = '';
        draft.selectedOption = { ...initialState.selectedOption };
        return;
      }

      case actionTypes.EDIT:
        draft.statusForm = actionTypes.EDIT;
        return;

      case actionTypes.POPULATE_ADD: {
        const data = payload.data;
        const tglMulai = dayjs(data.tgl_sekarang_formatted).toDate();
        draft.post = {
          ...state.post,
          tgl_mulai: tglMulai,
          jam_mulai: tglMulai,
        };
        return;
      }

      case actionTypes.SELECTED_KUNJUNGAN: {
        draft.statusForm = actionTypes.SELECTED_KUNJUNGAN;
        const data = payload.data;
        data.tgl_lahir = state.kunjungan.tgl_lahir;
        draft.kunjungan.umur = makeDisplayAge(data);
        draft.kunjungan.tgl_kunjungan = data.tgl_kunjungan;
        if (data.st_konsul === 1) {
          const tglMulai = dayjs(data.tgl_mulai).toDate();
          draft.post = {
            ...state.post,
            tgl_mulai: tglMulai,
            jam_mulai: tglMulai,
            id: data.id_kunjungan_unit,
            id_kelompok: data.id_kelompok,
            id_instalasi: data.id_instalasi,
            id_unit_layanan: data.id_unit_layanan,
            id_kelas: data.id_kelas,
          };
          draft.selectedOption.id_kelompok = {
            label: data.nama_kelompok,
            value: data.id_kelompok,
          };
          draft.selectedOption.id_instalasi = {
            label: data.nama_instalasi,
            value: data.id_instalasi,
          };
          draft.selectedOption.id_unit_layanan = {
            label: data.nama_unit_layanan,
            value: data.id_unit_layanan,
          };
          draft.selectedRow = data.id_kunjungan_unit;
        } else {
          draft.kunjungan = {
            ...state.kunjungan,
            ...data,
          };
        }

        draft.focusElement = '';
        return;
      }

      case actionTypes.GET_PASIEN_SUCCESS: {
        const data = payload.data;
        if (data) {
          draft.kunjungan = {
            ...state.kunjungan,
            id_pasien: data.id,
            nama_pasien: data.nama,
            nama_ortu: data.nama_ortu,
            norm: data.norm,
            alamat: data.alamat,
            jenis_kelamin: data.jenis_kelamin.nama,
            tgl_lahir: data.tgl_lahir,
          };
        }
        return;
      }

      case actionTypes.GET_KUNJUNGAN_SUCCESS: {
        draft.data.kunjungan = payload.data.map((row) => {
          return {
            ...row,
            nama_pasien: state.kunjungan.nama_pasien,
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

      case actionTypes.GET_ADMINISTRASI_KONSUL_REQUEST: {
        draft.data.administrasiKonsul = [];
        draft.selectedOption.id_tindakan = null;
        draft.administrasiKonsulLoader = true;
        return;
      }

      case actionTypes.GET_ADMINISTRASI_KONSUL_SUCCESS: {
        draft.data.administrasiKonsul = payload.data.map((row) => {
          return {
            ...row,
            value: row.id,
            label: row.nama_layanan,
          };
        });
        draft.selectedOption.id_tindakan = null;
        draft.administrasiKonsulLoader = false;
        return;
      }

      case actionTypes.GET_ADMINISTRASI_KONSUL_FAILURE: {
        draft.data.administrasiKonsul = [];
        draft.selectedOption.id_tindakan = null;
        draft.administrasiKonsulLoader = false;
        return;
      }

      case actionTypes.GET_KUNJUNGAN_DETAIL_SUCCESS: {
        const data = payload.data;
        draft.kunjungan = {
          ...state.kunjungan,
          keringanan: data.keringanan || 0,
          bayar: data.bayar || 0,
          pengembalian: data.pengembalian || 0,
          biaya: data.biaya || 0,
          total_biaya: data.total_biaya || 0,
          nama_asal_masuk: data.nama_asal_masuk,
          nama_penjamin: data.nama_penjamin,
        };
        return;
      }

      case actionTypes.GET_KUNJUNGAN_UNIT_DETAIL_SUCCESS: {
        const data = payload.data;
        const kunjunganUnitAsal = data && data.kunjungan_unit_asal;
        if (kunjunganUnitAsal) {
          draft.kunjungan = {
            ...state.kunjungan,
            nama_kelompok: kunjunganUnitAsal.kelompok
              ? kunjunganUnitAsal.kelompok.nama
              : '',
            nama_instalasi: kunjunganUnitAsal.instalasi
              ? kunjunganUnitAsal.instalasi.nama
              : '',
            nama_unit_layanan: kunjunganUnitAsal.unit_layanan
              ? kunjunganUnitAsal.unit_layanan.nama
              : '',
            nama_kelas: kunjunganUnitAsal.kelas
              ? kunjunganUnitAsal.kelas.nama
              : '',
          };
        }
        if (data.kunjungan_unit_details) {
          if (data.kunjungan_unit_details.length > 0) {
            const kunjunganUnitDetail = data.kunjungan_unit_details[0];
            if (kunjunganUnitDetail) {
              draft.post.id_tindakan = kunjunganUnitDetail.id_tindakan;
              draft.selectedOption.id_tindakan = {
                id_tindakan: kunjunganUnitDetail.id_tindakan,
                nama_layanan: kunjunganUnitDetail.nama_layanan,
                tarif: kunjunganUnitDetail.tarif,
              };
            }
          }
        }
        return;
      }

      case actionTypes.CHANGE_SELECT2: {
        draft.selectedOption[payload.name] = payload.data;
        draft.post[payload.name] = payload.data.value;
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

      case actionTypes.SAVE_SUCCESS: {
        draft.statusForm = actionTypes.SELECTED_KUNJUNGAN;
        draft.selectedRow = payload.data.data.id_kunjungan_unit;
        draft.saveSuccess = true;
        draft.focusElement = '';
        return;
      }

      case actionTypes.DELETE_SUCCESS: {
        draft.post = {
          ...initialState.post,
        };
        draft.selectedOption = {
          ...initialState.selectedOption,
        };
        draft.selectedRow = 0;
        draft.focusElement = '';
        return;
      }

      case actionTypes.RESET:
      default:
        return state;
    }
  });
