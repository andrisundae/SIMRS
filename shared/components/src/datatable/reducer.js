import produce from 'immer';

import { actionTypes } from './actions';
import alias from './const';

const initialState = {
    isReload: false,
    reloadType: alias.reloadType.refresh,
    resource: ''
};

export default (state = initialState, { type, payload, meta }) =>
    produce(state, draft => {
        let reloadType = payload ? payload.reloadType ? payload.reloadType : alias.reloadType.refresh : alias.reloadType.refresh;
        switch (type) {
            case actionTypes.RELOADING:
                draft.isReload = true;
                draft.reloadType = reloadType;
                draft.resource = meta.resource;
                return

            case actionTypes.RELOADED:
                draft.isReload = false;
                draft.reloadType = alias.reloadType.refresh;
                draft.resource = meta.resource;
                return

            default:
                return state;
        }
    })

const initialStateMulti = {
    datatables: {}
};

export const multiReducer = (state = initialStateMulti, { type, payload, meta }) =>
    produce(state, draft => {
        let reloadType = payload ? payload.reloadType ? payload.reloadType : alias.reloadType.refresh : alias.reloadType.refresh;
        switch (type) {
            case actionTypes.RELOADING:
                draft.datatables[meta.resource] = {
                    isReload: true,
                    reloadType: reloadType
                };
                return
            
            case actionTypes.INITIALIZE:
            case actionTypes.RELOADED:
                draft.datatables[meta.resource] = {
                    isReload: false,
                    reloadType: alias.reloadType.refresh
                };
                return

            default:
                return state;
        }
    })
