import { all } from 'redux-saga/effects';
import settingAsalMasukInstalasiSaga from './settingAsalMasukInstalasi';

export default function* watchActions() {
    yield all([
        settingAsalMasukInstalasiSaga()
    ]);
}
