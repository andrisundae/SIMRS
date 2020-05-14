import { all } from 'redux-saga/effects';
import settingBarangSupplier from './settingBarangSupplier';

export default function* watchActions() {
  yield all([settingBarangSupplier()]);
}
