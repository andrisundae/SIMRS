import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;

const { REQUEST, SUCCESS, FAILURE } = types;
const GET_ALL = createRequestType('LOAD_DATA');
const SAVE = createRequestType('SAVE_DATA');
const GET_KELAS = createRequestType('GET_KELAS');
const POPULATE_FORM = createRequestType('POPULATE_FORM');

export const moduleActionTypes = {
    GET_ALL_REQUEST: GET_ALL[REQUEST],
    GET_ALL_SUCCESS: GET_ALL[SUCCESS],
    GET_ALL_FAILURE: GET_ALL[FAILURE],

    SAVE_REQUEST: SAVE[REQUEST],
    SAVE_SUCCESS: SAVE[SUCCESS],
    SAVE_FAILURE: SAVE[FAILURE],

    RESET: createType('RESET'),
    LOAD_ALL: createType('LOAD_DATA'),
    EDIT: createType('EDIT'),
    DELETE: createType('DELETE'),
    SELECTED: createType('SELECTED'),
    CANCEL: createType('CANCEL'),
    READY: createType('READY'),
    OPEN_FORM: createType('OPEN_FORM'),
    CHANGE_STOCK: createType('CHANGE_STOCK'),
}

export const filterActionTypes = {
    RESET: createType('RESET_FILTER'),
    FILTER_CHANGE: createType('CHANGE_FILTER'),
    FILTER_SUBMIT: createType('SUBMIT_FILTER'),

    GET_KELAS_REQUEST: GET_KELAS[REQUEST],
    GET_KELAS_SUCCESS: GET_KELAS[SUCCESS],
    GET_KELAS_FAILURE: GET_KELAS[FAILURE],

    POPULATE_FORM_REQUEST: POPULATE_FORM[REQUEST],
    POPULATE_FORM_SUCCESS: POPULATE_FORM[SUCCESS],
    POPULATE_FORM_FAILURE: POPULATE_FORM[FAILURE],

    CHANGE_UNIT_LAYANAN: createType('CHANGE_UNIT_LAYANAN'),
    CHANGE_KELAS: createType('CHANGE_KELAS'),
    ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
}
