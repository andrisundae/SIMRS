import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';

import { validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions} from '@simrs/components';
import api from '../services/models/aturanAplikasiModel';
import {
    actions,
    actionTypes,
    selectors
} from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;

function* openForm({ meta }) {
    yield put(actions.populateForm.request(meta.resource));
}

function validation(post) {
    let errors = {};
    post.daftarKelompok.forEach(row => {
        if (row.daftarAturan) {
            row.daftarAturan.forEach(aturanAplikasi => {
                if (aturanAplikasi.nilai.toString().length <= 0) {
                    errors[aturanAplikasi.aturan] = [`${aturanAplikasi.label} harus diisi!`];
                }
            })
        }
    })

    return errors;
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    try {
        yield put(loaderActions.show());
        let post = payload.data;
        let errors = validation(post);

        if (_.isEmpty(errors)) {
            let response = yield call(api.save, post);
            if (response.status) {
                yield put(actions.save.requestSuccess(resource, response));
            } else {
                yield toastr.warning(response.message);
                yield put(actions.onFocusElement(resource, getFirstElementError(response.data)));
            }
        } else {
            yield put(actions.save.requestFailure(resource, errors));
            yield put(actions.onFocusElement(resource, getFirstElementError(errors)));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess({ meta, payload }) {
    try {
        yield put(actions.populateForm.request(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* populateForm({ meta }) {

    try {
        yield put(loaderActions.show());
        let { populateForm } = actions;

        let response = yield call(api.getData);
        if (response.status) {
            yield put(populateForm.requestSuccess(meta.resource, response.data));
        } else {
            yield put(populateForm.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }
        yield put(actions.onReady(meta.resource));
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(actions.onReady(meta.resource));
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleEdit({ meta }) {
    let firstAturan = yield select(selectors.getFirstAturan);
    if (firstAturan) {
        yield put(actions.onFocusElement(meta.resource, firstAturan));
    }
}

export default function* watchAuthActions() {
    yield all([
        takeLatest(actionTypes.SAVE_REQUEST, handleSave),
        takeLatest(actionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(actionTypes.OPEN_FORM, openForm),
        takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
        takeLatest(actionTypes.EDIT, handleEdit),
    ]);
}
