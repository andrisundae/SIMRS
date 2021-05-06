import { all } from 'redux-saga/effects';
import monitoring from './monitoring';

export default function* watchActions() {
  yield all([monitoring()]);
}
