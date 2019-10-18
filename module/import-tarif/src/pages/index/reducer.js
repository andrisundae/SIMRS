import produce from 'immer';

import {reducer} from '@simrs/main/src/modules/import';
import moduleState from './state';
import actionTypes from './actionTypes';

export default (state = moduleState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.GET_VERSI_SUCCESS:
            return produce(state, draft => {
                draft.data.versi = payload.data;
            })
        case actionTypes.CHANGE_INPUT:
            return produce(state, draft => {
                draft.post[payload.data.name] = payload.data.value;
                draft.focusElement = '';
            })
        case actionTypes.CHANGE_VERSI:
            return produce(state, draft => {
                draft.post.versi_tarif = payload.data.value;
                draft.post.selectedVersi = payload.data;
                draft.focusElement = '';
            })
        default:
            return reducer(state, action, moduleState)
    }
}
