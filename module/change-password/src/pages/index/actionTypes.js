import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const SAVE = createRequestType('SAVE_DATA');

export default {
  SAVE_REQUEST: SAVE[REQUEST],
  SAVE_SUCCESS: SAVE[SUCCESS],
  SAVE_FAILURE: SAVE[FAILURE],

  RESET: createType('RESET'),
  READY: createType('READY'),
  OPEN_FORM: createType('OPEN_FORM'),
  POPULATE_FORM: createType('POPULATE_FORM'),
  CHANGE_INPUT: createType('CHANGE_INPUT'),
  ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
};
