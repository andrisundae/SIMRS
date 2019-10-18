import { put, call, takeLatest, all } from 'redux-saga/effects';
import { ipcRenderer, remote } from 'electron';
import {isEmpty} from 'lodash';

import { validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, datatableActions, constDatatable } from '@simrs/components';
import api from '../services/models/eksporTarifModel';
import { actions, actionTypes } from '../pages/index';
import aclActions from '@simrs/main/src/modules/auth/aclActions';
import { actions as aturanAplikasiActions } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import { getFirstElementError } from '@simrs/common/src/utils/validator';

const { getFirstError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
    yield put(aclActions.getGranted.request(meta.resource));
    yield put(aturanAplikasiActions.getAturanAplikasi.request(meta.resource));
    yield put(actions.populateForm.request(meta.resource));
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

function parseToColumnHeader(data) {
    let columns = [];
    data.forEach(column => {
        columns.push({
            headerName: column.nama_komponen_tarif,
            field: column.nama_komponen_tarif,
            width: 100,
            cellClass: "ag-number-cell",
            cellRenderer: 'currencyRenderer',
        })
    });

    return columns;
}

function* handleSubmit({ meta, payload }) {
    try {
        const { filter } = actions;
        let { rules, messages } = api.validationRules(meta.resource);
        let post = payload.data;
        let errors = validator(post, rules, messages);
        if (isEmpty(errors)) {
            yield put(filter.onSubmitSuccess(meta.resource, payload.type, post));
        } else {
            toastr.warning(getFirstError(errors));
            yield put(filter.onSubmitFailure(meta.resource, payload.type, errors));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSubmitSuccess({ meta, payload }) {
    if (payload.type === 'search') {
        yield put(actions.getHeaderKomponen.request(meta.resource, payload.data));
    } else {
        yield put(actions.export.request(meta.resource, payload.data));
    }
}

function* handleSubmitFailure({ payload, meta }) {
    yield toastr.warning(getFirstError(payload.errors));
    yield put(actions.onFocusElement(meta.resource, getFirstElementError(payload.errors)));
}

function* handleGetHeaderSucceess({ meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSearch({ meta, payload }) {
    try {
        yield put(loaderActions.show());
        let response = yield call(api.getHeaderColumn, payload.data);
        if (response.status) {
            yield put(actions.getHeaderKomponen.requestSuccess(meta.resource, parseToColumnHeader(response.data)));
        } else {
            yield put(actions.getHeaderKomponen.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield toastr.error(error.message);
        yield put(loaderActions.hide());
    }
}

function* handleExport({ meta, payload }) {
    try {
        yield put(loaderActions.show());
        let response = yield call(api.export, payload.data);
        if (response.status) {
            yield put(actions.export.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.export.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield toastr.error(error.message);
        yield put(loaderActions.hide());
    }
}

function* handleExportSucceess({ payload }) {
    try {
        window.location = `${api.pathToDownload}?nama_file=${payload.data.file_name}`;
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* populateForm({ meta }) {
    try {
        yield put(loaderActions.show());
        let { populateForm } = actions;

        let message = '';
        let data = { versi_tarif: [], column_order: [] };

        let versiTarif = yield call(api.getVersiTarif);
        if (versiTarif.status) {
            data.versi_tarif = versiTarif.data;
        } else {
            message = versiTarif.message;
        }

        let columnOrder = yield call(api.getColumnOrder);
        if (columnOrder.status) {
            data.column_order = columnOrder.data;
        } else {
            message = columnOrder.message;
        }

        if (data.versi_tarif || data.column_order) {
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

function* handleFocusElement() {
    yield ipcRenderer.send('focusing-field');
}

export default function* watchActions() {
    yield all([
        takeLatest(actionTypes.LOAD_ALL, loadAll),

        takeLatest(actionTypes.OPEN_FORM, openForm),
        takeLatest(actionTypes.FILTER_SUBMIT, handleSubmit),
        takeLatest(actionTypes.FILTER_SUBMIT_SUCCESS, handleSubmitSuccess),
        takeLatest(actionTypes.FILTER_SUBMIT_FAILURE, handleSubmitFailure),
        takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
        takeLatest(actionTypes.GET_HEADER_KOMPONEN_SUCCESS, handleGetHeaderSucceess),
        takeLatest(actionTypes.EXPORT_REQUEST, handleExport),
        takeLatest(actionTypes.EXPORT_SUCCESS, handleExportSucceess),
        takeLatest(actionTypes.GET_HEADER_KOMPONEN_REQUEST, handleSearch),
        takeLatest(actionTypes.ON_FOCUS_ELEMENT, handleFocusElement),
    ]);
}
