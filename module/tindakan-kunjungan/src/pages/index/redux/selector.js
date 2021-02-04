import { createSelector } from 'reselect';
import _ from 'lodash';
import { statusesElements } from '../static';

export const postSelector = createSelector(
  (state) => state.default.post,
  (post) => post
);
export const postItemSelector = createSelector(
  (state) => state.default.postItem,
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
export const showCariKunjunganSelector = createSelector(
  (state) => state.default.showCariKunjungan,
  (showCariKunjungan) => showCariKunjungan
);
export const showCariTindakanSelector = createSelector(
  (state) => state.default.showCariTindakan,
  (showCariTindakan) => showCariTindakan
);
export const datatableSelector = createSelector(
  (state) => state.datatable.datatables,
  (datatables) => datatables
);
export const selectedOptionSelector = createSelector(
  (state) => state.default.selectedOption,
  (data) => data
);
export const selectedRowSelector = createSelector(
  (state) => state.default.selectedRow,
  (data) => data
);
export const showModalPelaksanaTambahanSelector = createSelector(
  (state) => state.default.showPelaksanaTambahan,
  (show) => show
);
export const showPelaksanaTambahanSelector = createSelector(
  [
    selectedRowSelector,
    (state) => disabledElement(state, 'pelaksana_tambahan'),
  ],
  (selectedRow, isDisable) => (selectedRow && !isDisable ? true : false)
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
export const statusFormSelector = createSelector(
  (state) => state.default.statusForm,
  (data) => data
);
export const isRequestingPaseinSelector = createSelector(
  (state) => state.default.isRequestingPasien,
  (data) => data
);
export const isFromAntrianSelector = createSelector(
  (state) => state.default.isFromAntrian,
  (data) => data
);
export const showModalPelaksanaKomponenSelector = createSelector(
  (state) => state.default.showPelaksanaKomponen,
  (show) => show
);
