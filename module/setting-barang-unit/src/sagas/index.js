import { all } from 'redux-saga/effects';
import settingBarangUnit from './settingBarangUnit';

export default function* watchActions() {
  yield all([settingBarangUnit()]);
}
