import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
    getAll: {
        request: (resource, data) => createAction(
            actionTypes.GET_ALL_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_ALL_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_ALL_FAILURE,
            { error },
            { resource }
        )
    },
    getHeaderKomponen: {
        request: (resource, data) => createAction(
            actionTypes.GET_HEADER_KOMPONEN_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_HEADER_KOMPONEN_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.GET_HEADER_KOMPONEN_FAILURE,
            { errors },
            { resource }
        )
    },
    export: {
        request: (resource, data) => createAction(
            actionTypes.EXPORT_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.EXPORT_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.EXPORT_FAILURE,
            { errors },
            { resource }
        )
    },
    filter: {
        onSubmit: (resource, type, data) => createAction(
            actionTypes.FILTER_SUBMIT,
            { data, type },
            { resource, log: createActivity(resource, activity.CARI) }
        ),
        onSubmitSuccess: (resource, type, data) => createAction(
            actionTypes.FILTER_SUBMIT_SUCCESS,
            { data, type },
            { resource, log: createActivity(resource, activity.CARI, 'sukses') }
        ),
        onSubmitFailure: (resource, type, errors) => createAction(
            actionTypes.FILTER_SUBMIT_FAILURE,
            { errors, type },
            { resource, log: createActivity(resource, activity.CARI, 'gagal') }
        ),
    },
    loadAll: (resource, data, tableParams) => createAction(
        actionTypes.LOAD_ALL,
        { data },
        { tableParams, resource }
    ),
    openForm: (resource) => createAction(
        actionTypes.OPEN_FORM, {}, { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
    onSubmitFilter: (resource, data) => createAction(
        actionTypes.FILTER_SUBMIT,
        { data },
        { resource, log: createActivity(resource, activity.CARI) }
    ),
    onReset: (resource) => createAction(actionTypes.RESET, {}, { resource }),
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
    onChangeVersiTarif: (resource, data) => createAction(
        actionTypes.CHANGE_VERSI_TARIF, { data }, { resource }
    ),
    onChangeColumnOrder: (resource, data) => createAction(
        actionTypes.CHANGE_COLUMN_ORDER, { data }, { resource }
    ),
    onChangeOrder: (resource, data) => createAction(
        actionTypes.CHANGE_ORDER, { data }, { resource }
    ),
    onChangeJenisEkspor: (resource, data) => createAction(
        actionTypes.CHANGE_JENIS_EKSPOR, { data }, { resource }
    ),
    addOrder: (resource, data) => createAction(
        actionTypes.ADD_ORDER, { data }, { resource }
    ),
    removeOrder: (resource, data) => createAction(
        actionTypes.REMOVE_ORDER, { data }, { resource }
    ),
    onFocusElement: (resource, element) => createAction(
        actionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource }
    ),
}
