import { all } from 'redux-saga/effects';
import moduleSaga from './changePassword';

export default function* watchActions() {
    yield all([
        moduleSaga()
    ]);
}
