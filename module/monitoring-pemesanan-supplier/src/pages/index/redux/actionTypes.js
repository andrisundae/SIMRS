import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const PEMESANAN = createRequestType('LOAD_PEMESANAN');
const INIT = createRequestType('LOAD_INIT');

export default {
  PEMESANAN_REQUEST: PEMESANAN[REQUEST],
  PEMESANAN_SUCCESS: PEMESANAN[SUCCESS],
  PEMESANAN_FAILURE: PEMESANAN[FAILURE],

  INIT_REQUEST: INIT[REQUEST],
  INIT_SUCCESS: INIT[SUCCESS],
  INIT_FAILURE: INIT[FAILURE],

  SUBMIT_TAMPIL_PEMESANAN: createType('SUBMIT_TAMPIL_PEMESANAN'),

  OPEN_FORM: createType('OPEN_FORM'),
  FORM_READY: createType('FORM_READY'),
  SELECTED_DATA: createType('SELECTED_DATA'),
  INIT_FORM: createType('INIT_FORM'),
  CHANGE_SELECT: createType('CHANGE_SELECT'),
  DATE_CHANGE: createType('DATE_CHANGE'),
  FOCUS_ELEMENT: createType('FOCUS_ELEMENT'),
};
