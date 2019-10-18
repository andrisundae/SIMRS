import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
    getKelas: {
        request: (resource, subResource, data) => createAction(
            actionTypes.GET_OPTIONS_KELAS_REQUEST,
            { data },
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.GET_OPTIONS_KELAS_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.GET_OPTIONS_KELAS_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    getKodePanggil: {
        request: (resource, subResource, data) => createAction(
            actionTypes.GET_KODEPANGGIL_REQUEST,
            { data },
            { resource, subResource }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.GET_KODEPANGGIL_SUCCESS,
            { data },
            { resource, subResource }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.GET_KODEPANGGIL_FAILURE,
            { error },
            { resource, subResource }
        )
    },
    importKelas: {
        request: (resource, subResource, data) => createAction(
            actionTypes.IMPORT_KELAS_REQUEST,
            { data },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, 'Import layanan tarif dari tarif kelas') }
        ),
        requestSuccess: (resource, subResource, data) => createAction(
            actionTypes.IMPORT_KELAS_SUCCESS,
            { data },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, 'Sukses import layanan tarif dari tarif kelas') }
        ),
        requestFailure: (resource, subResource, error) => createAction(
            actionTypes.IMPORT_KELAS_FAILURE,
            { error },
            { resource, subResource, log: createActivity(resource, activity.SIMPAN, 'Gagal import layanan tarif dari tarif kelas') }
        )
    },
    onChangeKelas: (resource, subResource, data) => createAction(actionTypes.CHANGE_KELAS, { data }, { resource, subResource }),
    populateForm: (resource, subResource) => createAction(actionTypes.POPULATE_FORM, {}, { resource, subResource }),
    onChangeTanggalAktif: (resource, subResource, data) => createAction(actionTypes.CHANGE_TANGGALAKTIF, { data }, { resource, subResource }),
    onChangeJamAktif: (resource, subResource, data) => createAction(actionTypes.CHANGE_JAMAKTIF, { data }, { resource, subResource }),
    onImport: (resource, subResource) => createAction(
        actionTypes.IMPORT_KELAS,
        {},
        {
            resource,
            subResource,
            log: createActivity(resource, activity.MASUK_FORM, 'Tampil dialog import tarif kelas, karena layanan tarif masih kosong')
        }
    ),
    onCancelImportKelas: (resource, subResource) => createAction(
        actionTypes.CANCEL_IMPORT_KELAS, {}, {
            resource,
            subResource,
            log: createActivity(resource, activity.CANCEL, 'Batal import layanan tarif dari tarif kelas')
        }),
    onSelectionChangedKelas: (resource, subResource, data) => createAction(
        actionTypes.SELECTION_CHANGED_KELAS, { data }, { resource, subResource }
    ),
    loadAllOnImportKelas: (resource, subResource, data, tableParams) => createAction(
        actionTypes.LOAD_DATA_ON_IMPORT_KELAS,
        { data },
        { tableParams, resource, subResource }
    ),
    showButtonImportKelas: (resource, subResource, data) => createAction(
        actionTypes.SHOW_BUTTON_IMPORT_KELAS, { data }, { resource, subResource }
    ),
    onChangeStatusNotBalance: (resource, subResource) => createAction(
        actionTypes.STATUS_NOT_BALANCE, {}, { resource, subResource }
    ),
}
