import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import { ipcRenderer } from 'electron';
import dayjs from 'dayjs';

import { validator as commonValidator, toastr} from '@simrs/common';
import { loaderActions, messageBox, constDatatable, datatableActionTypes, datatableActions} from '@simrs/components';
import api from '../services/models/kunjunganModel';
import {actions, actionTypes, getPost, isPasienBaru} from '../pages/index';

const { getFirstError, getFirstElementError } = commonValidator;
const validator = commonValidator.default;

const TABLE_PASIEN = 'table_pasien';
const TABLE_KUNJUNGAN = 'table_kunjungan';
const TABLE_WILAYAH = 'table_wilayah';

function* openForm({ meta }) {
    yield put(datatableActions.onInitialize(TABLE_PASIEN));
    yield put(datatableActions.onInitialize(TABLE_KUNJUNGAN));
    yield put(datatableActions.onInitialize(TABLE_WILAYAH));
    yield put(actions.populateForm.request(meta.resource));
    yield put(actions.onReady(meta.resource));
}

function* handleSave({ payload, meta }) {
    const { resource } = meta;
    const { data } = payload;
    try {
        yield put(loaderActions.show());
        // let { rules, messages } = api.validationRules(resource);
        // let post = payload.data;
        // let errors = validator(post, rules, messages);

        // if (_.isEmpty(errors)) {
        //     let response = yield call(api.save, post);
        //     if (response.status) {
        //         yield put(actions.save.requestSuccess(resource, response));
        //     } else {
        //         yield put(actions.save.requestFailure(resource, errors));
        //         yield toastr.warning(response.message);
        //         yield put(actions.onFocusElement(resource, 'oldPassword'));
        //     }
        // } else {
        //     yield put(actions.onFocusElement(resource, getFirstElementError(errors)));
        //     yield toastr.warning(getFirstError(errors));
        // }
        const prevPost = yield select(getPost);
        const jamKunjungan = dayjs(data.jam_kunjungan).format('HH:mm');
        const post = {
            norm: data.norm,
            nama: data.nama,
            id_jenis_kelamin: data.id_jenis_kelamin,
            alamat: data.alamat,
            rt: data.rt,
            rw: data.rw,
            id_desa: data.id_desa,
            nomor_anggota: data.nomor_anggota,
            id_kelas_penjamin_pasien: data.id_kelas_penjamin_pasien,
            id_kepersertaan: data.id_kepersertaan,
            id_asal_masuk: data.id_asal_masuk,
            id_asal_masuk_detail: data.id_asal_masuk_detail,
            id_penjamin: data.id_penjamin,
            id_unit_layanan: data.id_unit_layanan,
            id_dpjp: data.id_dpjp,
            id_penjamin_pasien: data.id_penjamin_pasien,
            tgl_lahir: dayjs(data.tgl_lahir).format('YYYY-MM-DD'),
            tgl_kunjungan: dayjs(data.tgl_kunjungan).format(`YYYY-MM-DD ${jamKunjungan}:ss`),
            tgl_jaminan: dayjs(data.tgl_jaminan).format('YYYY-MM-DD HH:mm:ss'),
            tgl_cetak_jaminan: dayjs(data.tgl_cetak_jaminan).format('YYYY-MM-DD HH:mm:ss'),
            id_tindakan: prevPost.id_tindakan.map(item => item.value),
            id_kelas: 4,
            id_kunjungan_asal: data.id_kunjungan_asal,
        };
        // let errors = validator(post, rules, messages);

        let response = yield call(api.save, 'tambah', post);
        if (response.status) {
            const showNormModal = yield select(isPasienBaru);
            if (showNormModal) {
                yield put(actions.toggleShowNormModal(resource));
            }
            yield put(actions.save.requestSuccess(resource, response.data));
        }
        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* handleSaveSuccess({payload, meta}) {
    // const showNormModal = yield select(isPasienBaru);
    // if (showNormModal) {
    //     yield put(actions.toggleShowNormModal(meta.resource));
    // }
}

function* populateForm({ meta }) {
    try {
        yield put(loaderActions.show());
        let { populateForm } = actions;
        let response = yield call(api.init);
        if (response.status) {
            yield put(populateForm.requestSuccess(meta.resource, response.data));
        } else {
            yield put(populateForm.requestFailure(meta.resource, response.message));
        }

        yield put(loaderActions.hide());
    } catch (error) {
        yield put(loaderActions.hide());
        yield toastr.error(error.message);
    }
}

function* changeSelect2({ meta, payload }) {
    try {
        switch (payload.name) {
            case 'id_unit_layanan':
                yield put(actions.optionsByUnitLayanan.request(meta.resource, payload.data));
                break;
            default:
                break;
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* asalMasukDetailRequest({ meta, payload }) {
    try {
        let response = yield call(api.getAsalMasukDetailOptions, payload.data.value);
        if (response.status) {
            yield put(actions.asalMasukDetail.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.asalMasukDetail.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* instalasiRequest({ meta, payload }) {
    try {
        let response = yield call(api.getInstalasiOptions, payload.data.value);
        if (response.status) {
            yield put(actions.instalasi.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.instalasi.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* unitLayananRequest({ meta, payload }) {
    try {
        let response = yield call(api.getUnitLayananOptions, payload.data.value);
        if (response.status) {
            yield put(actions.unitLayanan.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.unitLayanan.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* optionsByUnitLayananRequest({ meta, payload }) {
    try {
        const prevPost = yield select(getPost);
        let response = yield call(api.getOptionsByUnitLayanan, payload.data.value, {id_pasien: prevPost.id_pasien});
        if (response.status) {
            yield put(actions.optionsByUnitLayanan.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.optionsByUnitLayanan.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

// function* jenisKlasifikasiRegistrasiRequest({ meta, payload }) {
//     try {
//         let response = yield call(api.getJenisKlasifikasiRegistrasi, payload.data.value);
//         if (response.status) {
//             yield put(actions.jenisKlasifikasiRegistrasi.requestSuccess(meta.resource, response.data));
//         } else {
//             yield put(actions.jenisKlasifikasiRegistrasi.requestFailure(meta.resource, response.message));
//         }
//     } catch (error) {
//         yield toastr.error(error.message);
//     }
// }

function* loadAllPasien({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getAllPasien, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal)
        } else {
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(TABLE_PASIEN));
}

function* loadAllWilayah({ payload, meta }) {
    const { successCallback, failCallback } = meta.tableParams;

    try {
        let response = yield call(api.getAllWilayah, payload.data);
        if (response.status) {
            successCallback(response.data, response.recordsTotal)
        } else {
            failCallback();
        }
    } catch (error) {
        failCallback();
    }
    yield put(datatableActions.onReloaded(TABLE_WILAYAH));
}

function* handleSearchPasien() {
    try {
        yield put(datatableActions.onReload(TABLE_PASIEN, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSelectedPasien({meta}) {
    yield put(actions.toggleShowCariPasien(meta.resource));
}

function* handleSearchKunjungan() {
    try {
        yield put(datatableActions.onReload(TABLE_KUNJUNGAN, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSearchWilayah() {
    try {
        yield put(datatableActions.onReload(TABLE_WILAYAH, constDatatable.reloadType.purge));
    } catch (error) {
        yield toastr.error(error.message);
    }
}

function* handleSelectedWilayah({ meta }) {
    yield put(actions.toggleShowCariWilayah(meta.resource));
}

function* handleAdd({ meta, payload }) {
    yield put(actions.nextNorm.request(meta.resource));
}

function* nextNormRequest({ meta, payload }) {
    try {
        let response = yield call(api.getNextNorm);
        if (response.status) {
            yield put(actions.nextNorm.requestSuccess(meta.resource, response.data));
        } else {
            yield put(actions.nextNorm.requestFailure(meta.resource, response.message));
        }
    } catch (error) {
        yield toastr.error(error.message);
    }
}

export default function* watchAuthActions() {
    yield all([
        takeLatest(actionTypes.ADD, handleAdd),
        takeLatest(actionTypes.SAVE_REQUEST, handleSave),
        takeLatest(actionTypes.SAVE_SUCCESS, handleSaveSuccess),
        takeLatest(actionTypes.OPEN_FORM, openForm),
        takeLatest(actionTypes.POPULATE_FORM_REQUEST, populateForm),
        takeLatest(actionTypes.CHANGE_SELECT2, changeSelect2),
        takeLatest(actionTypes.ASAL_MASUK_DETAIL_REQUEST, asalMasukDetailRequest),
        takeLatest(actionTypes.INSTALASI_REQUEST, instalasiRequest),
        takeLatest(actionTypes.UNIT_LAYANAN_REQUEST, unitLayananRequest),
        takeLatest(actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST, optionsByUnitLayananRequest),
        takeLatest(actionTypes.NEXT_NORM_REQUEST, nextNormRequest),
        // takeLatest(actionTypes.JENIS_KLASIFIKASI_REGISTRASI_REQUEST, jenisKlasifikasiRegistrasiRequest),

        takeLatest(actionTypes.GET_ALL_PASIEN_REQUEST, loadAllPasien),
        takeLatest(actionTypes.FILTER_SUBMIT_PASIEN, handleSearchPasien),
        takeLatest(actionTypes.GET_ALL_WILAYAH_REQUEST, loadAllWilayah),
        takeLatest(actionTypes.FILTER_SUBMIT_WILAYAH, handleSearchWilayah),
        takeLatest(actionTypes.FILTER_SELECTED_PASIEN, handleSelectedPasien),
        takeLatest(actionTypes.FILTER_SELECTED_WILAYAH, handleSelectedWilayah),
    ]);
}
