import { moduleState, filterState } from './state';
import {
  moduleReducer as module,
  filterReducer as filter,
} from '@simrs/main/src/modules/master/default';

const moduleReducer = (state = moduleState, action) => {
  return module(state, action, moduleState);
};

const filterReducer = (state = filterState, action) => {
  return filter(state, action);
};

export { moduleReducer, filterReducer };
