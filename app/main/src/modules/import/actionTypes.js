import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;

const { REQUEST, SUCCESS, FAILURE } = types;
const GET_ACL = createRequestType('GET_ACL');

export default {
    GET_ACL_REQUEST: GET_ACL[REQUEST],
    GET_ACL_SUCCESS: GET_ACL[SUCCESS],
    GET_ACL_FAILURE: GET_ACL[FAILURE],

    OPEN_FORM: createType('OPEN_FORM'),
    POPULATE_FORM: createType('POPULATE_FORM'),
    CHANGE_INPUT: createType('CHANGE_INPUT'),
    CHANGE_FILE: createType('CHANGE_FILE'),
    IMPORT: createType('IMPORT'),
    IMPORT_SUCCESS: createType('IMPORT_SUCCESS'),
    IMPORT_FAILURE: createType('IMPORT_FAILURE'),
    START_IMPORT: createType('START_IMPORT'),
    STARTED_UPLOAD: createType('STARTED_UPLOAD'),
    READY: createType('READY'),
    RESET: createType('RESET'),
    ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
    CONNECTED_SOCKET: createType('CONNECTED_SOCKET'),
    DISCONNECTED_SOCKET: createType('DISCONNECTED_SOCKET'),
}
