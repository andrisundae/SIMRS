import { all } from 'redux-saga/effects';
import saga from './saga';

export default function* watchActions() {
    yield all([
        saga()
    ]);
}
