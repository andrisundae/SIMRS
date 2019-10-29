import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';

import {validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import api from '../services/models/personelModel';
import apiAuth from '@simrs/main/src/services/models/authModel';
import {
    moduleActionTypes,
    moduleActions,
    filterActionTypes
} from '@simrs/main/src/modules/master/default';
import aclActions from '@simrs/main/src/modules/auth/aclActions';
import authActions, { actionTypes as authActionTypes } from '@simrs/main/src/modules/auth/authActions';

import { actionTypes, actions, filterIndexActionTypes, uploadGambarActions, getPostUploadGambar} from '../pages/index';

const { getFirstError, getFirstElementError} = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
    yield put(actions.getGranted.request());
    yield put(actions.populateForm.request(meta.resource));
}

function* loadAll({ payload, meta }) {
    const { successCallback, failCallback, pastAction } = meta.tableParams;

    try {
        let response = yield call(api.getAll, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal)
        } else {
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(meta.resource, pastAction));
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRules(resource);
        let post = payload.data;
        let method = post.id ? 'koreksi' : 'tambah';
        let errors = validator(post, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            const password = post.id ? '' : post.password;
            post = {
                ...post,
                password
            }
            let response = yield call(api.save, method, post);
            if (response.status) {
                response.action = method;
                yield put(moduleActions.save.requestSuccess(resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            let elementError = getFirstElementError(errors);
            let focusElement = elementError === 'grups' ? 'grup_0' : elementError;

            yield put(moduleActions.save.requestFailure(resource, errors));
            yield put(moduleActions.onFocusElement(resource, focusElement));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleReloaded({ meta }) {
    yield put(moduleActions.onReady(meta.resource));
}

function* handleDelete({ payload, meta }) {
    try {
        yield put(loaderActions.show());
        let post = payload.data;

        let response = yield call(api.delete, { id: post.id });
        if (response.status) {
            yield put(moduleActions.delete.requestSuccess(meta.resource, response));
        } else {
            if (response.info.type === 'warning') {
                yield toastr.warning(response.message);
            } else {
                yield toastr.error(response.message);
            }
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleDeleteSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSearch({ meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleAdd({ meta }) {
    yield put(moduleActions.onFocusElement(meta.resource, 'nip'));
}

function* handleEdit({ meta }) {
    yield put(moduleActions.onFocusElement(meta.resource, 'nip'));
}

function* populateForm({ meta }) {

    try {
        yield put(loaderActions.show());
        let { populateForm } = actions;

        let response = yield call(api.getFormData);
        if (response.status) {
            yield put(populateForm.requestSuccess(meta.resource, response.data));
        } else {
            yield put(populateForm.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleChangeStatus({ payload, meta }) {
    try {
        yield put(loaderActions.show());

        let response = yield call(api.changeStatus, payload.data);
        if (response.status) {
            yield put(actions.changeStatusAplikasi.requestSuccess(meta.resource, response));
        } else {
            yield toastr.error(response.message);
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleChangeStatusSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleResetPassword({ payload, meta }) {
    try {
        yield put(loaderActions.show());

        let response = yield call(apiAuth.resetPassword, payload.data);
        if (response.status) {
            yield put(authActions.resetPassword.requestSuccess(meta.resource, response));
            yield toastr.success(response.message);
        } else {
            yield toastr.error(response.message);
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleForceLogout({ payload, meta }) {
    try {
        yield put(loaderActions.show());

        let response = yield call(apiAuth.forceLogout, payload.data);
        if (response.status) {
            yield put(authActions.forceLogout.requestSuccess(meta.resource, response));
            yield toastr.success(response.message);
        } else {
            yield toastr.error(response.message);
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleFilterStatusAplikasi({ meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleLoadPermissions({ meta }) {
    try {
        let data = {
            forceLogout: false,
            resetPassword: false
        };
        let message = '';
        let forceLogout = yield call(apiAuth.getGranted, '_auth_personel_logout');
        if (forceLogout.status) {
            data.forceLogout = _.includes(forceLogout.data, 'force');
        } else {
            message = forceLogout.message;
        }

        let resetPassword = yield call(apiAuth.getGranted, '_auth_personel_password');
        if (resetPassword.status) {
            data.resetPassword = _.includes(resetPassword.data, 'reset');
        } else {
            message = resetPassword.message;
        }

        if (!message) {
            yield put(actions.getGranted.requestSuccess(data));
        } else {
            yield put(actions.getGranted.requestFailure(message));
        }

    } catch (e) {
        yield put(aclActions.getGranted.requestFailure(meta.resource, e.message));
    }
}

function* openFormUploadGambar({ meta, payload }) {
    yield put(uploadGambarActions.populateForm.request(meta.resource));
    yield put(uploadGambarActions.detail.request(meta.resource, {id_personel: payload.data.id}));
}

function* populateFormUploadGambar({ meta, payload }) {

    try {
        yield put(loaderActions.show());
        const { populateForm } = uploadGambarActions;

        const response = yield call(api.getFormUploadGambarData);
        if (response.status) {
            yield put(populateForm.requestSuccess(meta.resource, response.data));
        } else {
            yield put(populateForm.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleDetailUploadGambar({ meta, payload }) {

    try {
        yield put(loaderActions.show());
        const { detail } = uploadGambarActions;

        const response = yield call(api.getFormUploadGambarDetail, payload.data);
        yield put(detail.requestSuccess(meta.resource, response.data));

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveUploadGambar({ payload, meta }) {
    let { resource } = meta;
    try {
        yield put(loaderActions.show());
        const { save } = uploadGambarActions;
        const { rules, messages } = api.validationUploadGambarRules(resource);
        const {id, id_jenis_gambar_personel, id_personel, file} = payload.data;
        const post = {id, id_jenis_gambar_personel, id_personel, file};
        let errors = validator(post, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.saveUploadGambar, post);
            if (response.status) {
                yield put(save.requestSuccess(resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            // console.log(getFirstError(errors))
            // let elementError = getFirstElementError(errors);
            yield put(save.requestFailure(resource, errors));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveUploadGambarSuccess({ payload, meta }) {
    try {
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleChangeJenisGambar({ payload, meta }) {
    const post = yield select(getPostUploadGambar);
    if (post.id_personel) {
        yield put(uploadGambarActions.detail.request(meta.resource, {
            id_personel: post.id_personel,
            id_jenis_gambar_personel: payload.data.value
        }));
    }
}

function* handleChangePersonel({ payload, meta }) {
    const post = yield select(getPostUploadGambar);
    if (post.id_jenis_gambar_personel) {
        yield put(uploadGambarActions.detail.request(meta.resource, {
            id_personel: payload.data.value,
            id_jenis_gambar_personel: post.id_jenis_gambar_personel
        }));
    }
}

function* handleDeleteUploadGambar({ payload, meta }) {
    try {
        yield put(loaderActions.show('Proses hapus...'));
        const { delete: onDelete } = uploadGambarActions;
        let post = payload.data;

        let response = yield call(api.deleteUploadGambar, { id: post.id });
        if (response.status) {
            yield put(onDelete.requestSuccess(meta.resource, response));
        } else {
            if (response.info.type === 'warning') {
                yield toastr.warning(response.message);
            } else {
                yield toastr.error(response.message);
            }
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleDeleteUploadGambarSuccess({ payload, meta }) {
    yield toastr.success(payload.data.message);
}

export default function* watchActions() {
    yield all([
        takeLatest(moduleActionTypes.LOAD_ALL, loadAll),
        takeLatest(moduleActionTypes.SAVE_REQUEST, handleSave),
        takeLatest(moduleActionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(moduleActionTypes.DELETE_REQUEST, handleDelete),
        takeLatest(moduleActionTypes.DELETE_SUCCESS, handleDeleteSuccess),
        takeLatest(moduleActionTypes.ADD, handleAdd),
        takeLatest(moduleActionTypes.EDIT, handleEdit),
        takeLatest(moduleActionTypes.OPEN_FORM, openForm),
        takeLatest(filterActionTypes.FILTER_SUBMIT, handleSearch),
        takeLatest(filterIndexActionTypes.FILTER_CHANGE_STATUS_APLIKASI, handleFilterStatusAplikasi),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
        takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
        takeLatest(actionTypes.CHANGE_STATUS_APLIKASI_REQUEST, handleChangeStatus),
        takeLatest(actionTypes.CHANGE_STATUS_APLIKASI_SUCCESS, handleChangeStatusSuccess),
        takeLatest(actionTypes.AUTH_GET_GRANTED_REQUEST, handleLoadPermissions),
        takeLatest(authActionTypes.RESET_PASSWORD_REQUEST, handleResetPassword),
        takeLatest(authActionTypes.FORCE_LOGOUT_REQUEST, handleForceLogout),

        takeLatest(actionTypes.OPEN_UPLOAD_GAMBAR, openFormUploadGambar),
        takeLatest(actionTypes.POPULATE_FORM_UPLOADGAMBAR_REQUEST, populateFormUploadGambar),
        takeLatest(actionTypes.SAVE_UPLOADGAMBAR_REQUEST, handleSaveUploadGambar),
        takeLatest(actionTypes.SAVE_UPLOADGAMBAR_SUCCESS, handleSaveUploadGambarSuccess),
        takeLatest(actionTypes.GET_UPLOADGAMBAR_DETAIL_REQUEST, handleDetailUploadGambar),
        takeLatest(actionTypes.CHANGE_JENISGAMBAR, handleChangeJenisGambar),
        takeLatest(actionTypes.CHANGE_PERSONEL, handleChangePersonel),

        takeLatest(actionTypes.DELETE_UPLOADGAMBAR_REQUEST, handleDeleteUploadGambar),
        takeLatest(actionTypes.DELETE_UPLOADGAMBAR_SUCCESS, handleDeleteUploadGambarSuccess),
    ]);
}
