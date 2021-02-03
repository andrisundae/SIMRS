import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
  generateNoTransaksi: {
    request: (resource) =>
      createAction(actionTypes.GENERATE_REQUEST, {}, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GENERATE_SUCCESS, { data }, { resource }),
    requestFailure: (resource, errors) =>
      createAction(actionTypes.GENERATE_FAILURE, { errors }, { resource }),
  },
  findPemesanan: {
    request: (resource, data, tableParams) =>
      createAction(
        actionTypes.PEMESANAN_REQUEST,
        { data },
        { resource, tableParams }
      ),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.PEMESANAN_SUCCESS, { data }, { resource }),
    requestFailure: (resource, errors) =>
      createAction(actionTypes.PEMESANAN_FAILURE, { errors }, { resource }),
  },
  setInitForm: (resource, data) =>
    createAction(actionTypes.INIT_FORM, { data }, { resource }),
  setPemesanan: (resource, data) =>
    createAction(actionTypes.SET_PEMESANAN, { data }, { resource }),
  countAll: (resource, data) =>
    createAction(actionTypes.COUNT_ALL, { data }, { resource }),
  countDiskon: (resource, data) =>
    createAction(actionTypes.COUNT_DISKON, { data }, { resource }),
  setItemPemesanan: (resource, data, tableParams) =>
    createAction(
      actionTypes.SET_ITEM_PEMESANAN,
      { data },
      { resource, tableParams }
    ),
  onChangeSelect: (resource, data) =>
    createAction(actionTypes.CHANGE_SELECT, { data }, { resource }),
  onChangeSelectFilter: (resource, data) =>
    createAction(actionTypes.CHANGE_SELECT_FILTER, { data }, { resource }),
  onSelectedData: (resource, data) =>
    createAction(actionTypes.SELECTED_DATA, { data }, { resource }),
  onFilterChangeTanggal: (resource, data) =>
    createAction(actionTypes.FILTER_CHANGE_TANGGAL, { data }, { resource }),
  onSubmitFilterPemesanan: (resource, data) =>
    createAction(
      actionTypes.ON_SUBMIT_CARI_PEMESANAN,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  setInfoBarang: (resource, data) =>
    createAction(actionTypes.SET_INFO_BARANG, { data }, { resource }),
};
