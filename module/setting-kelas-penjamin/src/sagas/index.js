import { all } from 'redux-saga/effects';
import settingKelasPenjaminSaga from './settingKelasPenjamin';

export default function* watchActions() {
  yield all([settingKelasPenjaminSaga()]);
}
