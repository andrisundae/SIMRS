import produce from 'immer';
import { actionTypes } from './authActions';

const initialState = {
    // user: '',
    submitted: false,
    isValidLogin: false,
    isValidLogout: false,
    dialogForceLogin: false,
    data: {},
    errors: {},
}

export default (state = initialState, action) => 
    produce(state, draft => {
        let { type, payload } = action;
        switch (type) {
            case actionTypes.LOGOUT_REQUEST:
                draft.isValidLogin = false;
                return
            case actionTypes.LOGIN_FORCE_SUCCESS:
            case actionTypes.LOGIN_SUCCESS:
                draft.data = payload.data;
                draft.isValidLogin = true;
                return
            case actionTypes.LOGIN_FORM_SUBMITTED:
                draft.errors = payload.errors;
                draft.submitted = true;
                return
            case actionTypes.LOGIN_FORCE_SHOW_DIALOG:
                draft.dialogForceLogin = payload.isShow;
                return
            case actionTypes.LOGOUT_SUCCESS:
                draft.isValidLogout = true;
                return
            case actionTypes.LOGIN_RESET:
                draft = initialState;
                return
            default:
                return state;
        }
    })
