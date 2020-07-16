import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import dayjs from 'dayjs';

import { validator as commonValidator, toastr } from '@simrs/common';
import {
  loaderActions,
  messageBox,
  constDatatable,
  datatableActions,
} from '@simrs/components';
import api from '../services/models/penjaminPasienModel';
import apiKunjungan from '../services/models/kunjunganModel';
import * as actions from '../pages/index/redux/penjaminPasienActions';
import * as actionTypes from '../pages/index/redux/penjaminPasienActionTypes';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

const TABLE_PENJAMIN_PASIEN = 'table_penjamin_pasien';

// function* populateForm({ meta }) {
//   try {
//     yield put(loaderActions.show());
//     let { populateForm } = actions;
//     let response = yield call(api.init);
//     if (response.status) {
//       yield put(populateForm.requestSuccess(meta.resource, response.data));
//     } else {
//       yield put(populateForm.requestFailure(meta.resource, response.message));
//     }

//     yield put(loaderActions.hide());
//   } catch (error) {
//     yield put(loaderActions.hide());
//     yield toastr.error(error.message);
//   }
// }

function* loadAllPenjaminPasien({ payload, meta }) {
  const { successCallback, failCallback } = meta.tableParams;

  try {
    let response = yield call(api.getAll, payload.data);
    if (response.status) {
      successCallback(response.data, response.recordsTotal);
    } else {
      failCallback();
    }
  } catch (error) {
    failCallback();
  }
  yield put(datatableActions.onReloaded(TABLE_PENJAMIN_PASIEN));
}

function* changeSelect2({ meta, payload }) {
  try {
    switch (payload.name) {
      case 'id_penjamin_pasien':
        yield put(
          actions.settingKelasPenjamin.request(meta.resource, payload.data)
        );
        break;
      default:
        break;
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* settingKelasPenjaminRequestHandler({ meta, payload }) {
  try {
    let response = yield call(
      apiKunjungan.getSettingKelasPenjamin,
      payload.data.value
    );
    if (response.status) {
      yield put(
        actions.settingKelasPenjamin.requestSuccess(
          meta.resource,
          response.data
        )
      );
    } else {
      yield put(
        actions.settingKelasPenjamin.requestFailure(
          meta.resource,
          response.message
        )
      );
    }
  } catch (error) {
    yield toastr.error(error.message);
  }
}

function* addHandler({ meta }) {
  yield put(actions.onFocusElement(meta.resource, 'id_penjamin_pasien'));
}

export default function* watchAuthActions() {
  yield all([
    takeLatest(actionTypes.LOAD_ALL_PENJAMIN_PASIEN, loadAllPenjaminPasien),
    takeLatest(actionTypes.CHANGE_SELECT2_PENJAMIN_PASIEN, changeSelect2),
    takeLatest(actionTypes.ADD_PENJAMIN_PASIEN, addHandler),
    takeLatest(
      actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_REQUEST,
      settingKelasPenjaminRequestHandler
    ),
  ]);
}
