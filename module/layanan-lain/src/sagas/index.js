import { all } from 'redux-saga/effects';
import layananLainSaga from './layananLain';

export default function* watchActions() {
  yield all([layananLainSaga()]);
}
