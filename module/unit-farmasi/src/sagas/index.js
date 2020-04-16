import { all } from 'redux-saga/effects';
import unitFarmasi from './unitFarmasi';

export default function* watchActions() {
  yield all([unitFarmasi()]);
}
