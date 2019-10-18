import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            kode_desa: { required: true },
            nama: { required: true },
            kecamatan: { required: true },
        },
        messages: {
            kode_desa: { required: i18n.t(`${resource}:validator.kode.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            kecamatan: { required: i18n.t(`${resource}:validator.kecamatan.required`) },
        }
    }
}

const path = '/billing/master/wilayah';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-desa`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-desa`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-desa`, params);

        return response;
    },
    validationRules
};
