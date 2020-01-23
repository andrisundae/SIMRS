import produce from 'immer';
import {includes} from 'lodash';
import initialState from './state';
import actionTypes from './actionTypes';

export default (state = initialState, action) =>
  produce(state, draft => {
    let { type, payload } = action;

    switch (type) {
        case actionTypes.CHANGE_INPUT:
            draft.post[payload.data.name] = payload.data.value;
            draft.focusElement = '';
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
            return
        
        case actionTypes.CHANGE_SELECT2:
            draft.post[payload.name] = payload.data.value;
            draft.selectedOption[payload.name] = payload.data;
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
        
        case actionTypes.KELAS_KAMAR_REQUEST:
            draft.loaderKelasKamar = true;
            return
        case actionTypes.KELAS_KAMAR_SUCCESS:
            draft.data.options_kelas_kamar = payload.data;
            draft.loaderKelasKamar = false;
            return
        case actionTypes.KELAS_KAMAR_FAILURE:
            draft.loaderKelasKamar = false;
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
            draft.statusForm = actionTypes.ADD;
            return

        case actionTypes.FILTER_SELECTED_PASIEN:
            draft.statusForm = actionTypes.SELECTED;
            draft.filterPasien.selected = payload.data;
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


