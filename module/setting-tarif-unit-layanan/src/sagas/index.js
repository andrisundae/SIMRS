import { all } from 'redux-saga/effects';
import settingTarifUnitLayananSaga from './settingTarifUnitLayanan';

export default function* watchActions() {
  yield all([settingTarifUnitLayananSaga()]);
}
