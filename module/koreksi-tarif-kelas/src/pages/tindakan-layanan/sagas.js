import { all } from 'redux-saga/effects';
import tindakanLayananSaga from './saga';

export default function* watchActions() {
  yield all([tindakanLayananSaga()]);
}
