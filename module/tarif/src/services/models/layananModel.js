import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama: { required: true },
            nama_cetak: { required: true },
            kelompok: { required: true },
        },
        messages: {
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            nama_cetak: { required: i18n.t(`${resource}:validator.nama_cetak.required`) },
            kelompok: { required: i18n.t(`${resource}:validator.kelompok.required`) },
        }
    }
}

const path = '/billing/master/tarif';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-layanan`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-layanan`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-layanan`, params);

        return response;
    },
    validationRules
};
