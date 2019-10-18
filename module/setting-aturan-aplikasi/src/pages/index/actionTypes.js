import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const SAVE = createRequestType('SAVE_DATA');
const POPULATE_FORM = createRequestType('POPULATE_FORM');

export default {
    SAVE_REQUEST: SAVE[REQUEST],
    SAVE_SUCCESS: SAVE[SUCCESS],
    SAVE_FAILURE: SAVE[FAILURE],

    POPULATE_FORM_REQUEST: POPULATE_FORM[REQUEST],
    POPULATE_FORM_SUCCESS: POPULATE_FORM[SUCCESS],
    POPULATE_FORM_FAILURE: POPULATE_FORM[FAILURE],

    RESET: createType('RESET'),
    READY: createType('READY'),
    OPEN_FORM: createType('OPEN_FORM'),
    CHANGE_INPUT: createType('CHANGE_INPUT'),
    CHANGE_SELECT: createType('CHANGE_SELECT'),
    ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
    EDIT: createType('EDIT'),
    CANCEL: createType('CANCEL'),
}