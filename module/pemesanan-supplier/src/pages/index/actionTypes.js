import { redux } from '@simrs/common';

const { createType } = redux;

export default {
  CHANGE_SELECT: createType('CHANGE_SELECT'),
  FILTER_CHANGE_TANGGAL: createType('FILTER_CHANGE_TANGGAL'),
  FILTER_CHANGE_SELECT: createType('FILTER_CHANGE_SELECT'),
  FILTER_CHANGE_TANGGAL: createType('FILTER_CHANGE_TANGGAL'),
  SET_DEFAULT_FILTER: createType('SET_DEFAULT_FILTER'),
  SET_FILTER_DETAIL: createType('SET_FILTER_DETAIL'),
  SET_STOK: createType('SET_STOK'),
};
