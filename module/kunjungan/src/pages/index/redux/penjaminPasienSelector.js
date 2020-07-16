import * as actionTypes from './penjaminPasienActionTypes';

export const isDisableForm = (state) => {
  let statusForm = state.statusForm;

  return statusForm === actionTypes.ADD_PENJAMIN_PASIEN ||
    statusForm === actionTypes.EDIT_PENJAMIN_PASIEN
    ? false
    : true;
};
