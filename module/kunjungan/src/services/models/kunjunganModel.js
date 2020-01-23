import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            oldPassword: { required: true },
            newPassword: { required: true },
        },
        messages: {
            oldPassword: { required: i18n.t(`${resource}:validator.oldPassword.required`) },
            newPassword: { required: i18n.t(`${resource}:validator.newPassword.required`) },
        }
    }
}

const path = '/billing/transaksi/kunjungan';

export default {
    save: async (params) => {
        let response = await request.post(`${path}/save`, params);
        return response;
    },
    init: async () => {
        let response = await request.get(`${path}/init`);
        return response;
    },
    getAsalMasukDetailOptions: async (idAsalMasuk) => {
        let response = await request.get(`${path}/asal-masuk-detail-options/${idAsalMasuk}`);
        return response;
    },
    getInstalasiOptions: async (idKelompok) => {
        let response = await request.get(`${path}/instalasi-options/${idKelompok}`);
        return response;
    },
    getUnitLayananOptions: async (idInstalasi) => {
        let response = await request.get(`${path}/unitlayanan-options/${idInstalasi}`);
        return response;
    },
    getAllPasien: async (params) => {
        let response = await request.post('/billing/master/pasien/view', params);

        return response;
    },
    getAllWilayah: async (params) => {
        let response = await request.post('/billing/master/wilayah/view', params);

        return response;
    },
    getKelasKamarOptions: async (idUnitLayanan) => {
        let response = await request.get(`${path}/kelas-kamar-options/${idUnitLayanan}`);
        return response;
    },
    validationRules
};
