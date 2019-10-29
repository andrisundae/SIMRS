import { all } from 'redux-saga/effects';
import pengaturanHakAksesSaga from './pengaturanHakAkses';

export default function* watchActions() {
    yield all([
        pengaturanHakAksesSaga()
    ]);
}
