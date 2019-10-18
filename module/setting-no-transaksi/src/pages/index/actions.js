import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

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
    settingCounter: {
        request: (resource, data) => createAction(
            actionTypes.SAVE_SETTING_COUNTER_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.SAVE_SETTING_COUNTER_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.SAVE_SETTING_COUNTER_FAILURE,
            { error },
            { resource }
        )
    },
    onChangeCounter: (resource, data) => createAction(actionTypes.CHANGE_COUNTER, { data }, { resource }),
    onChangeSelect2: (resource, name, data) => createAction(actionTypes.CHANGE_SELECT2, { name, data }, { resource }),
    onSettingCounter: (resource) => createAction(
        actionTypes.SETTING_COUNTER,
        {},
        {
            resource,
            log: createActivity(resource, activity.MASUK_FORM, 'Tampil dialog setting counter')
        }
    ),
    onCancelSettingCounter: (resource) => createAction(
        actionTypes.CANCEL_SETTING_COUNTER, {}, {
        resource,
        log: createActivity(resource, activity.CANCEL, 'Batal setting counter')
    }),
}
