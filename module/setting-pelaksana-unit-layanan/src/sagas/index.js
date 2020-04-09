import { all } from 'redux-saga/effects';
import settingPelaksanaUnitLayananSaga from './settingPelaksanaUnitLayanan';

export default function* watchActions() {
  yield all([settingPelaksanaUnitLayananSaga()]);
}
