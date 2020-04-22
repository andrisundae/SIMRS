import { all } from 'redux-saga/effects';
import klasifikasiSaga from './klasifikasi';

export default function* watchActions() {
  yield all([klasifikasiSaga()]);
}
