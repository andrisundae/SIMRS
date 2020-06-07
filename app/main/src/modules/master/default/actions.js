import { redux } from '@simrs/common';
import { moduleActionTypes, filterActionTypes } from './actionTypes';
import { activity, logActions } from '../../log';

const { createActivity } = logActions;
const { createAction } = redux;

export const moduleActions = {
  getAll: {
    request: (resource, data) =>
      createAction(moduleActionTypes.GET_ALL_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(moduleActionTypes.GET_ALL_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(moduleActionTypes.GET_ALL_FAILURE, { error }, { resource }),
  },
  save: {
    request: (resource, data) =>
      createAction(
        moduleActionTypes.SAVE_REQUEST,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN) }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        moduleActionTypes.SAVE_SUCCESS,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        moduleActionTypes.SAVE_FAILURE,
        { errors },
        { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
      ),
  },
  delete: {
    request: (resource, data) =>
      createAction(
        moduleActionTypes.DELETE_REQUEST,
        { data },
        { resource, log: createActivity(resource, activity.HAPUS) }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        moduleActionTypes.DELETE_SUCCESS,
        { data },
        { resource, log: createActivity(resource, activity.HAPUS, 'sukses') }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        moduleActionTypes.DELETE_FAILURE,
        { errors },
        { resource, log: createActivity(resource, activity.HAPUS, 'gagal') }
      ),
  },
  loadAll: (resource, data, tableParams) =>
    createAction(
      moduleActionTypes.LOAD_ALL,
      { data },
      { tableParams, resource }
    ),
  onAdd: (resource) =>
    createAction(
      moduleActionTypes.ADD,
      {},
      { resource, log: createActivity(resource, activity.TAMBAH) }
    ),
  onEdit: (resource) =>
    createAction(
      moduleActionTypes.EDIT,
      {},
      { resource, log: createActivity(resource, activity.KOREKSI) }
    ),
  onSelected: (resource, data) =>
    createAction(moduleActionTypes.SELECTED, { data }, { resource }),
  onCancel: (resource) =>
    createAction(
      moduleActionTypes.CANCEL,
      {},
      { resource, log: createActivity(resource, activity.BATAL) }
    ),
  onReady: (resource) =>
    createAction(moduleActionTypes.READY, {}, { resource }),
  openForm: (resource) =>
    createAction(
      moduleActionTypes.OPEN_FORM,
      {},
      { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
  onAfterSave: (resource) =>
    createAction(moduleActionTypes.AFTER_SAVE, {}, { resource }),
  onChangeInput: (resource, data) =>
    createAction(moduleActionTypes.CHANGE_INPUT, { data }, { resource }),
  onFocusElement: (resource, element) =>
    createAction(moduleActionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
};

export const filterActions = {
  onChangeFilter: (resource, data) =>
    createAction(filterActionTypes.FILTER_CHANGE, { data }, { resource }),
  onSubmitFilter: (resource, data) =>
    createAction(
      filterActionTypes.FILTER_SUBMIT,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onReset: (resource) =>
    createAction(filterActionTypes.RESET, {}, { resource }),
};
