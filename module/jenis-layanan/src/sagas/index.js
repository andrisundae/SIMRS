import { all } from 'redux-saga/effects';
import jenisLayananSaga from './jenisLayanan';

export default function* watchActions() {
  yield all([jenisLayananSaga()]);
}
