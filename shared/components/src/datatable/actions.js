import { redux } from '@simrs/common';

export const actionTypes = {
    RELOADING: redux.createType('RELOADING_DATATABLE'),
    RELOADED: redux.createType('RELOADED_DATATABLE'),
    INITIALIZE: redux.createType('INITIALIZE_DATATABLE'),
}

export default {
    onReload: (resource, reloadType) => ({
        type: actionTypes.RELOADING,
        payload: {reloadType},
        meta: {resource}
    }),
    onReloaded: (resource, pastAction = '') => ({
        type: actionTypes.RELOADED,
        payload: {pastAction},
        meta: {resource}
    }),
    onInitialize: (resource) => ({
        type: actionTypes.INITIALIZE,
        payload: { },
        meta: { resource }
    }),
}
