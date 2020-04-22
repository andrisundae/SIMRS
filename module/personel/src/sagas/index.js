import { all } from 'redux-saga/effects';
import personelSaga from './personel';

export default function* watchActions() {
  yield all([personelSaga()]);
}
