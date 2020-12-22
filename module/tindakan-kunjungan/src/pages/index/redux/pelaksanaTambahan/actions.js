import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import * as actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export const loadAllPelaksanaTambahan = (resource, data, tableParams) =>
  createAction(
    actionTypes.LOAD_ALL_PELAKSANA_TAMBAHAN,
    { data },
    { resource, tableParams }
  );
export const getAllPelaksanaTambahan = {
  request: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_ALL_PELAKSANA_TAMBAHAN_REQUEST,
      { data },
      { resource, tableParams }
    ),
  requestSuccess: (resource, data) =>
    createAction(
      actionTypes.GET_ALL_PELAKSANA_TAMBAHAN_SUCCESS,
      { data },
      { resource }
    ),
  requestFailure: (resource, error) =>
    createAction(
      actionTypes.GET_ALL_PELAKSANA_TAMBAHAN_FAILURE,
      { error },
      { resource }
    ),
};
export const onAdd = (resource) =>
  createAction(
    actionTypes.ADD_PELAKSANA_TAMBAHAN,
    {},
    { resource, log: createActivity(resource, activity.TAMBAH) }
  );
export const onEdit = (resource, data) =>
  createAction(
    actionTypes.EDIT_PELAKSANA_TAMBAHAN,
    { data },
    { resource, log: createActivity(resource, activity.KOREKSI) }
  );
export const onReady = (resource) =>
  createAction(actionTypes.READY_PELAKSANA_TAMBAHAN, {}, { resource });
export const onFocusElement = (resource, element) =>
  createAction(
    actionTypes.ON_FOCUS_ELEMENT_PELAKSANA_TAMBAHAN,
    { element },
    { resource }
  );
export const onCancel = (resource) =>
  createAction(
    actionTypes.CANCEL_PELAKSANA_TAMBAHAN,
    {},
    { resource, log: createActivity(resource, activity.BATAL) }
  );
export const onChangeSelect2 = (resource, name, data) =>
  createAction(
    actionTypes.CHANGE_SELECT2_PELAKSANA_TAMBAHAN,
    { name, data },
    { resource }
  );
export const pelaksanaTambahan = {
  request: (resource, data) =>
    createAction(
      actionTypes.GET_PELAKSANA_TAMBAHAN_REQUEST,
      { data },
      { resource }
    ),
  requestSuccess: (resource, data) =>
    createAction(
      actionTypes.GET_PELAKSANA_TAMBAHAN_SUCCESS,
      { data },
      { resource }
    ),
  requestFailure: (resource, error) =>
    createAction(
      actionTypes.GET_PELAKSANA_TAMBAHAN_FAILURE,
      { error },
      { resource }
    ),
};
export const onSelected = (resource, data) =>
  createAction(actionTypes.SELECTED_PELAKSANA_TAMBAHAN, { data }, { resource });
export const save = {
  request: (resource, data) =>
    createAction(
      actionTypes.SAVE_PELAKSANA_TAMBAHAN_REQUEST,
      { data },
      { resource, log: createActivity(resource, activity.SIMPAN) }
    ),
  requestSuccess: (resource, data) =>
    createAction(
      actionTypes.SAVE_PELAKSANA_TAMBAHAN_SUCCESS,
      { data },
      { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
    ),
  requestFailure: (resource, errors) =>
    createAction(
      actionTypes.SAVE_PELAKSANA_TAMBAHAN_FAILURE,
      { errors },
      { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
    ),
};
export const deletePelaksanaTambahan = {
  request: (resource, data) =>
    createAction(
      actionTypes.DELETE_PELAKSANA_TAMBAHAN_REQUEST,
      { data },
      {
        resource,
        log: createActivity(resource, activity.HAPUS),
      }
    ),
  requestSuccess: (resource, data) =>
    createAction(
      actionTypes.DELETE_PELAKSANA_TAMBAHAN_SUCCESS,
      { data },
      { resource, log: createActivity(resource, activity.HAPUS, 'sukses') }
    ),
  requestFailure: (resource, errors) =>
    createAction(
      actionTypes.DELETE_PELAKSANA_TAMBAHAN_FAILURE,
      { errors },
      { resource, log: createActivity(resource, activity.HAPUS, 'gagal') }
    ),
};
export const openForm = (resource) =>
  createAction(
    actionTypes.OPEN_FORM_PELAKSANA_TAMBAHAN,
    {},
    { resource, log: createActivity(resource, activity.MASUK_FORM) }
  );

export const populateForm = {
  request: (resource, data) =>
    createAction(
      actionTypes.POPULATE_FORM_PELAKSANA_TAMBAHAN_REQUEST,
      { data },
      { resource }
    ),
  requestSuccess: (resource, data) =>
    createAction(
      actionTypes.POPULATE_FORM_PELAKSANA_TAMBAHAN_SUCCESS,
      { data },
      { resource }
    ),
  requestFailure: (resource, error) =>
    createAction(
      actionTypes.POPULATE_FORM_PELAKSANA_TAMBAHAN_FAILURE,
      { error },
      { resource }
    ),
};
