import { request } from '@simrs/common';
import i18n from 'i18next';

const validationPushRules = (resource) => {
    return {
        rules: {
            penjamin: { required: true },
            sumber: { required: true },
        },
        messages: {
            penjamin: { required: i18n.t(`${resource}:validator.penjamin.required`) },
            sumber: { required: i18n.t(`${resource}:validator.sumber.required`) }
        }
    }
}

const validationPushAllRules = (resource) => {
    return {
        rules: {
            penjamin: { required: true },
        },
        messages: {
            penjamin: { required: i18n.t(`${resource}:validator.penjamin.required`) },
        }
    }
}

const validationRevertRules = (resource) => {
    return {
        rules: {
            penjamin: { required: true },
            setting: { required: true },
        },
        messages: {
            penjamin: { required: i18n.t(`${resource}:validator.penjamin.required`) },
            setting: { required: i18n.t(`${resource}:validator.setting.required`) }
        }
    }
}

const validationRevertAllRules = (resource) => {
    return {
        rules: {
            penjamin: { required: true },
        },
        messages: {
            penjamin: { required: i18n.t(`${resource}:validator.penjamin.required`) },
        }
    }
}

const path = '/billing/setting/kelas-penjamin';

export default {
    getDataSumber: async (params) => {
        let response = await request.post(`${path}/view?typeData=dataSumber`, params);

        return response;
    },
    getDataSetting: async (params) => {
        let response = await request.post(`${path}/view?typeData=dataSetting`, params);

        return response;
    },
    getDataSumberLain: async (params = {}) => {
        let response = await request.post(`${path}/view?typeData=dataSumberLain`, params);

        return response;
    },
    getDataFilter: async (params = {}) => {
        let response = await request.post(`${path}/view?typeData=filter`, params);

        return response;
    },
    push: async (params) => {
        let response = await request.post(`${path}/koreksi`, params);

        return response;
    },
    revert: async (params) => {
        let response = await request.post(`${path}/hapus`, params);

        return response;
    },
    validationPushRules,
    validationPushAllRules,
    validationRevertRules,
    validationRevertAllRules,
};
