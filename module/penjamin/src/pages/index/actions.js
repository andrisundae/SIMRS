import { redux } from '@simrs/common';
import actionTypes from './actionTypes';

const { createAction } = redux;

export default {
    getKelas: {
        request: (resource, data) => createAction(
            actionTypes.GET_KELAS_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_KELAS_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_KELAS_FAILURE,
            { error },
            { resource }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onChangeSelect2: (resource, name, data) => createAction(actionTypes.CHANGE_SELECT2, { name, data }, { resource }),
}
