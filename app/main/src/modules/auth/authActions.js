import { redux } from '@simrs/common';
import { activity, logActions } from '../log';

const { types, createRequestType, createAction, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const { createActivity } = logActions;


const LOGIN = createRequestType('LOGIN');
const LOGOUT = createRequestType('LOGOUT');
const RESET_PASSWORD = createRequestType('RESET_PASSWORD');
const FORCE_LOGOUT = createRequestType('FORCE_LOGOUT');

export const actionTypes = {
    LOGIN_REQUEST: LOGIN[REQUEST],
    LOGIN_SUCCESS: LOGIN[SUCCESS],
    LOGIN_FAILURE: LOGIN[FAILURE],

    LOGOUT_REQUEST: LOGOUT[REQUEST],
    LOGOUT_SUCCESS: LOGOUT[SUCCESS],
    LOGOUT_FAILURE: LOGOUT[FAILURE],

    RESET_PASSWORD_REQUEST: RESET_PASSWORD[REQUEST],
    RESET_PASSWORD_SUCCESS: RESET_PASSWORD[SUCCESS],
    RESET_PASSWORD_FAILURE: RESET_PASSWORD[FAILURE],

    FORCE_LOGOUT_REQUEST: FORCE_LOGOUT[REQUEST],
    FORCE_LOGOUT_SUCCESS: FORCE_LOGOUT[SUCCESS],
    FORCE_LOGOUT_FAILURE: FORCE_LOGOUT[FAILURE],

    USER_LOGIN: createType('USER_LOGIN'),
    FORCE_LOGIN: createType('FORCE_LOGIN'),
    USER_LOGOUT: createType('USER_LOGOUT'),
    USER_CHECK: createType('USER_CHECK'),
    USER_IS_LOGON: createType('USER_IS_LOGON'),
    USER_LOGIN_SUCCESS: createType('USER_LOGIN_SUCCESS'),
    // LOGIN_FORM_SUBMITTED: createType('LOGIN_FORM_SUBMITTED'),
    LOGIN_FORCE_SHOW_DIALOG: createType('LOGIN_FORCE_SHOW_DIALOG'),
    LOGIN_RESET: createType('LOGIN_RESET')
}

export default {
    login: {
        request: (data) => createAction(
            actionTypes.LOGIN_REQUEST,
            { data },
            { log: createActivity('_auth_personel', activity.LOGIN) }
        ),
        requestSuccess: (data) => createAction(
            actionTypes.LOGIN_SUCCESS,
            { data },
            { log: createActivity('_auth_personel', activity.LOGIN, 'sukses') }
        ),
        requestFailure: (error) => createAction(
            actionTypes.LOGIN_FAILURE,
            { error },
            { log: createActivity('_auth_personel', activity.LOGIN, 'gagal') }
        ),
    },
    logout: {
        request: (user) => createAction(
            actionTypes.LOGOUT_REQUEST,
            { user },
            { log: createActivity('_auth_personel', activity.LOGOUT) }
        ),
        requestSuccess: (data) => createAction(
            actionTypes.LOGOUT_SUCCESS,
            { data },
            { log: createActivity('_auth_personel', activity.LOGOUT, 'sukses') }
        ),
        requestFailure: (error) => createAction(
            actionTypes.LOGOUT_FAILURE,
            { error },
            { log: createActivity('_auth_personel', activity.LOGOUT, 'gagal') }
        ),
    },
    // onSubmitted: (isSubmitted, errors) => createAction(
    //     actionTypes.LOGIN_FORM_SUBMITTED,
    //     { isSubmitted, errors },
    //     {}
    // ),
    showDialogForceLogin: (isShow) => createAction(
        actionTypes.LOGIN_FORCE_SHOW_DIALOG,
        { isShow },
        {}
    ),
    onReset: () => createAction(actionTypes.LOGIN_RESET,{},{}),
    // userLogin: (data) => createAction(
    //     actionTypes.USER_LOGIN,
    //     { data },
    //     {}
    // ),
    forceLogin: (data) => createAction(
        actionTypes.FORCE_LOGIN,
        { data },
        { log: createActivity('_auth_personel', activity.FORCE_LOGIN) }
    ),
    // userLogout: () => createAction(actionTypes.USER_LOGOUT, {}, {}),
    userCheck: (data) => createAction(
        actionTypes.USER_CHECK,
        { data },
        {}
    ),
    // userLoginSuccess: (data) => createAction(
    //     actionTypes.USER_LOGIN_SUCCESS,
    //     { data },
    //     {}
    // ),
    isUserLogOn: () => createAction(actionTypes.USER_IS_LOGON, {}, {}),
    resetPassword: {
        request: (resource, data) => createAction(
            actionTypes.RESET_PASSWORD_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.RESET_PASSWORD) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.RESET_PASSWORD_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.RESET_PASSWORD, 'sukses') }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.RESET_PASSWORD_SUCCESS,
            { error },
            { resource, log: createActivity(resource, activity.RESET_PASSWORD, 'gagal') }
        ),
    },
    forceLogout: {
        request: (resource, data) => createAction(
            actionTypes.FORCE_LOGOUT_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.FORCE_LOGOUT) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.FORCE_LOGOUT_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.FORCE_LOGOUT, 'sukses') }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.FORCE_LOGOUT_SUCCESS,
            { error },
            { resource, log: createActivity(resource, activity.FORCE_LOGOUT, 'gagal') }
        ),
    }
}
