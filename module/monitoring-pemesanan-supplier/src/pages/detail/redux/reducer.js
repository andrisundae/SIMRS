import produce from 'immer';
import dayjs from 'dayjs';

import { detailState } from './state';

import indexActionTypes from '../../index/redux/actionTypes';
import actionsTypes from './actionsTypes';

const detailReducer = (state = detailState, action) => {
  let { type, payload } = action;

  switch (type) {
    case indexActionTypes.SELECTED_DATA:
      return produce(state, (draft) => {
        draft.data.pemesanan = payload.data.data;
      });
    case actionsTypes.PEMESANAN_ITEM_SUCCESS:
      return produce(state, (draft) => {
        draft.data.detailPemesanan = payload.data.data;
      });
    case actionsTypes.PENERIMAAN_SUCCESS:
      return produce(state, (draft) => {
        draft.data.penerimaan = payload.data;
      });
    case actionsTypes.SELECT_ITEM_PENERIMAAN:
      return produce(state, (draft) => {
        draft.data.selectedPenerimaan = payload.data.itemPenerimaan;
      });
    case actionsTypes.PENERIMAAN_ITEM_SUCCESS:
      return produce(state, (draft) => {
        draft.data.detailPenerimaan = payload.data;
      });
    default:
      return state;
  }
};

export { detailReducer as default };
