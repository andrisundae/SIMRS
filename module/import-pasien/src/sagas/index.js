import { all } from 'redux-saga/effects';
import { watchAclActions as aclSaga } from '@simrs/main/src/sagas/auth';
import importPasienSaga from './importPasien';

export default function* watchAuthActions() {
    yield all([
        aclSaga(),
        importPasienSaga()
    ]);
}
