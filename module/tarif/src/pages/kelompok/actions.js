import actionTypes from './actionTypes';

const createAction = (type, payload, meta) => ({ type, payload, meta });

export default {
    getKlasifikasi: {
        request: (resource, subResource, data) => createAction(
            actionTypes.GET_OPTIONS_KLASIFIKASI_REQUEST,
            { data },
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.GET_OPTIONS_KLASIFIKASI_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.GET_OPTIONS_KLASIFIKASI_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    onChangeKlasifikasi: (resource, subResource, data) => createAction(actionTypes.CHANGE_KLASIFIKASI, { data }, { resource, subResource }),
}
