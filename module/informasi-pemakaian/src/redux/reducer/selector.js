import { createSelector } from 'reselect';
import _ from 'lodash';
// import { ready, select, edit, selectKunjungan } from './index';
import { ready, addTransaksi } from './index';
import { staticConst } from '../../static';

const statusElement = {
  [ready.type]: ['tambahTransaksi'],
  [addTransaksi.type]: ['save', 'cancel', 'selectUnit'],
  // [select.type]: [
  //   'edit_dpjp',
  //   'delete',
  //   'finish',
  // ],
  // [edit.type]: ['form_tempat_tidur', 'cancel', 'save'],
  // [selectKunjungan.type]: [
  //   'edit_dpjp',
  //   'finish',
  //   staticConst.TABLE_HISTORY_TEMPAT_TIDUR,
  // ],
};
export const disabledElement = createSelector(
  [(state) => state.module.statusForm, (state, element) => element],
  (statusForm, element) => {
    if (statusElement[statusForm]) {
      if (_.includes(statusElement[statusForm], element)) {
        return false;
      }
      return true;
    }

    return true;
  }
);

export const disabledActionsSelector = createSelector(
  (state) => state,
  (state) => {
    return {
      tambahTransaksi: disabledElement(state, 'tambahTransaksi'),
      // edit_dpjp: disabledElement(state, 'edit_dpjp'),
      // edit: disabledElement(state, 'edit'),
      save: disabledElement(state, 'save'),
      // move_room: disabledElement(state, 'move_room'),
    };
  }
);

export const disabledInputSelctor = createSelector(
  (state) => state,
  (state) => {
    return {
      selectUnit: disabledElement(state, 'selectUnit'),
    };
  }
);

export const moduleSelector = createSelector(
  (state) => state.module,
  (module) => module
);

export const masterSelector = createSelector(
  (state) => state.module,
  (module) => module.master
);

export const focusElementSelector = createSelector(
  (state) => state.module,
  (module) => module.focusElement
);

export const moduleFilter = createSelector(
  (state) => state.module,
  (module) => module.filter
);
