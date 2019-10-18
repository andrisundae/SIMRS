import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const LOAD_ALL = createRequestType('LOAD_DATA');

export default {
    LOAD_ALL_REQUEST: LOAD_ALL[REQUEST],
    LOAD_ALL_SUCCESS: LOAD_ALL[SUCCESS],
    LOAD_ALL_FAILURE: LOAD_ALL[FAILURE],

    POPULATE_FORM: createType('POPULATE_FORM'),
    CHANGE_TARIF: createType('CHANGE_TARIF'),
    SELECTION_CHANGED: createType('SELECTION_CHANGED'),
    SELECTED_ROW: createType('SELECTED_ROW'),
    REDIRECT_TINDAKAN: createType('REDIRECT_TINDAKAN'),
}