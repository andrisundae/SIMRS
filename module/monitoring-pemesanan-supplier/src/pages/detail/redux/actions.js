import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionsTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
  loadItemPemesanan: {
    request: (resource, data, tableParams) =>
      createAction(
        actionTypes.PEMESANAN_ITEM_REQUEST,
        { data },
        { resource, tableParams }
      ),
    requestSuccess: (resource, data, tableParams) =>
      createAction(
        actionTypes.PEMESANAN_ITEM_SUCCESS,
        { data },
        { resource, tableParams }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        actionTypes.PEMESANAN_ITEM_FAILURE,
        { errors },
        { resource }
      ),
  },
  loadPenerimaan: {
    request: (resource, data, tableParams) =>
      createAction(
        actionTypes.PENERIMAAN_REQUEST,
        { data },
        { resource, tableParams }
      ),
    requestSuccess: (resource, data, tableParams) =>
      createAction(
        actionTypes.PENERIMAAN_SUCCESS,
        { data },
        { resource, tableParams }
      ),
    requestFailure: (resource, errors) =>
      createAction(actionTypes.PENERIMAAN_FAILURE, { errors }, { resource }),
  },
  loadItemPenerimaan: {
    request: (resource, data, tableParams) =>
      createAction(
        actionTypes.PENERIMAAN_ITEM_REQUEST,
        { data },
        { resource, tableParams }
      ),
    requestSuccess: (resource, data, tableParams) =>
      createAction(
        actionTypes.PENERIMAAN_ITEM_SUCCESS,
        { data },
        { resource, tableParams }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        actionTypes.PENERIMAAN_ITEM_FAILURE,
        { errors },
        { resource }
      ),
  },
  onSelectItem: (resource, data) =>
    createAction(actionTypes.SELECT_ITEM_PENERIMAAN, { data }, { resource }),
};
