import { all } from 'redux-saga/effects';
import { watchAclActions as aclSaga } from '@simrs/main/src/sagas/auth';
import importTarifSaga from './importTarif';

export default function* watchAuthActions() {
    yield all([
        aclSaga(),
        importTarifSaga()
    ]);
}
