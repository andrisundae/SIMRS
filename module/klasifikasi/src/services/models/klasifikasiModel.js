import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            jenis_klasifikasi: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            jenis_klasifikasi: { required: i18n.t(`${resource}:validator.jenis_klasifikasi.required`) },
        }
    }
}

const path = '/billing/master/klasifikasi';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getOptionsJenisKlasifikasi: async () => {
        let response = await request.post(`${path}/options-jenis-klasifikasi`, {});

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus`, params);

        return response;
    },
    validationRules
};
