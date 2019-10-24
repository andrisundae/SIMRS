import { all } from 'redux-saga/effects';
import jenisKlasifikasiSaga from './jenisKlasifikasi';

export default function* watchActions() {
    yield all([
        jenisKlasifikasiSaga()
    ]);
}
