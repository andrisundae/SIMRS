import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const GET_ALL = createRequestType('LOAD_DATA');
const GET_HEADER_KOMPONEN = createRequestType('GET_HEADER_KOMPONEN_DATA');
const POPULATE_FORM = createRequestType('POPULATE_FORM');
const EXPORT = createRequestType('EXPORT');

export default {
    GET_ALL_REQUEST: GET_ALL[REQUEST],
    GET_ALL_SUCCESS: GET_ALL[SUCCESS],
    GET_ALL_FAILURE: GET_ALL[FAILURE],

    GET_HEADER_KOMPONEN_REQUEST: GET_HEADER_KOMPONEN[REQUEST],
    GET_HEADER_KOMPONEN_SUCCESS: GET_HEADER_KOMPONEN[SUCCESS],
    GET_HEADER_KOMPONEN_FAILURE: GET_HEADER_KOMPONEN[FAILURE],

    EXPORT_REQUEST: EXPORT[REQUEST],
    EXPORT_SUCCESS: EXPORT[SUCCESS],
    EXPORT_FAILURE: EXPORT[FAILURE],

    LOAD_ALL: createType('LOAD_DATA'),
    OPEN_FORM: createType('OPEN_FORM'),
    CHANGE_STOCK: createType('CHANGE_STOCK'),

    RESET: createType('RESET_FILTER'),
    FILTER_SUBMIT: createType('SUBMIT_FILTER'),
    FILTER_SUBMIT_SUCCESS: createType('FILTER_SUBMIT_SUCCESS'),
    FILTER_SUBMIT_FAILURE: createType('FILTER_SUBMIT_FAILURE'),

    POPULATE_FORM_REQUEST: POPULATE_FORM[REQUEST],
    POPULATE_FORM_SUCCESS: POPULATE_FORM[SUCCESS],
    POPULATE_FORM_FAILURE: POPULATE_FORM[FAILURE],

    CHANGE_VERSI_TARIF: createType('CHANGE_VERSI_TARIF'),
    CHANGE_COLUMN_ORDER: createType('CHANGE_COLUMN_ORDER'),
    CHANGE_JENIS_EKSPOR: createType('CHANGE_JENIS_EKSPOR'),
    CHANGE_ORDER: createType('CHANGE_ORDER'),
    ADD_ORDER: createType('ADD_ORDER'),
    REMOVE_ORDER: createType('REMOVE_ORDER'),
    ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
}