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
    default:
      return module(state, action, moduleState);
  }
};

const filterReducer = (state = filterState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionTypes.GET_UNIT_FARMASI_SUCCESS:
      return produce(state, (draft) => {
        draft.data.unit_list = payload.data;
      });

    case actionTypes.CHANGE_SELECT:
      return produce(state, (draft) => {
        draft.post.id_unit_layanan = payload.data.selected.value;
        draft.post.unit_layanan = payload.data.selected.label;
      });

    default:
      return filter(state, action);
  }
};

export { moduleReducer, filterReducer };
