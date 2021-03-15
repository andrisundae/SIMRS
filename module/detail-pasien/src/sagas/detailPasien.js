import { put, call, takeLatest, all } from 'redux-saga/effects';
import _ from 'lodash';
import { toastr, validator as commonValidator } from '@simrs/common';
import { loaderActions, datatableActions, messageBox } from '@simrs/components';
import api, { validationRules } from '../services/models/model';

import { actionTypes, actions, staticConst } from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

function* openForm({ meta }) {
  yield put(datatableActions.onInitialize(staticConst.TABLE_SEARCH_WILAYAH));
  yield put(actions.populateForm.request(meta.resource));
  yield put(actions.onReady(meta.resource));
}

function* populateForm({ meta }) {
  try {
    yield put(loaderActions.show());
    let { populateForm } = actions;
    let response = yield call(api.init);
    if (response.status) {
      yield put(populateForm.requestSuccess(meta.resource, response.data));
    } else {
      yield put(populateForm.requestFailure(meta.resource, response.message));
    }

    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* getPasienRequestHandler({ meta, payload }) {
  try {
    yield put(loaderActions.show());
    const response = yield call(api.getPasienByNorm, payload.data.norm);
    if (response.status) {
      const data = response.data;
      yield put(actions.getPasien.requestSuccess(meta.resource, data));
    } else {
      yield put(
        actions.getPasien.requestFailure(meta.resource, response.message)
      );
      messageBox({
        title: 'Info',
        message: response.message,
      });
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield toastr.error(error.message);
    yield put(loaderActions.hide());
  }
}

function* editHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'nama'));
}

function* saveHandler({ payload, meta }) {
  const { resource } = meta;
  try {
    yield put(loaderActions.show('Proses simpan...'));
    yield put(actions.onFocusElement(resource, ''));
    const { rules, messages } = validationRules(resource);
    const post = payload.data;
    let errors = validator(post, rules, messages);
    let isError = false;

    if (_.isEmpty(errors)) {
      const response = yield call(api.save, post);
      if (response.status) {
        yield toastr.success(response.message);
        yield put(actions.save.requestSuccess(resource, response));
      } else {
        isError = true;
        errors = response.data;
      }
    } else {
      isError = true;
    }

    if (isError) {
      yield toastr.warning(getFirstError(errors));
      yield put(actions.save.requestFailure(resource, errors));
    }
    yield put(loaderActions.hide());
  } catch (error) {
    yield put(loaderActions.hide());
    yield toastr.error(error.message);
  }
}

function* saveFailureHandler({ payload, meta }) {
  let { resource } = meta;
  yield put(
    actions.onFocusElement(resource, getFirstElementError(payload.errors))
  );
}

function* readyHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'norm'));
}

export default function* watchActions() {
  yield all([
    takeLatest(actionTypes.OPEN_FORM, openForm),
    takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
    takeLatest(actionTypes.GET_PASIEN_REQUEST, getPasienRequestHandler),
    takeLatest(actionTypes.EDIT, editHandler),
    takeLatest(actionTypes.SAVE_REQUEST, saveHandler),
    // takeLatest(actionTypes.SAVE_SUCCESS, saveSuccessHandler),
    takeLatest(actionTypes.SAVE_FAILURE, saveFailureHandler),
    takeLatest(actionTypes.READY, readyHandler),
  ]);
}
