import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            asal_masuk: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            asal_masuk: { required: i18n.t(`${resource}:validator.asal_masuk.required`) },
        }
    }
}

const validationImportRules = (resource) => {
    return {
        rules: {
            list_unit_layanan: { required: true },
        },
        messages: {
            list_unit_layanan: { required: i18n.t(`${resource}:validator.asal_masuk.required`) }
        }
    }
}

const path = '/billing/master/asal-masuk';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-detail`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-detail`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-detail`, params);

        return response;
    },
    getAllUnitLayanan: async (params) => {
        let response = await request.post(`${path}/view-unit-layanan`, params);

        return response;
    },
    getInstalasi: async () => {
        let response = await request.post('/billing/master/unit-layanan/options-instalasi');

        return response;
    },
    importDetail: async (params) => {
        let response = await request.post(`${path}/import-detail`, params);

        return response;
    },
    validationRules,
    validationImportRules
};
