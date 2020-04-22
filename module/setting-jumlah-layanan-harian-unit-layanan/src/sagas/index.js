import { all } from 'redux-saga/effects';
import settingJumlahLayananHarianUnitLayananSaga from './settingJumlahLayananHarianUnitLayanan';

export default function* watchActions() {
  yield all([settingJumlahLayananHarianUnitLayananSaga()]);
}
