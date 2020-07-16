import { all } from 'redux-saga/effects';
import { watchAclActions as aclSaga } from '@simrs/main/src/sagas/auth';
import moduleSaga from './kunjungan';
import penjaminPasienSaga from './penjaminPasien';

export default function* watchActions() {
  yield all([moduleSaga(), penjaminPasienSaga(), aclSaga()]);
}
