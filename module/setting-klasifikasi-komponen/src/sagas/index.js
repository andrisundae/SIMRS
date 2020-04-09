import { all } from 'redux-saga/effects';
import settingKlasifikasiKomponenSaga from './settingKlasifikasiKomponen';

export default function* watchActions() {
  yield all([settingKlasifikasiKomponenSaga()]);
}
