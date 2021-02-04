import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const GENERATE = createRequestType('GENERATE_NOMOR_TRANSAKSI');
const PEMESANAN = createRequestType('LOAD_PEMESANAN');

export default {
  GENERATE_REQUEST: GENERATE[REQUEST],
  GENERATE_SUCCESS: GENERATE[SUCCESS],
  GENERATE_FAILURE: GENERATE[FAILURE],

  PEMESANAN_REQUEST: PEMESANAN[REQUEST],
  PEMESANAN_SUCCESS: PEMESANAN[SUCCESS],
  PEMESANAN_FAILURE: PEMESANAN[FAILURE],

  INIT_FORM: createType('INIT_FORM'),
  SET_PEMESANAN: createType('SET_PEMESANAN'),
  SET_ITEM_PEMESANAN: createType('SET_ITEM_PEMESANAN'),
  CHANGE_SELECT: createType('CHANGE_SELECT'),
  CHANGE_SELECT_FILTER: createType('CHANGE_SELECT_FILTER'),
  ON_SUBMIT_CARI_PEMESANAN: createType('ON_SUBMIT_CARI_PEMESANAN'),
  FILTER_CHANGE_TANGGAL: createType('FILTER_CHANGE_TANGGAL'),
  SELECTED_DATA: createType('SELECTED_DATA'),
  COUNT_ALL: createType('COUNT_ALL'),
  COUNT_DISKON: createType('COUNT_DISKON'),
  SET_INFO_BARANG: createType('SET_INFO_BARANG'),
  RESET_FILTERED_DATA: createType('RESET_FILTERED_DATA'),
};
