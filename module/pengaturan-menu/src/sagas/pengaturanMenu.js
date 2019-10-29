import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import _ from 'lodash';

import { validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, datatableActions, constDatatable, datatableActionTypes } from '@simrs/components';
import api from '../services/models/pengaturanMenuModel';
import {
    actions,
    actionTypes
} from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* resetForm({ meta }) {
    yield put(actions.openForm(meta.resource));
}

function* openForm({ meta }) {
    yield put(actions.populateForm(meta.resource));
}

const getExpandData = (defaultExpanded, data) => {
    data.forEach(row => {
        if (row.open) {
            defaultExpanded.push(row.key);
            if (row.children) {
                defaultExpanded = getExpandData(defaultExpanded, row.children);
            }
        }
    })

    return defaultExpanded;
}

function* loadDetail({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getDetail, payload.data.id);
        if (response.status) {
            successCallback(response.data, response.data.length)
        } else {
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(meta.resource));
}

function* populateForm({ meta }) {
    try {
        const { menu, onReady } = actions;

        yield put(loaderActions.show());
        yield put(menu.request(meta.resource));

        let response = yield call(api.getMenu);
        if (response.status) {
            let dataMenu = response.data;
            let dataExpanded = getExpandData([], dataMenu);

            yield put(menu.requestSuccess(meta.resource, { menu: dataMenu, expanded: dataExpanded }));
        } else {
            yield put(menu.requestFailure(meta.resource, response.message));
            yield toastr.error(response.message);
        }

        yield put(onReady(meta.resource));
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSave({ payload, meta }) {
    let { resource } = meta;
    const { save, onFocusElement } = actions;
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationRules(resource);
        let post = payload.data;
        let method = post.id ? 'koreksi' : 'tambah';
        let errors = validator(post, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.save, method, post);
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
            yield put(save.requestFailure(resource, errors));
            yield put(onFocusElement(resource, getFirstElementError(errors)));
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
        yield put(actions.populateForm(meta.resource));

        let data = payload.data.data;
        let selectedKeys = [data.kode + '.' + data.id];
        let selectedData = { ...data };
        yield put(actions.onSelectedChange(meta.resource, { selectedKeys, selectedData }))
        yield ipcRenderer.send('enable-header');
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSaveDetail({ payload, meta }) {
    let { resource } = meta;
    const { saveDetail, onFocusElement } = actions;
    try {
        yield put(loaderActions.show());
        let { rules, messages } = api.validationDetailRules(resource);
        let post = payload.data;
        let errors = validator(post, rules, messages);
        let isError = false;

        if (_.isEmpty(errors)) {
            let response = yield call(api.saveDetail, post);
            if (response.status) {
                yield put(saveDetail.requestSuccess(resource, response));
            } else {
                isError = true;
                errors = response.data;
            }
        } else {
            isError = true;
        }

        if (isError) {
            yield put(saveDetail.requestFailure(resource, errors));
            yield put(onFocusElement(resource, 'nama_detail'));
            yield toastr.warning(getFirstError(errors));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveDetailSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleReloaded({ meta }) {
    yield put(actions.onReadyDetail(meta.resource));
}

function* handleDelete({ payload, meta }) {
    try {
        yield put(loaderActions.show());
        let post = payload.data;

        let response = yield call(api.delete, { id: post.id });
        if (response.status) {
            yield put(actions.delete.requestSuccess(meta.resource, response));
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
        yield put(actions.populateForm(meta.resource));
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleAdd({ meta }) {
    yield put(datatableActions.onReload(meta.resource));
    yield put(actions.onFocusElement(meta.resource, 'nama'));
}

function* handleEdit({ meta }) {
    yield put(actions.onReadyDetail(meta.resource));
    yield put(actions.onFocusElement(meta.resource, 'nama'));

}

function* handleAddDetail({ meta }) {
    yield put(actions.onFocusElement(meta.resource, 'nama_detail'));
}

function* handleSelected({ meta }) {
    yield put(datatableActions.onReload(meta.resource, constDatatable.reloadType.purge));
}

function* handleDeleteDetail({ payload, meta }) {
    try {
        yield put(loaderActions.show());

        let response = yield call(api.deleteDetail, payload.data);
        if (response.status) {
            yield put(actions.deleteDetail.requestSuccess(meta.resource, response));
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

function* handleDeleteDetailSuccess({ payload, meta }) {
    try {
        yield put(datatableActions.onReload(meta.resource));
        yield toastr.success(payload.data.message);
    } catch (error) {
        yield toastr.error(error.message);
    }
}

export default function* watchActions() {
    yield all([
        takeLatest(actionTypes.SAVE_REQUEST, handleSave),
        takeLatest(actionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(actionTypes.SAVE_DETAIL_REQUEST, handleSaveDetail),
        takeLatest(actionTypes.SAVE_DETAIL_SUCCESS, handleSaveDetailSuccess),
        takeLatest(actionTypes.DELETE_REQUEST, handleDelete),
        takeLatest(actionTypes.DELETE_SUCCESS, handleDeleteSuccess),
        takeLatest(actionTypes.ADD, handleAdd),
        takeLatest(actionTypes.ADD_DETAIL, handleAddDetail),
        takeLatest(actionTypes.EDIT, handleEdit),
        takeLatest(actionTypes.OPEN_FORM, openForm),
        takeLatest(actionTypes.RESET, resetForm),
        takeLatest(actionTypes.POPULATE_FORM, populateForm),
        takeLatest(actionTypes.LOAD_DETAIL, loadDetail),
        takeLatest(actionTypes.SELECTED, handleSelected),
        takeLatest(actionTypes.DELETE_DETAIL_REQUEST, handleDeleteDetail),
        takeLatest(actionTypes.DELETE_DETAIL_SUCCESS, handleDeleteDetailSuccess),
        takeLatest(datatableActionTypes.RELOADED, handleReloaded),
    ]);
}
