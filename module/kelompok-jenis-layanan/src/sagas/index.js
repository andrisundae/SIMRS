import { all } from 'redux-saga/effects';
import kelompokJenisLayananSaga from './kelompokJenisLayanan';

export default function* watchActions() {
  yield all([kelompokJenisLayananSaga()]);
}
