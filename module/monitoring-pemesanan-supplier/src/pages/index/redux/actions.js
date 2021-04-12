import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
  openForm: (resource) =>
    createAction(
      actionTypes.OPEN_FORM,
      {},
      { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
  onFormReady: (resource) =>
    createAction(actionTypes.FORM_READY, {}, { resource }),
  findPemesanan: {
    request: (resource, data, tableParams) =>
      createAction(
        actionTypes.PEMESANAN_REQUEST,
        { data },
        { resource, tableParams }
      ),
    requestSuccess: (resource, data, tableParams) =>
      createAction(
        actionTypes.PEMESANAN_SUCCESS,
        { data },
        { resource, tableParams }
      ),
    requestFailure: (resource, errors) =>
      createAction(actionTypes.PEMESANAN_FAILURE, { errors }, { resource }),
  },
  initialForm: {
    request: (resource, data) =>
      createAction(actionTypes.INIT_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.INIT_SUCCESS, { data }, { resource }),
    requestFailure: (resource, errors) =>
      createAction(actionTypes.INIT_FAILURE, { errors }, { resource }),
  },
  setInitForm: (resource, data) =>
    createAction(actionTypes.INIT_FORM, { data }, { resource }),
  onSelectedData: (data) =>
    createAction(actionTypes.SELECTED_DATA, { data }, {}),
  onSelectChange: (resource, data) =>
    createAction(actionTypes.CHANGE_SELECT, { data }, { resource }),
  onDateChange: (resource, data) =>
    createAction(actionTypes.DATE_CHANGE, { data }, { resource }),
  onFocusElement: (resource, element) =>
    createAction(actionTypes.FOCUS_ELEMENT, { element }, { resource }),
  onSubmitTampilPemesanan: (resource, data) =>
    createAction(
      actionTypes.SUBMIT_TAMPIL_PEMESANAN,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
};
