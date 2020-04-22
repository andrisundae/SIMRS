import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
  generate: {
    request: (resource, data) =>
      createAction(
        actionTypes.GENERATE_UNIT_FARMASI_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GENERATE_UNIT_FARMASI_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GENERATE_UNIT_FARMASI_FAILURE,
        { error },
        { resource }
      ),
  },
  onToggleCheck: (resource, data) =>
    createAction(actionTypes.TOGGLE_CHECK, { data }, { resource }),
};
