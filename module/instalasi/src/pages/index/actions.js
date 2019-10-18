import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
    getOptionsJenisLayanan: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_JENISLAYANAN_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_JENISLAYANAN_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_JENISLAYANAN_FAILURE,
            { error },
            { resource }
        )
    },
    getOptionsKelompokJenisLayanan: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_KELOMPOKJENISLAYANAN_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_KELOMPOKJENISLAYANAN_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_KELOMPOKJENISLAYANAN_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onChangeSelect2: (resource, name, data) => createAction(actionTypes.CHANGE_SELECT2, { name, data }, { resource }),
}
