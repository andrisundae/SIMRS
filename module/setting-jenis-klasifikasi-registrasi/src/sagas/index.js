import { all } from 'redux-saga/effects';
import settingJenisKlasifikasiRegistrasiSaga from './settingJenisKlasifikasiRegistrasi';

export default function* watchActions() {
  yield all([settingJenisKlasifikasiRegistrasiSaga()]);
}
