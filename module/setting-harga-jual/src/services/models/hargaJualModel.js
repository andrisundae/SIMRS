import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      harga_jual: { required: true },
    },
    messages: {
      harga_jual: {
        required: i18n.t(`${resource}:validator.harga_jual.required`),
      },
    },
  };
};

const path = '/farmasi/setting/harga-jual';

export default {
  getAll: async (params) => {
    let response = await request.post(`${path}/view`, params);

    return response;
  },
  save: async (method, params) => {
    let response = await request.post(`${path}/${method}`, params);

    return response;
  },
  getLog: async (params) => {
    let response = await request.post(`${path}/log`, params);

    return response;
  },
  validationRules,
};
