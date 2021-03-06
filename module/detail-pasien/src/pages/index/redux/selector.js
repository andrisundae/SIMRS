import { createSelector } from 'reselect';
import _ from 'lodash';
import { statusesElements } from '../static';

export const postSelector = createSelector(
  (state) => state.default.post,
  (post) => post
);
export const loaderSelector = createSelector(
  (state) => state.loader.count,
  (count) => count > 0
);
export const loaderMessageSelector = createSelector(
  (state) => state.loader.message,
  (message) => message
);
export const focusElementSelector = createSelector(
  (state) => state.default.focusElement,
  (focusElement) => focusElement
);
export const dataSelector = createSelector(
  (state) => state.default.data,
  (data) => data
);
export const selectedOptionSelector = createSelector(
  (state) => state.default.selectedOption,
  (data) => data
);
export const filterWilayahSelector = createSelector(
  (state) => state.default.filterWilayah,
  (data) => data
);
export const datatableSelector = createSelector(
  (state) => state.datatable.datatables,
  (datatables) => datatables
);
export const disabledElement = createSelector(
  [(state) => state.default.statusForm, (state, element) => element],
  (statusForm, element) => {
    if (statusesElements[statusForm]) {
      if (_.includes(statusesElements[statusForm], element)) {
        return false;
      }
      return true;
    }

    return true;
  }
);
