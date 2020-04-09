import { all } from 'redux-saga/effects';
import settingKlasifikasiPenunjangSaga from './settingKlasifikasiPenunjang';

export default function* watchActions() {
  yield all([settingKlasifikasiPenunjangSaga()]);
}
