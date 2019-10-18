import {redux} from '@simrs/common';
import { actionTypes } from '@simrs/main/src/modules/import';

const {types, createRequestType, createType} = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const GET_VERSI = createRequestType('GET_VERSI');

export default {
    ...actionTypes,
    GET_VERSI_REQUEST: GET_VERSI[REQUEST],
    GET_VERSI_SUCCESS: GET_VERSI[SUCCESS],
    GET_VERSI_FAILURE: GET_VERSI[FAILURE],
    CHANGE_VERSI: createType('CHANGE_VERSI'),
}