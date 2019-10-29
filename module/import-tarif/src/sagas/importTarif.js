import { put, takeLatest, all, call } from 'redux-saga/effects';
import _ from 'lodash';

import {validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions } from '@simrs/components';
import api from '../services/models/importTarifModel';
import { actions, actionTypes, state } from '../pages/index';

const { getFirstError, getFirstElementError} = commonValidator;
const validator = commonValidator.default;

function* resetForm({ meta }) {
    yield put(actions.onReady(meta.resource));
}

function* handleImport({ meta, payload }) {
    let { resource } = meta;
    try {
        let { rules, messages } = api.validationRules(resource);
        let post = payload.data;
        let fileName = post.file.name ? post.file.name : '';
        let errors = validator({ ...post, file: fileName }, rules, messages);
        let isError = false;
        let errorFile = '';

        if (_.isEmpty(errors)) {
            if (validationFile(post.file)) {
                yield put(actions.onStartImport(resource));
            } else {
                isError = true;
                errorFile = 'File type harus (.xlsx)!'
            }

        } else {
            isError = true;
        }

        if (isError) {
            if (errorFile) {
                yield toastr.warning(errorFile);
            } else {
                yield toastr.warning(getFirstError(errors));
                yield put(actions.onFocusElement(resource, getFirstElementError(errors)));
            }

            yield put(actions.onReady(resource));
        }

    } catch (error) {
        yield put(actions.onReady(resource));
        yield toastr.error(error.message);
    }
}

function validationFile(files) {
    if ("undefined" != typeof files) {
        if (_.indexOf(state.mimes, files.type) === -1) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

function* openForm({ meta }) {
    yield put(actions.onReset(meta.resource));
    yield put(actions.populateForm(meta.resource));
}

function* populateForm({ meta }) {
    try {
        yield put(loaderActions.show('Load data form...'));

        yield put(actions.versi.request(meta.resource));
        let response = yield call(api.getVersi);
        if (response.status) {
            yield put(actions.versi.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.versi.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

export default function* watchActions() {
    yield all([
        takeLatest(actionTypes.OPEN_FORM, openForm),
        takeLatest(actionTypes.POPULATE_FORM, populateForm),
        takeLatest(actionTypes.RESET, resetForm),
        takeLatest(actionTypes.IMPORT, handleImport),
    ]);
}
