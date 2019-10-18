import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            kode_dx: { required: true },
            nama: { required: true },
            versi_diagnosis_x: { required: true },
        },
        messages: {
            kode_dx: { required: i18n.t(`${resource}:validator.kode_dx.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            versi_diagnosis_x: { required: i18n.t(`${resource}:validator.versi.required`) }
        }
    }
}

const path = '/billing/master/diagnosis-x';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-diagnosis-x`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-diagnosis-x`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-diagnosis-x`, params);

        return response;
    },
    validationRules
};
