import produce from 'immer';

import actionTypes from './actionTypes';
import { moduleState, filterState } from './state';
import {
  moduleReducer as module,
  filterReducer as filter,
} from '@simrs/main/src/modules/master/default';

const moduleReducer = (state = moduleState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionTypes.TOGGLE_CHECK:
      return produce(state, (draft) => {
        draft.post[payload.data.name] = payload.data.value;

        if (payload.data.name === 'st_gudang') {
          draft.post.st_penjualan = false;
          draft.post.st_terima_resep = false;
          draft.post.st_unit_bank_darah = false;
        }

        if (payload.data.name === 'st_penjualan') {
          draft.post.st_gudang = false;
        }

        if (
          payload.data.name === 'st_terima_resep' ||
          payload.data.name === 'st_unit_bank_darah'
        ) {
          draft.post.st_penjualan = true;
          draft.post.st_gudang = false;
        }
      });
    default:
      return module(state, action, moduleState);
  }
};

const filterReducer = (state = filterState, action) => {
  return filter(state, action);
};

export { moduleReducer, filterReducer };
