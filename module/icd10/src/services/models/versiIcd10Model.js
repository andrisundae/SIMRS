import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      nama: { required: true },
    },
    messages: {
      nama: { required: i18n.t(`${resource}:validator.nama.required`) },
    },
  };
};

const path = '/rekam-medis/versi-icd10';

export default {
  getAll: async (params) => {
    let response = await request.post(`${path}/view/for-table`, params);

    return response;
  },
  save: async (method, params) => {
    let response = await request.post(`${path}/${method}`, params);

    return response;
  },
  delete: async (params) => {
    let response = await request.post(`${path}/delete`, params);

    return response;
  },
  validationRules,
};
