import { all } from 'redux-saga/effects';
import pembelian from './pembelian';

export default function* watchActions() {
  yield all([pembelian()]);
}
