import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            penanggung_jawab: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            penanggung_jawab: { required: i18n.t(`${resource}:validator.penanggung_jawab.required`) },
        }
    }
}

const path = '/billing/master/komponen-tarif';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getPenanggungJawab: async () => {
        let response = await request.post(`${path}/options-penanggung-jawab`, {});

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
