import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';

import { validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, messageBox, constDatatable, datatableActionTypes, datatableActions} from '@simrs/components';
import api from '../services/models/kunjunganModel';
import {
    actions,
    actionTypes
} from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

const TABLE_PASIEN = 'table_pasien';
const TABLE_KUNJUNGAN = 'table_kunjungan';
const TABLE_WILAYAH = 'table_wilayah';

function* openForm({ meta }) {
    yield put(datatableActions.onInitialize(TABLE_PASIEN));
    yield put(datatableActions.onInitialize(TABLE_KUNJUNGAN));
    yield put(datatableActions.onInitialize(TABLE_WILAYAH));
    yield put(actions.populateForm.request(meta.resource));
    yield put(actions.onReady(meta.resource));
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRules(resource);
        let post = payload.data;
        let errors = validator(post, rules, messages);

        if (_.isEmpty(errors)) {
            let response = yield call(api.save, post);
            if (response.status) {
                yield put(actions.save.requestSuccess(resource, response));
            } else {
                yield put(actions.save.requestFailure(resource, errors));
                yield toastr.warning(response.message);
                yield put(actions.onFocusElement(resource, 'oldPassword'));
            }
        } else {
            yield put(actions.onFocusElement(resource, getFirstElementError(errors)));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess() {
    try {
        yield messageBox({
            onOk: () => {
                ipcRenderer.send('session-expired')
            },
            message: 'Ganti password berhasil, klik tombol OK untuk login kembali',
        });
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* populateForm({ meta }) {
    try {
        yield put(loaderActions.show());
        let { populateForm } = actions;
        let response = yield call(api.init);
        if (response.status) {
            yield put(populateForm.requestSuccess(meta.resource, response.data));
        } else {
            yield put(populateForm.requestFailure(meta.resource, response.message));
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* changeSelect2({ meta, payload }) {
    try {
        switch (payload.name) {
            case 'id_unit_layanan':
                yield put(actions.optionsByUnitLayanan.request(meta.resource, payload.data));
                break;
            // case 'kelompok':
            //     yield put(actions.instalasi.request(meta.resource, payload.data));
            //     break;
            // case 'instalasi':
            //     yield put(actions.unitLayanan.request(meta.resource, payload.data));
            //     break;
            default:
                break;
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* asalMasukDetailRequest({ meta, payload }) {
    try {
        let response = yield call(api.getAsalMasukDetailOptions, payload.data.value);
        if (response.status) {
            yield put(actions.asalMasukDetail.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.asalMasukDetail.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* instalasiRequest({ meta, payload }) {
    try {
        let response = yield call(api.getInstalasiOptions, payload.data.value);
        if (response.status) {
            yield put(actions.instalasi.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.instalasi.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* unitLayananRequest({ meta, payload }) {
    try {
        let response = yield call(api.getUnitLayananOptions, payload.data.value);
        if (response.status) {
            yield put(actions.unitLayanan.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.unitLayanan.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* optionsByUnitLayananRequest({ meta, payload }) {
    try {
        let response = yield call(api.getOptionsByUnitLayanan, payload.data.value);
        if (response.status) {
            yield put(actions.optionsByUnitLayanan.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.optionsByUnitLayanan.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* loadAllPasien({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getAllPasien, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal)
        } else {
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(TABLE_PASIEN));
}

function* loadAllWilayah({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getAllWilayah, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal)
        } else {
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(TABLE_WILAYAH));
}

function* handleSearchPasien() {
    try {
        yield put(datatableActions.onReload(TABLE_PASIEN, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSelectedPasien({meta}) {
    yield put(actions.toggleShowCariPasien(meta.resource));
}

function* handleSearchKunjungan() {
    try {
        yield put(datatableActions.onReload(TABLE_KUNJUNGAN, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSearchWilayah() {
    try {
        yield put(datatableActions.onReload(TABLE_WILAYAH, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSelectedWilayah({ meta }) {
    yield put(actions.toggleShowCariWilayah(meta.resource));
}

export default function* watchAuthActions() {
    yield all([
        takeLatest(actionTypes.SAVE_REQUEST, handleSave),
        takeLatest(actionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(actionTypes.OPEN_FORM, openForm),
        takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
        takeLatest(actionTypes.CHANGE_SELECT2, changeSelect2),
        takeLatest(actionTypes.ASAL_MASUK_DETAIL_REQUEST, asalMasukDetailRequest),
        takeLatest(actionTypes.INSTALASI_REQUEST, instalasiRequest),
        takeLatest(actionTypes.UNIT_LAYANAN_REQUEST, unitLayananRequest),
        takeLatest(actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST, optionsByUnitLayananRequest),

        takeLatest(actionTypes.GET_ALL_PASIEN_REQUEST, loadAllPasien),
        takeLatest(actionTypes.FILTER_SUBMIT_PASIEN, handleSearchPasien),
        takeLatest(actionTypes.GET_ALL_WILAYAH_REQUEST, loadAllWilayah),
        takeLatest(actionTypes.FILTER_SUBMIT_WILAYAH, handleSearchWilayah),
        takeLatest(actionTypes.FILTER_SELECTED_PASIEN, handleSelectedPasien),
        takeLatest(actionTypes.FILTER_SELECTED_WILAYAH, handleSelectedWilayah),
    ]);
}
