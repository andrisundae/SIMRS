import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
    getStatusAktifKunjungan: {
        request: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_STATUSAKTIFKUNJUNGAN_REQUEST,
            { data },
            { resource }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.GET_OPTIONS_STATUSAKTIFKUNJUNGAN_SUCCESS,
            { data },
            { resource }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.GET_OPTIONS_STATUSAKTIFKUNJUNGAN_FAILURE,
            { error },
            { resource }
        )
    },
    duplication: {
        request: (resource, data) => createAction(
            actionTypes.DUPLICATION_REQUEST,
            { data },
            {
                resource,
                log: createActivity(
                    resource,
                    activity.SIMPAN,
                    `Simpan duplikasi versi tarif asal ${data.nama_tarif_asal} ke versi tarif tujuan ${data.nama_tarif_tujuan}`
                )
            }
        ),
        requestSuccess: (resource, data) => createAction(
            actionTypes.DUPLICATION_SUCCESS,
            { data },
            {
                resource,
                log: createActivity(
                    resource,
                    activity.SIMPAN,
                    `Sukses duplikasi versi tarif`
                )
            }
        ),
        requestFailure: (resource, error) => createAction(
            actionTypes.DUPLICATION_FAILURE,
            { error },
            {
                resource,
                log: createActivity(
                    resource,
                    activity.SIMPAN,
                    `Gagal duplikasi versi tarif, karena ${error}`
                )
            }
        )
    },
    populateForm: (resource) => createAction(actionTypes.POPULATE_FORM, {}, { resource }),
    onChangeStatusAktifKunjungan: (resource, data) => createAction(actionTypes.CHANGE_STATUSAKTIFKUNJUNGAN, { data }, { resource }),
    onChangeTanggalAktif: (resource, data) => createAction(actionTypes.CHANGE_TANGGALAKTIF, { data }, { resource }),
    onChangeJamAktif: (resource, data) => createAction(actionTypes.CHANGE_JAMAKTIF, { data }, { resource }),
    onDuplication: (resource, data) => createAction(
        actionTypes.DUPLICATION,
        {},
        {
            resource,
            log: createActivity(
                resource,
                activity.MASUK_FORM,
                `Duplikasi versi tarif asal ${data.nama}`
            )
        }
    ),
    onCancelDuplication: (resource) => createAction(
        actionTypes.CANCEL_DUPLICATION, {}, {
            resource,
            log: createActivity(
                resource,
                activity.BATAL,
                `Batal simpan duplikasi versi tarif`
            )
        }),
    onSelectedDuplication: (resource, data) => createAction(actionTypes.SELECTED_DUPLICATION, { data }, { resource }),
    loadAllOnDuplication: (resource, data, tableParams) => createAction(
        actionTypes.LOAD_DATA_ON_DUPLICATION,
        { data },
        { tableParams, resource }
    ),
}
