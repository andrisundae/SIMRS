import produce from 'immer';

import actionTypes from './actionTypes';
import { moduleState, filterState } from './state';
import {
    moduleReducer as module,
    filterReducer as filter
} from '@simrs/main/src/modules/master/default';

const moduleReducer = (state = moduleState, action) => {

    let { type, payload } = action;

    switch (type) {
        case actionTypes.GET_OPTIONS_JENISLAYANAN_SUCCESS:
            return produce(state, draft => {
                draft.data.options_jenis_layanan = payload.data;
            })
        case actionTypes.GET_OPTIONS_KELOMPOKJENISLAYANAN_SUCCESS:
            return produce(state, draft => {
                draft.data.options_kelompok_jenis_layanan = payload.data;
            })
        case actionTypes.CHANGE_SELECT2: {
            let { name, data } = payload;

            return produce(state, draft => {
                draft.post[name] = data.value;
                draft.post[`nama_${name}`] = data.label;
                draft.focusElement = '';
            })
        }

        default:
            return module(state, action, moduleState);
    }
}

const filterReducer = (state = filterState, action) => {

    return filter(state, action);
}


export { moduleReducer, filterReducer }
