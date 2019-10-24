import produce from 'immer';
import _ from 'lodash';
import { actionTypes } from './aclActions';

const initialState = {
    permissions: []
}

export const isGranted = (permissions, role) => {
    // let permission = state.get('permissions').find(permission => permission === role);
    return _.includes(permissions, role);
}

export const getPermissions = (permissions) => {
    return {
        canAdd: isGranted(permissions, 'tambah'),
        canEdit: isGranted(permissions, 'koreksi'),
        canDelete: isGranted(permissions, 'hapus'),
        canImport: isGranted(permissions, 'import'),
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
