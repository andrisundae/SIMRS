import { put, call, takeLatest, all } from 'redux-saga/effects';
import {aturanAplikasiModel as api} from '../services/models';
import { actions, actionTypes } from '../modules/setting/aturan-aplikasi';
import { loaderActions } from '@simrs/components';

function* handleLoadAturanAplikasi({ meta }) {
    try {
        yield put(loaderActions.show());
        let response = yield call(api.getAturanAplikasi);
        if (response.status) {
            let data = {};
            if (response.data.length > 0 && response.data[0].aturan_setting) {
                response.data[0].aturan_setting.forEach(row => {
                    data[row.aturan] = row.nilai;
                });
            }

            yield put(actions.getAturanAplikasi.requestSuccess(meta.resource, data));
        } else {
            yield put(actions.getAturanAplikasi.requestFailure(meta.resource, response.message));
        }
        yield put(loaderActions.hide());
    } catch (e) {
        yield put(actions.getAturanAplikasi.requestFailure(meta.resource, e.message));
        yield put(loaderActions.hide());
    }
}

export function* watchActions() {
    yield all([
        takeLatest(actionTypes.GET_ATURAN_APLIKASI_REQUEST, handleLoadAturanAplikasi),
    ]);
}
