import { all } from 'redux-saga/effects';
import supplierSaga from './supplier';

export default function* watchActions() {
    yield all([
        supplierSaga()
    ]);
}
