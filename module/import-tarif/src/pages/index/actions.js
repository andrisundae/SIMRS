import { actions } from '@simrs/main/src/modules/import';
import actionTypes from './actionTypes';

const createAction = (type, payload, meta) => ({ type, payload, meta });

export default {
    ...actions,
    versi: {
        request: (resource) => createAction(
            actionTypes.GET_VERSI_REQUEST,
            {},
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_VERSI_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_VERSI_FAILURE,
            { error },
            { resource }
        )
    },
    onChangeVersi: (resource, data) => createAction(actionTypes.CHANGE_VERSI, { data }, { resource }),
}
