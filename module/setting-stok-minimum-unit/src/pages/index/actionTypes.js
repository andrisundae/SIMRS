import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;

const { REQUEST, SUCCESS, FAILURE } = types;
const GET_UNIT_FARMASI = createRequestType('GET_UNIT_FARMASI');

export default {
  GET_UNIT_FARMASI_REQUEST: GET_UNIT_FARMASI[REQUEST],
  GET_UNIT_FARMASI_SUCCESS: GET_UNIT_FARMASI[SUCCESS],
  GET_UNIT_FARMASI_FAILURE: GET_UNIT_FARMASI[FAILURE],

  CHANGE_SELECT: createType('CHANGE_SELECT'),
};
