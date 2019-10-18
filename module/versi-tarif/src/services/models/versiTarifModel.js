import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            id_st_aktif_kunjungan: { required: true },
            tgl_aktif_tarif: { required: true },
            jam_aktif_tarif: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            id_st_aktif_kunjungan: { required: i18n.t(`${resource}:validator.id_st_aktif_kunjungan.required`) },
            tgl_aktif_tarif: { required: i18n.t(`${resource}:validator.tgl_aktif_tarif.required`) },
            jam_aktif_tarif: { required: i18n.t(`${resource}:validator.jam_aktif_tarif.required`) },
        }
    }
}

const duplicationRules = (resource) => {
    return {
        rules: {
            versi_tarif_asal: { required: true },
            versi_tarif_tujuan: { required: true },
        },
        messages: {
            versi_tarif_asal: { required: i18n.t(`${resource}:validator.versi_tarif_asal.required`) },
            versi_tarif_tujuan: { required: i18n.t(`${resource}:validator.versi_tarif_tujuan.required`) },
        }
    }
}

const path = '/billing/master/versi-tarif';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getStatusAktifKunjungan: async () => {
        let response = await request.post(`${path}/options-status-aktif-kunjungan`, {});

        return response;
    },
    getOptionsKelompokJenisLayanan: async () => {
        let response = await request.post(`${path}/options-kelompok-jenis-layanan`, {});

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}`, params);

        return response;
    },
    duplication: async (params) => {
        let response = await request.post(`${path}/duplikasi`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus`, params);

        return response;
    },
    validationRules,
    duplicationRules
};
