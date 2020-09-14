import { all } from 'redux-saga/effects';
import antrianKunjunganSaga from './antrianKunjungan';

export default function* watchActions() {
  yield all([antrianKunjunganSaga()]);
}
