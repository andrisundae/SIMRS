import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            instalasi: { required: true },
            nama: { required: true },
            kategori: { required: true },
            inisial: { required: true, maxlength: 6 }
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            instalasi: { required: i18n.t(`${resource}:validator.instalasi.required`) },
            kategori: { required: i18n.t(`${resource}:validator.kategori.required`) },
            inisial: {
                required: i18n.t(`${resource}:validator.inisial.required`),
                maxlength: i18n.t(`${resource}:validator.inisial.maxlength`),
            }
        }
    }
}

const path = '/billing/master/unit-layanan';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getOptionsInstalasi: async () => {
        let response = await request.post(`${path}/options-instalasi`, {});

        return response;
    },
    getOptionsKategori: async () => {
        let response = await request.post(`${path}/options-kategori`, {});

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
