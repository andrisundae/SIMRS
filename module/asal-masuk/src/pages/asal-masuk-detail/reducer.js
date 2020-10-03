import produce from 'immer';

import { combineReducers } from 'redux';

import { moduleState, filterState } from './state';
import {
  moduleReducer as module,
  filterReducer as filter,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/nested';
import actionTypes from './actionTypes';

export const moduleReducer = (state = moduleState, action) => {
  let { type, payload } = action;

  switch (type) {
    case moduleActionTypes.OPEN_FORM:
      return produce(state, (draft) => {
        draft.reference = payload.data;
      });

    case actionTypes.GET_OPTIONS_INSTALASI_SUCCESS:
      return produce(state, (draft) => {
        draft.importDetail.data.options_instalasi = payload.data;
      });

    case actionTypes.IMPORT_DETAIL: {
      return produce(state, (draft) => {
        draft.importDetail.show = true;
      });
    }

    case actionTypes.IMPORT_DETAIL_SUCCESS:
    case actionTypes.CANCEL_IMPORT_DETAIL: {
      return produce(state, (draft) => {
        draft.importDetail.show = false;
        draft.statusForm = moduleActionTypes.CANCEL;
        draft.post = moduleState.post;
        draft.selectedRow = 0;
      });
    }

    case actionTypes.SELECTION_CHANGED_DETAIL: {
      return produce(state, (draft) => {
        draft.importDetail.selectedRows = payload.data;
      });
    }

    case actionTypes.CHANGE_INSTALASI: {
      return produce(state, (draft) => {
        draft.importDetail.filter.selectedInstalasi = payload.data;
      });
    }

    case actionTypes.RELOADING_DATA_DETAIL: {
      return produce(state, (draft) => {
        draft.importDetail.isReloadGrid = true;
      });
    }

    case actionTypes.RELOADED_DATA_DETAIL: {
      return produce(state, (draft) => {
        draft.importDetail.isReloadGrid = false;
      });
    }

    case moduleActionTypes.SAVE_REQUEST: {
      return produce(state, (draft) => {
        draft.post = payload.data;
        draft.saveSuccess = false;
      });
    }

    case moduleActionTypes.SAVE_FAILURE: {
      return produce(state, (draft) => {
        draft.errors = payload.error;
        draft.saveSuccess = false;
      });
    }

    case moduleActionTypes.SAVE_SUCCESS: {
      return produce(state, (draft) => {
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

export default combineReducers({
  module: moduleReducer,
  filter: filterReducer,
});
