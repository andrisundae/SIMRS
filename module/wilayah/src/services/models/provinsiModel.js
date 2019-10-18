import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            kode_provinsi: { required: true },
            nama: { required: true }
        },
        messages: {
            kode_provinsi: { required: i18n.t(`${resource}:validator.kode.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) }
        }
    }
}

const path = '/billing/master/wilayah';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-provinsi`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-provinsi`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-provinsi`, params);

        return response;
    },
    validationRules
};
