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
        case actionTypes.GET_OPTIONS_INSTALASI_SUCCESS:
            return produce(state, draft => {
                draft.data.options_instalasi = payload.data;
            })
        
        case actionTypes.GET_OPTIONS_KATEGORI_SUCCESS:
            return produce(state, draft => {
                draft.data.options_kategori = payload.data;
            })

        case actionTypes.CHANGE_INSTALASI: {
            let { data } = payload;

            return produce(state, draft => {
                draft.post.instalasi = data.value;
                draft.post.nama_instalasi = data.label;
                draft.post.jenis_layanan = data.jenis_layanan;
                draft.focusElement = '';
            })
        }

        case actionTypes.CHANGE_KATEGORI: {
            let { data } = payload;

            return produce(state, draft => {
                draft.post.kategori = data.value;
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
