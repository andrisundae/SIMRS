import { request } from '@simrs/common';
import i18n from 'i18next';
import axios from '@simrs/common/src/helpers/axios';

const validationRules = (resource) => {
  return {
    rules: {
      nama: { required: true },
      nama_cetakan: { required: true },
      tarif: { required: true },
    },
    messages: {
      nama: { required: i18n.t(`${resource}:validator.nama.required`) },
      nama_cetakan: {
        required: i18n.t(`${resource}:validator.nama_cetakan.required`),
      },
      tarif: { required: i18n.t(`${resource}:validator.tarif.required`) },
    },
  };
};

const path = '/billing/master/layananLain';

export default {
  getAll: async (params) => {
    // let response = await request.get(`${path}/view`, params);

    return axios.get(`${path}/view`, { params });
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
