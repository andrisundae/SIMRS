import produce from 'immer';

import { combineReducers } from 'redux';
import _ from 'lodash';
import { filterState, moduleState } from './state';
import {
    moduleReducer as module,
    filterReducer as filter,
    moduleActionTypes
} from '@simrs/main/src/modules/master/nested';
import actionTypes from './actionTypes';

export const moduleReducer = (state = moduleState, action) => {

    let { type, payload } = action;

    switch (type) {
        case actionTypes.STATUS_NOT_BALANCE: {
            return produce(state, draft => {
                draft.statusForm = actionTypes.STATUS_NOT_BALANCE;
            })
        }

        case actionTypes.CHANGE_TARIF: {
            return produce(state, draft => {
                draft.editedCell = { ...payload.data.detail };
                draft.post = { ...payload.data.post };
            })
        }

        case moduleActionTypes.SAVE_SUCCESS:
            return produce(state, draft => {
                draft.selectedRow = payload.data.data.id;
            })

        default:
            return module(state, action, moduleState);
    }
}

export const filterReducer = (state = filterState, action) => {

    let { type, payload } = action;
    switch (type) {
        case actionTypes.POPULATE_FORM_SUCCESS:
            return produce(state, draft => {
                draft.data.options_versi_tarif = payload.data.versiTarif;
                draft.data.options_klasifikasi = payload.data.klasifikasi;
                draft.data.options_kelas = payload.data.kelas;
            })

        case actionTypes.GET_OPTIONS_KELOMPOK_SUCCESS:
            return produce(state, draft => {
                draft.data.options_kelompok = payload.data;
            })

        case actionTypes.CHANGE_VERSITARIF: {

            return produce(state, draft => {
                draft.post.versi_tarif = payload.data ? payload.data.value : '';
                draft.post.selectedVersiTarif = payload.data;
                draft.focusElement = '';
            })
        }

        case actionTypes.CHANGE_KLASIFIKASI: {

            return produce(state, draft => {
                draft.post.klasifikasi = payload.data ? payload.data.value : '';
                draft.post.selectedKlasifikasi = payload.data;
                draft.focusElement = '';
            })
        }

        case actionTypes.CHANGE_KELOMPOK: {

            return produce(state, draft => {
                draft.post.kelompok = payload.data ? payload.data.value : '';
                draft.post.selectedKelompok = payload.data;
                draft.focusElement = '';
            })
        }

        case actionTypes.CHANGE_KELAS: {

            return produce(state, draft => {
                draft.post.kelas = payload.data ? payload.data.value : '';
                draft.post.selectedKelas = payload.data;
                draft.focusElement = '';
            })
        }

        case actionTypes.FILTER_SUBMIT_FAILURE:
            return produce(state, draft => {
                draft.focusElement = '';
            })
        
        case actionTypes.ON_FOCUS_ELEMENT:
            return produce(state, draft => {
                draft.focusElement = payload.element;
            })

        default:
            return filter(state, action);
    }
}

export default combineReducers({
    module: moduleReducer,
    filter: filterReducer,
})
