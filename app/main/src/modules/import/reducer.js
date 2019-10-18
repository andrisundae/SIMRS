import produce from 'immer';

import actionTypes from './actionTypes';

export default (state, action, initialState) =>
    produce(state, draft => {
        const {
            type,
            payload
        } = action;
        switch (type) {
            case actionTypes.READY:
                draft.statusForm = actionTypes.READY;
                return

            case actionTypes.IMPORT:
                draft.statusForm = actionTypes.IMPORT;
                draft.post = payload.data;
                return

            case actionTypes.IMPORT_FAILURE:
            case actionTypes.IMPORT_SUCCESS:
                draft.statusForm = actionTypes.READY;
                draft.post = initialState.post;
                draft.errors = {};
                draft.isStartedUpload = false;
                return

            case actionTypes.START_IMPORT:
                draft.statusForm = actionTypes.START_IMPORT;
                return

            case actionTypes.STARTED_UPLOAD:
                draft.isStartedUpload = payload.data.isStartedUpload;
                return

            case actionTypes.CHANGE_FILE:
                draft.post.file = payload.data.file;
                draft.focusElement = '';
                return

            case actionTypes.ON_FOCUS_ELEMENT:
                draft.focusElement = payload.element;
                return

            case actionTypes.RESET:
                draft.data = initialState.data;
                draft.post = initialState.post;
                draft.statusForm = '';
                draft.focusElement = '';
                draft.errors = {};
                draft.isStartedUpload = false;
                draft.isSocketConnected = false;
                return
            
            case actionTypes.CONNECTED_SOCKET:
                draft.isSocketConnected = true;
                return
            
            case actionTypes.DISCONNECTED_SOCKET:
                draft.isSocketConnected = false;
                return
            
            default:
                return state;
        }
    })
