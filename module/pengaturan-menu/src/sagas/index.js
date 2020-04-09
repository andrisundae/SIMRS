import { all } from 'redux-saga/effects';
import pengaturanMenuSaga from './pengaturanMenu';

export default function* watchActions() {
  yield all([pengaturanMenuSaga()]);
}
