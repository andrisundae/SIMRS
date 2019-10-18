import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            grup: { required: true }
        },
        messages: {
            grup: { required: i18n.t(`${resource}:validator.grup.required`) }
        }
    }
}

const path = '/system/pengaturan-hak-akses-menu';

export default {
    getMenu: async () => {
        let response = await request.post(`${path}/load-menu`);

        return response;
    },
    getAcl: async (idGrup) => {
        let response = await request.get(`${path}/view`, { id: idGrup });

        return response;
    },
    getGrup: async () => {
        let response = await request.post('/acl/grup/select-options');

        return response;
    },
    save: async (params) => {
        let response = await request.post(`${path}/tambah`, params);

        return response;
    },
    validationRules
};
