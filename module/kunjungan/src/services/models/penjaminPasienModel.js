import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      oldPassword: { required: true },
      newPassword: { required: true },
    },
    messages: {
      oldPassword: {
        required: i18n.t(`${resource}:validator.oldPassword.required`),
      },
      newPassword: {
        required: i18n.t(`${resource}:validator.newPassword.required`),
      },
    },
  };
};

const path = '/billing/master/penjamin-pasien';

export default {
  getAll: async (params) => {
    let response = await request.post(`${path}/view`, params);

    return response;
  },
  save: async (method, params) => {
    let response = await request.post(`${path}/${method}`, params);

    return response;
  },
  delete: async (params) => {
    let response = await request.post(`${path}/hapus`, params);

    return response;
  },
  validationRules,
};
