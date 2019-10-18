import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const GET_MENU = createRequestType('GET_MENU');
const GET_ACL = createRequestType('GET_ACL');
const GET_GRUP = createRequestType('GET_GRUP');
const SAVE_ACL = createRequestType('SAVE_ACL');

export default {
    GET_MENU_REQUEST: GET_MENU[REQUEST],
    GET_MENU_SUCCESS: GET_MENU[SUCCESS],
    GET_MENU_FAILURE: GET_MENU[FAILURE],

    GET_ACL_REQUEST: GET_ACL[REQUEST],
    GET_ACL_SUCCESS: GET_ACL[SUCCESS],
    GET_ACL_FAILURE: GET_ACL[FAILURE],

    GET_GRUP_REQUEST: GET_GRUP[REQUEST],
    GET_GRUP_SUCCESS: GET_GRUP[SUCCESS],
    GET_GRUP_FAILURE: GET_GRUP[FAILURE],

    SAVE_ACL_REQUEST: SAVE_ACL[REQUEST],
    SAVE_ACL_SUCCESS: SAVE_ACL[SUCCESS],
    SAVE_ACL_FAILURE: SAVE_ACL[FAILURE],

    CHECKED_CHANGE_ACL: createType('CHECKED_CHANGE_ACL'),
    EXPANDED_CHANGE_ACL: createType('EXPANDED_CHANGE_ACL'),
    SELECTED_CHANGE_ACL: createType('SELECTED_CHANGE_ACL'),
    CHANGE_GRUP: createType('CHANGE_GRUP'),
    POPULATE_FORM: createType('POPULATE_FORM'),
    OPEN_FORM: createType('OPEN_FORM'),
    EDIT: createType('EDIT'),
    CANCEL: createType('CANCEL'),
    READY: createType('READY'),
    RESET: createType('RESET'),
    ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
}