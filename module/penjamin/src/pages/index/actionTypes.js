import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;

const { REQUEST, SUCCESS, FAILURE } = types;
const GET_KELAS = createRequestType('GET_KELAS');

export default {
    GET_KELAS_REQUEST: GET_KELAS[REQUEST],
    GET_KELAS_SUCCESS: GET_KELAS[SUCCESS],
    GET_KELAS_FAILURE: GET_KELAS[FAILURE],

    POPULATE_FORM: createType('POPULATE_FORM'),
    CHANGE_SELECT2: createType('CHANGE_SELECT2'),
}
