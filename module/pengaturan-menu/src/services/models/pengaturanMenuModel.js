import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            key_menu: { required: true },
            kode_app: { required: true }
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            key_menu: { required: i18n.t(`${resource}:validator.key_menu.required`) },
            kode_app: { required: i18n.t(`${resource}:validator.kode_app.required`)},
        }
    }
}

const validationDetailRules = (resource) => {
    return {
        rules: {
            id: { required: true },
            nama: { required: true },
        },
        messages: {
            id: { required: i18n.t(`${resource}:validator.id.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
        }
    }
}

const path = '/system/pengaturan-menu';

export default {
    getMenu: async () => {
        let response = await request.post(`${path}/load-menu`);

        return response;
    },
    getDetail: async (id) => {
        let response = await request.get(`${path}/load-detail`, { id });

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
    saveDetail: async (params) => {
        let response = await request.post(`${path}/tambah-detail`, params);

        return response;
    },
    deleteDetail: async (params) => {
        let response = await request.post(`${path}/hapus-detail`, params);

        return response;
    },
    validationRules,
    validationDetailRules
};
