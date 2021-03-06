import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      kode: { required: true },
      nama: { required: true },
      id_versi_icd9: { required: true },
    },
    messages: {
      kode: { required: i18n.t(`${resource}:validator.kode.required`) },
      nama: { required: i18n.t(`${resource}:validator.nama.required`) },
      id_versi_icd9: {
        required: i18n.t(`${resource}:validator.versi_icd9.required`),
      },
    },
  };
};

const path = '/rekam-medis/icd9';

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
