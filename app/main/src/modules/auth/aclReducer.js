import produce from 'immer';
import _ from 'lodash';
import { actionTypes } from './aclActions';

const initialState = {
    permissions: []
}

export const isGranted = (state, role) => {
    // let permission = state.get('permissions').find(permission => permission === role);
    return _.includes(state.permissions, role);
}

export const getPermissions = (state) => {
    return {
        canAdd: isGranted(state, 'tambah'),
        canEdit: isGranted(state, 'koreksi'),
        canDelete: isGranted(state, 'hapus'),
        canImport: isGranted(state, 'import'),
    }
}

export default (state = initialState, action) => 
    produce(state, draft => {
        switch (action.type) {
            case actionTypes.ACL_GET_GRANTED_SUCCESS:
                draft.permissions = action.payload.data || [];
                return

            default:
                return state;
        }
    })
