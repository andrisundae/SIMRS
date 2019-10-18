import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            kode_kecamatan: { required: true },
            nama: { required: true },
            kota: { required: true },
        },
        messages: {
            kode_kecamatan: { required: i18n.t(`${resource}:validator.kode.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            kota: { required: i18n.t(`${resource}:validator.kota.required`) },
        }
    }
}

const path = '/billing/master/wilayah';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-kecamatan`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-kecamatan`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-kecamatan`, params);

        return response;
    },
    validationRules
};
