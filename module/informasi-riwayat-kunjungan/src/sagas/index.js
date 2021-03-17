import { all } from 'redux-saga/effects';
import informasiRiwayatKunjunganSaga from './informasiRiwayatKunjungan';

export default function* watchActions() {
  yield all([informasiRiwayatKunjunganSaga()]);
}
