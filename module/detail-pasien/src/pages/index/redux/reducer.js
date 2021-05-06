import produce from 'immer';
import dayjs from 'dayjs';
import initialState from './state';
import actionTypes from './actionTypes';
import { formatter } from '@simrs/common';
import { staticConst } from '../static';

const defaultJenisUmur = (data) => {
  return data.length > 0 ? data[0] : { label: 'Tahun', value: 'year' };
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    const now = dayjs();

    switch (type) {
      case actionTypes.OPEN_FORM:
        draft.post = initialState.post;
        return;

      case actionTypes.INPUT_CHANGE:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';

        if (payload.data.name === staticConst.UMUR) {
          draft.post.tgl_lahir = formatter.dateFormatDB(
            dayjs().subtract(payload.data.value, state.post.jenis_umur).toDate()
          );
        } else if (payload.data.name === staticConst.TGL_LAHIR) {
          const firstJenisUmur = defaultJenisUmur(state.data.jenisUmur);
          const tglLahir = dayjs(payload.data.value);
          draft.post.umur = now.diff(tglLahir, 'year');
          draft.post.jenis_umur = firstJenisUmur.value;
          draft.selectedOption.jenis_umur = firstJenisUmur;
        }
        return;

      case actionTypes.POPULATE_FORM_SUCCESS: {
        draft.data.agama = payload.data.agama;
        draft.data.pekerjaan = payload.data.pekerjaan;
        draft.data.pendidikan = payload.data.pendidikan;
        draft.data.statusNikah = payload.data.status_nikah;
        draft.data.jenisKelamin = payload.data.jenis_kelamin;
        draft.data.jenisUmur = payload.data.jenis_umur;
        draft.data.kewarganegaraan = payload.data.kewarganegaraan;
        draft.data.bahasaSehariHari = payload.data.bahasa_sehari_hari;
        return;
      }

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case actionTypes.FINISH:
      case actionTypes.READY: {
        draft.statusForm = actionTypes.READY;
        draft.post = { ...initialState.post };
        draft.selectedOption = { ...initialState.selectedOption };
        draft.focusElement = 'norm';
        return;
      }

      case actionTypes.CANCEL: {
        draft.statusForm = actionTypes.SELECTED;
        return;
      }

      case actionTypes.EDIT:
        draft.statusForm = actionTypes.EDIT;
        return;

      case actionTypes.GET_PASIEN_SUCCESS: {
        const data = payload.data;
        if (data) {
          const firstJenisUmur = defaultJenisUmur(state.data.jenisUmur);
          draft.statusForm = actionTypes.SELECTED;
          draft.focusElement = 'edit';
          draft.post = {
            ...state.post,
            id: data.id,
            nama: data.nama,
            nama_ortu: data.nama_ortu || '',
            norm: data.norm,
            alamat: data.alamat || '',
            id_jenis_kelamin: data.id_jenis_kelamin,
            tgl_lahir: data.tgl_lahir,
            nama_panggilan: data.nama_panggilan || '',
            no_ktp: data.no_ktp || '',
            nama_suami_istri: data.nama_suami_istri || '',
            rt: data.rt || '',
            rw: data.rw || '',
            nama_kecamatan: data.kecamatan ? data.kecamatan.nama : '',
            nama_kota: data.kota ? data.kota.nama : '',
            nama_provinsi: data.provinsi ? data.provinsi.nama : '',
            nama_desa: data.desa ? data.desa.nama : '',
            id_desa: data.id_desa || '',
            id_agama: data.id_agama || '',
            id_pendidikan: data.id_pendidikan || '',
            id_pekerjaan: data.id_pekerjaan || '',
            id_status_nikah: data.id_status_nikah || '',
            id_kewarganegaraan: data.id_kewarganegaraan || '',
            id_bahasa_sehari_hari: data.id_bahasa_sehari_hari || '',
            nilai_kepercayaan: data.nilai_kepercayaan || '',
            umur: formatter.displayAge(data.tgl_lahir, now, true),
            jenis_umur: firstJenisUmur.value,
          };

          draft.selectedOption.jenis_umur = firstJenisUmur;

          draft.selectedOption.id_jenis_kelamin = {
            value: data.jenis_kelamin.id,
            label: data.jenis_kelamin.nama,
          };

          if (data.agama) {
            draft.selectedOption.id_agama = {
              value: data.agama.id,
              label: data.agama.nama,
            };
          }

          if (data.pendidikan) {
            draft.selectedOption.id_pendidikan = {
              value: data.pendidikan.id,
              label: data.pendidikan.nama,
            };
          }

          if (data.pekerjaan) {
            draft.selectedOption.id_pekerjaan = {
              value: data.pekerjaan.id,
              label: data.pekerjaan.nama,
            };
          }

          if (data.status_nikah) {
            draft.selectedOption.id_status_nikah = {
              value: data.status_nikah.id,
              label: data.status_nikah.nama,
            };
          }

          if (data.kewarganegaraan) {
            draft.selectedOption.id_kewarganegaraan = {
              value: data.kewarganegaraan.id,
              label: data.kewarganegaraan.nama,
            };
          }

          if (data.bahasa_sehari_hari) {
            draft.selectedOption.id_bahasa_sehari_hari = {
              value: data.bahasa_sehari_hari.id,
              label: data.bahasa_sehari_hari.nama,
            };
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
        draft.statusForm = actionTypes.SELECTED;
        draft.saveSuccess = true;
        draft.focusElement = '';
        return;
      }

      case actionTypes.FILTER_SELECTED_WILAYAH: {
        const data = payload.data;
        draft.post = {
          ...state.post,
          nama_kecamatan: data.kecamatan,
          nama_kota: data.kota,
          nama_provinsi: data.provinsi,
          nama_desa: data.desa,
          id_desa: data.id_desa,
        };

        return;
      }

      case actionTypes.FILTER_CHANGE_WILAYAH: {
        draft.filterWilayah.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;
      }

      case actionTypes.TOGGLE_SHOW_CARI_WILAYAH:
        draft.filterWilayah.show = !state.filterWilayah.show;
        return;

      case actionTypes.RESET:
      default:
        return state;
    }
  });
