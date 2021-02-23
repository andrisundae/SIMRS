import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const GENERATE = createRequestType('GENERATE_NOMOR_TRANSAKSI');

export default {
  GENERATE_REQUEST: GENERATE[REQUEST],
  GENERATE_SUCCESS: GENERATE[SUCCESS],
  GENERATE_FAILURE: GENERATE[FAILURE],

  INIT_FORM: createType('INIT_FORM'),
  CHANGE_SELECT: createType('CHANGE_SELECT'),
  CHANGE_SELECT_FILTER: createType('CHANGE_SELECT_FILTER'),
  FILTER_CHANGE_TANGGAL: createType('FILTER_CHANGE_TANGGAL'),
  SELECTED_DATA: createType('SELECTED_DATA'),
  COUNT_ALL: createType('COUNT_ALL'),
  COUNT_DISKON: createType('COUNT_DISKON'),
  RESET_FILTERED_DATA: createType('RESET_FILTERED_DATA'),
};
