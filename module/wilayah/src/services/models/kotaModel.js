import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            kode_kota: { required: true },
            nama: { required: true },
            provinsi: { required: true },
        },
        messages: {
            kode_kota: { required: i18n.t(`${resource}:validator.kode.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            provinsi: { required: i18n.t(`${resource}:validator.provinsi.required`) },
        }
    }
}

const path = '/billing/master/wilayah';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-kota`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-kota`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-kota`, params);

        return response;
    },
    validationRules
};
