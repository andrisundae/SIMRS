import {redux} from '@simrs/common';

import actionTypes from './actionTypes';

const {createAction} = redux;

export default {
    getAturanAplikasi: {
        request: (resource) => createAction(
            actionTypes.GET_ATURAN_APLIKASI_REQUEST,
            {},
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_ATURAN_APLIKASI_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_ATURAN_APLIKASI_FAILURE,
            { error },
            { resource }
        ),
    }
}
