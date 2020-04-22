import { all } from 'redux-saga/effects';
import settingJumlahLayananHarianGlobalSaga from './settingJumlahLayananHarianGlobal';

export default function* watchActions() {
  yield all([settingJumlahLayananHarianGlobalSaga()]);
}
