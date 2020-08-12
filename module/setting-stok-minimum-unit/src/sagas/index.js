import { all } from 'redux-saga/effects';
import stokMinimumUnit from './stokMinimumUnit';

export default function* watchActions() {
  yield all([stokMinimumUnit()]);
}
