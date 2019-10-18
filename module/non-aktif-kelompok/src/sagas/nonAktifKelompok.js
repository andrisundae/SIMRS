import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import _ from 'lodash';

import { validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import api from '../services/models/nonAktifKelompokModel';
import {
    moduleActionTypes,
    moduleActions,
    filterActionTypes,
    filterActions
} from '../pages/index';
import aclActions from '@simrs/main/src/modules/auth/aclActions';
import { actions as aturanAplikasiActions, selectors, context } from '@simrs/main/src/modules/setting/aturan-aplikasi';

const { getFirstError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
    yield put(aclActions.getGranted.request(meta.resource));
    yield put(aturanAplikasiActions.getAturanAplikasi.request(meta.resource));
    yield put(filterActions.populateForm.request(meta.resource));
}

function* loadAll({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getAll, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal)
        } else {
            yield toastr.error(response.message);
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(meta.resource));
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    try {
        yield put(loaderActions.show('Proses simpan...'));
        let response = yield call(api.save, payload.data);
        if (response.status) {
            yield put(moduleActions.save.requestSuccess(resource, response));
        } else {
            yield put(moduleActions.save.requestFailure(resource, response.message));
            yield toastr.warning(getFirstError(response.data));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess({ payload }) {
    try {
        yield toastr.success(payload.data.message);
        yield ipcRenderer.send('focusing-cell');
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleFilter({ payload, meta }) {
    let { resource } = meta;
    try {
        let errors = yield call(validation, payload.data);
        
        if (_.isEmpty(errors) || payload.data.filter_value.length <= 0) {
            yield put(filterActions.filter.onSubmitSuccess(resource, payload.data));
        } else {
            toastr.warning(getFirstError(errors));
            yield put(filterActions.filter.onSubmitFailure(resource, errors));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSubmitFailure({payload, meta}) {
    yield toastr.warning(getFirstError(payload.errors));
    yield put(filterActions.onFocusElement(meta.resource, 'filter_value'));
}

function* validation(post) {
    const minlength = yield select(selectors.get, context.MINCHARPENCARIANMASTER)
    const rules = {
        [context.MINCHARPENCARIANMASTER]: { minlength }
    }
    const messages = {
        [context.MINCHARPENCARIANMASTER]: { minlength: `Minimal karakter pencarian ${minlength} huruf` }
    }

    let errors = yield validator({ [context.MINCHARPENCARIANMASTER]: post.filter_value }, rules, messages);

    return errors;
}

function* handleReloaded({ meta }) {
    yield put(moduleActions.onReady(meta.resource));
}

function* handleSearch({ meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* populateForm({ meta }) {
    try {
        yield put(loaderActions.show('Load data form...'));
        let { populateForm } = filterActions;

        let message = '';
        let data = { klasifikasi: [], };

        let klasifikasi = yield call(api.getKlasifikasi);
        if (klasifikasi.status) {
            data.klasifikasi = klasifikasi.data;
        } else {
            message = klasifikasi.message;
        }

        if (data.klasifikasi) {
            yield put(populateForm.requestSuccess(meta.resource, data));
        } else {
            yield put(populateForm.requestFailure(meta.resource, message));
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error('Error', error.message);
    }
}

function* handleSelectionChanged({ meta, payload }) {
    yield put(moduleActions.save.request(meta.resource, payload.data));
}

function* handleFocusElement() {
    yield ipcRenderer.send('focusing-field');
}

export default function* watchActions() {
    yield all([
        takeLatest(moduleActionTypes.LOAD_ALL_REQUEST, loadAll),
        takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
        takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(moduleActionTypes.OPEN_FORM, openForm),
        takeLatest(moduleActionTypes.SELECTION_CHANGED, handleSelectionChanged),
        takeLatest(filterActionTypes.FILTER_SUBMIT, handleFilter),
        takeLatest(filterActionTypes.FILTER_SUBMIT_SUCCESS, handleSearch),
        takeLatest(filterActionTypes.FILTER_SUBMIT_FAILURE, handleSubmitFailure),
        takeLatest(filterActionTypes.ON_FOCUS_ELEMENT, handleFocusElement),
        // takeLatest(filterActionTypes.CHANGE_KLASIFIKASI, handleSearch),
        // takeLatest(filterActionTypes.CHANGE_STATUS, handleSearch),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
        takeLatest(filterActionTypes.POPULATE_FORM_REQUEST, populateForm),
    ]);
}
