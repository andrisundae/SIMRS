import produce from 'immer';
import { aclActions } from '@simrs/main/src/modules/auth';
import initialState from './penjaminPasienState';
import * as actionTypes from './penjaminPasienActionTypes';

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case actionTypes.ADD_PENJAMIN_PASIEN:
        draft.statusForm = actionTypes.ADD_PENJAMIN_PASIEN;
        draft.post = initialState.post;
        draft.selectedOption = initialState.selectedOption;
        draft.selectedRow = 0;
        return;

      case actionTypes.EDIT_PENJAMIN_PASIEN:
        draft.statusForm = actionTypes.EDIT_PENJAMIN_PASIEN;
        return;

      case actionTypes.CANCEL_PENJAMIN_PASIEN:
        draft.statusForm = actionTypes.CANCEL_PENJAMIN_PASIEN;
        draft.post = initialState.post;
        draft.selectedRow = 0;
        draft.selectedOption = { ...initialState.selectedOption };
        return;

      case actionTypes.READY_PENJAMIN_PASIEN:
        draft.statusForm = actionTypes.READY_PENJAMIN_PASIEN;
        draft.post = initialState.post;
        draft.selectedOption = { ...initialState.selectedOption };
        return;

      case actionTypes.SELECTED_PENJAMIN_PASIEN: {
        const data = payload.data;
        draft.statusForm = actionTypes.SELECTED_PENJAMIN_PASIEN;
        draft.post = {
          id: data.id,
          id_penjamin: data.id_penjamin,
          nomor_anggota: data.nomor_anggota,
          id_kelas_penjamin_pasien: data.id_kelas,
          id_kepersertaan: data.id_kepersertaan,
          aktif: data.aktif,
        };
        draft.selectedRow = data.id;

        draft.selectedOption.id_penjamin_pasien = {
          value: data.id_penjamin,
          label: data.nama_penjamin,
        };

        draft.selectedOption.id_kelas_penjamin_pasien = {
          value: data.id_kelas,
          label: data.nama_kelas,
        };

        draft.selectedOption.id_kepersertaan = {
          value: data.id_kepersertaan,
          label: data.status_kepesertaan,
        };
        return;
      }

      case aclActions.actionTypes.ACL_GET_GRANTED_SUCCESS:
        draft.permissions = action.payload.data || [];
        return;

      case actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_REQUEST:
        draft.loaderSettingKelasPenjamin = true;
        return;
      case actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_SUCCESS:
        draft.data.options_setting_kelas_penjamin = payload.data;
        draft.loaderSettingKelasPenjamin = false;
        return;
      case actionTypes.GET_SETTING_KELAS_PENJAMIN_PASIEN_FAILURE:
        draft.loaderSettingKelasPenjamin = false;
        return;

      case actionTypes.CHANGE_SELECT2_PENJAMIN_PASIEN: {
        draft.focusElement = '';
        draft.post[payload.name] = payload.data.value;
        draft.selectedOption[payload.name] = payload.data;
        return;
      }

      case actionTypes.ON_FOCUS_ELEMENT_PENJAMIN_PASIEN:
        draft.focusElement = payload.element;
        return;

      default:
        return state;
    }
  });
