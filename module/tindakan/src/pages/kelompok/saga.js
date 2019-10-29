import { put, call, takeLatest, all, select } from 'redux-saga/effects';

import { toastrActions } from '@simrs/common';
import { loaderActions, datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import {kelompokModel as api} from '@module/tarif';
import apiTindakan from '../../services/models/tindakanModel';
import {
    moduleActionTypes,
    moduleActions,
    filterActionTypes
} from '@simrs/main/src/modules/master/nested';
import { actions, actionTypes } from '../kelompok';
import { getKlasifikasi } from '../kelompok/selectors';

function* openForm({ meta }) {
    yield put(moduleActions.populateForm(meta.resource));
}

function* loadAll({ payload, meta }) {
    const { successCallback, failCallback, pastAction } = meta.tableParams;

    try {
        let klasifikasi = yield select(getKlasifikasi);
        if (klasifikasi) {
            let response = yield call(api.getAll, payload.data);

            if (response.status) {
                successCallback(response.data, response.recordsTotal)
            } else {
                failCallback();
            }
        } else {
            successCallback([], 0)
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(meta.subResource, pastAction));
}

function* handleReloaded({ meta }) {
    yield put(moduleActions.onReady(meta.resource, meta.subResource));
}

function* handleSearch({ meta }) {
    try {
        yield put(datatableActions.onReload(meta.subResource, constDatatable.reloadType.purge));
    } catch (error) {
        yield put(toastrActions.error(error.message));
    }
}

function* populateForm({ meta }) {
    try {
        yield put(loaderActions.show('Load data form...'));

        yield put(actions.getKlasifikasi.request(meta.resource, meta.subResource));
        let response = yield call(api.getKlasifikasi);
        if (response.status) {
            yield put(actions.getKlasifikasi.requestSuccess(meta.resource, meta.subResource, response.data));
        } else {
            yield put(toastrActions.error(response.message));
            yield put(actions.getKlasifikasi.requestFailure(meta.resource, meta.subResource, response.message));
        }

        yield put(actions.getVersiTarif.request(meta.resource, meta.subResource));
        response = yield call(apiTindakan.getVersiTarif);
        if (response.status) {
            yield put(actions.getVersiTarif.requestSuccess(meta.resource, meta.subResource, response.data));
        } else {
            yield put(actions.getVersiTarif.requestFailure(meta.resource, meta.subResource, response.message));
            yield put(toastrActions.error(response.message));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield put(toastrActions.error(error.message));
    }
}

function* handleChangeKlasifikasi({ meta }) {
    yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
}


export default function* watchActions() {
    yield all([
        takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
        takeLatest(moduleActionTypes.OPEN_FORM, openForm),
        takeLatest(moduleActionTypes.POPULATE_FORM, populateForm),
        takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
        takeLatest(actionTypes.CHANGE_KLASIFIKASI, handleChangeKlasifikasi),
    ]);
}
