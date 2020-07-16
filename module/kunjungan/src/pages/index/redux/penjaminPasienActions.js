import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import * as actionTypes from './penjaminPasienActionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export const loadAllPenjaminPasien = (resource, data, tableParams) =>
  createAction(
    actionTypes.LOAD_ALL_PENJAMIN_PASIEN,
    { data },
    { resource, tableParams }
  );
export const onAdd = (resource) =>
  createAction(
    actionTypes.ADD_PENJAMIN_PASIEN,
    {},
    { resource, log: createActivity(resource, activity.TAMBAH) }
  );
export const onEdit = (resource) =>
  createAction(
    actionTypes.EDIT_PENJAMIN_PASIEN,
    {},
    { resource, log: createActivity(resource, activity.KOREKSI) }
  );
export const onReady = (resource) =>
  createAction(actionTypes.READY_PENJAMIN_PASIEN, {}, { resource });
export const onFocusElement = (resource, element) =>
  createAction(
    actionTypes.ON_FOCUS_ELEMENT_PENJAMIN_PASIEN,
    { element },
    { resource }
  );
export const onCancel = (resource) =>
  createAction(
    actionTypes.CANCEL_PENJAMIN_PASIEN,
    {},
    { resource, log: createActivity(resource, activity.BATAL) }
  );
export const onChangeSelect2 = (resource, name, data) =>
  createAction(
    actionTypes.CHANGE_SELECT2_PENJAMIN_PASIEN,
    { name, data },
    { resource }
  );
export const settingKelasPenjamin = {
  request: (resource, data) =>
    createAction(
      actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_REQUEST,
      { data },
      { resource }
    ),
  requestSuccess: (resource, data) =>
    createAction(
      actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_SUCCESS,
      { data },
      { resource }
    ),
  requestFailure: (resource, error) =>
    createAction(
      actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_FAILURE,
      { error },
      { resource }
    ),
};
export const onSelected = (resource, data) =>
  createAction(actionTypes.SELECTED_PENJAMIN_PASIEN, { data }, { resource });
