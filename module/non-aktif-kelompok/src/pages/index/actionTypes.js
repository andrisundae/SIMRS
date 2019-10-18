import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const LOAD_ALL = createRequestType('LOAD_DATA');
const SAVE = createRequestType('SAVE_DATA');
const POPULATE_FORM = createRequestType('POPULATE_FORM');

export const moduleActionTypes = {
    LOAD_ALL_REQUEST: LOAD_ALL[REQUEST],
    LOAD_ALL_SUCCESS: LOAD_ALL[SUCCESS],
    LOAD_ALL_FAILURE: LOAD_ALL[FAILURE],

    SAVE_REQUEST: SAVE[REQUEST],
    SAVE_SUCCESS: SAVE[SUCCESS],
    SAVE_FAILURE: SAVE[FAILURE],

    RESET: createType('RESET'),
    LOAD_ALL: createType('LOAD_DATA'),
    SELECTED: createType('SELECTED'),
    READY: createType('READY'),
    OPEN_FORM: createType('OPEN_FORM'),
    SELECTION_CHANGED: createType('SELECTION_CHANGED'),
}

export const filterActionTypes = {
    RESET: createType('RESET_FILTER'),
    FILTER_CHANGE: createType('CHANGE_FILTER'),
    FILTER_SUBMIT: createType('SUBMIT_FILTER'),
    FILTER_SUBMIT_SUCCESS: createType('FILTER_SUBMIT_SUCCESS'),
    FILTER_SUBMIT_FAILURE: createType('FILTER_SUBMIT_FAILURE'),
    CHANGE_KLASIFIKASI: createType('CHANGE_KLASIFIKASI'),
    CHANGE_STATUS: createType('CHANGE_STATUS'),
    CHANGE_FILTER_INDEX: createType('CHANGE_FILTER_INDEX'),
    ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),

    POPULATE_FORM_REQUEST: POPULATE_FORM[REQUEST],
    POPULATE_FORM_SUCCESS: POPULATE_FORM[SUCCESS],
    POPULATE_FORM_FAILURE: POPULATE_FORM[FAILURE],
}