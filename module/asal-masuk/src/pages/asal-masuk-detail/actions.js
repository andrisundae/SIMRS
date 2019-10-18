import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';

import actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
    getInstalasi: {
        request: (resource, subResource) => createAction(
            actionTypes.GET_OPTIONS_INSTALASI_REQUEST,
            {},
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.GET_OPTIONS_INSTALASI_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.GET_OPTIONS_INSTALASI_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    importDetail: {
        request: (resource, subResource, data) => createAction(
            actionTypes.IMPORT_DETAIL_REQUEST,
            { data },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, 'Import detail dari unit layanan') }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.IMPORT_DETAIL_SUCCESS,
            { data },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, 'Sukses import detail') }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.IMPORT_DETAIL_FAILURE,
            { error },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, 'Gagal import detail') }
        )
    },
    onChangeInstalasi: (resource, subResource, data) => createAction(actionTypes.CHANGE_INSTALASI, { data }, { resource, subResource }),
    onImport: (resource, subResource) => createAction(
        actionTypes.IMPORT_DETAIL,
        {},
        {
            resource,
            subResource,
            log: createActivity(resource, activity.MASUK_FORM, 'Tampil dialog unit layanan')
        }
    ),
    onCancelImportDetail: (resource, subResource) => createAction(
        actionTypes.CANCEL_IMPORT_DETAIL, {}, {
            resource,
            subResource,
            log: createActivity(resource, activity.CANCEL, 'Batal import')
        }),
    onSelectionChangedDetail: (resource, subResource, data) => createAction(
        actionTypes.SELECTION_CHANGED_DETAIL, { data }, { resource, subResource }
    ),
    loadAllOnImportDetail: (resource, subResource, data, tableParams) => createAction(
        actionTypes.LOAD_DATA_ON_IMPORT_DETAIL,
        { data },
        { tableParams, resource, subResource }
    ),
    onReload: (resource, subResource) => createAction(
        actionTypes.RELOADING_DATA_DETAIL,
        {},
        { resource, subResource }
    ),
    onReloaded: (resource, subResource) => createAction(
        actionTypes.RELOADED_DATA_DETAIL,
        {},
        { resource, subResource }
    ),
}
