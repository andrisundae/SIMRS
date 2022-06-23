import { createSelector } from 'reselect';
import _ from 'lodash';
import { ready, select, add, edit } from './slice';
import { staticConst } from '../../../static';

// Untuk pengecekan status form
const statusesElements = {
  [ready.type]: [
    'add',
    staticConst.TABLE_TINDAKAN_LAIN,
    'finish',
    staticConst.TABLE_TINDAKAN_LAIN_DETAIL,
  ],
  [add.type]: ['save', 'cancel', 'form-transaksi-lain'],
  [edit.type]: ['save', 'cancel', 'form-transaksi-lain'],
  [select.type]: [
    'add',
    'edit',
    'delete',
    'finish',
    staticConst.TABLE_TINDAKAN_LAIN,
    staticConst.TABLE_TINDAKAN_LAIN_DETAIL,
  ],
};

export const disabledElement = createSelector(
  [(state) => state.module.statusForm, (state, element) => element],
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

export const moduleSelector = createSelector(
  (state) => state.module,
  (module) => module
);

export const disabledActionsSelector = createSelector(
  (state) => state,
  (state) => {
    return {
      finish: disabledElement(state, 'finish'),
      edit: disabledElement(state, 'edit'),
      add: disabledElement(state, 'add'),
      delete: disabledElement(state, 'delete'),
      save: disabledElement(state, 'save'),
      cancel: disabledElement(state, 'cancel'),
    };
  }
);

export const postPermintaanSelector = createSelector(
  (state) => state.module.postPermintaan,
  (postPermintaan) => postPermintaan
);

export const selectedSelector = createSelector(
  (state) => state.module.selected,
  (selected) => selected
);

export const selectedKunjunganSelector = createSelector(
  (state) => state.module.selectedKunjungan,
  (selected) => selected
);

export const statusFormSelector = createSelector(
  (state) => state.module.statusForm,
  (statusForm) => statusForm
);

export const loaderSelector = createSelector(
  (state) => state.module.loading,
  (loading) => loading
);

export const focusElementSelector = createSelector(
  (state) => state.module.focusElement,
  (focusElement) => focusElement
);
