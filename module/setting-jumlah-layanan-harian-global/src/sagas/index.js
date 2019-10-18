import { all } from 'redux-saga/effects';
import { watchAclActions as aclSaga } from '@simrs/main/src/sagas/auth';
import { watchActions as aturanAplikasiSaga } from '@simrs/main/src/sagas/aturanAplikasi';
import settingJumlahLayananHarianGlobalSaga from './settingJumlahLayananHarianGlobal';

export default function* watchActions() {
    yield all([
        aclSaga(),
        aturanAplikasiSaga(),
        settingJumlahLayananHarianGlobalSaga()
    ]);
}
