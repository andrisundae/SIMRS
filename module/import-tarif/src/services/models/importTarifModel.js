import { xhrRequest, request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            file: { required: true },
            versi_tarif: { required: true },
            jenis_tarif: { required: true },
        },
        messages: {
            file: { required: i18n.t(`${resource}:validator.file.required`) },
            versi_tarif: { required: i18n.t(`${resource}:validator.versi_tarif.required`) },
            jenis_tarif: { required: i18n.t(`${resource}:validator.jenis_tarif.required`) },
        }
    }
}

const path = '/billing/master/tarif/import';

export default {
    upload: (data, options, callback) => {
        return xhrRequest.postXhr(`${path}/upload`, data, options, callback)
    },
    getVersi: async () => {
        let response = await request.post(`${path}/options-versi-tarif`);

        return response;
    },
    validationRules
};
