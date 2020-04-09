import { all } from 'redux-saga/effects';
import settingInstalasiKelasTambahanSaga from './settingInstalasiKelasTambahan';

export default function* watchActions() {
  yield all([settingInstalasiKelasTambahanSaga()]);
}
