import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;

const { REQUEST, SUCCESS, FAILURE } = types;
const GET_ALL = createRequestType('LOAD_DATA');
const SAVE = createRequestType('SAVE_DATA');
const DELETE = createRequestType('DELETE_DATA');

export const moduleActionTypes = {
    GET_ALL_REQUEST: GET_ALL[REQUEST],
    GET_ALL_SUCCESS: GET_ALL[SUCCESS],
    GET_ALL_FAILURE: GET_ALL[FAILURE],

    SAVE_REQUEST: SAVE[REQUEST],
    SAVE_SUCCESS: SAVE[SUCCESS],
    SAVE_FAILURE: SAVE[FAILURE],

    DELETE_REQUEST: DELETE[REQUEST],
    DELETE_SUCCESS: DELETE[SUCCESS],
    DELETE_FAILURE: DELETE[FAILURE],

    RESET: createType('RESET'),
    LOAD_ALL: createType('LOAD_DATA'),
    ADD: createType('ADD'),
    EDIT: createType('EDIT'),
    DELETE: createType('DELETE'),
    SELECTED: createType('SELECTED'),
    CANCEL: createType('CANCEL'),
    READY: createType('READY'),
    OPEN_FORM: createType('OPEN_FORM'),
    AFTER_SAVE: createType('AFTER_SAVE'),
    CHANGE_INPUT: createType('CHANGE_INPUT'),
    ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
}

export const filterActionTypes = {
    RESET: createType('RESET_FILTER'),
    FILTER_CHANGE: createType('CHANGE_FILTER'),
    FILTER_SUBMIT: createType('SUBMIT_FILTER'),
}
