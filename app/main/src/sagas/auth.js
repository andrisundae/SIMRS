import { put, call, takeLatest, all } from 'redux-saga/effects';

import {createHashHistory} from 'history';

import { loaderActions as loader, notificationActions as notification, alert } from '@simrs/components';

import api from '../services/models/authModel';
import apiMenu from '../services/models/menuModel';
import actions, { actionTypes } from '../modules/auth/authActions';
import aclActions, { actionTypes as aclActionTypes } from '../modules/auth/aclActions';

const history = createHashHistory();
const { login, logout } = actions;

function* handleLogin({ payload }) {
    try {
        yield put(loader.show());
        let response = yield call(api.login, payload.data);
        if (response.status) {
            if (response.data.isValidLogin) {
                yield call(apiMenu.generateMenu, { token: response.data.token });
                yield put(login.requestSuccess(response.data));
                yield put(loader.hide());
                history.push('/portal');
            } else {
                if (response.info.modul === 'auth' && response.info.note === 'force-login') {
                    yield put(actions.showDialogForceLogin(true));
                } else {
                    yield put(notification.show(alert.DANGER, response.message));
                    yield put(login.requestFailure(response.message));
                }
                yield put(loader.hide());
            }
        } else {
            yield put(notification.show(alert.DANGER, response.message));
            yield put(login.requestFailure(response.message));
            yield put(loader.hide());
        }
    } catch (error) {
        yield put(notification.show(alert.DANGER, error.message));
        yield put(login.requestFailure(error.message));
        yield put(loader.hide());
    }
}

function* handleForceLogin({ payload }) {
    try {
        yield put(actions.showDialogForceLogin(false));
        yield put(loader.show());
        let response = yield call(api.login, payload.data);
        if (response.status) {
            if (response.data.isValidLogin) {
                yield call(apiMenu.generateMenu, { token: response.data.token });
                yield put(login.requestSuccess(response.data));
                yield put(loader.hide());
                history.push('/portal');
            } else {
                yield put(notification.show(alert.DANGER, response.message));
                yield put(login.requestFailure(response.message));
                yield put(loader.hide());
            }
        } else {
            yield put(notification.show(alert.DANGER, response.message));
            yield put(login.requestFailure(response.message));
            yield put(loader.hide());
        }
        
    } catch (error) {
        yield put(notification.show(alert.DANGER, error.message));
        yield put(login.requestFailure(error.message));
        yield put(loader.hide());
    }
}

function* handleLogout() {
    try {
        yield put(loader.show());
        let response = yield call(api.logout);

        if (response.status) {
            yield put(logout.requestSuccess(response.data));
            history.push('/');
        } else {
            yield put(notification.show(alert.DANGER, response.message));
            yield put(logout.requestFailure(response.message));
        }
        yield put(loader.hide());
    } catch (error) {
        yield put(logout.requestFailure(error.message));
        yield put(loader.hide());
    }
}

function* handleUserCheck() {
    try {
        yield call(api.userCheck);
    } catch (e) {
        yield call(api.logout);
        history.push('/');
    }
}

function* isUserLogOn() {
    try {
        yield call(api.isUserLogOn);
    } catch (e) {
        console.log(e);
    }
}

function* handleLoadPermissions({ meta }) {
    try {
        let response = yield call(api.getGranted, meta.resource);
        if (response.status) {
            yield put(aclActions.getGranted.requestSuccess(meta.resource, response.data));
        } else {
            yield put(aclActions.getGranted.requestFailure(meta.resource, response.message));
        }
        
    } catch (e) {
        yield put(aclActions.getGranted.requestFailure(meta.resource, e.message));
    }
}

function* handleReset() {
    yield put(notification.hide());
}

export function* watchAclActions() {
    yield all([
        takeLatest(aclActionTypes.ACL_GET_GRANTED_REQUEST, handleLoadPermissions),
    ]);
}

export default function* watchAuthActions() {
    yield all([
        takeLatest(actionTypes.LOGIN_REQUEST, handleLogin),
        takeLatest(actionTypes.FORCE_LOGIN, handleForceLogin),
        takeLatest(actionTypes.LOGOUT_REQUEST, handleLogout),
        takeLatest(actionTypes.LOGIN_RESET, handleReset),
        takeLatest(actionTypes.USER_CHECK, handleUserCheck),
        takeLatest(actionTypes.USER_IS_LOGON, isUserLogOn)
    ]);
}
