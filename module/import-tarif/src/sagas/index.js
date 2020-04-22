import { all } from 'redux-saga/effects';
import importTarifSaga from './importTarif';

export default function* watchAuthActions() {
  yield all([importTarifSaga()]);
}
