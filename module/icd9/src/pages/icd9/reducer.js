import produce from 'immer';

import { combineReducers } from 'redux';

import { moduleState, filterState } from './state';
import {
  moduleReducer as module,
  filterReducer as filter,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/nested';

const moduleReducer = (state = moduleState, action) => {
  let { type, payload } = action;

  switch (type) {
    case moduleActionTypes.OPEN_FORM:
      return produce(state, (draft) => {
        draft.reference = payload.data;
      });

    default:
      return module(state, action, moduleState);
  }
};

const filterReducer = (state = filterState, action) => {
  return filter(state, action);
};

export default combineReducers({
  module: moduleReducer,
  filter: filterReducer,
});
