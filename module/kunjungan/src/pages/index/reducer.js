import produce from 'immer';
import {includes} from 'lodash';
import dayjs from 'dayjs';
import initialState from './state';
import actionTypes from './actionTypes';
import {staticConst} from './static';

const defaultJenisUmur = (data) => {
    return data.length > 0 ? data[0] : { label: 'Tahun', value: 'year' };
}

export default (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;
    const jenisUmur = defaultJenisUmur(state.data.options_umur);
      const now = dayjs();

    switch (type) {
        case actionTypes.CHANGE_INPUT:
            draft.post[payload.data.name] = payload.data.value;
            draft.focusElement = '';

            if (payload.data.name === staticConst.UMUR) {
                draft.post.tgl_lahir = dayjs().subtract(payload.data.value, state.post.jenis_umur).toDate();
            } else if (payload.data.name === staticConst.TGL_LAHIR) {
                const tglLahir = dayjs(payload.data.value);
                draft.post.umur = now.diff(tglLahir, 'year');
                draft.post.jenis_umur = jenisUmur.value;
                draft.selectedOption.jenis_umur = jenisUmur;
            }
            return

        case actionTypes.SAVE_SUCCESS:
            draft.post = initialState.post;
            return

        case actionTypes.ON_FOCUS_ELEMENT:
            draft.focusElement = payload.element;
            return

        case actionTypes.TOGGLE_SHOW_CARI_PASIEN:
            draft.showCariPasien = !state.showCariPasien;
            return
        
        case actionTypes.TOGGLE_SHOW_CARI_WILAYAH:
            draft.showCariWilayah = !state.showCariWilayah;
            return
        
        case actionTypes.TOGGLE_SHOW_CARI_KUNJUNGAN:
            draft.showCariKunjungan = !state.showCariKunjungan;
            return

        case actionTypes.POPULATE_FORM_SUCCESS:
            draft.data.options_jenis_kelamin = payload.data.jenis_kelamin;
            draft.data.options_kelas = payload.data.kelas;
            draft.data.options_penjamin = payload.data.penjamin;
            draft.data.options_asal_masuk = payload.data.asal_masuk;
            draft.data.options_kelompok = payload.data.kelompok;
            draft.data.options_asal_masuk_detail = payload.data.asal_masuk_detail;
            draft.data.options_instalasi = payload.data.instalasi;
            draft.data.options_unit_layanan = payload.data.unit_layanan;
            draft.data.options_umur = payload.data.jenis_umur;
            draft.data.options_status_kepersetaan = payload.data.status_kepersetaan;
            draft.data.options_status_pasien_default = payload.data.status_pasien;
            draft.data.options_status_pasien = payload.data.status_pasien;
            return
        
        case actionTypes.CHANGE_SELECT2:
            draft.post[payload.name] = payload.data.value;
            draft.selectedOption[payload.name] = payload.data;
            if (payload.name === 'id_penjamin_pasien' && payload.data) {
                draft.post.id_penjamin = '';
                draft.selectedOption.id_penjamin = null;
                draft.post.penjamin_pasien = '';
                draft.data.options_status_pasien = [
                    payload.data,
                    ...draft.data.options_status_pasien_default,
                ];
            } else if (payload.name === 'id_penjamin' && payload.data) {
                if (payload.data.label.toUpperCase() === staticConst.UMUM) {
                    draft.post.penjamin_pasien = staticConst.BAYAR_SENDIRI;
                } else {
                    draft.post.penjamin_pasien = payload.data.label.toUpperCase();
                }
            } else if (payload.name === 'id_asal_masuk' && payload.data && draft.selectedOption.id_asal_masuk_detail) {
                draft.post.id_asal_masuk_detail = '';
                draft.selectedOption.id_asal_masuk_detail = null;
            } else if (payload.name === 'id_kelompok' || payload.name === 'id_instalasi' || payload.name === 'id_unit_layanan') {
                if (payload.name === 'id_kelompok') {
                    draft.post.id_instalasi = '';
                    draft.selectedOption.id_instalasi = null;
                }

                if (payload.name !== 'id_unit_layanan') {
                    draft.post.id_unit_layanan = '';
                    draft.selectedOption.id_unit_layanan = null;
                }

                draft.post.id_kelas_kamar = '';
                draft.selectedOption.id_kelas_kamar = null;

                draft.post.id_dpjp = '';
                draft.selectedOption.id_dpjp = null;

                draft.data.options_kelas_kamar = [];
                draft.data.options_dpjp = [];

                Object.keys(draft.data.jenis_klasifikasi_registrasi).forEach(key => {
                    draft.selectedOption[key] = null;
                })

                draft.data.jenis_klasifikasi_registrasi = {};
                draft.post.id_tindakan = [];
            }

            if (payload.isTindakan) {
                const selectedTindakan = draft.post.id_tindakan;
                const selectedData = { name: payload.name, value: payload.data.value };
                const findIndex = selectedTindakan.findIndex(row => row.name === payload.name);
                if (findIndex >= 0) {
                    selectedTindakan[findIndex] = selectedData;
                } else {
                    selectedTindakan.push(selectedData)
                }
                draft.post.id_tindakan = selectedTindakan;
            }
            return
        
        case actionTypes.ASAL_MASUK_DETAIL_REQUEST:
            draft.loaderAsalMasukDetail = true;
            return
        case actionTypes.ASAL_MASUK_DETAIL_SUCCESS:
            draft.data.options_asal_masuk_detail = payload.data;
            draft.loaderAsalMasukDetail = false;
            return
        case actionTypes.ASAL_MASUK_DETAIL_FAILURE:
            draft.loaderAsalMasukDetail = false;
            return

        case actionTypes.INSTALASI_REQUEST:
            draft.loaderInstalasi = true;
            return
        case actionTypes.INSTALASI_SUCCESS:
            draft.data.options_instalasi = payload.data;
            draft.loaderInstalasi = false;
            return
        case actionTypes.INSTALASI_FAILURE:
            draft.loaderInstalasi = false;
            return

        case actionTypes.UNIT_LAYANAN_REQUEST:
            draft.loaderUnitLayanan = true;
            return
        case actionTypes.UNIT_LAYANAN_SUCCESS:
            draft.data.options_unit_layanan = payload.data;
            draft.loaderUnitLayanan = false;
            return
        case actionTypes.UNIT_LAYANAN_FAILURE:
            draft.loaderUnitLayanan = false;
            return
        
        case actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST:
            draft.loaderOptionsByUnitLayanan = true;
            return
        case actionTypes.OPTIONS_BY_UNITLAYANAN_SUCCESS:
            draft.data.options_kelas_kamar = payload.data.kelas_kamar;
            draft.data.options_dpjp = payload.data.dpjp;
            draft.data.jenis_klasifikasi_registrasi = payload.data.jenis_klasifikasi_registrasi;
            draft.loaderOptionsByUnitLayanan = false;

            Object.keys(payload.data.jenis_klasifikasi_registrasi).forEach(key => {
                draft.selectedOption[key] = null;
            })

            return
        case actionTypes.OPTIONS_BY_UNITLAYANAN_FAILURE:
            draft.loaderOptionsByUnitLayanan = false;
            return

        case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_REQUEST:
            draft.loaderJenisKlasifikasiRegistrasi = true;
            return
        case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_SUCCESS:
            draft.data.jenisKlasifikasiRegistrasi = payload.data;
            draft.loaderJenisKlasifikasiRegistrasi = false;
            return
        case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_FAILURE:
            draft.loaderJenisKlasifikasiRegistrasi = false;
            return

        case actionTypes.FILTER_CHANGE_PASIEN:
            draft.filterPasien.post[payload.data.name] = payload.data.value;
            return
        case actionTypes.FILTER_CHANGE_WILAYAH:
            draft.filterWilayah.post[payload.data.name] = payload.data.value;
            return
        case actionTypes.CANCEL:
        case actionTypes.FINISH:
        case actionTypes.READY:
            draft.statusForm = actionTypes.READY;
            draft.filterPasien.selected = {};
            draft.post = { ...initialState.post};
            return
        case actionTypes.ADD:
            const toDateNow = now.toDate();
            draft.statusForm = actionTypes.ADD;
            draft.post.tgl_lahir = toDateNow;
            draft.post.tgl_kunjungan = toDateNow;
            draft.post.tgl_jaminan = toDateNow;
            draft.post.tgl_cetak_jaminan = toDateNow;
            draft.post.jam_kunjungan = toDateNow;
            draft.post.norm = '66000004';

            draft.post.jenis_umur = jenisUmur.value;
            draft.selectedOption.jenis_umur = jenisUmur;
            return

        case actionTypes.FILTER_SELECTED_PASIEN:
            draft.statusForm = actionTypes.SELECTED;
            draft.filterPasien.selected = payload.data;
            draft.post = {
                ...state.post,
                ...payload.data
            };
            return
        
        case actionTypes.FILTER_SELECTED_WILAYAH:
            draft.post = {
                ...state.post,
                ...payload.data
            };

            return

        case actionTypes.ADD_WITH_SELECTED:
            draft.statusForm = actionTypes.ADD_WITH_SELECTED;
            return
        case actionTypes.CANCEL_WITH_SELECTED:
            draft.statusForm = actionTypes.SELECTED;
            return
        default:
            return state;
    }
})

export const statusesElements = {
  [actionTypes.READY]: ['norm', 'search', 'add', 'exit'],
  [actionTypes.SELECTED]: ['add', 'edit', 'delete', 'preview', 'finish'],
  [actionTypes.ADD]: ['detail_pasien', 'penjamin_pasien', 'kunjungan_pasien', 'cancel', 'save'],
  [actionTypes.ADD_WITH_SELECTED]: ['penjamin_pasien', 'kunjungan_pasien', 'cancel', 'save'],
  [actionTypes.EDIT]: ['penjamin_pasien', 'kunjungan_pasien', 'cancel', 'save'],
}

export const isDisable = (element, status) => {
  if (statusesElements[status]) {
    if (includes(statusesElements[status], element)) {
      return false;
    }
    return true;
  }

  return true;
}


