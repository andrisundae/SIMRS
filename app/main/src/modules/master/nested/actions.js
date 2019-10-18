import { redux } from '@simrs/common';
import { moduleActionTypes, filterActionTypes } from './actionTypes';
import { activity, logActions } from '../../log';

const { createActivity } = logActions;
const { createAction } = redux;

export const moduleActions = {
    getAll: {
        request: (resource, subResource, data) => createAction(
            moduleActionTypes.GET_ALL_REQUEST,
            { data },
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            moduleActionTypes.GET_ALL_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            moduleActionTypes.GET_ALL_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    save: {
        request: (resource, subResource, data) => createAction(
            moduleActionTypes.SAVE_REQUEST,
            { data },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, subResource) }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            moduleActionTypes.SAVE_SUCCESS,
            { data },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, `${subResource}#sukses`) }
        ),
        requestFailure: (resource, subResource, errors) => createAction(
            moduleActionTypes.SAVE_FAILURE,
            { errors },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, `${subResource}#gagal`) }
        )
    },
    delete: {
        request: (resource, subResource, data) => createAction(
            moduleActionTypes.DELETE_REQUEST,
            { data },
            { resource, subResource, log: createActivity(resource, activity.HAPUS, `${subResource}`) }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            moduleActionTypes.DELETE_SUCCESS,
            { data },
            { resource, subResource, log: createActivity(resource, activity.HAPUS, `${subResource}#sukses`) }
        ),
        requestFailure: (resource, subResource, errors) => createAction(
            moduleActionTypes.DELETE_FAILURE,
            { errors },
            { resource, subResource, log: createActivity(resource, activity.HAPUS, `${subResource}#gagal`) }
        )
    },
    loadAll: (resource, subResource, data, tableParams) => createAction(
        moduleActionTypes.LOAD_ALL,
        { data },
        { tableParams, resource, subResource }
    ),
    onAdd: (resource, subResource) => createAction(
        moduleActionTypes.ADD,
        {},
        { resource, subResource, log: createActivity(resource, activity.TAMBAH, subResource) }
    ),
    onEdit: (resource, subResource) => createAction(
        moduleActionTypes.EDIT,
        {},
        { resource, subResource, log: createActivity(resource, activity.TAMBAH, subResource) }
    ),
    onSelected: (resource, subResource, data) => createAction(
        moduleActionTypes.SELECTED,
        { data },
        { resource, subResource }
    ),
    onCancel: (resource, subResource) => createAction(
        moduleActionTypes.CANCEL,
        {},
        { resource, subResource, log: createActivity(resource, activity.BATAL, subResource) }
    ),
    onReady: (resource, subResource) => createAction(
        moduleActionTypes.READY,
        {},
        { resource, subResource }
    ),
    openForm: (resource, subResource, data = {}) => createAction(
        moduleActionTypes.OPEN_FORM,
        { data },
        { resource, subResource, log: createActivity(resource, activity.MASUK_FORM, subResource) }
    ),
    onAfterSave: (resource, subResource) => createAction(
        moduleActionTypes.AFTER_SAVE,
        {},
        { resource, subResource }
    ),
    onChangeInput: (resource, subResource, data) => createAction(
        moduleActionTypes.CHANGE_INPUT,
        { data },
        { resource, subResource }
    ),
    onFocusElement: (resource, subResource, element) => createAction(
        moduleActionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource, subResource }
    ),
    populateForm: (resource) => createAction(moduleActionTypes.POPULATE_FORM, {}, { resource }),
}

export const filterActions = {
    onChangeFilter: (resource, subResource, data) => createAction(
        filterActionTypes.FILTER_CHANGE,
        { data },
        { resource, subResource }
    ),
    onSubmitFilter: (resource, subResource, data) => createAction(
        filterActionTypes.FILTER_SUBMIT,
        { data },
        { resource, subResource, log: createActivity(resource, activity.CARI, subResource) }
    ),
    onReset: (resource, subResource) => createAction(
        filterActionTypes.RESET,
        {},
        { resource, subResource }
    ),
}
