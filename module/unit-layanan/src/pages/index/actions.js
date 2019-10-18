import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
    getOptionsInstalasi: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_INSTALASI_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_INSTALASI_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_INSTALASI_FAILURE,
            { error },
            { resource }
        )
    },
    getOptionsKategori: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_KATEGORI_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_KATEGORI_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_KATEGORI_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onChangeInstalasi: (resource, data) => createAction(actionTypes.CHANGE_INSTALASI, { data }, { resource }),
    onChangeKategori: (resource, data) => createAction(actionTypes.CHANGE_KATEGORI, { data }, { resource }),
}
