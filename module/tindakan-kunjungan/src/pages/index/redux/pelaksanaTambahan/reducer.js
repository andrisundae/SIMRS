import produce from 'immer';
import initialState from './state';
import * as actionTypes from './actionTypes';

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case actionTypes.OPEN_FORM_PELAKSANA_TAMBAHAN:
        draft.post = initialState.post;
        draft.selectedOption = initialState.selectedOption;
        draft.selectedRow = initialState.selectedRow;
        return;

      case actionTypes.ADD_PELAKSANA_TAMBAHAN:
        draft.statusForm = actionTypes.ADD_PELAKSANA_TAMBAHAN;
        draft.post = initialState.post;
        draft.selectedOption = initialState.selectedOption;
        draft.selectedRow = 0;
        return;

      case actionTypes.EDIT_PELAKSANA_TAMBAHAN:
        draft.statusForm = actionTypes.EDIT_PELAKSANA_TAMBAHAN;
        return;

      case actionTypes.CANCEL_PELAKSANA_TAMBAHAN:
        draft.statusForm = actionTypes.READY_PELAKSANA_TAMBAHAN;
        draft.focusElement = '';
        draft.post = initialState.post;
        draft.selectedOption = { ...initialState.selectedOption };
        return;

      case actionTypes.READY_PELAKSANA_TAMBAHAN:
        draft.statusForm = actionTypes.READY_PELAKSANA_TAMBAHAN;
        draft.post = initialState.post;
        draft.selectedOption = { ...initialState.selectedOption };
        return;

      case actionTypes.SELECTED_PELAKSANA_TAMBAHAN: {
        const data = payload.data;
        draft.statusForm = actionTypes.SELECTED_PELAKSANA_TAMBAHAN;
        draft.post = {
          id: data.id,
          id_pelaksana: data.id_pelaksana,
          id_kunjungan_unit_detail: data.id_kunjungan_unit_detail,
          id_spesialisasi: data.id_spesialisasi,
          nama_pelaksana: data.nama_pelaksana,
          nama_spesialisasi: data.nama_spesialisasi,
        };
        draft.selectedRow = data.id;

        draft.selectedOption.id_pelaksana = {
          value: data.id_pelaksana,
          label: data.nama_pelaksana,
        };

        draft.selectedOption.id_spesialisasi = {
          value: data.id_spesialisasi,
          label: data.nama_spesialisasi,
        };
        return;
      }

      case actionTypes.GET_PELAKSANA_TAMBAHAN_REQUEST:
        draft.loaderPelaksana = true;
        return;
      case actionTypes.GET_PELAKSANA_TAMBAHAN_SUCCESS: {
        const options = payload.data.data || [];
        draft.data.pelaksana = options;
        draft.loaderPelaksana = false;

        if (payload.data.clearSelected) {
          draft.selectedOption.id_pelaksana = null;
        }
        return;
      }
      case actionTypes.GET_PELAKSANA_TAMBAHAN_FAILURE:
        draft.loaderPelaksana = false;
        draft.selectedOption.id_pelaksana = null;
        return;

      case actionTypes.CHANGE_SELECT2_PELAKSANA_TAMBAHAN: {
        draft.focusElement = '';
        draft.post[payload.name] = payload.data.value;
        draft.selectedOption[payload.name] = payload.data;
        return;
      }

      case actionTypes.ON_FOCUS_ELEMENT_PELAKSANA_TAMBAHAN:
        draft.focusElement = payload.element;
        return;

      case actionTypes.SAVE_PELAKSANA_TAMBAHAN_REQUEST:
        draft.focusElement = '';
        draft.saveSuccess = false;
        return;

      case actionTypes.SAVE_PELAKSANA_TAMBAHAN_FAILURE:
        draft.errors = payload.errors;
        draft.focusElement = '';
        draft.saveSuccess = false;
        return;

      case actionTypes.SAVE_PELAKSANA_TAMBAHAN_SUCCESS:
        draft.selectedRow = payload.data.data.id;
        draft.focusElement = '';
        draft.saveSuccess = true;
        return;

      case actionTypes.POPULATE_FORM_PELAKSANA_TAMBAHAN_SUCCESS: {
        draft.data.spesialisasi = payload.data.spesialisasi;
        draft.data.pelaksana = [];
        return;
      }

      default:
        return state;
    }
  });
