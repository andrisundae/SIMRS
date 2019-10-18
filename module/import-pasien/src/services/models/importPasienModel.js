import { xhrRequest } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            file: { required: true }
        },
        messages: {
            file: { required: i18n.t(`${resource}:validator.file.required`) }
        }
    }
}

const path = '/billing/master/pasien/import';

export default {
    upload: (data, options, callback) => {
        return xhrRequest.postXhr(`${path}/upload`, data, options, callback)
    },
    validationRules
};
