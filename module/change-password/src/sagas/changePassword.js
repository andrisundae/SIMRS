import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';

import { validator as commonValidator, toastr, store} from '@simrs/common';
import { loaderActions, messageBox} from '@simrs/components';
import api from '../services/models/changePasswordModel';
import {
    actions,
    actionTypes
} from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
    yield put(actions.populateForm(meta.resource, { username: store.main.get('user.username') }));
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRules(resource);
        let post = payload.data;
        let errors = validator(post, rules, messages);

        if (_.isEmpty(errors)) {
            let response = yield call(api.save, post);
            if (response.status) {
                yield put(actions.save.requestSuccess(resource, response));
            } else {
                yield put(actions.save.requestFailure(resource, errors));
                yield toastr.warning(response.message);
                yield put(actions.onFocusElement(resource, 'oldPassword'));
            }
        } else {
            yield put(actions.onFocusElement(resource, getFirstElementError(errors)));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess() {
    try {
        yield messageBox({
            onOk: () => {
                ipcRenderer.send('session-expired')
            },
            message: 'Ganti password berhasil, klik tombol OK untuk login kembali',
        });
    } catch (error) {
        yield toastr.error(error.message);
    }
}

export default function* watchAuthActions() {
    yield all([
        takeLatest(actionTypes.SAVE_REQUEST, handleSave),
        takeLatest(actionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(actionTypes.OPEN_FORM, openForm),
    ]);
}
