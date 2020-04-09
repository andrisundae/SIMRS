import { all } from 'redux-saga/effects';
import stokUnitLayananSaga from './stokUnitLayanan';

export default function* watchActions() {
  yield all([stokUnitLayananSaga()]);
}
