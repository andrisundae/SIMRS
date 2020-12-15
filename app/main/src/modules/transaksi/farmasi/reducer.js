import produce from 'immer';
import { masterState, filterState, detailState } from './state';
import {
  masterActionTypes,
  detailActionTypes,
  filterActionTypes,
} from './actionTypes';

const masterReducer = (state = masterState, action, initialState) =>
  produce(state, (draft) => {
    let { post } = initialState;
    let { type, payload } = action;

    switch (type) {
      case masterActionTypes.ADD:
        draft.statusForm = masterActionTypes.ADD;
        draft.post = post;
        draft.openForm = true;
        draft.isSubmitted = false;
        draft.submitting = false;
        return;

      case masterActionTypes.CANCEL:
        draft.statusForm = masterActionTypes.CANCEL;
        draft.post = post;
        draft.openForm = false;
        draft.focusElement = 'addMaster';
        return;

      case masterActionTypes.READY:
        draft.statusForm = masterActionTypes.READY;
        draft.post = post;
        return;

      case masterActionTypes.SAVE_REQUEST:
        draft.submitting = true;
        draft.post = payload.data;
        draft.isSubmitted = true;
        return;

      case masterActionTypes.SAVE_FAILURE:
        draft.errors = payload.errors;
        draft.focusElement = '';
        draft.submitting = false;
        draft.openForm = true;
        return;

      case masterActionTypes.SAVE_SUCCESS:
        draft.dataAfterSave = payload.data;
        draft.submitting = false;
        draft.openForm = false;
        draft.post.id = payload.data.data.id;
        draft.focusElement = '';
        draft.statusForm = masterActionTypes.FILLED;
        return;

      case masterActionTypes.AFTER_SAVE:
        draft.statusForm = masterActionTypes.AFTER_SAVE;
        return;

      case masterActionTypes.CHANGE_INPUT:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = payload.data.name;
        return;

      case masterActionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case masterActionTypes.FINISH_SUCCESS:
        draft.statusForm = masterActionTypes.MANAGE;
        draft.focusElement = 'addMaster';
        draft.openForm = false;
        return;

      case masterActionTypes.RESET:
        draft.post = post;
        draft.statusForm = masterActionTypes.READY;
        draft.openForm = false;
        return;

      default:
        return state;
    }
  });

const detailReducer = (state = detailState, action, initialState) =>
  produce(state, (draft) => {
    let { post, data } = initialState;
    let { type, payload } = action;

    switch (type) {
      case masterActionTypes.SAVE_SUCCESS:
        draft.data.master_id = payload.data.data.id;
        draft.post.master_id = payload.data.data.id;
        draft.focusElement = 'addDetail';
        return;

      case masterActionTypes.FINISH_SUCCESS:
        draft.statusForm = '';
        draft.focusElement = '';
        draft.openForm = false;
        return;

      case detailActionTypes.GET_DETAIL_SUCCESS:
        draft.data.item_list = payload.data;
        return;

      case detailActionTypes.READY:
        draft.statusForm = detailActionTypes.READY;
        draft.post = post;
        return;

      case detailActionTypes.ADD:
        draft.statusForm = detailActionTypes.ADD;
        draft.post = post;
        draft.openForm = true;
        draft.isSubmitted = false;
        draft.submitting = false;
        return;

      case detailActionTypes.EDIT:
        draft.statusForm = detailActionTypes.EDIT;
        return;

      case detailActionTypes.CANCEL:
        draft.statusForm = detailActionTypes.CANCEL;
        draft.post = post;
        draft.focusElement = 'addDetail';
        return;

      case detailActionTypes.CHANGE_INPUT:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = payload.data.name;
        return;
      case detailActionTypes.RESET:
        draft.post = post;
        draft.data = data;
        draft.statusForm = '';
        draft.openForm = false;
        return;

      case detailActionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case detailActionTypes.SELECTED:
        draft.post = payload.data;
        draft.statusForm = detailActionTypes.SELECTED;
        return;

      case detailActionTypes.SAVE_SUCCESS:
        draft.focusElement = '';
        draft.dataAfterSave = payload.data;
        draft.data.selectedRow = payload.data.data.id;
        return;

      default:
        return state;
    }
  });

const isDisableForm = (moduleForm) => {
  let enable = [masterActionTypes.ADD];

  let enabled = enable.find(function (enableForm) {
    return moduleForm.statusForm === enableForm;
  });

  return enabled;
};

const isDisableFormDetail = (moduleForm) => {
  let enable = [detailActionTypes.ADD, detailActionTypes.EDIT];

  let enabled = enable.find(function (enableForm) {
    return moduleForm.statusForm === enableForm;
  });

  return enabled;
};

const isDisableListDetail = (moduleForm) => {
  let enable = [
    detailActionTypes.READY,
    detailActionTypes.CANCEL,
    detailActionTypes.SELECTED,
  ];

  let enabled = enable.find(function (enableForm) {
    return moduleForm.statusForm === enableForm;
  });

  return enabled;
};

const getPastAction = (moduleState) => {
  let { dataAfterSave } = moduleState;
  return dataAfterSave.action;
};

const filterReducer = (state = filterState, action) =>
  produce(state, (draft) => {
    let { type, payload } = action;

    switch (type) {
      case filterActionTypes.CHANGE_INPUT:
        draft[payload.data.form][payload.data.name] = payload.data.value;
        draft.focusElement = payload.data.name;
        return;

      case filterActionTypes.OPEN_DIALOG:
        draft.filter_modal[payload.data.form].show = true;
        return;

      case filterActionTypes.CLOSE_DIALOG:
        if (draft.filter_modal[payload.data.idx]) {
          draft.filter_modal[payload.data.idx].show = false;
        }
        return;

      case filterActionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case filterActionTypes.CARI_TRANSAKSI_SUCCESS:
        draft.cari_master.filtered_data = payload.data.length;
        return;

      case filterActionTypes.CARI_ITEM_SUCCESS:
        draft.cari_detail.filtered_data = payload.data.length;
        return;

      case filterActionTypes.RESET:
      default:
        return state;
    }
  });

export {
  masterReducer,
  detailReducer,
  filterReducer,
  getPastAction,
  isDisableForm,
  isDisableListDetail,
  isDisableFormDetail,
};
