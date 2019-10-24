import { all } from 'redux-saga/effects';
import referensiUmumSaga from './referensiUmum';

export default function* watchActions() {
    yield all([
        referensiUmumSaga()
    ]);
}
