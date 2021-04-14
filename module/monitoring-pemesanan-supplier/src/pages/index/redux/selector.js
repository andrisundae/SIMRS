import { createSelector } from 'reselect';
import _ from 'lodash';

const masterState = (state) => state.default.master;

export const focusElementMaster = createSelector(
  masterState,
  (master) => master.focusElement
);
export const filterMaster = createSelector(
  masterState,
  (master) => master.filter
);
export const listData = createSelector(
  masterState,
  (master) => master.data.listData
);
export const optionsMaster = createSelector(
  masterState,
  (master) => master.data.options
);
