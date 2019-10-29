import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';

import { validator as commonValidator, toastr } from '@simrs/common';
import { loaderActions, datatableActions, constDatatable } from '@simrs/components';
import api from '../services/models/settingKlasifikasiKomponenModel';

import {
    moduleActionTypes,
    sumberLainActions,
    moduleActions,
    sumberLainActionTypes,
    sumberActions,
    sumberActionTypes,
    settingActions,
    settingActionTypes
} from '@simrs/main/src/modules/setting/default';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
    yield put(moduleActions.populateForm.request(meta.resource));
}

function* loadDataSumber({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getDataSumber, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal);
            yield put(sumberActions.getAll.requestSuccess(meta.resource, response.data));
        } else {
            failCallback();
            yield put(sumberActions.getAll.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        failCallback();
        yield put(sumberActions.getAll.requestFailure(meta.resource, error.message));
    }
    yield put(datatableActions.onReloaded('data_sumber'));
}

function* loadDataSetting({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getDataSetting, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal);
            yield put(settingActions.getAll.requestSuccess(meta.resource, response.data));
        } else {
            failCallback();
            yield put(settingActions.getAll.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        failCallback();
        yield put(settingActions.getAll.requestFailure(meta.resource, error.message));
    }
    yield put(datatableActions.onReloaded('data_setting'));
}

function* populateForm({ meta }) {
    try {
        let messages = [];

        yield put(loaderActions.show());

        yield put(sumberLainActions.populateForm.request(meta.resource));
        let response = yield call(api.getDataSumberLain);
        if (response.status) {
            yield put(sumberLainActions.populateForm.requestSuccess(meta.resource, response.data.data_sumber_lain));
        } else {
            yield put(sumberLainActions.populateForm.requestFailure(meta.resource, response.message));
            messages.push(response.message);
        }

        if (messages.length === 0) {
            yield put(moduleActions.populateForm.requestSuccess(meta.resource, []));
        } else {
            yield put(moduleActions.populateForm.requestFailure(meta.resource, messages));
            yield toastr.error(messages.join('<br/>'));
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* populateFormSuccess({ meta }) {
    yield put(moduleActions.onFocusElement(meta.resource, 'klasifikasi'));
}

function* handleReloadGrid() {
    yield put(datatableActions.onReload('data_sumber', constDatatable.reloadType.purge));
    yield put(datatableActions.onReload('data_setting', constDatatable.reloadType.purge));
}

function* handleSearchSumber({ meta }) {
    yield put(datatableActions.onReload('data_sumber', constDatatable.reloadType.purge));
    yield put(moduleActions.onFocusElement(meta.resource, 'search_sumber'));
}

function* handleSearchSetting({ meta }) {
    yield put(datatableActions.onReload('data_setting', constDatatable.reloadType.purge));
    yield put(moduleActions.onFocusElement(meta.resource, 'search_setting'));
}

function* handlePush({ payload, meta }) {
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationPushRules(meta.resource);
        let post = payload.data;
        let errors = validator({ ...post.id.needed, sumber: post.id.sumber }, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.push, post);
            if (response.status) {
                yield put(sumberActions.push.requestSuccess(meta.resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            let elementError = getFirstElementError(errors);
            yield put(sumberActions.push.requestFailure(meta.resource, errors));
            yield put(moduleActions.onFocusElement(meta.resource, elementError));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());

    } catch (error) {
        yield put(sumberActions.push.requestFailure(meta.resource, error.message));
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handlePushAll({ payload, meta }) {
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationPushAllRules(meta.resource);
        let post = payload.data;
        let errors = validator({ ...post.id.needed }, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.push, post);
            if (response.status) {
                yield put(sumberActions.pushAll.requestSuccess(meta.resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            let elementError = getFirstElementError(errors);
            yield put(sumberActions.pushAll.requestFailure(meta.resource, errors));
            yield put(moduleActions.onFocusElement(meta.resource, elementError));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());

    } catch (error) {
        yield put(sumberActions.pushAll.requestFailure(meta.resource, error.message));
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleRevert({ payload, meta }) {
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRevertRules(meta.resource);
        let post = payload.data;
        let errors = validator({ ...post.id.needed, setting: post.id.setting }, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.revert, post);
            if (response.status) {
                yield put(settingActions.revert.requestSuccess(meta.resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            let elementError = getFirstElementError(errors);
            yield put(settingActions.revert.requestFailure(meta.resource, errors));
            yield put(moduleActions.onFocusElement(meta.resource, elementError));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());

    } catch (error) {
        yield put(settingActions.revert.requestFailure(meta.resource, error.message));
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleRevertAll({ payload, meta }) {
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRevertAllRules(meta.resource);
        let post = payload.data;
        let errors = validator({ ...post.id.needed }, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.revert, post);
            if (response.status) {
                yield put(settingActions.revertAll.requestSuccess(meta.resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            let elementError = getFirstElementError(errors);
            yield put(settingActions.revertAll.requestFailure(meta.resource, errors));
            yield put(moduleActions.onFocusElement(meta.resource, elementError));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());

    } catch (error) {
        yield put(settingActions.revertAll.requestFailure(meta.resource, error.message));
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleActionSuccess({ payload }) {
    yield toastr.success(payload.data.message);
    yield call(handleReloadGrid);
}

export default function* watchActions() {
    yield all([
        takeLatest(moduleActionTypes.OPEN_FORM, openForm),
        takeLatest(moduleActionTypes.POPULATE_FORM_REQUEST, populateForm),
        takeLatest(moduleActionTypes.POPULATE_FORM_SUCCESS, populateFormSuccess),

        takeLatest(sumberLainActionTypes.CHANGE_SELECT2_SUMBERLAIN, handleReloadGrid),

        takeLatest(sumberActionTypes.SEARCH_SUMBER, handleSearchSumber),
        takeLatest(sumberActionTypes.LOAD_DATA_SUMBER_REQUEST, loadDataSumber),
        takeLatest(sumberActionTypes.PUSH_DATA_SUMBER_REQUEST, handlePush),
        takeLatest(sumberActionTypes.PUSH_DATA_SUMBER_SUCCESS, handleActionSuccess),
        takeLatest(sumberActionTypes.PUSHALL_DATA_SUMBER_REQUEST, handlePushAll),
        takeLatest(sumberActionTypes.PUSHALL_DATA_SUMBER_SUCCESS, handleActionSuccess),

        takeLatest(settingActionTypes.SEARCH_SETTING, handleSearchSetting),
        takeLatest(settingActionTypes.LOAD_DATA_SETTING_REQUEST, loadDataSetting),
        takeLatest(settingActionTypes.REVERT_DATA_SETTING_REQUEST, handleRevert),
        takeLatest(settingActionTypes.REVERT_DATA_SETTING_SUCCESS, handleActionSuccess),
        takeLatest(settingActionTypes.REVERTALL_DATA_SETTING_REQUEST, handleRevertAll),
        takeLatest(settingActionTypes.REVERTALL_DATA_SETTING_SUCCESS, handleActionSuccess),
    ]);
}
