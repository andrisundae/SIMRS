import { all } from 'redux-saga/effects';
import hargaJual from './hargaJual';

export default function* watchActions() {
  yield all([hargaJual()]);
}
