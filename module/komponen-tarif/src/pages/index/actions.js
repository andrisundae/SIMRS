import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
    getPenanggungJawab: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_PENANGGUNGJAWAB_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_PENANGGUNGJAWAB_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_PENANGGUNGJAWAB_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onChangePenanggungJawab: (resource, data) => createAction(actionTypes.CHANGE_PENANGGUNGJAWAB, { data }, { resource }),
}
