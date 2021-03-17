import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

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
    createAction(actionTypes.INPUT_CHANGE, { data }, { resource }),
  onReset: (resource) => createAction(actionTypes.RESET, {}, { resource }),
  onFocusElement: (resource, element) =>
    createAction(actionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
  populateForm: {
    request: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.POPULATE_FORM_FAILURE, { error }, { resource }),
  },
  getPasien: {
    request: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_PASIEN_FAILURE, { error }, { resource }),
  },
  onEdit: (resource) =>
    createAction(
      actionTypes.EDIT,
      {},
      { resource, log: createActivity(resource, activity.KOREKSI) }
    ),
  onCancel: (resource) => createAction(actionTypes.CANCEL, {}, { resource }),
  onSelected: (resource, data) =>
    createAction(actionTypes.SELECTED, { data }, { resource }),
  onChangeSelect2: (resource, name, data, isTindakan) =>
    createAction(
      actionTypes.CHANGE_SELECT2,
      { name, data, isTindakan },
      { resource }
    ),
  loadAllWilayah: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_ALL_WILAYAH_REQUEST,
      { data },
      { tableParams, resource }
    ),
  toggleShowCariWilayah: (resource) =>
    createAction(actionTypes.TOGGLE_SHOW_CARI_WILAYAH, {}, { resource }),
  onChangeFilterWilayah: (resource, data) =>
    createAction(actionTypes.FILTER_CHANGE_WILAYAH, { data }, { resource }),
  onSubmitFilterWilayah: (resource, data) =>
    createAction(
      actionTypes.FILTER_SUBMIT_WILAYAH,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onFinish: (resource) => createAction(actionTypes.FINISH, {}, { resource }),
  onSelectedWilayah: (resource, data) =>
    createAction(actionTypes.FILTER_SELECTED_WILAYAH, { data }, { resource }),
};
