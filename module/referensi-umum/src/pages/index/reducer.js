import produce from 'immer';

import { moduleState, filterState } from './state';
import {
    moduleReducer as module,
    filterReducer as filter
} from '@simrs/main/src/modules/master/default';
import actionTypes from './actionTypes';

const moduleReducer = (state = moduleState, action) => {

    return module(state, action, moduleState);
}

const filterReducer = (state = filterState, action) => {
    let { type, payload } = action;
    switch (type) {
        case actionTypes.GET_OPTIONS_REFERENSI_SUCCESS:
            return produce(state, draft => {
                draft.data.options_referensi = payload.data;
            })

        case actionTypes.CHANGE_REFERENSI: {

            return produce(state, draft => {
                draft.post.referensi = payload.data.value;
                draft.post.filter_value = '';
                draft.focusElement = '';
            })
        }

        default:
            return filter(state, action);
    }

}


export { moduleReducer, filterReducer }
