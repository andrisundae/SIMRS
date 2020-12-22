import { all } from 'redux-saga/effects';
import tindakanSaga from './tindakan';
import pelaksanaTambahanSaga from './pelaksanaTambahan';

export default function* watchActions() {
  yield all([tindakanSaga(), pelaksanaTambahanSaga()]);
}
