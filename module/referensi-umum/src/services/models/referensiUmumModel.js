import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            referensi: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            referensi: { required: i18n.t(`${resource}:validator.referensi.required`) },
        }
    }
}

const path = '/billing/master/referensi-umum';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getReferensi: async () => {
        let response = await request.post(`${path}/options-referensi`);

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
