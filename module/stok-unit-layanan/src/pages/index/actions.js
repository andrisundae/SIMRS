import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import {moduleActionTypes, filterActionTypes} from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export const moduleActions = {
    getAll: {
        request: (resource, data) => createAction(
            moduleActionTypes.GET_ALL_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            moduleActionTypes.GET_ALL_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            moduleActionTypes.GET_ALL_FAILURE,
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
    loadAll: (resource, data, tableParams) => createAction(
        moduleActionTypes.LOAD_ALL,
        { data },
        { tableParams, resource }
    ),
    onEdit: (resource) => createAction(
        moduleActionTypes.EDIT, {}, { resource, log: createActivity(resource, activity.TAMBAH) }
    ),
    onSelected: (resource, data) => createAction(moduleActionTypes.SELECTED, { data }, { resource }),
    onCancel: (resource) => createAction(
        moduleActionTypes.CANCEL, {}, { resource, log: createActivity(resource, activity.BATAL) }
    ),
    onReady: (resource) => createAction(moduleActionTypes.READY, {}, { resource }),
    openForm: (resource) => createAction(
        moduleActionTypes.OPEN_FORM, {}, { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
    onChangeStok: (resource, column, data) => createAction(
        moduleActionTypes.CHANGE_STOCK, { data, column }, { resource }
    ),
}

export const filterActions = {
    onChangeFilter: (resource, data) => createAction(filterActionTypes.FILTER_CHANGE, { data }, { resource }),
    onSubmitFilter: (resource, data) => createAction(
        filterActionTypes.FILTER_SUBMIT,
        { data },
        { resource, log: createActivity(resource, activity.CARI) }
    ),
    onReset: (resource) => createAction(filterActionTypes.RESET, {}, { resource }),
    getKelas: {
        request: (resource, data) => createAction(
            filterActionTypes.GET_KELAS_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            filterActionTypes.GET_KELAS_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            filterActionTypes.GET_KELAS_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: {
        request: (resource, data) => createAction(
            filterActionTypes.POPULATE_FORM_REQUEST,
            { data },
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
    onChangeUnitLayanan: (resource, data) => createAction(
        filterActionTypes.CHANGE_UNIT_LAYANAN, { data }, { resource }
    ),
    onChangeKelas: (resource, data) => createAction(
        filterActionTypes.CHANGE_KELAS, { data }, { resource }
    ),
    onFocusElement: (resource, element) => createAction(
        filterActionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource }
    ),
}
