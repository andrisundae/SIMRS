import produce from 'immer';
import initialState from './state';
import actionTypes from './actionTypes';

export default (state = initialState, action) =>
  produce(state, (draft) => {
    let { type, payload } = action;

    switch (type) {
      case actionTypes.CHANGE_INPUT:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.SAVE_SUCCESS:
        draft.post = initialState.post;
        return;

      case actionTypes.POPULATE_FORM:
        draft.data.username = payload.data.username;
        return;

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      default:
        return state;
    }
  });
