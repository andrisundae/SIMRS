import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
  getUnitFarmasi: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_UNIT_FARMASI_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_UNIT_FARMASI_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_UNIT_FARMASI_FAILURE,
        { error },
        { resource }
      ),
  },
  onChangeSelect: (resource, data) =>
    createAction(actionTypes.CHANGE_SELECT, { data }, { resource }),
};
