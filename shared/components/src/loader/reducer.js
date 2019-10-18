import produce from 'immer';
import { actionTypes } from './actions';

const initialState = {
    message: 'Loading...',
    count: 0
}

export default (state = initialState, { type, payload }) => 
    produce(state, draft => {
        switch (type) {
            case actionTypes.SHOW_LOADER:
                draft.message = payload.message;
                draft.count = state.count + 1;
                return;
            case actionTypes.HIDE_LOADER:
                draft.message = initialState.message;
                draft.count = Math.max(state.count - 1, 0);
                return;
            default:
                return state;
        }
    })
