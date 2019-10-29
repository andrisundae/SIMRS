import { all } from 'redux-saga/effects';
import settingSpesialisasiPelaksanaSaga from './settingSpesialisasiPelaksana';

export default function* watchActions() {
    yield all([
        settingSpesialisasiPelaksanaSaga()
    ]);
}
