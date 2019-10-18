import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            versi_tarif: { required: true },
            jenis_ekspor: { required: true },
        },
        messages: {
            versi_tarif: { required: i18n.t(`${resource}:validator.versi_tarif.required`) },
            jenis_ekspor: { required: i18n.t(`${resource}:validator.jenis_ekspor.required`) },
        }
    }
}

const BASE_URI = process.env.REACT_APP_API_DOMAIN;
const path = '/billing/master/ekspor-tarif';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getVersiTarif: async () => {
        let response = await request.post(`${path}/options-versi-tarif`);

        return response;
    },
    getColumnOrder: async () => {
        let response = await request.post(`${path}/options-column-order`);

        return response;
    },
    getHeaderColumn: async (params) => {
        let response = await request.post(`${path}/load-header-column`, params);

        return response;
    },
    export: async (params) => {
        let response = await request.post(`${path}/ekspor`, params);

        return response;
    },
    pathToDownload: `${BASE_URI}${path}/download`,
    validationRules
};
