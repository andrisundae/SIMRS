import { all } from 'redux-saga/effects';
import unitLayananSaga from './unitLayananSaga';

export default function* watchActions() {
    yield all([
        unitLayananSaga()
    ]);
}
