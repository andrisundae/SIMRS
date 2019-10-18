import {redux} from '@simrs/common';

const {types, createRequestType, createAction} = redux;
const { REQUEST, SUCCESS, FAILURE } = types;
const ACL_GET_GRANTED = createRequestType('ACL_GET_GRANTED');

export const actionTypes = {
    ACL_GET_GRANTED_REQUEST: ACL_GET_GRANTED[REQUEST],
    ACL_GET_GRANTED_SUCCESS: ACL_GET_GRANTED[SUCCESS],
    ACL_GET_GRANTED_FAILURE: ACL_GET_GRANTED[FAILURE],
}

export default {
    getGranted: {
        request: (resource) => createAction(
            actionTypes.ACL_GET_GRANTED_REQUEST,
            {},
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.ACL_GET_GRANTED_SUCCESS,
            {data},
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.ACL_GET_GRANTED_FAILURE,
            { error },
            { resource }
        ),
    }
}
