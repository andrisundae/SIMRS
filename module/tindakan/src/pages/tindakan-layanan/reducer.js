import produce from 'immer';

import { combineReducers } from 'redux';
import _ from 'lodash';
import { filterState, moduleState } from './state';
import {
  moduleReducer as module,
  filterReducer as filter,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/nested';
import actionTypes from './actionTypes';

export const moduleReducer = (state = moduleState, action) => {
  let { type, payload } = action;

  switch (type) {
    case moduleActionTypes.OPEN_FORM:
      return produce(state, (draft) => {
        const { layanan, selectedVersiTarif } = payload.data;
        const { value, label, tgl_aktif_tarif } = selectedVersiTarif;

        draft.reference = {
          layanan,
          versi_tarif: value,
        };
        draft.data.selectedVersiTarif = {
          id: value,
          nama: label,
          tgl_aktif_tarif: new Date(tgl_aktif_tarif),
        };
        draft.statusForm = moduleActionTypes.READY;
      });

    case actionTypes.GET_OPTIONS_KELAS_SUCCESS:
      return produce(state, (draft) => {
        draft.data.options_kelas = payload.data;
      });

    case actionTypes.CHANGE_KELAS: {
      return produce(state, (draft) => {
        draft.post.kelas = payload.data.value;
        draft.post.nama_kelas = payload.data.label;
        draft.focusElement = '';
      });
    }

    case actionTypes.CHANGE_TANGGALAKTIF: {
      return produce(state, (draft) => {
        draft.post.tgl_aktif_tarif = payload.data;
        draft.focusElement = '';
      });
    }

    case actionTypes.CHANGE_JAMAKTIF: {
      return produce(state, (draft) => {
        draft.post.jam_aktif_tarif = payload.data;
        draft.focusElement = '';
      });
    }

    case moduleActionTypes.SELECTED: {
      let tgl_aktif_tarif = new Date(payload.data.tgl_aktif_tarif);
      return produce(state, (draft) => {
        draft.post = {
          ...payload.data,
          tarif: _.replace(payload.data.tarif.toString(), '.', ','),
          tgl_aktif_tarif,
          jam_aktif_tarif: tgl_aktif_tarif,
        };
        draft.statusForm = moduleActionTypes.SELECTED;
        draft.selectedRow = payload.data.id;
      });
    }

    case moduleActionTypes.ADD: {
      return produce(state, (draft) => {
        draft.statusForm = moduleActionTypes.ADD;
        draft.post = {
          ...moduleState.post,
          tgl_aktif_tarif: state.data.selectedVersiTarif.tgl_aktif_tarif,
          jam_aktif_tarif: state.data.selectedVersiTarif.tgl_aktif_tarif,
        };
        draft.selectedRow = 0;
        draft.isSubmitted = false;
        draft.submitting = false;
      });
    }

    case actionTypes.GET_KODEPANGGIL_SUCCESS:
      return produce(state, (draft) => {
        draft.post.kode_panggil = payload.data.kode_panggil;
      });

    case actionTypes.IMPORT_KELAS: {
      return produce(state, (draft) => {
        draft.importKelas.show = true;
      });
    }

    case actionTypes.CANCEL_IMPORT_KELAS: {
      return produce(state, (draft) => {
        draft.importKelas.show = false;
        draft.statusForm = moduleActionTypes.CANCEL;
        draft.post = moduleState.post;
        draft.selectedRow = 0;
      });
    }

    case actionTypes.SELECTION_CHANGED_KELAS: {
      return produce(state, (draft) => {
        draft.importKelas.selectedRows = payload.data;
      });
    }

    case actionTypes.SHOW_BUTTON_IMPORT_KELAS: {
      return produce(state, (draft) => {
        draft.importKelas.showButton = payload.data.show;
      });
    }

    case actionTypes.STATUS_NOT_BALANCE: {
      return produce(state, (draft) => {
        draft.statusForm = actionTypes.STATUS_NOT_BALANCE;
        draft.focusElement = '';
      });
    }

    case moduleActionTypes.SAVE_SUCCESS:
      return produce(state, (draft) => {
        // draft.statusForm = moduleActionTypes.READY;
        draft.selectedRow = payload.data.data.id;
      });

    case moduleActionTypes.READY:
      return produce(state, (draft) => {
        draft.selectedRow = null;
      });

    default:
      return module(state, action, moduleState);
  }
};

export const filterReducer = (state = filterState, action) => {
  return filter(state, action);
};

export default combineReducers({
  module: moduleReducer,
  filter: filterReducer,
});
