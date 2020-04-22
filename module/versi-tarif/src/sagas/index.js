import { all } from 'redux-saga/effects';
import versiTarifSaga from './versiTarif';

export default function* watchActions() {
  yield all([versiTarifSaga()]);
}
