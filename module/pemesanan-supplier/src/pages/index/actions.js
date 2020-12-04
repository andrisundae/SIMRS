import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
  onChangeSelect: (resource, data) =>
    createAction(actionTypes.CHANGE_SELECT, { data }, { resource }),
  setStok: (resource, data) =>
    createAction(actionTypes.SET_STOK, { data }, { resource }),
  onFilterChangeSelect: (resource, data) =>
    createAction(actionTypes.FILTER_CHANGE_SELECT, { data }, { resource }),
  setDefaultFilterData: (resource, data) =>
    createAction(actionTypes.SET_DEFAULT_FILTER, { data }, { resource }),
  onFilterChangeTanggal: (resource, data) =>
    createAction(actionTypes.FILTER_CHANGE_TANGGAL, { data }, { resource }),
  setFilterDetail: (resource, data) =>
    createAction(actionTypes.SET_FILTER_DETAIL, { data }, { resource }),
};
