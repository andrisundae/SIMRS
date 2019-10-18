import produce from 'immer';

import { filterState, moduleState } from './state';
import { moduleActionTypes, filterActionTypes } from './actionTypes';

const moduleReducer = (state = moduleState, action) =>
    produce(state, draft => {
        let { post } = moduleState;
        let { type, payload } = action;

        switch (type) {
            case moduleActionTypes.READY:
                draft.statusForm = moduleActionTypes.READY;
                draft.post = post;
                return

            case moduleActionTypes.SELECTION_CHANGED:
                draft.post.id = payload.data.id;
                draft.post.aktif = payload.data.aktif;
                draft.selectedRow = payload.data.id;
                return

            case moduleActionTypes.SAVE_SUCCESS:
                draft.selectedRow = payload.data.data.id;
                return

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
                draft.focusElement = '';
                return

            case filterActionTypes.CHANGE_KLASIFIKASI: {

                return produce(state, draft => {
                    draft.post.klasifikasi = payload.data ? payload.data.value : '';
                    draft.post.selectedKlasifikasi = payload.data;
                    draft.post.kelompok = '';
                    draft.post.selectedKelompok = null;
                    draft.focusElement = '';
                    draft.post.filter_value = '';
                })
            }

            case filterActionTypes.CHANGE_STATUS: {

                return produce(state, draft => {
                    draft.post.status = payload.data ? payload.data.value : '';
                    draft.post.selectedStatus = payload.data;
                    draft.focusElement = '';
                    draft.post.filter_value = '';
                })
            }

            case filterActionTypes.CHANGE_KELOMPOK: {

                return produce(state, draft => {
                    draft.post.kelompok = payload.data ? payload.data.value : 0;
                    draft.post.selectedKelompok = payload.data;
                    draft.focusElement = '';
                    draft.post.filter_value = '';
                })
            }

            case filterActionTypes.ON_FOCUS_ELEMENT:
                draft.focusElement = payload.element;
                return

            case filterActionTypes.POPULATE_FORM_SUCCESS:
                return produce(state, draft => {
                    draft.data.options_klasifikasi = payload.data.klasifikasi;
                })

            case filterActionTypes.GET_OPTIONS_KELOMPOK_SUCCESS:
                return produce(state, draft => {
                    draft.data.options_kelompok = payload.data;
                })

            case filterActionTypes.FILTER_SUBMIT_FAILURE:
                return produce(state, draft => {
                    draft.focusElement = '';
                })

            case filterActionTypes.RESET:
            default:
                return state;
        }
    })

export { moduleReducer, filterReducer }
