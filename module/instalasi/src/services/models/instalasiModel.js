import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            jenis_layanan: { required: true },
            kelompok_jenis_layanan: { required: true }
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            jenis_layanan: { required: i18n.t(`${resource}:validator.jenis_layanan.required`) },
            kelompok_jenis_layanan: { required: i18n.t(`${resource}:validator.kelompok_jenis_layanan.required`) }
        }
    }
}

const path = '/billing/master/instalasi';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getOptionsJenisLayanan: async () => {
        let response = await request.post(`${path}/options-jenis-layanan`, {});

        return response;
    },
    getOptionsKelompokJenisLayanan: async () => {
        let response = await request.post(`${path}/options-kelompok-jenis-layanan`, {});

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
