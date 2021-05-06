import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { toastr } from '@simrs/common';
import {
  loaderActions,
  datatableActions,
  messageBox,
  datatableActionTypes,
} from '@simrs/components';
import api from '../services/models/model';
import { actionTypes, actions, staticConst } from '../pages/index';
import {
  selectedSelector,
  loaderKunjunganDetailSelector,
} from '../pages/index/redux/selector';

function* openForm({ meta }) {
  yield put(datatableActions.onInitialize(staticConst.TABLE_RIWAYAT_KUNJUNGAN));
  yield put(
    datatableActions.onInitialize(staticConst.TABLE_RIWAYAT_KUNJUNGAN_UNIT)
  );
  yield put(
    datatableActions.onInitialize(
      staticConst.TABLE_RIWAYAT_KUNJUNGAN_UNIT_DETAIL
    )
  );
  yield put(actions.onReady(meta.resource));
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

function* loadRiwayatKunjunganHandler({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;
  try {
    let response = yield call(api.getRiwayatKunjungan, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(staticConst.TABLE_RIWAYAT_KUNJUNGAN));
}

function* loadRiwayatKunjunganUnitHandler({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;
  try {
    const response = yield call(api.getRiwayatKunjunganUnit, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(
    datatableActions.onReloaded(staticConst.TABLE_RIWAYAT_KUNJUNGAN_UNIT)
  );
}

function* loadRiwayatKunjunganUnitDetailHandler({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;
  try {
    const response = yield call(
      api.getRiwayatKunjunganUnitDetail,
      payload.data
    );
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(
    datatableActions.onReloaded(staticConst.TABLE_RIWAYAT_KUNJUNGAN_UNIT_DETAIL)
  );
}

function* selectedKunjunganHandler({ payload, meta }) {
  // yield put(actions.kunjunganDetail.request(meta.resource, payload.data));
}

function* reloadedRiwayatKunjunganHandler({ meta }) {
  const { kunjungan } = yield select(selectedSelector);
  const loader = yield select(loaderKunjunganDetailSelector);
  if (meta.resource === staticConst.TABLE_RIWAYAT_KUNJUNGAN_UNIT && !loader) {
    yield put(
      actions.kunjunganDetail.request(meta.resource, { id: kunjungan.id })
    );
  }
}

function* kunjunganDetailRequestHandler({ payload, meta }) {
  try {
    const response = yield call(api.getKunjunganDetail, payload.data.id);
    if (response.status) {
      yield put(
        actions.kunjunganDetail.requestSuccess(meta.resource, response.data)
      );
    } else {
      yield put(actions.kunjunganDetail.requestFailure(meta.resource));
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* readyHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'norm'));
}

export default function* watchActions() {
  yield all([
    takeLatest(actionTypes.OPEN_FORM, openForm),
    takeLatest(actionTypes.GET_PASIEN_REQUEST, getPasienRequestHandler),
    takeLatest(actionTypes.READY, readyHandler),
    takeLatest(
      actionTypes.GET_RIWAYAT_KUNJUNGAN_REQUEST,
      loadRiwayatKunjunganHandler
    ),
    takeLatest(
      actionTypes.GET_RIWAYAT_KUNJUNGAN_UNIT_REQUEST,
      loadRiwayatKunjunganUnitHandler
    ),
    takeLatest(
      actionTypes.GET_RIWAYAT_KUNJUNGAN_UNIT_DETAIL_REQUEST,
      loadRiwayatKunjunganUnitDetailHandler
    ),
    takeLatest(
      actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST,
      kunjunganDetailRequestHandler
    ),
    takeLatest(datatableActionTypes.RELOADED, reloadedRiwayatKunjunganHandler),
  ]);
}
