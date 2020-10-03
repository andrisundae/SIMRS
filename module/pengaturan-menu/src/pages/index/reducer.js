import produce from 'immer';

import actionTypes from './actionTypes';
import moduleState from './state';

export const isDisableForm = (statusForm) => {
  return statusForm === actionTypes.ADD || statusForm === actionTypes.EDIT
    ? false
    : true;
};

export const isDisableFormDetail = (statusForm, id) => {
  return statusForm === actionTypes.EDIT && id ? false : true;
};

export default (state = moduleState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.GET_MENU_SUCCESS:
        draft.data.menu = payload.data.menu;
        draft.data.expandedKeys = payload.data.expanded;
        return;

      case actionTypes.CHANGE_INPUT:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.CHANGE_INPUT_DETAIL:
        draft.postDetail[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.SELECTED: {
        const { selectedKeys, selectedData } = payload.data;
        if (selectedData) {
          draft.data.selectedKeys = selectedKeys;
          draft.post.id = selectedData.id;
          draft.post.nama = selectedData.nama;
          draft.post.urutan = selectedData.urutan;
          draft.post.key_menu = selectedData.key_menu;
          draft.post.parent = selectedData.parent_id;
          draft.post.kode_app = selectedData.kode_app;
          draft.focusElement = '';
          draft.statusForm = actionTypes.SELECTED;
          draft.postDetail = { ...moduleState.postDetail };
        }

        return;
      }

      case actionTypes.EXPANDED:
        draft.data.expandedKeys = payload.data;
        draft.focusElement = '';
        return;

      case actionTypes.READY:
        draft.statusForm = actionTypes.READY;
        return;

      case actionTypes.READY_DETAIL:
        draft.statusFormDetail = actionTypes.READY_DETAIL;
        return;

      case actionTypes.ADD_DETAIL:
        draft.statusFormDetail = actionTypes.ADD_DETAIL;
        draft.postDetail = { ...moduleState.postDetail };
        return;

      case actionTypes.ADD:
        draft.statusForm = actionTypes.ADD;
        draft.post = { ...moduleState.post };
        draft.post.parent = state.post.id;
        draft.post.kode_app = 'web-client';
        draft.post.default_action = 1;
        return;

      case actionTypes.EDIT:
        draft.statusForm = actionTypes.EDIT;
        return;

      case actionTypes.CANCEL: {
        if (state.statusForm === actionTypes.ADD) {
          draft.post = { ...state.post };
        }
        draft.statusForm = actionTypes.CANCEL;
        return;
      }

      case actionTypes.CANCEL_DETAIL: {
        draft.postDetail = moduleState.postDetail;
        draft.statusFormDetail = actionTypes.CANCEL_DETAIL;
        return;
      }

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case actionTypes.SAVE_REQUEST:
        draft.post = payload.data;
        draft.saveSuccess = false;
        return;

      case actionTypes.SAVE_FAILURE:
        draft.errors = payload.error;
        draft.saveSuccess = false;
        return;

      case actionTypes.SAVE_SUCCESS:
        draft.focusElement = '';
        draft.saveSuccess = true;
        return;

      case actionTypes.SAVE_DETAIL_REQUEST:
        draft.postDetail = payload.data;
        return;

      case actionTypes.SAVE_DETAIL_SUCCESS: {
        let data = payload.data.data;
        draft.postDetail.id = data.id;
        draft.postDetail.nama = data.nama;
        return;
      }

      case actionTypes.SAVE_DETAIL_FAILURE:
        draft.errors = payload.error;
        return;

      case actionTypes.DELETE_DETAIL_SUCCESS:
        draft.postDetail = { ...moduleState.postDetail };
        return;

      case actionTypes.DELETE_SUCCESS:
        draft.post = { ...moduleState.post };
        draft.postDetail = { ...moduleState.postDetail };
        draft.data.selectedKeys = [];
        return;

      case actionTypes.RESET:
        draft = { ...moduleState };
        return;

      case actionTypes.SELECTED_DETAIL:
        draft.statusFormDetail = actionTypes.SELECTED_DETAIL;
        draft.postDetail.id = payload.data.id;
        draft.postDetail.nama = payload.data.nama;
        return;
      default:
        return state;
    }
  });
