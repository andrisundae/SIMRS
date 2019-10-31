import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            oldPassword: { required: true },
            newPassword: { required: true },
        },
        messages: {
            oldPassword: { required: i18n.t(`${resource}:validator.oldPassword.required`) },
            newPassword: { required: i18n.t(`${resource}:validator.newPassword.required`) },
        }
    }
}

const path = '/auth/personel/password';

export default {
    save: async (params) => {
        let response = await request.post(`${path}/change`, params);

        return response;
    },
    validationRules
};
