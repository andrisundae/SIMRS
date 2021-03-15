import { all } from 'redux-saga/effects';
import detailPasienSaga from './detailPasien';

export default function* watchActions() {
  yield all([detailPasienSaga()]);
}
