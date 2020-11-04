import { all } from 'redux-saga/effects';
import tindakanSaga from './tindakan';

export default function* watchActions() {
  yield all([tindakanSaga()]);
}
