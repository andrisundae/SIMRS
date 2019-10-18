import { all } from 'redux-saga/effects';
// import { authSaga, aturanAplikasiSaga } from '@simrs/main/src/sagas';
import { watchAclActions as aclSaga } from '@simrs/main/src/sagas/auth';
import { watchActions as aturanAplikasiSaga } from '@simrs/main/src/sagas/aturanAplikasi';
import settingKlasifikasiPenunjangSaga from './settingKlasifikasiPenunjang';

export default function* watchActions() {
    yield all([
        aclSaga(),
        aturanAplikasiSaga(),
        settingKlasifikasiPenunjangSaga()
    ]);
}
