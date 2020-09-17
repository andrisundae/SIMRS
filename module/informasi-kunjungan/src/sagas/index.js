import { all } from 'redux-saga/effects';
import informasiKunjunganSaga from './informasiKunjungan';

export default function* watchActions() {
  yield all([informasiKunjunganSaga()]);
}
