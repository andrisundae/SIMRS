import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            kode_panggil: { required: true },
            versi_tarif: { required: true },
            kelas: { required: true },
            layanan: { required: true },
            tgl_aktif_tarif: { required: true },
            jam_aktif_tarif: { required: true },
        },
        messages: {
            kode_panggil: { required: i18n.t(`${resource}:validator.kode_panggil.required`) },
            versi_tarif: { required: i18n.t(`${resource}:validator.versi_tarif.required`) },
            kelas: { required: i18n.t(`${resource}:validator.kelas.required`) },
            layanan: { required: i18n.t(`${resource}:validator.layanan.required`) },
            tgl_aktif_tarif: { required: i18n.t(`${resource}:validator.tgl_aktif_tarif.required`) },
            jam_aktif_tarif: { required: i18n.t(`${resource}:validator.jam_aktif_tarif.required`) },
        }
    }
}

const validationImportKelasRules = (resource) => {
    return {
        rules: {
            versi_tarif: { required: true },
            layanan: { required: true },
            list_kelas: { required: true },
        },
        messages: {
            versi_tarif: { required: i18n.t(`${resource}:validator.versi_tarif.required`) },
            layanan: { required: i18n.t(`${resource}:validator.layanan.required`) },
            list_kelas: { required: i18n.t(`${resource}:validator.list_kelas.required`) },
        }
    }
}

const path = '/billing/master/tindakan';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getAllKelas: async (params) => {
        let response = await request.post(`${path}/view-kelas`, params);

        return response;
    },
    getAllTindakanKomponen: async (params) => {
        let response = await request.post(`${path}/view-tindakan-komponen`, params);

        return response;
    },
    getVersiTarif: async () => {
        let response = await request.post(`${path}/options-versi-tarif`);

        return response;
    },
    getKelas: async () => {
        let response = await request.post(`${path}/options-kelas`);

        return response;
    },
    getKodePanggil: async (params) => {
        let response = await request.get(`${path}/create-kode-panggil`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}`, params);

        return response;
    },
    saveTindakanKomponen: async (params) => {
        let response = await request.post(`${path}/tambah-tindakan-komponen`, params);

        return response;
    },
    importKelas: async (params) => {
        let response = await request.post(`${path}/import-kelas`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus`, params);

        return response;
    },
    validationRules,
    validationImportKelasRules
};
