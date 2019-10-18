import produce from 'immer';
import { combineReducers } from 'redux';

import { moduleState } from './state';
import {
    sumberLainActionTypes,
    filterActionTypes,
    moduleActionTypes,
    sumberActionTypes,
    settingActionTypes
} from './actionTypes';

const sumberReducer = (state = moduleState.sumber, action) =>
    produce(state, draft => {
        const { type, payload } = action;
        switch (type) {
            case sumberActionTypes.CHANGE_INPUT_SUMBER:
                draft.searchBar = payload.data.value;
                return

            case sumberActionTypes.SELECTION_SUMBER_CHANGED:
                draft.selectedRows = payload.data;
                return
            default:
                return state;
        }
    })

const settingReducer = (state = moduleState.setting, action) =>
    produce(state, draft => {
        const { type, payload } = action;
        switch (type) {
            case settingActionTypes.CHANGE_INPUT_SETTING:
                draft.searchBar = payload.data.value;
                return;

            case settingActionTypes.SELECTION_SETTING_CHANGED:
                draft.selectedRows = payload.data;
                return;
            default:
                return state;
        }
    })

const filterReducer = (state = moduleState.filter, action) =>
    produce(state, draft => {
        const { type, payload } = action;
        switch (type) {
            case filterActionTypes.POPULATE_FORM_FILTER_SUCCESS: 
                if (payload.data.filter_sumber_lain) {
                    draft.data.filter_sumber_lain = {
                        ...state.data.filter_sumber_lain,
                        ...payload.data.filter_sumber_lain
                    }
                }
                if (payload.data.data_filter_sumber) {
                    draft.data.data_filter_sumber = {
                        ...state.data.data_filter_sumber,
                        ...payload.data.data_filter_sumber
                    }
                }
                if (payload.data.filter_sumber) {
                    draft.data.filter_sumber = {
                        ...state.data.filter_sumber,
                        ...payload.data.filter_sumber
                    }
                }
            return;
            default:
                return state;
        }
    })

const sumberLainReducer = (state = moduleState.sumberLain, action) =>
    produce(state, draft => {
        const { type, payload } = action;
        switch (type) {
            case sumberLainActionTypes.POPULATE_FORM_SUMBERLAIN_SUCCESS:
                draft.data = {
                    ...state.data,
                    ...payload.data
                };
                return;
            default:
                return state;
        }
    })

const focusElementReducer = (state = moduleState.focusElement, action) => {
    const { type, payload } = action;
    switch (type) {
        case moduleActionTypes.ON_FOCUS_ELEMENT:
            state = payload.element;
            break;

        case sumberActionTypes.SELECTION_SUMBER_CHANGED:
        case sumberActionTypes.CHANGE_INPUT_SUMBER:
        case sumberLainActionTypes.CHANGE_SELECT2_SUMBERLAIN:
        case settingActionTypes.CHANGE_INPUT_SETTING:
        case settingActionTypes.SELECTION_SETTING_CHANGED:
        case filterActionTypes.CHANGE_SELECT2_FILTER:
            state = '';
            break;
        default:
         break;
    }

    return state;
}

const submittingReducer = (state = moduleState.submitting, action) => {
    const { type } = action;
    switch (type) {
        case settingActionTypes.REVERTALL_DATA_SETTING_REQUEST:
        case settingActionTypes.REVERT_DATA_SETTING_REQUEST:
        case sumberActionTypes.PUSHALL_DATA_SUMBER_REQUEST:
        case sumberActionTypes.PUSH_DATA_SUMBER_REQUEST:
            state = true;
            break;

        case settingActionTypes.REVERTALL_DATA_SETTING_FAILURE:
        case settingActionTypes.REVERT_DATA_SETTING_FAILURE:
        case sumberActionTypes.PUSHALL_DATA_SUMBER_FAILURE:
        case sumberActionTypes.PUSH_DATA_SUMBER_FAILURE:
            state = false;
            break;
        default:
            break;
    }

    return state;
}

const postReducer = (state = moduleState.post, action) =>
    produce(state, draft => {
        const { type, payload } = action;
        switch (type) {
            case sumberLainActionTypes.CHANGE_SELECT2_SUMBERLAIN: {
                let { data, name } = payload;
                draft.needed[name] = data ? data.value : '';
            }
                return;

            case settingActionTypes.CHANGE_INPUT_DATA_SETTING: {
                let { value, name } = payload.data;
                draft.needed[name] = value;
            }
                return;

            case filterActionTypes.CHANGE_SELECT2_FILTER: {
                let { data, name } = payload;
                if (data.type === 'needed') {
                    draft.needed[name] = data ? data.value : '';
                } else {
                    draft.optional[name] = data ? data.value : '';
                }

                if (data.filter) {
                    if (data.filter.target) {
                        let { name } = data.filter;
                        if (draft.needed[name]) {
                            draft.needed[name] = 0;
                        }
                        if (draft.optional[name]) {
                            draft.optional[name] = 0;
                        }
                    }
                }
            }
                return;
            default:
                return state;
        }
    })

export default combineReducers({
    sumberLain: sumberLainReducer,
    filter: filterReducer,
    sumber: sumberReducer,
    setting: settingReducer,
    post: postReducer,
    focusElement: focusElementReducer,
    submitting: submittingReducer
});
