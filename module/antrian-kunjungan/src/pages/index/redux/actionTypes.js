import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;

const { REQUEST, SUCCESS, FAILURE } = types;
const GET_ALL = createRequestType('LOAD_DATA');
const GET_DPJP = createRequestType('GET_DPJP');
const POPULATE_FORM = createRequestType('POPULATE_FORM');

export default {
  POPULATE_FORM_REQUEST: POPULATE_FORM[REQUEST],
  POPULATE_FORM_SUCCESS: POPULATE_FORM[SUCCESS],
  POPULATE_FORM_FAILURE: POPULATE_FORM[FAILURE],

  GET_ALL_REQUEST: GET_ALL[REQUEST],
  GET_ALL_SUCCESS: GET_ALL[SUCCESS],
  GET_ALL_FAILURE: GET_ALL[FAILURE],

  GET_DPJP_REQUEST: GET_DPJP[REQUEST],
  GET_DPJP_SUCCESS: GET_DPJP[SUCCESS],
  GET_DPJP_FAILURE: GET_DPJP[FAILURE],

  INPUT_CHANGE_FILTER: createType('INPUT_CHANGE_FILTER'),
  SUBMIT_FILTER: createType('SUBMIT_FILTER'),
  ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
  RESET_FILTER: createType('RESET_FILTER'),
  RESET: createType('RESET'),
  READY: createType('READY'),
  OPEN_FORM: createType('OPEN_FORM'),
  LOAD_ALL: createType('LOAD_DATA'),
  CHANGE_SELECT2: createType('CHANGE_SELECT2'),
};
