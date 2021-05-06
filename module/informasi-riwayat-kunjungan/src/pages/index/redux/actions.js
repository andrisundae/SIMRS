import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
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
  getPasien: {
    request: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_PASIEN_FAILURE, { error }, { resource }),
  },
  onSelected: (resource, data) =>
    createAction(actionTypes.SELECTED, { data }, { resource }),
  loadRiwayatKunjungan: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_RIWAYAT_KUNJUNGAN_REQUEST,
      { data },
      { tableParams, resource }
    ),
  loadRiwayatKunjunganUnit: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_RIWAYAT_KUNJUNGAN_UNIT_REQUEST,
      { data },
      { tableParams, resource }
    ),
  loadRiwayatKunjunganUnitDetail: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_RIWAYAT_KUNJUNGAN_UNIT_DETAIL_REQUEST,
      { data },
      { tableParams, resource }
    ),
  kunjunganDetail: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_DETAIL_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_DETAIL_FAILURE,
        { error },
        { resource }
      ),
  },
  onFinish: (resource) => createAction(actionTypes.FINISH, {}, { resource }),
  onSelectedKunjungan: (resource, data) =>
    createAction(actionTypes.SELECTED_KUNJUNGAN, { data }, { resource }),
  onSelectedKunjunganUnit: (resource, data) =>
    createAction(actionTypes.SELECTED_KUNJUNGAN_UNIT, { data }, { resource }),
};
