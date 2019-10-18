import produce from 'immer';
import { actionTypes } from './actions';

const initialState = {
    type: '',
    message: ''
}

export default (state = initialState, {type, data}) => 
    produce(state, draft => {
        switch (type) {
            case actionTypes.SHOW_NOTIFICATION:
                draft.type = data.type;
                draft.message = data.message;
                return
            case actionTypes.HIDE_NOTIFICATION:
                draft.type = '';
                draft.message = '';
                return

            default:
                return state;
        }
    })

