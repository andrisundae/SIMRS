import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            alamat: { required: true },
            telp: { required: true },
            status_jaminan: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            alamat: { required: i18n.t(`${resource}:validator.alamat.required`) },
            telp: { required: i18n.t(`${resource}:validator.telp.required`) },
            status_jaminan: { required: i18n.t(`${resource}:validator.status_jaminan.required`) },
        }
    }
}

const path = '/billing/master/penjamin';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getKelas: async () => {
        let response = await request.post(`${path}/data-form`, {});

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
