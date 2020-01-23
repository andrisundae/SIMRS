import { all } from 'redux-saga/effects';
import moduleSaga from './kunjungan';

export default function* watchActions() {
    yield all([
        moduleSaga()
    ]);
}
