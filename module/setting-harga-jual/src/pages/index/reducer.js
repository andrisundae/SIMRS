import produce from 'immer';
import { moduleState, filterState } from './state';
import {
  moduleReducer as module,
  filterReducer as filter,
} from '@simrs/main/src/modules/master/default';
import actionnsTypes from './actionnsTypes';

const moduleReducer = (state = moduleState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionnsTypes.SHOW_LOG_HARGA:
      return produce(state, (draft) => {
        draft.history.show = payload.data.show;
      });

    default:
      return module(state, action, moduleState);
  }
};

const filterReducer = (state = filterState, action) => {
  return filter(state, action);
};

export { moduleReducer, filterReducer };
