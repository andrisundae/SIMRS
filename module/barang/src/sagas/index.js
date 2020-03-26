import { all } from 'redux-saga/effects';
import supplierSaga from './barang';

export default function* watchActions() {
    yield all([
        supplierSaga()
    ]);
}
