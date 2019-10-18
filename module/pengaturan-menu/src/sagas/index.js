import { all } from 'redux-saga/effects';
import { watchAclActions as aclSaga } from '@simrs/main/src/sagas/auth';
import pengaturanMenuSaga from './pengaturanMenu';

export default function* watchActions() {
    yield all([
        aclSaga(),
        pengaturanMenuSaga()
    ]);
}
