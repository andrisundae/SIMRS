import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import { filterActionTypes } from '@simrs/main/src/modules/master/nested';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
    loadAll: {
        request: (resource, subResource, data, tableParams) => createAction(
            actionTypes.LOAD_ALL_REQUEST,
            { data },
            { tableParams, resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.LOAD_ALL_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.LOAD_ALL_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    populateForm: {
        request: (resource, subResource) => createAction(
            actionTypes.POPULATE_FORM_REQUEST,
            {},
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.POPULATE_FORM_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.POPULATE_FORM_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    getKelompok: {
        request: (resource, subResource, data) => createAction(
            actionTypes.GET_OPTIONS_KELOMPOK_REQUEST,
            { data },
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.GET_OPTIONS_KELOMPOK_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.GET_OPTIONS_KELOMPOK_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    filter: {
        onSubmit: (resource, subResource, data) => createAction(
            filterActionTypes.FILTER_SUBMIT,
            { data },
            { resource, subResource, log: createActivity(resource, activity.CARI) }
        ),
        onSubmitSuccess: (resource, subResource, data) => createAction(
            actionTypes.FILTER_SUBMIT_SUCCESS,
            { data },
            { resource, subResource, log: createActivity(resource, activity.CARI, 'sukses') }
        ),
        onSubmitFailure: (resource, subResource, errors) => createAction(
            actionTypes.FILTER_SUBMIT_FAILURE,
            { errors },
            { resource, subResource, log: createActivity(resource, activity.CARI, 'gagal') }
        ),
    },
    onChangeStatusNotBalance: (resource, subResource) => createAction(
        actionTypes.STATUS_NOT_BALANCE, {}, { resource, subResource }
    ),
    onChangeKlasifikasi: (resource, subResource, data) => createAction(
        actionTypes.CHANGE_KLASIFIKASI, { data }, { resource, subResource }
    ),
    onChangeVersiTarif: (resource, subResource, data) => createAction(
        actionTypes.CHANGE_VERSITARIF, { data }, { resource, subResource }
    ),
    onChangeKelompok: (resource, subResource, data) => createAction(
        actionTypes.CHANGE_KELOMPOK, { data }, { resource, subResource }
    ),
    onChangeKelas: (resource, subResource, data) => createAction(
        actionTypes.CHANGE_KELAS, { data }, { resource, subResource }
    ),
    onChangeTarif: (resource, subResource, data) => createAction(
        actionTypes.CHANGE_TARIF, { data }, { resource, subResource }
    ),
    onFocusElement: (resource, subResource, element) => createAction(
        actionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource, subResource }
    ),
}
