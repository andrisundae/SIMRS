import { all } from 'redux-saga/effects';
import komponenTarifSaga from './komponenTarif';

export default function* watchActions() {
  yield all([komponenTarifSaga()]);
}
