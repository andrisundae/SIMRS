import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

export default {
    save: {
        request: (resource, data) => createAction(
            actionTypes.SAVE_REQUEST,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN) }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.SAVE_SUCCESS,
            { data },
            { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
        ),
        requestFailure: (resource, errors) => createAction(
            actionTypes.SAVE_FAILURE,
            { errors },
            { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
        )
    },
    populateForm: {
        request: (resource, data) => createAction(
            actionTypes.POPULATE_FORM_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.POPULATE_FORM_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.POPULATE_FORM_FAILURE,
            { error },
            { resource }
        )
    },
    asalMasukDetail: {
        request: (resource, data) => createAction(
            actionTypes.ASAL_MASUK_DETAIL_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.ASAL_MASUK_DETAIL_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.ASAL_MASUK_DETAIL_FAILURE,
            { error },
            { resource }
        )
    },
    instalasi: {
        request: (resource, data) => createAction(
            actionTypes.INSTALASI_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.INSTALASI_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.INSTALASI_FAILURE,
            { error },
            { resource }
        )
    },
    unitLayanan: {
        request: (resource, data) => createAction(
            actionTypes.UNIT_LAYANAN_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.UNIT_LAYANAN_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.UNIT_LAYANAN_FAILURE,
            { error },
            { resource }
        )
    },
    kelasKamar: {
        request: (resource, data) => createAction(
            actionTypes.KELAS_KAMAR_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.KELAS_KAMAR_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.KELAS_KAMAR_FAILURE,
            { error },
            { resource }
        )
    },
    loadAllPasien: (resource, data, tableParams) => createAction(
        actionTypes.GET_ALL_PASIEN_REQUEST,
        { data },
        { tableParams, resource }
    ),
    loadAllWilayah: (resource, data, tableParams) => createAction(
        actionTypes.GET_ALL_WILAYAH_REQUEST,
        { data },
        { tableParams, resource }
    ),
    onReady: (resource) => createAction(actionTypes.READY, {}, { resource }),
    onAdd: (resource) => createAction(actionTypes.ADD, {}, { resource }),
    onCancel: (resource) => createAction(actionTypes.CANCEL, {}, { resource }),
    onAddWithSelected: (resource) => createAction(actionTypes.ADD_WITH_SELECTED, {}, { resource }),
    onCancelWithSelected: (resource) => createAction(actionTypes.CANCEL_WITH_SELECTED, {}, { resource }),
    onFinish: (resource) => createAction(actionTypes.FINISH, {}, { resource }),
    openForm: (resource) => createAction(
        actionTypes.OPEN_FORM, {}, { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
    onChangeInput: (resource, data) => createAction(
        actionTypes.CHANGE_INPUT, { data }, { resource }
    ),
    onFocusElement: (resource, element) => createAction(
        actionTypes.ON_FOCUS_ELEMENT,
        { element },
        { resource }
    ),
    onChangeSelect2: (resource, name, data) => createAction(actionTypes.CHANGE_SELECT2, { name, data }, { resource }),
    toggleShowCariPasien: (resource) => createAction(actionTypes.TOGGLE_SHOW_CARI_PASIEN, {}, { resource }),
    toggleShowCariWilayah: (resource) => createAction(actionTypes.TOGGLE_SHOW_CARI_WILAYAH, {}, { resource }),
    toggleShowCariKunjungan: (resource) => createAction(actionTypes.TOGGLE_SHOW_CARI_KUNJUNGAN, {}, { resource }),

    onChangeFilterPasien: (resource, data) => createAction(actionTypes.FILTER_CHANGE_PASIEN, { data }, { resource }),
    onSubmitFilterPasien: (resource, data) => createAction(
        actionTypes.FILTER_SUBMIT_PASIEN,
        { data },
        { resource, log: createActivity(resource, activity.CARI) }
    ),
    onChangeFilterWilayah: (resource, data) => createAction(actionTypes.FILTER_CHANGE_WILAYAH, { data }, { resource }),
    onSubmitFilterWilayah: (resource, data) => createAction(
        actionTypes.FILTER_SUBMIT_WILAYAH,
        { data },
        { resource, log: createActivity(resource, activity.CARI) }
    ),
    onChangeFilterKunjungan: (resource, data) => createAction(actionTypes.FILTER_CHANGE_KUNJUNGAN, { data }, { resource }),
    onSubmitFilterKunjungan: (resource, data) => createAction(
        actionTypes.FILTER_SUBMIT_KUNJUNGAN,
        { data },
        { resource, log: createActivity(resource, activity.CARI) }
    ),

    onSelectedPasien: (resource, data) => createAction(actionTypes.FILTER_SELECTED_PASIEN, { data }, { resource }),
    onSelectedWilayah: (resource, data) => createAction(actionTypes.FILTER_SELECTED_WILAYAH, { data }, { resource }),
    onSelectedKunjungan: (resource, data) => createAction(actionTypes.FILTER_SELECTED_KUNJUNGAN, { data }, { resource }),
}
