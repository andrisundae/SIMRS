import { redux } from '@simrs/common';
import actionTypes from './actionnsTypes';

const { createAction } = redux;

export default {
  getLog: {
    request: (resource, data) =>
      createAction(actionTypes.GET_LOG_HARGA_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_LOG_HARGA_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_LOG_HARGA_FAILURE, { error }, { resource }),
  },
  showLog: (resource, data) =>
    createAction(actionTypes.SHOW_LOG_HARGA, { data }, { resource }),
  loadLogHarga: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_LOG_HARGA_REQUEST,
      { data },
      { tableParams, resource }
    ),
};
