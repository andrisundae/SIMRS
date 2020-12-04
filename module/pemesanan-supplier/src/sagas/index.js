import { all } from 'redux-saga/effects';
import sagaRedux from './pemesananSupplier';

export default function* watchActions() {
  yield all([sagaRedux()]);
}
