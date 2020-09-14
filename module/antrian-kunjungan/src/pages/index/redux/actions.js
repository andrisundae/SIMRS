import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
  getAll: {
    request: (resource, data) =>
      createAction(actionTypes.GET_ALL_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_ALL_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_ALL_FAILURE, { error }, { resource }),
  },
  loadAll: (resource, data, tableParams) =>
    createAction(actionTypes.LOAD_ALL, { data }, { tableParams, resource }),
  onReady: (resource) => createAction(actionTypes.READY, {}, { resource }),
  openForm: (resource) =>
    createAction(
      actionTypes.OPEN_FORM,
      {},
      { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
  onChangeFilter: (resource, data) =>
    createAction(actionTypes.INPUT_CHANGE_FILTER, { data }, { resource }),
  onSubmitFilter: (resource, data) =>
    createAction(
      actionTypes.SUBMIT_FILTER,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onReset: (resource) => createAction(actionTypes.RESET, {}, { resource }),
  onResetFilter: (resource) =>
    createAction(actionTypes.RESET_FILTER, {}, { resource }),
  onFocusElement: (resource, element) =>
    createAction(actionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
  onChangeSelect2: (resource, name, data) =>
    createAction(actionTypes.CHANGE_SELECT2, { name, data }, { resource }),
  populateForm: {
    request: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.POPULATE_FORM_FAILURE, { error }, { resource }),
  },
  dpjp: {
    request: (resource, data) =>
      createAction(actionTypes.GET_DPJP_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_DPJP_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_DPJP_FAILURE, { error }, { resource }),
  },
};
