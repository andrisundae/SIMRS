import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;

const { REQUEST, SUCCESS, FAILURE } = types;
const GET_LOG_HARGA = createRequestType('GET_LOG_HARGA');

export default {
  GET_LOG_HARGA_REQUEST: GET_LOG_HARGA[REQUEST],
  GET_LOG_HARGA_SUCCESS: GET_LOG_HARGA[SUCCESS],
  GET_LOG_HARGA_FAILURE: GET_LOG_HARGA[FAILURE],

  SHOW_LOG_HARGA: createType('SHOW_LOG_HARGA'),
};
