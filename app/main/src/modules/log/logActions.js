import { redux } from '@simrs/common';

import {actionTypes} from './logActionTypes';

const { createAction } = redux;

export default {
    log: {
        request: (resource, data) => createAction(
            actionTypes.INSERT_LOG_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.INSERT_LOG_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.INSERT_LOG_FAILURE,
            { error },
            { resource }
        ),
    },
    createActivity: (resource, activity, keterangan='', detailError='') => ({
        'nama-form': resource,
        'nama-action': activity,
        'keterangan': keterangan,
        'detail-error': detailError
    })
}
