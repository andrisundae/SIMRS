import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      unit_farmasi: { required: true },
    },
    messages: {
      unit_farmasi: {
        required: i18n.t(`${resource}:validator.unit_farmasi.required`),
      },
    },
  };
};

const path = '/farmasi/setting/unit-farmasi';

export default {
  getAll: async (params) => {
    let response = await request.post(`${path}/view`, params);

    return response;
  },
  save: async (method, params) => {
    let response = await request.post(`${path}/${method}`, params);

    return response;
  },
  generate: async (params) => {
    let response = await request.get(`${path}/generate`, params);

    return response;
  },
  validationRules,
};
