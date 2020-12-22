import { createSelector } from 'reselect';
import _ from 'lodash';
import { statusesPelaksanaTambahan, staticConst } from '../../static';

export const selectedRowSelector = createSelector(
  (state) => state.pelaksanaTambahan.selectedRow,
  (data) => data
);
export const postSelector = createSelector(
  (state) => state.pelaksanaTambahan.post,
  (post) => post
);
export const dataSelector = createSelector(
  (state) => state.pelaksanaTambahan.data,
  (data) => data
);
export const datatableSelector = createSelector(
  (state) => state.datatable.datatables,
  (datatables) => datatables[staticConst.TABLE_PELAKSANA_TAMBAHAN] || {}
);
export const selectedOptionSelector = createSelector(
  (state) => state.pelaksanaTambahan.selectedOption,
  (data) => data
);
export const focusElementSelector = createSelector(
  (state) => state.pelaksanaTambahan.focusElement,
  (focusElement) => focusElement
);
export const loaderPelaksanaSelector = createSelector(
  (state) => state.pelaksanaTambahan.loaderPelaksana,
  (loaderPelaksana) => loaderPelaksana
);
export const statusFormSelector = createSelector(
  (state) => state.pelaksanaTambahan.statusForm,
  (statusForm) => statusForm
);

export const disabledElement = createSelector(
  [(state) => state.pelaksanaTambahan.statusForm, (state, element) => element],
  (statusForm, element) => {
    if (statusesPelaksanaTambahan[statusForm]) {
      if (_.includes(statusesPelaksanaTambahan[statusForm], element)) {
        return false;
      }
      return true;
    }

    return true;
  }
);
