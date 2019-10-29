import { all } from 'redux-saga/effects';
import provinsiSaga from './saga';

export default function* watchActions() {
    yield all([
        provinsiSaga()
    ]);
}
