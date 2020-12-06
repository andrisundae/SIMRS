import { all } from 'redux-saga/effects';
import konsulSaga from './konsul';

export default function* watchActions() {
  yield all([konsulSaga()]);
}
