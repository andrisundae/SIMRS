import { all } from 'redux-saga/effects';
import grupSaga from './grup';

export default function* watchActions() {
  yield all([grupSaga()]);
}
