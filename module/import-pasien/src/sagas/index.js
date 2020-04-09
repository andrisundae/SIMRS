import { all } from 'redux-saga/effects';
import importPasienSaga from './importPasien';

export default function* watchAuthActions() {
  yield all([importPasienSaga()]);
}
