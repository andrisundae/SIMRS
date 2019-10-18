import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';

import {validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import api from '../services/models/klasifikasiModel';
import {
    moduleActionTypes,
    moduleActions,
    filterActionTypes
} from '@simrs/main/src/modules/master/default';
import aclActions from '@simrs/main/src/modules/auth/aclActions';
import { actions as aturanAplikasiActions } from '@simrs/main/src/modules/setting/aturan-aplikasi';

import { actionTypes, actions } from '../pages/index';

const { getFirstError, getFirstElementError} = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
    yield put(aclActions.getGranted.request(meta.resource));
    yield put(aturanAplikasiActions.getAturanAplikasi.request(meta.resource));
    yield put(actions.populateForm(meta.resource));
}

function* loadAll({ payload, meta }) {
    const { successCallback, failCallback, pastAction } = meta.tableParams;

    try {
        let response = yield call(api.getAll, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal)
        } else {
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(meta.resource, pastAction));
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRules(resource);
        let post = payload.data;
        let method = post.id ? 'koreksi' : 'tambah';
        let errors = validator(post, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.save, method, post);
            if (response.status) {
                response.action = method;
                yield put(moduleActions.save.requestSuccess(resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            yield toastr.warning(getFirstError(errors));
            yield put(moduleActions.save.requestFailure(resource, errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
        yield ipcRenderer.send('enable-header');
    }
}

function* handleSaveSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
        yield ipcRenderer.send('enable-header');
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSaveFailure({ payload, meta }) {
    let { resource } = meta;
    yield put(moduleActions.onFocusElement(resource, getFirstElementError(payload.errors)));
}

function* handleReloaded({ meta }) {
    yield put(moduleActions.onReady(meta.resource));
}

function* handleDelete({ payload, meta }) {
    try {
        yield put(loaderActions.show());
        let post = payload.data;

        let response = yield call(api.delete, { id: post.id });
        if (response.status) {
            yield put(moduleActions.delete.requestSuccess(meta.resource, response));
        } else {
            if (response.info.type === 'warning') {
                yield toastr.warning(response.message);
            } else {
                yield toastr.error(response.message);
            }
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleDeleteSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSearch({ meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleAdd({ meta }) {
    yield put(moduleActions.onFocusElement(meta.resource, 'jenis_klasifikasi'));
}

function* handleEdit({ meta }) {
    yield put(moduleActions.onFocusElement(meta.resource, 'jenis_klasifikasi'));
}

function* populateForm({ meta }) {

    try {
        yield put(loaderActions.show('Load data form...'));
        let { getJenisKlasifikasi } = actions;

        let jenisKlasifikasi = yield call(api.getOptionsJenisKlasifikasi);
        if (jenisKlasifikasi.status) {
            yield put(getJenisKlasifikasi.requestSuccess(meta.resource, jenisKlasifikasi.data));
        } else {
            yield put(getJenisKlasifikasi.requestFailure(meta.resource, jenisKlasifikasi.message));
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error('Error', error.message);
    }
}

export default function* watchActions() {
    yield all([
        takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
        takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
        takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(moduleActionTypes.SAVE_FAILURE, handleSaveFailure),
        takeLatest(moduleActionTypes.DELETE_REQUEST, handleDelete),
        takeLatest(moduleActionTypes.DELETE_SUCCESS, handleDeleteSuccess),
        takeLatest(moduleActionTypes.ADD, handleAdd),
        takeLatest(moduleActionTypes.EDIT, handleEdit),
        takeLatest(moduleActionTypes.OPEN_FORM, openForm),
        takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
        takeLatest(actionTypes.POPULATE_FORM, populateForm),
    ]);
}
