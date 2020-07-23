import { redux } from '@simrs/common';
import actionTypes from './actionType';

const { createAction } = redux;

export default {
  onToggleCheck: (resource, data) =>
    createAction(actionTypes.ON_TOGGLE_CHECK, { data }, { resource }),
};
