import produce from 'immer';
import initialState from './state';
import actionTypes from './actionTypes';

export default (state = initialState, action) =>
    produce(state, draft => {
        let { type, payload } = action;

        switch (type) {
            case actionTypes.CHANGE_SELECT:
            case actionTypes.CHANGE_INPUT: {
                const { name, value, indexKelompok, indexAturan } = payload.data;
                if (draft.post.daftarKelompok[indexKelompok]) {
                    let kelompokAturan = draft.post.daftarKelompok[indexKelompok];
                    if (kelompokAturan.daftarAturan[indexAturan]) {
                        let aturanAplikasi = kelompokAturan.daftarAturan[indexAturan];
                        if (name === aturanAplikasi.aturan) {
                            draft.post.daftarKelompok[indexKelompok].daftarAturan[indexAturan].nilai = value;
                        }
                    }
                }

                draft.focusElement = '';
                return
            }

            case actionTypes.SAVE_REQUEST:
                draft.focusElement = '';
                draft.saveSuccess = false;
                return
            
            case actionTypes.SAVE_SUCCESS:
                draft.saveSuccess = true;
                return
            
            case actionTypes.SAVE_FAILURE:
                draft.saveSuccess = false;
                return

            case actionTypes.POPULATE_FORM_REQUEST:
                draft.loadingDetail = true;
                return

            case actionTypes.POPULATE_FORM_FAILURE:
                draft.loadingDetail = false;
                return

            case actionTypes.POPULATE_FORM_SUCCESS:
                draft.data.daftarKelompok = payload.data;
                draft.post.daftarKelompok = payload.data;
                draft.loadingDetail = false;
                return

            case actionTypes.ON_FOCUS_ELEMENT:
                draft.focusElement = payload.element;
                return

            case actionTypes.EDIT:
                draft.statusForm = actionTypes.EDIT;
                draft.isSubmitted = false;
                return

            case actionTypes.CANCEL:
                draft.statusForm = actionTypes.CANCEL;
                return

            case actionTypes.READY:
                draft.statusForm = actionTypes.READY;
                return

            default:
                return state;
        }
    })
