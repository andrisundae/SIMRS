import { all } from 'redux-saga/effects';
import penerimaan from './penerimaan';

export default function* watchActions() {
  yield all([penerimaan()]);
}
