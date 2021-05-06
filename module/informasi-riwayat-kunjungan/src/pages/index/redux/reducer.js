import produce from 'immer';
import initialState from './state';
import actionTypes from './actionTypes';
import { utils } from '@simrs/common';

const makeDisplayAge = (data) => {
  if (!data) {
    return '-';
  }

  return utils.displayAge(data.tgl_lahir, data.tgl_sekarang);
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case actionTypes.OPEN_FORM:
        draft.post = initialState.post;
        return;

      case actionTypes.INPUT_CHANGE:
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case actionTypes.FINISH:
      case actionTypes.READY: {
        draft.statusForm = actionTypes.READY;
        draft.post = { ...initialState.post };
        draft.selected = { ...initialState.selected };
        draft.summary = { ...initialState.summary };
        draft.focusElement = 'norm';
        return;
      }

      case actionTypes.GET_PASIEN_SUCCESS: {
        const data = payload.data;
        draft.statusForm = actionTypes.SELECTED;
        draft.post = {
          ...state.post,
          id: data.id,
          nama: data.nama,
          nama_ortu: data.nama_ortu || '',
          norm: data.norm,
          alamat: data.alamat || '',
          nama_jenis_kelamin: data.jenis_kelamin ? data.jenis_kelamin.nama : '',
          nama_panggilan: data.nama_panggilan || '',
          umur: makeDisplayAge(data),
        };

        return;
      }

      case actionTypes.SELECTED_KUNJUNGAN: {
        const data = payload.data || {};
        draft.selected = {
          ...state.selected,
          kunjungan: {
            ...state.selected.kunjungan,
            ...data,
          },
        };

        return;
      }

      case actionTypes.SELECTED_KUNJUNGAN_UNIT: {
        const data = payload.data || {};
        draft.selected = {
          ...state.selected,
          kunjunganUnit: {
            ...state.selected.kunjunganUnit,
            ...data,
          },
        };

        return;
      }

      case actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST: {
        draft.loaderKunjunganDetail = true;
        return;
      }
      case actionTypes.GET_KUNJUNGAN_DETAIL_FAILURE: {
        draft.loaderKunjunganDetail = false;
        return;
      }

      case actionTypes.GET_KUNJUNGAN_DETAIL_SUCCESS: {
        const data = payload.data;
        draft.summary = {
          keringanan: data.keringanan || 0,
          bayar: data.bayar || 0,
          pengembalian: data.pengembalian || 0,
          biaya: data.biaya || 0,
          total_biaya: data.total_biaya || 0,
        };
        draft.loaderKunjunganDetail = false;
        return;
      }

      case actionTypes.RESET:
      default:
        return state;
    }
  });
