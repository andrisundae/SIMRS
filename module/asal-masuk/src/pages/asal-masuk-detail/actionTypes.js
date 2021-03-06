import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const IMPORT_DETAIL = createRequestType('IMPORT_DETAIL');
const GET_OPTIONS_INSTALASI = createRequestType('GET_OPTIONS_INSTALASI');

export default {
    IMPORT_DETAIL_REQUEST: IMPORT_DETAIL[REQUEST],
    IMPORT_DETAIL_SUCCESS: IMPORT_DETAIL[SUCCESS],
    IMPORT_DETAIL_FAILURE: IMPORT_DETAIL[FAILURE],

    GET_OPTIONS_INSTALASI_REQUEST: GET_OPTIONS_INSTALASI[REQUEST],
    GET_OPTIONS_INSTALASI_SUCCESS: GET_OPTIONS_INSTALASI[SUCCESS],
    GET_OPTIONS_INSTALASI_FAILURE: GET_OPTIONS_INSTALASI[FAILURE],

    CHANGE_INSTALASI: createType('CHANGE_INSTALASI'),
    IMPORT_DETAIL: createType('IMPORT_DETAIL'),
    SELECTION_CHANGED_DETAIL: createType('SELECTION_CHANGED_DETAIL'),
    CANCEL_IMPORT_DETAIL: createType('CANCEL_IMPORT_DETAIL'),
    LOAD_DATA_ON_IMPORT_DETAIL: createType('LOAD_DATA_ON_IMPORT_DETAIL'),
    RELOADING_DATA_DETAIL: createType('RELOADING_DATA_DETAIL'),
    RELOADED_DATA_DETAIL: createType('RELOADED_DATA_DETAIL'),
}