import { includes } from 'lodash';

import actionTypes from './actionTypes';
import { statusesElements } from '../static';

export const getPost = (state) => state.module.kunjungan.post;
export const getSelectedOption = (state) =>
  state.module.kunjungan.selectedOption;
export const isPasienBaru = (state) => {
  return state.module.kunjungan.statusForm === actionTypes.ADD;
};

export const isDisabledKelompok = (state) => {
  let disabled = true;
  if (state.module) {
    const statusForm = state.module.kunjungan.statusForm;
    if (
      includes([actionTypes.ADD, actionTypes.ADD_WITH_SELECTED], statusForm)
    ) {
      disabled = false;
    } else {
      disabled = true;
    }
  }

  return disabled;
};

export const isDisabledUnitLayanan = (state) => {
  let disabled = true;
  if (state.module) {
    const statusForm = state.module.kunjungan.statusForm;
    if (
      statusForm === actionTypes.ADD ||
      statusForm === actionTypes.ADD_WITH_SELECTED
    ) {
      disabled = false;
    } else if (statusForm === actionTypes.EDIT) {
      disabled = false;
      const detail = state.module.kunjungan.detailRangkaianKunjungan;
      if (detail.st_inap === 1) {
        if (
          detail.is_entries_obat ||
          detail.is_entries_erm ||
          detail.is_bayar ||
          detail.is_penunjang_ditanggapi ||
          detail.is_konsul ||
          detail.is_tindakan_lain ||
          detail.is_kunjungan_lewat_1_hari ||
          detail.is_pindah_kamar
        ) {
          disabled = true;
        }
      } else {
        if (
          detail.is_entries_obat ||
          detail.is_entries_erm ||
          detail.is_bayar ||
          detail.is_penunjang_ditanggapi ||
          detail.is_konsul ||
          detail.is_tindakan_lain
        ) {
          disabled = true;
        }
      }
    }
  }

  return disabled;
};

export const isDisabledBiayaLain = (state) => {
  let disabled = true;
  if (state.module) {
    const statusForm = state.module.kunjungan.statusForm;
    if (
      statusForm === actionTypes.ADD ||
      statusForm === actionTypes.ADD_WITH_SELECTED
    ) {
      disabled = false;
    } else if (statusForm === actionTypes.EDIT) {
      disabled = false;
      const detail = state.module.kunjungan.detailRangkaianKunjungan;
      if (detail.is_bayar) {
        disabled = true;
      }
    }
  }

  return disabled;
};

export const isDisable = (element, status) => {
  if (statusesElements[status]) {
    if (includes(statusesElements[status], element)) {
      return false;
    }
    return true;
  }

  return true;
};
