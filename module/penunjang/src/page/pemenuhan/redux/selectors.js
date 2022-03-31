import { createSelector } from 'reselect';
import _ from 'lodash';
import { ready, select, add , edit} from './slice';
import { staticConst } from '../../../static';

// Untuk pengecekan status form
const statusesElements = {
  [ready.type]: ['add', staticConst.TABLE_PERMINTAAN_PENUNJANG],
  [add.type]: ['save', 'cancel', 'form-pemenuhan-penunjang'],
  [edit.type]: ['save', 'cancel', 'form-pemenuhan-penunjang'],
  [select.type]: ['add', 'edit', 'delete', 'finish'],
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
