import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
        }
    }
}

const path = '/billing/master/diagnosis-ix';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-versi-diagnosis-ix`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-versi-diagnosis-ix`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-versi-diagnosis-ix`, params);

        return response;
    },
    validationRules
};
