import produce from 'immer';
import initialState from './state';
import actionTypes from './actionTypes';

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case actionTypes.INPUT_CHANGE_FILTER:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.POPULATE_FORM_SUCCESS:
        return produce(state, (draft) => {
          draft.data.instalasi = payload.data.instalasi;
          draft.data.penjamin = payload.data.penjamin;
          draft.data.unitLayanan = payload.data.unit_layanan;
        });

      case actionTypes.GET_DPJP_REQUEST:
        draft.loaderDpjp = true;
        return;
      case actionTypes.GET_DPJP_SUCCESS:
        draft.data.dpjp = payload.data;
        draft.loaderDpjp = false;
        return;
      case actionTypes.GET_DPJP_FAILURE:
        draft.loaderDpjp = false;
        return;

      case actionTypes.CHANGE_SELECT2: {
        return produce(state, (draft) => {
          draft.post[payload.name] = payload.data ? payload.data.value : '';
          draft.selectedOption[payload.name] = payload.data;
          draft.focusElement = '';

          if (payload.name === 'instalasi_id') {
            draft.post.unit_layanan_id = '';
            draft.selectedOption.unit_layanan_id = null;

            draft.post.dpjp_id = '';
            draft.selectedOption.dpjp_id = null;
          }
        });
      }

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case actionTypes.RESET:
      default:
        return state;
    }
  });
