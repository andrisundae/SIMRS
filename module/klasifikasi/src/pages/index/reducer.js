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
        case actionTypes.GET_OPTIONS_JENISKLASIFIKASI_SUCCESS:
            return produce(state, draft => {
                draft.data.options_jenis_klasifikasi = payload.data;
            })

        case actionTypes.CHANGE_JENISKLASIFIKASI: {

            return produce(state, draft => {
                draft.post.jenis_klasifikasi = payload.data.value;
                draft.post.nama_jenis_klasifikasi = payload.data.label;
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
