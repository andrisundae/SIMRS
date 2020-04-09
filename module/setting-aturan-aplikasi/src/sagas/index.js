import { all } from 'redux-saga/effects';
import moduleSaga from './aturanAplikasi';

export default function* watchActions() {
  yield all([moduleSaga()]);
}
