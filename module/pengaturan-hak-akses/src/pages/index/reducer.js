import produce from 'immer';

import actionTypes from './actionTypes';
import moduleState from './state';

export const isDisableForm = (statusForm) => {
  return statusForm === actionTypes.EDIT ? false : true;
};

export default (state = moduleState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_MENU_SUCCESS:
        draft.data.menu = payload.data.menu;
        draft.data.expandedKeys = payload.data.expanded;
        return;

      case actionTypes.GET_ACL_SUCCESS:
        draft.data.checkedKeys = payload.data.unique_acl;
        draft.post.list_menu_action = payload.data.acl;
        return;

      case actionTypes.GET_GRUP_SUCCESS:
        draft.data.grup = payload.data;
        return;

      case actionTypes.CHANGE_GRUP:
        draft.data.selectedGrup = payload.data;
        draft.post.grup = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.CHECKED_CHANGE_ACL:
        draft.data.checkedKeys = payload.data.checkedKeys;
        draft.post.list_menu_action = payload.data.leafKeys;
        draft.focusElement = '';
        return;

      case actionTypes.SELECTED_CHANGE_ACL:
        draft.data.selectedKeys = payload.data;
        draft.focusElement = '';
        return;

      case actionTypes.EXPANDED_CHANGE_ACL:
        draft.data.expandedKeys = payload.data;
        draft.focusElement = '';
        return;

      case actionTypes.READY:
        draft.statusForm = actionTypes.READY;
        return;

      case actionTypes.EDIT:
        draft.statusForm = actionTypes.EDIT;
        return;

      case actionTypes.CANCEL:
        draft.statusForm = actionTypes.CANCEL;
        return;

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case actionTypes.SAVE_ACL_REQUEST:
        draft.post = payload.data;
        draft.saveSuccess = false;
        return;

      case actionTypes.SAVE_ACL_FAILURE:
        draft.errors = payload.error;
        draft.saveSuccess = false;
        return;

      case actionTypes.SAVE_ACL_SUCCESS:
        draft.focusElement = '';
        draft.saveSuccess = true;
        return;

      case actionTypes.RESET:
        draft.data = moduleState.data;
        draft.post = moduleState.post;
        draft.statusForm = '';
        draft.focusElement = '';
        draft.errors = {};
        return;

      default:
        break;
    }
  });
