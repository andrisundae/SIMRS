import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import { moduleActionTypes, filterActionTypes } from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export const moduleActions = {
    loadAll: {
        request: (resource, data, tableParams) => createAction(
            moduleActionTypes.LOAD_ALL_REQUEST,
            { data },
            { resource, tableParams }
        ),
        requestSuccess: (resource, data) => createAction(
            moduleActionTypes.LOAD_ALL_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            moduleActionTypes.LOAD_ALL_FAILURE,
            { error },
            { resource }
        )
    },
    save: {
        request: (resource, data) => createAction(
            moduleActionTypes.SAVE_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN) }
        ),
        requestSuccess: (resource, data) => createAction(
            moduleActionTypes.SAVE_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
        ),
        requestFailure: (resource, errors) => createAction(
            moduleActionTypes.SAVE_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
        )
    },
    onSelected: (resource, data) => createAction(moduleActionTypes.SELECTED, { data }, { resource }),
    onReady: (resource) => createAction(moduleActionTypes.READY, {}, { resource }),
    openForm: (resource) => createAction(
        moduleActionTypes.OPEN_FORM, {}, { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
    onSelectionChanged: (resource, data) => createAction(
        moduleActionTypes.SELECTION_CHANGED, { data }, { resource }
    ),
}

export const filterActions = {
    onChangeFilter: (resource, data) => createAction(filterActionTypes.FILTER_CHANGE, { data }, { resource }),
    filter: {
        onSubmit: (resource, data) => createAction(
            filterActionTypes.FILTER_SUBMIT,
            { data },
            { resource, log: createActivity(resource, activity.CARI) }
        ),
        onSubmitSuccess: (resource, data) => createAction(
            filterActionTypes.FILTER_SUBMIT_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.CARI, 'sukses') }
        ),
        onSubmitFailure: (resource, errors) => createAction(
            filterActionTypes.FILTER_SUBMIT_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.CARI, 'gagal') }
        ),
    },
    onReset: (resource) => createAction(filterActionTypes.RESET, {}, { resource }),
    populateForm: {
        request: (resource) => createAction(
            filterActionTypes.POPULATE_FORM_REQUEST,
            {},
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            filterActionTypes.POPULATE_FORM_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            filterActionTypes.POPULATE_FORM_FAILURE,
            { error },
            { resource }
        )
    },
    onChangeVersiTarif: (resource, data) => createAction(
        filterActionTypes.CHANGE_VERSITARIF, { data }, { resource }
    ),
    onChangeKelas: (resource, data) => createAction(
        filterActionTypes.CHANGE_KELAS, { data }, { resource }
    ),
    onChangeKlasifikasi: (resource, data) => createAction(
        filterActionTypes.CHANGE_KLASIFIKASI, { data }, { resource }
    ),
    onChangeStatus: (resource, data) => createAction(
        filterActionTypes.CHANGE_STATUS, { data }, { resource }
    ),
    onChangeFilterIndex: (resource, data) => createAction(
        filterActionTypes.CHANGE_FILTER_INDEX, { data }, { resource }
    ),
    onFocusElement: (resource, element) => createAction(
        filterActionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource }
    ),
    getKelompok: {
        request: (resource, subResource, data) => createAction(
            filterActionTypes.GET_OPTIONS_KELOMPOK_REQUEST,
            { data },
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            filterActionTypes.GET_OPTIONS_KELOMPOK_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            filterActionTypes.GET_OPTIONS_KELOMPOK_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    onChangeKelompok: (resource, data) => createAction(
        filterActionTypes.CHANGE_KELOMPOK, { data }, { resource }
    ),
}
