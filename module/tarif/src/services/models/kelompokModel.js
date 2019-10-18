import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            nama_cetak: { required: true },
            klasifikasi: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            nama_cetak: { required: i18n.t(`${resource}:validator.nama_cetak.required`) },
            klasifikasi: { required: i18n.t(`${resource}:validator.klasifikasi.required`) },
        }
    }
}

const path = '/billing/master/tarif';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-kelompok`, params);

        return response;
    },
    getKlasifikasi: async () => {
        let response = await request.post(`${path}/options-klasifikasi`);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-kelompok`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-kelompok`, params);

        return response;
    },
    validationRules
};
