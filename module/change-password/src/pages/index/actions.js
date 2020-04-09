import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
  save: {
    request: (resource, data) =>
      createAction(
        actionTypes.SAVE_REQUEST,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN) }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.SAVE_SUCCESS,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        actionTypes.SAVE_FAILURE,
        { errors },
        { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
      ),
  },
  onReady: (resource) => createAction(actionTypes.READY, {}, { resource }),
  openForm: (resource) =>
    createAction(
      actionTypes.OPEN_FORM,
      {},
      { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
  onChangeInput: (resource, data) =>
    createAction(actionTypes.CHANGE_INPUT, { data }, { resource }),
  onFocusElement: (resource, element) =>
    createAction(actionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
  populateForm: (resource, data) =>
    createAction(actionTypes.POPULATE_FORM, { data }, { resource }),
};
