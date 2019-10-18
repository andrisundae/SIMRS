import produce from 'immer';
import { moduleState, filterState } from './state';
import { moduleActionTypes, filterActionTypes } from './actionTypes';

const moduleReducer = (state = moduleState, action) =>
    produce(state, draft => {
        let { type, payload } = action;

        switch (type) {
            case moduleActionTypes.SAVE_SUCCESS:
                draft.selectedRow = payload.data.data.id;
                return

            case moduleActionTypes.SAVE_FAILURE:
                draft.error = true;
                return

            case moduleActionTypes.CHANGE_STOCK: {
                draft.editedCell = { ...payload.data.detail };
                draft.post = { ...payload.data.post };
                draft.error = false;
                return
            }

            default:
                return state;
        }
    })


const filterReducer = (state = filterState, action) =>
    produce(state, draft => {
        let { type, payload } = action

        switch (type) {
            case filterActionTypes.FILTER_CHANGE:
                draft.post[payload.data.name] = payload.data.value;
                return

            case filterActionTypes.POPULATE_FORM_SUCCESS:
                return produce(state, draft => {
                    draft.data.options_unit_layanan = payload.data.unit_layanan;
                })

            case filterActionTypes.GET_KELAS_SUCCESS:
                return produce(state, draft => {
                    draft.data.options_kelas = payload.data;
                })

            case filterActionTypes.CHANGE_UNIT_LAYANAN: {

                return produce(state, draft => {
                    draft.post.unit_layanan = payload.data ? payload.data.value : '';
                    draft.post.selectedUnitLayanan = payload.data;
                    draft.post.kelas = '';
                    draft.post.selectedKelas = null;
                    draft.focusElement = '';
                })
            }

            case filterActionTypes.CHANGE_KELAS: {

                return produce(state, draft => {
                    draft.post.kelas = payload.data ? payload.data.value : '';
                    draft.post.selectedKelas = payload.data;
                    draft.focusElement = '';
                })
            }

            case filterActionTypes.ON_FOCUS_ELEMENT:
                draft.focusElement = payload.element;
                return

            case filterActionTypes.RESET:
            default:
                return state;
        }
    })

export { moduleReducer, filterReducer }
