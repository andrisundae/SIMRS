import { put, call, takeLatest, all } from 'redux-saga/effects';

import { toastrActions } from '@simrs/common';
import { datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import {layananModel as api} from '@module/tarif';
import {
    moduleActionTypes,
    moduleActions,
    filterActionTypes
} from '@simrs/main/src/modules/master/nested';
import aclActions from '@simrs/main/src/modules/auth/aclActions';
import { actions as aturanAplikasiActions } from '@simrs/main/src/modules/setting/aturan-aplikasi';

function* openForm({ meta }) {
    yield put(aclActions.getGranted.request(meta.resource));
    yield put(aturanAplikasiActions.getAturanAplikasi.request(meta.resource));
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

export default function* watchActions() {
    yield all([
        takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
        takeLatest(moduleActionTypes.OPEN_FORM, openForm),
        takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    ]);
}
