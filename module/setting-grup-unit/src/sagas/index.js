import { all } from 'redux-saga/effects';
import settingGrupUnitSaga from './settingGrupUnit';

export default function* watchActions() {
  yield all([settingGrupUnitSaga()]);
}
