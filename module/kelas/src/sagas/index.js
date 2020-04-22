import { all } from 'redux-saga/effects';
import kelasSaga from './kelas';

export default function* watchActions() {
  yield all([kelasSaga()]);
}
