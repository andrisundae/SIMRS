import { all } from 'redux-saga/effects';
import settingLayananSpesialisasiSaga from './settingLayananSpesialisasi';

export default function* watchActions() {
  yield all([settingLayananSpesialisasiSaga()]);
}
