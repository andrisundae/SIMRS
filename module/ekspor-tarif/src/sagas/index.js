import { all } from 'redux-saga/effects';
import eksporTarifSaga from './eksporTarif';

export default function* watchActions() {
    yield all([
        eksporTarifSaga()
    ]);
}
