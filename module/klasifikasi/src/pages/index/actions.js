import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
    getJenisKlasifikasi: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_JENISKLASIFIKASI_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_JENISKLASIFIKASI_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_JENISKLASIFIKASI_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onChangeJenisKlasifikasi: (resource, data) => createAction(actionTypes.CHANGE_JENISKLASIFIKASI, { data }, { resource }),
}
