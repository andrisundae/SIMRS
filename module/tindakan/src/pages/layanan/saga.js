import { put, call, takeLatest, all } from 'redux-saga/effects';

import { toastrActions } from '@simrs/common';
import { datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import {layananModel as api} from '@module/tarif';
import {
    moduleActionTypes,
    moduleActions,
    filterActionTypes
} from '@simrs/main/src/modules/master/nested';

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
        takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    ]);
}
