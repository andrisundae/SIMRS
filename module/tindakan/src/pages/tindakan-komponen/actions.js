import { redux } from '@simrs/common';

import actionTypes from './actionTypes';
const { createAction } = redux;

export default {
    loadAll: {
        request: (resource, subResource, data, tableParams) => createAction(
            actionTypes.LOAD_ALL_REQUEST,
            { data },
            { tableParams, resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.LOAD_ALL_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.LOAD_ALL_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    populateForm: (resource, subResource) => createAction(actionTypes.POPULATE_FORM, {}, { resource, subResource }),
    onSelectionChanged: (resource, subResource, data) => createAction(
        actionTypes.SELECTION_CHANGED, { data }, { resource, subResource }
    ),
    onChangeTarif: (resource, subResource, data) => createAction(
        actionTypes.CHANGE_TARIF, { data }, { resource, subResource }
    ),
    onRedirectTindakan: (resource, subResource, data) => createAction(
        actionTypes.REDIRECT_TINDAKAN, { data }, { resource, subResource }
    ),
    onRowSelected: (resource, subResource, data) => createAction(
        actionTypes.SELECTED_ROW, { data }, { resource, subResource }
    ),
}
