import { redux } from '@simrs/common';
import { activity, logActions } from '../../log';
import {
    moduleActionTypes,
    filterActionTypes,
    sumberLainActionTypes,
    sumberActionTypes,
    settingActionTypes
}
    from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export const moduleActions = {
    openForm: (resource) => createAction(
        moduleActionTypes.OPEN_FORM, {}, { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
    populateForm: {
        request: (resource, data) => createAction(
            moduleActionTypes.POPULATE_FORM_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            moduleActionTypes.POPULATE_FORM_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            moduleActionTypes.POPULATE_FORM_FAILURE,
            { error },
            { resource }
        )
    },
    onFocusElement: (resource, element) => createAction(
        moduleActionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource }
    ),
}

export const sumberLainActions = {
    populateForm: {
        request: (resource, data) => createAction(
            sumberLainActionTypes.POPULATE_FORM_SUMBERLAIN_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            sumberLainActionTypes.POPULATE_FORM_SUMBERLAIN_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            sumberLainActionTypes.POPULATE_FORM_SUMBERLAIN_FAILURE,
            { error },
            { resource }
        )
    },
    onSelect2Change: (resource, name, data) => createAction(
        sumberLainActionTypes.CHANGE_SELECT2_SUMBERLAIN,
        { name, data },
        { resource }
    ),
}

export const filterActions = {
    populateForm: {
        request: (resource, data) => createAction(
            filterActionTypes.POPULATE_FORM_FILTER_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            filterActionTypes.POPULATE_FORM_FILTER_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            filterActionTypes.POPULATE_FORM_FILTER_FAILURE,
            { error },
            { resource }
        )
    },
    onSelect2Change: (resource, name, data) => createAction(
        filterActionTypes.CHANGE_SELECT2_FILTER,
        { name, data },
        { resource }
    ),
}

export const sumberActions = {
    getAll: {
        request: (resource, data, tableParams) => createAction(
            sumberActionTypes.LOAD_DATA_SUMBER_REQUEST,
            { data },
            { resource, tableParams }
        ),
        requestSuccess: (resource, data) => createAction(
            sumberActionTypes.LOAD_DATA_SUMBER_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            sumberActionTypes.LOAD_DATA_SUMBER_FAILURE,
            { error },
            { resource }
        )
    },
    push: {
        request: (resource, data) => createAction(
            sumberActionTypes.PUSH_DATA_SUMBER_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            sumberActionTypes.PUSH_DATA_SUMBER_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            sumberActionTypes.PUSH_DATA_SUMBER_FAILURE,
            { error },
            { resource }
        )
    },
    pushAll: {
        request: (resource, data) => createAction(
            sumberActionTypes.PUSHALL_DATA_SUMBER_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            sumberActionTypes.PUSHALL_DATA_SUMBER_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            sumberActionTypes.PUSHALL_DATA_SUMBER_FAILURE,
            { error },
            { resource }
        )
    },
    onChangeInput: (resource, data) => createAction(sumberActionTypes.CHANGE_INPUT_SUMBER, { data }, { resource }),
    onSearch: (resource, data) => createAction(
        sumberActionTypes.SEARCH_SUMBER,
        { data },
        { resource, log: createActivity(resource, activity.CARI) }
    ),
    onSelectionChanged: (resource, data) => createAction(
        sumberActionTypes.SELECTION_SUMBER_CHANGED, { data }, { resource }
    ),
}

export const settingActions = {
    getAll: {
        request: (resource, data, tableParams) => createAction(
            settingActionTypes.LOAD_DATA_SETTING_REQUEST,
            { data },
            { resource, tableParams }
        ),
        requestSuccess: (resource, data) => createAction(
            settingActionTypes.LOAD_DATA_SETTING_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            settingActionTypes.LOAD_DATA_SETTING_FAILURE,
            { error },
            { resource }
        )
    },
    revert: {
        request: (resource, data) => createAction(
            settingActionTypes.REVERT_DATA_SETTING_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            settingActionTypes.REVERT_DATA_SETTING_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            settingActionTypes.REVERT_DATA_SETTING_FAILURE,
            { error },
            { resource }
        )
    },
    revertAll: {
        request: (resource, data) => createAction(
            settingActionTypes.REVERTALL_DATA_SETTING_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            settingActionTypes.REVERTALL_DATA_SETTING_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            settingActionTypes.REVERTALL_DATA_SETTING_FAILURE,
            { error },
            { resource }
        )
    },
    onChangeInput: (resource, data) => createAction(settingActionTypes.CHANGE_INPUT_SETTING, { data }, { resource }),
    onChangeInputData: (resource, data) => createAction(settingActionTypes.CHANGE_INPUT_DATA_SETTING, { data }, { resource }),
    onSearch: (resource, data) => createAction(
        settingActionTypes.SEARCH_SETTING,
        { data },
        { resource, log: createActivity(resource, activity.CARI) }
    ),
    onSelectionChanged: (resource, data) => createAction(
        settingActionTypes.SELECTION_SETTING_CHANGED, { data }, { resource }
    ),
}
