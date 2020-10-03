import produce from 'immer';
import { filterState } from './state';
import { moduleActionTypes, filterActionTypes } from './actionTypes';

const moduleReducer = (state, action, initialState) =>
  produce(state, (draft) => {
    let { post } = initialState;
    let { type, payload } = action;

    switch (type) {
      case moduleActionTypes.ADD:
        draft.statusForm = moduleActionTypes.ADD;
        draft.post = post;
        draft.selectedRow = 0;
        draft.isSubmitted = false;
        draft.submitting = false;
        return;

      case moduleActionTypes.EDIT:
        draft.statusForm = moduleActionTypes.EDIT;
        draft.isSubmitted = false;
        return;

      case moduleActionTypes.CANCEL:
        draft.statusForm = moduleActionTypes.CANCEL;
        draft.post = post;
        draft.selectedRow = 0;
        draft.focusElement = '';
        return;

      case moduleActionTypes.READY:
        draft.statusForm = moduleActionTypes.READY;
        draft.post = post;
        // draft.selectedRow = 0;
        return;

      case moduleActionTypes.SELECTED:
        draft.statusForm = moduleActionTypes.SELECTED;
        draft.post = payload.data;
        draft.selectedRow = payload.data.id;
        return;

      case moduleActionTypes.SAVE_REQUEST:
        draft.submitting = true;
        draft.post = payload.data;
        draft.isSubmitted = true;
        draft.saveSuccess = false;
        return;

      case moduleActionTypes.SAVE_FAILURE:
        draft.errors = payload.error;
        draft.submitting = false;
        draft.saveSuccess = false;
        return;

      case moduleActionTypes.SAVE_SUCCESS:
        draft.dataAfterSave = payload.data;
        draft.selectedRow = payload.data.data.id;
        draft.submitting = false;
        draft.saveSuccess = true;
        return;

      case moduleActionTypes.DELETE_SUCCESS:
        draft.post = post;
        draft.selectedRow = 0;
        return;

      case moduleActionTypes.AFTER_SAVE:
        draft.statusForm = moduleActionTypes.AFTER_SAVE;
        return;

      case moduleActionTypes.CHANGE_INPUT:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case moduleActionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      default:
        return state;
    }
  });

const isDisableForm = (moduleState) => {
  let statusForm = moduleState.statusForm;

  return statusForm === moduleActionTypes.ADD ||
    statusForm === moduleActionTypes.EDIT
    ? false
    : true;
};

const getPastAction = (moduleState) => {
  let { dataAfterSave } = moduleState;
  return dataAfterSave.action;
};

const filterReducer = (state = filterState, action) =>
  produce(state, (draft) => {
    let { type, payload } = action;

    switch (type) {
      case filterActionTypes.FILTER_CHANGE:
        draft.post[payload.data.name] = payload.data.value;
        return;

      case filterActionTypes.RESET:
      default:
        return state;
    }
  });

export { moduleReducer, filterReducer, isDisableForm, getPastAction };
