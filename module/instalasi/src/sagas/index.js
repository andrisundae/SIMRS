import { all } from 'redux-saga/effects';
import instalasiSaga from './instalasi';

export default function* watchActions() {
  yield all([instalasiSaga()]);
}
