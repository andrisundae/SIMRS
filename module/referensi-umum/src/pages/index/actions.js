import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
    getOptionsReferensi: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_REFERENSI_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_REFERENSI_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_REFERENSI_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onChangeReferensi: (resource, data) => createAction(actionTypes.CHANGE_REFERENSI, { data }, { resource }),
}
