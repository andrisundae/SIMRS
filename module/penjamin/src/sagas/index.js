import { all } from 'redux-saga/effects';
import penjaminSaga from './penjamin';

export default function* watchActions() {
  yield all([penjaminSaga()]);
}
