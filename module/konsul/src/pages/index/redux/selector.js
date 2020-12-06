import { createSelector } from 'reselect';
import _ from 'lodash';
import { statusesElements, staticConst } from '../static';

const jenisLayananKonsul = [staticConst.RAWAT_DARURAT, staticConst.RAWAT_JALAN];
export const postSelector = createSelector(
  (state) => state.default.post,
  (post) => post
);
export const kunjunganSelector = createSelector(
  (state) => state.default.kunjungan,
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
export const datatableSelector = createSelector(
  (state) => state.datatable.datatables,
  (datatables) => datatables
);
export const selectedOptionSelector = createSelector(
  (state) => state.default.selectedOption,
  (data) => data
);
export const kelompokSelector = createSelector(
  dataSelector,
  (data) => data.kelompok
);
export const administrasiKonsulSelector = createSelector(
  dataSelector,
  (data) => data.administrasiKonsul
);
export const administrasiKonsulLoaderSelector = createSelector(
  (state) => state.default.administrasiKonsulLoader,
  (loader) => loader
);
export const instalasiSelector = createSelector(dataSelector, (data) =>
  data.instalasi.filter((row) =>
    _.includes(jenisLayananKonsul, row.alias_jenis_layanan)
  )
);
export const unitLayananSelector = createSelector(
  dataSelector,
  (data) => data.unitLayanan
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
