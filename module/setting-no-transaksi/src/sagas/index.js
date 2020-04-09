import { all } from 'redux-saga/effects';
import noTransaksiSaga from './noTransaksi';

export default function* watchActions() {
  yield all([noTransaksiSaga()]);
}
