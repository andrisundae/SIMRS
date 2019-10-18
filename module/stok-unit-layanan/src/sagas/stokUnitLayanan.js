import { put, call, takeLatest, all } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';

import {validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import api from '../services/models/stokUnitLayananModel';
import aclActions from '@simrs/main/src/modules/auth/aclActions';
import { actions as aturanAplikasiActions } from '@simrs/main/src/modules/setting/aturan-aplikasi';

import { moduleActions, moduleActionTypes, filterActionTypes, filterActions } from '../pages/index';

const { getFirstElementError} = commonValidator;

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
        yield put(loaderActions.show());
        let response = yield call(api.save, payload.data);
        if (response.status) {
            yield put(moduleActions.save.requestSuccess(resource, response));
        } else {
            yield put(moduleActions.save.requestFailure(resource, response.message));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
        yield ipcRenderer.send('focusing-cell');
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
        let data = {
            unit_layanan: [],
        };

        let unitLayanan = yield call(api.getUnitLayanan);
        if (unitLayanan.status) {
            data.unit_layanan = unitLayanan.data;
        } else {
            message = unitLayanan.message;
        }

        if (data.unit_layanan) {
            yield put(populateForm.requestSuccess(meta.resource, data));
        } else {
            yield put(populateForm.requestFailure(meta.resource, message));
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleChangeUnitLayanan({ meta, payload }) {
    try {
        let { getKelas } = filterActions;
        if (payload.data.value) {
            yield put(loaderActions.show('Load data kelas...'));
            let params = { id: payload.data.value };
            yield put(getKelas.request(meta.resource, params));
            let response = yield call(api.getKelas, params);
            if (response.status) {
                yield put(getKelas.requestSuccess(meta.resource, response.data));
            } else {
                yield put(getKelas.requestFailure(meta.resource, response.message));
            }
            yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
            yield put(loaderActions.hide());
        } else {
            yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
            yield put(getKelas.requestSuccess(meta.resource, []));
        }

    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleChangekelas({ meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleChangeStock({ meta, payload }) {
    yield put(moduleActions.save.request(meta.resource, { ...payload.data.post }));
}

function* handleFocusElement() {
    yield ipcRenderer.send('focusing-field');
}

export default function* watchActions() {
    yield all([
        takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
        takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
        takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(moduleActionTypes.CHANGE_STOCK, handleChangeStock),

        takeLatest(moduleActionTypes.OPEN_FORM, openForm),
        takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
        takeLatest(filterActionTypes.POPULATE_FORM_REQUEST, populateForm),
        takeLatest(filterActionTypes.CHANGE_UNIT_LAYANAN, handleChangeUnitLayanan),
        takeLatest(filterActionTypes.CHANGE_KELAS, handleChangekelas),
        takeLatest(filterActionTypes.ON_FOCUS_ELEMENT, handleFocusElement),
    ]);
}
