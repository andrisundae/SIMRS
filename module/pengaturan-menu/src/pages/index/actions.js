import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
    menu: {
        request: (resource) => createAction(
            actionTypes.GET_MENU_REQUEST,
            {},
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_MENU_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_MENU_FAILURE,
            { error },
            { resource }
        )
    },
    save: {
        request: (resource, data) => createAction(
            actionTypes.SAVE_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.SAVE_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.SAVE_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
        )
    },
    delete: {
        request: (resource, data) => createAction(
            actionTypes.DELETE_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.HAPUS) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.DELETE_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.HAPUS, 'sukses') }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.DELETE_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.HAPUS, 'gagal') }
        )
    },
    saveDetail: {
        request: (resource, data) => createAction(
            actionTypes.SAVE_DETAIL_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.SAVE_DETAIL_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.SAVE_DETAIL_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
        )
    },
    deleteDetail: {
        request: (resource, data) => createAction(
            actionTypes.DELETE_DETAIL_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.HAPUS) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.DELETE_DETAIL_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.HAPUS, 'sukses') }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.DELETE_DETAIL_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.HAPUS, 'gagal') }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    openForm: (resource) => createAction(
        actionTypes.OPEN_FORM,
        {},
        { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
    onExpandedChange: (resource, data) => createAction(actionTypes.EXPANDED, { data }, { resource }),
    onSelectedChange: (resource, data) => createAction(actionTypes.SELECTED, { data }, { resource }),
    onInputChange: (resource, data) => createAction(actionTypes.CHANGE_INPUT, { data }, { resource }),
    onInputDetailChange: (resource, data) => createAction(actionTypes.CHANGE_INPUT_DETAIL, { data }, { resource }),
    onAdd: (resource) => createAction(
        actionTypes.ADD, {}, { resource, log: createActivity(resource, activity.TAMBAH) }
    ),
    onSelectedDetail: (resource, data) => createAction(actionTypes.SELECTED_DETAIL, { data }, { resource }),
    onAddDetail: (resource) => createAction(
        actionTypes.ADD_DETAIL, {}, { resource, log: createActivity(resource, activity.TAMBAH) }
    ),
    onEdit: (resource) => createAction(
        actionTypes.EDIT, {}, { resource, log: createActivity(resource, activity.EDIT) }
    ),
    onCancel: (resource) => createAction(
        actionTypes.CANCEL, {}, { resource, log: createActivity(resource, activity.BATAL) }
    ),
    onCancelDetail: (resource) => createAction(
        actionTypes.CANCEL_DETAIL, {}, { resource, log: createActivity(resource, activity.BATAL) }
    ),
    onReady: (resource) => createAction(actionTypes.READY, {}, { resource }),
    onReadyDetail: (resource) => createAction(actionTypes.READY_DETAIL, {}, { resource }),
    onReset: (resource) => createAction(actionTypes.RESET, {}, { resource }),
    onFocusElement: (resource, element) => createAction(
        actionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource }
    ),
    loadDetail: (resource, data, tableParams) => createAction(
        actionTypes.LOAD_DETAIL,
        { data },
        { tableParams, resource }
    ),
}
