import produce from 'immer';

import { masterState } from './state';
import { dateFormatDB } from '@simrs/common/src/utils/formatter';

import actionTypes from './actionTypes';

const masterReducer = (state = masterState, { type, payload }) => {
  switch (type) {
    case actionTypes.DATE_CHANGE:
      return produce(state, (draft) => {
        draft.filter[payload.data.target] = payload.data.date;

        if (payload.data.target === 'tgl_awal') {
          draft.filter.tglAwal = dateFormatDB(payload.data.date);
        }

        if (payload.data.target === 'tgl_akhir') {
          draft.filter.tglAkhir = dateFormatDB(payload.data.date);
        }
      });
    case actionTypes.CHANGE_SELECT:
      return produce(state, (draft) => {
        if (payload.data.target === 'unitPemesan') {
          draft.filter.idUnitPemesan = payload.data.data.value;
          draft.filter.unitPemesan = payload.data.data.label;
        }

        if (payload.data.target === 'supplier') {
          draft.filter.idSupplier = payload.data.data.value;
          draft.filter.supplier = payload.data.data.label;
        }
      });
    case actionTypes.FOCUS_ELEMENT:
      return produce(state, (draft) => {
        draft.focusElement = payload.element;
      });
    case actionTypes.PEMESANAN_SUCCESS:
      return produce(state, (draft) => {
        draft.data.listData = payload.data;
      });
    case actionTypes.INIT_FORM:
      return produce(state, (draft) => {
        draft.data.options.supplier = payload.data.supplier;
        draft.data.options.unitPemesan = payload.data.unit;
      });
    default:
      return state;
  }
};

export { masterReducer as default };
