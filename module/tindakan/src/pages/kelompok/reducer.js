import produce from 'immer';
import { combineReducers } from 'redux';

import { moduleState, filterState } from './state';
import {
    moduleReducer as module,
    filterReducer as filter
} from '@simrs/main/src/modules/master/nested';
import actionTypes from './actionTypes';

export const moduleReducer = (state = moduleState, action) => {
    return module(state, action, moduleState);
}

const filterReducer = (state = filterState, action) => {
    let { type, payload } = action;
    switch (type) {
        case actionTypes.GET_OPTIONS_KLASIFIKASI_SUCCESS:
            return produce(state, draft => {
                draft.data.options_klasifikasi = payload.data;
            })

        case actionTypes.CHANGE_KLASIFIKASI: {

            return produce(state, draft => {
                draft.post.klasifikasi = payload.data.value;
                draft.post.filter_value = '';
                draft.post.selectedKlasifikasi = payload.data;
                draft.focusElement = '';
            })
        }

        case actionTypes.GET_OPTIONS_VERSITARIF_SUCCESS:
            return produce(state, draft => {
                draft.data.options_versi_tarif = payload.data;
            })

        case actionTypes.CHANGE_VERSITARIF: {

            return produce(state, draft => {
                draft.post.versi_tarif = payload.data.value;
                draft.post.filter_value = '';
                draft.post.selectedVersiTarif = payload.data;
            })
        }

        default:
            return filter(state, action);
    }
}


export default combineReducers({
    module: moduleReducer,
    filter: filterReducer,
})
