import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes, { filterIndexActionTypes } from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
    populateForm: {
        request: (resource, data) => createAction(
            actionTypes.POPULATE_FORM_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.POPULATE_FORM_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.POPULATE_FORM_FAILURE,
            { error },
            { resource }
        )
    },
    getGranted: {
        request: () => createAction(
            actionTypes.AUTH_GET_GRANTED_REQUEST,
            {},
            {}
        ),
        requestSuccess: (data) => createAction(
            actionTypes.AUTH_GET_GRANTED_SUCCESS,
            { data },
            {}
        ),
        requestFailure: (error) => createAction(
            actionTypes.AUTH_GET_GRANTED_FAILURE,
            { error },
            {}
        ),
    },
    changeStatusAplikasi: {
        request: (resource, data) => createAction(
            actionTypes.CHANGE_STATUS_APLIKASI_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.KOREKSI, 'Ganti status aplikasi') }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.CHANGE_STATUS_APLIKASI_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.KOREKSI, 'Ganti status aplikasi sukses') }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.CHANGE_STATUS_APLIKASI_FAILURE,
            { error },
            { resource, log: createActivity(resource, activity.KOREKSI, 'Ganti status aplikasi gagal') }
        )
    },
    onSelect2Change: (resource, name, data) => createAction(actionTypes.CHANGE_SELECT2, { name, data }, { resource }),
    onGrupChange: (resource, data) => createAction(actionTypes.CHANGE_GRUP, { data }, { resource })
}

export const uploadGambarActions = {
    save: {
        request: (resource, data) => createAction(
            actionTypes.SAVE_UPLOADGAMBAR_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.SAVE_UPLOADGAMBAR_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.SAVE_UPLOADGAMBAR_FAILURE,
            { error },
            { resource }
        )
    },
    delete: {
        request: (resource, data) => createAction(
            actionTypes.DELETE_UPLOADGAMBAR_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.DELETE_UPLOADGAMBAR_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.DELETE_UPLOADGAMBAR_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: {
        request: (resource, data) => createAction(
            actionTypes.POPULATE_FORM_UPLOADGAMBAR_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.POPULATE_FORM_UPLOADGAMBAR_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.POPULATE_FORM_UPLOADGAMBAR_FAILURE,
            { error },
            { resource }
        )
    },
    detail: {
        request: (resource, data) => createAction(
            actionTypes.GET_UPLOADGAMBAR_DETAIL_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_UPLOADGAMBAR_DETAIL_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_UPLOADGAMBAR_DETAIL_FAILURE,
            { error },
            { resource }
        )
    },
    openUploadGambar: (resource, data) => createAction(
        actionTypes.OPEN_UPLOAD_GAMBAR,
        { data },
        {
            resource,
            log: createActivity(
                resource,
                activity.MASUK_FORM,
                `Open upload gambar personel`
            )
        }
    ),
    closeUploadGambar: (resource) => createAction(
        actionTypes.CLOSE_UPLOAD_GAMBAR,
        {},
        {
            resource,
            log: createActivity(
                resource,
                activity.BATAL,
                `Batal upload gambar personel`
            )
        }
    ),
    onChangePersonel: (resource, data) => createAction(actionTypes.CHANGE_PERSONEL, { data }, { resource }),
    onChangeJenisGambar: (resource, data) => createAction(actionTypes.CHANGE_JENISGAMBAR, { data }, { resource }),
    onChangeImage: (resource, data) => createAction(actionTypes.CHANGE_IMAGE, { data }, { resource }),
}

export const filterIndexActions = {
    onChangeFilterStatusAplikasi: (resource, data) => createAction(filterIndexActionTypes.FILTER_CHANGE_STATUS_APLIKASI, { data }, { resource, log: createActivity(resource, activity.CARI, 'Pencarian dengan status aplikasi') })
}
