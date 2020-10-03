import produce from 'immer';

import actionTypes from './actionTypes';
import { moduleState, filterState } from './state';
import {
  moduleReducer as module,
  filterReducer as filter,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/default';

const moduleReducer = (state = moduleState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionTypes.GET_OPTIONS_STATUSAKTIFKUNJUNGAN_SUCCESS:
      return produce(state, (draft) => {
        draft.data.options_status_aktif_kunjungan = payload.data;
      });

    case actionTypes.CHANGE_STATUSAKTIFKUNJUNGAN: {
      return produce(state, (draft) => {
        draft.post.id_st_aktif_kunjungan = payload.data.value;
        draft.post.status_aktif_kunjungan = payload.data.label;
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

    case actionTypes.DUPLICATION: {
      return produce(state, (draft) => {
        draft.duplication.show = true;
        draft.duplication.selectedData = moduleState.duplication.selectedData;
        draft.duplication.post = moduleState.duplication.post;
      });
    }

    case actionTypes.CANCEL_DUPLICATION: {
      return produce(state, (draft) => {
        draft.duplication.show = false;
        draft.statusForm = moduleActionTypes.CANCEL;
        draft.post = moduleState.post;
        draft.selectedRow = 0;
      });
    }

    case moduleActionTypes.SELECTED: {
      let tgl_aktif_tarif = new Date(payload.data.tgl_aktif_tarif);
      return produce(state, (draft) => {
        draft.post = {
          ...payload.data,
          tgl_aktif_tarif,
          jam_aktif_tarif: tgl_aktif_tarif,
        };
        draft.statusForm = moduleActionTypes.SELECTED;
        draft.selectedRow = payload.data.id;
      });
    }

    case actionTypes.SELECTED_DUPLICATION: {
      return produce(state, (draft) => {
        draft.duplication.selectedData = payload.data;
        draft.duplication.post = {
          versi_tarif_asal: payload.data.id,
          nama_tarif_asal: payload.data.nama,
          versi_tarif_tujuan: state.selectedRow,
          nama_tarif_tujuan: state.post.nama,
        };
      });
    }

    case actionTypes.SAVE_REQUEST: {
      return produce(state, (draft) => {
        draft.post = payload.data;
        draft.saveSuccess = false;
      });
    }

    case actionTypes.SAVE_FAILURE: {
      return produce(state, (draft) => {
        draft.focusElement = '';
        draft.saveSuccess = false;
      });
    }

    case actionTypes.SAVE_SUCCESS: {
      return produce(state, (draft) => {
        draft.focusElement = '';
        draft.selectedRow = payload.data.data.id;
        draft.saveSuccess = true;
      });
    }

    default:
      return module(state, action, moduleState);
  }
};

const filterReducer = (state = filterState, action) => {
  return filter(state, action);
};

const isDuplication = (moduleState) => {
  return moduleState.statusForm === actionTypes.DUPLICATION ? true : false;
};

export { moduleReducer, filterReducer, isDuplication };
