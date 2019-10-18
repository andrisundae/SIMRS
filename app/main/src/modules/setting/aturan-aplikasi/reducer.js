import produce from 'immer';
import actionTypes from './actionTypes';

const initialState = {
    data: []
}

const getAll = ({ aturanAplikasi: state}) => {
    return state.data || {};
}

const get = ({ aturanAplikasi: state }, aturan) => {
    if (!aturan || !state) {
        return null;
    }

    const data = getAll({ aturanAplikasi: state});

    return data[aturan] || null;
}

const reducer = (state = initialState, action) => 
    produce(state, draft => {
        switch (action.type) {
            case actionTypes.GET_ATURAN_APLIKASI_SUCCESS:
                draft.data = action.payload.data || {};
                return

            default:
                return state;
        }
    })

const selectors = {get, getAll};
export { reducer as default, selectors }
