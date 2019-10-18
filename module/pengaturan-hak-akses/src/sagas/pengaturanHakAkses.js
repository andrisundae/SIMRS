import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import _ from 'lodash';

import { validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions} from '@simrs/components';
import api from '../services/models/pengaturanHakAksesModel';
import {
    actions,
    actionTypes
} from '../pages/index';
import aclActions from '@simrs/main/src/modules/auth/aclActions';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* resetForm({ meta }) {
    yield put(actions.openForm(meta.resource));
}

function* openForm({ meta }) {
    yield put(aclActions.getGranted.request(meta.resource));
    yield put(actions.populateForm(meta.resource));
}

const getExpandData = (defaultExpanded, data) => {
    data.forEach(row => {
        if (row.open) {
            defaultExpanded.push(row.key);
            if (row.children) {
                defaultExpanded = getExpandData(defaultExpanded, row.children);
            }
        }
    })

    return defaultExpanded;
}

function* populateForm({ meta }) {
    try {
        const { menu, grup, onReady } = actions;

        yield put(loaderActions.show());
        yield put(menu.request(meta.resource));

        let response = yield call(api.getMenu);
        if (response.status) {
            let dataMenu = response.data;
            let dataExpanded = getExpandData([], dataMenu);

            yield put(menu.requestSuccess(meta.resource, { menu: dataMenu, expanded: dataExpanded }));
        } else {
            yield put(menu.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }

        yield put(grup.request(meta.resource));
        let responseGrup = yield call(api.getGrup);
        if (responseGrup.status) {
            yield put(grup.requestSuccess(meta.resource, responseGrup.data));
        } else {
            yield put(grup.requestFailure(meta.resource, responseGrup.message));
            yield toastr.error(responseGrup.message);
        }

        yield put(onReady(meta.resource));
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleChangeGrup({ payload, meta }) {
    try {
        const { acl } = actions;

        yield put(loaderActions.show());
        yield put(acl.request(meta.resource, payload.data));

        let response = yield call(api.getAcl, payload.data.value);
        if (response.status) {
            yield put(acl.requestSuccess(meta.resource, response.data));
        } else {
            yield put(acl.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    const { save, onFocusElement } = actions;
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRules(resource);
        let post = payload.data;
        let errors = validator(post, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.save, post);
            if (response.status) {
                yield put(save.requestSuccess(resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            yield put(save.requestFailure(resource, errors));
            yield put(onFocusElement(resource, getFirstElementError(errors)));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess({ payload, meta }) {
    try {
        yield put(actions.onReady(meta.resource));
        yield ipcRenderer.send('enable-header');
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

export default function* watchActions() {
    yield all([
        takeLatest(actionTypes.SAVE_ACL_REQUEST, handleSave),
        takeLatest(actionTypes.SAVE_ACL_SUCCESS, handleSaveSuccess),
        takeLatest(actionTypes.OPEN_FORM, openForm),
        takeLatest(actionTypes.RESET, resetForm),
        takeLatest(actionTypes.POPULATE_FORM, populateForm),
        takeLatest(actionTypes.CHANGE_GRUP, handleChangeGrup),
    ]);
}
