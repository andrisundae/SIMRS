import { all } from 'redux-saga/effects';
import { watchAclActions as aclSaga } from '@simrs/main/src/sagas/auth';
import pengaturanHakAksesSaga from './pengaturanHakAkses';

export default function* watchActions() {
    yield all([
        aclSaga(),
        pengaturanHakAksesSaga()
    ]);
}
