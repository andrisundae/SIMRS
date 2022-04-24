import { redux } from '@simrs/common';

const { types, createRequestType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const GET_ATURAN_APLIKASI = createRequestType('GET_ATURAN_APLIKASI');

export const context = {
  MINCHARPENCARIANMASTER: 'mincharpencarianmaster',
  MINCHARPENCARIANSETTING: 'mincharpencariansetting',
};
const actionTypes = {
  GET_ATURAN_APLIKASI_REQUEST: GET_ATURAN_APLIKASI[REQUEST],
  GET_ATURAN_APLIKASI_SUCCESS: GET_ATURAN_APLIKASI[SUCCESS],
  GET_ATURAN_APLIKASI_FAILURE: GET_ATURAN_APLIKASI[FAILURE],
};
export default actionTypes;
