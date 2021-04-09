import { createSelector } from 'reselect';
import _ from 'lodash';
import { statusesElements } from '../static';

export const postSelector = createSelector(
  (state) => state.default.post,
  (post) => post
);
export const selectedSelector = createSelector(
  (state) => state.default.selected,
  (selected) => selected
);
export const loaderKunjunganDetailSelector = createSelector(
  (state) => state.default.loaderKunjunganDetail,
  (loaderKunjunganDetail) => loaderKunjunganDetail
);
export const summarySelector = createSelector(
  (state) => state.default.summary,
  (summary) => summary
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
