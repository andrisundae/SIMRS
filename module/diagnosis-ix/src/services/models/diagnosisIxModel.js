import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            kode_dx: { required: true },
            nama: { required: true },
            versi_diagnosis_ix: { required: true },
        },
        messages: {
            kode_dx: { required: i18n.t(`${resource}:validator.kode_dx.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            versi_diagnosis_ix: { required: i18n.t(`${resource}:validator.versi.required`) }
        }
    }
}

const path = '/billing/master/diagnosis-ix';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view-diagnosis-ix`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}-diagnosis-ix`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus-diagnosis-ix`, params);

        return response;
    },
    validationRules
};
