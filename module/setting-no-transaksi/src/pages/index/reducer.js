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
        case actionTypes.POPULATE_FORM_SUCCESS:
            return produce(state, draft => {
                draft.data.options_type_reset = payload.data.options_type_reset;
                draft.data.options_format_tanggal = payload.data.options_format_tanggal;
            })

        case actionTypes.CHANGE_SELECT2: {
            let { name, data } = payload;

            return produce(state, draft => {
                draft.post[name] = data? data.value : '';
                draft.focusElement = '';
            })
        }

        case actionTypes.SETTING_COUNTER: {

            return produce(state, draft => {
                draft.settingCounter.show = true;
                draft.settingCounter.post.alias = state.post.alias;
                draft.settingCounter.post.start_counter = 0;
            })
        }

        case actionTypes.CANCEL_SETTING_COUNTER: {

            return produce(state, draft => {
                draft.settingCounter = moduleState.settingCounter;
                draft.focusElement = '';
            })
        }

        case actionTypes.CHANGE_COUNTER: {

            return produce(state, draft => {
                draft.settingCounter.post.start_counter = payload.data.value;
                draft.focusElement = '';
            })
        }

        case actionTypes.SAVE_SETTING_COUNTER_SUCCESS: {

            return produce(state, draft => {
                draft.settingCounter.show = false;
                draft.focusElement = '';
            })
        }

        case actionTypes.SAVE_SETTING_COUNTER_FAILURE: {

            return produce(state, draft => {
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
