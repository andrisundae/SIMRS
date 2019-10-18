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
    grup: {
        request: (resource) => createAction(
            actionTypes.GET_GRUP_REQUEST,
            {},
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_GRUP_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_GRUP_FAILURE,
            { error },
            { resource }
        )
    },
    acl: {
        request: (resource, data) => createAction(
            actionTypes.GET_ACL_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_ACL_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_ACL_FAILURE,
            { error },
            { resource }
        )
    },
    save: {
        request: (resource, data) => createAction(
            actionTypes.SAVE_ACL_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.SAVE_ACL_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.SAVE_ACL_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    openForm: (resource) => createAction(
        actionTypes.OPEN_FORM,
        {},
        { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
    onCheckedChange: (resource, data) => createAction(actionTypes.CHECKED_CHANGE_ACL, { data }, { resource }),
    onExpandedChange: (resource, data) => createAction(actionTypes.EXPANDED_CHANGE_ACL, { data }, { resource }),
    onSelectedChange: (resource, data) => createAction(actionTypes.SELECTED_CHANGE_ACL, { data }, { resource }),
    onGrupChange: (resource, data) => createAction(
        actionTypes.CHANGE_GRUP,
        { data },
        { resource }
    ),
    onEdit: (resource) => createAction(
        actionTypes.EDIT, {}, { resource, log: createActivity(resource, activity.EDIT) }
    ),
    onCancel: (resource) => createAction(
        actionTypes.CANCEL, {}, { resource, log: createActivity(resource, activity.BATAL) }
    ),
    onReady: (resource) => createAction(actionTypes.READY, {}, { resource }),
    onReset: (resource) => createAction(actionTypes.RESET, {}, { resource }),
    onFocusElement: (resource, element) => createAction(
        actionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource }
    ),
}
