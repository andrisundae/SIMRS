import i18n from 'i18next';
import { request } from '@simrs/common';

export const validationRules = (resource) => {
  return {
    rules: {
      id_spesialisasi: { required: true },
      id_pelaksana: { required: true },
    },
    messages: {
      id_spesialisasi: {
        required: i18n.t(`${resource}:validator.id_spesialisasi.required`),
      },
      id_pelaksana: {
        required: i18n.t(`${resource}:validator.id_pelaksana.required`),
      },
    },
  };
};

const path = '/billing/transaksi/kunjungan-unit-detail-pelaksana';

export default {
  save: async (method, params) => {
    const response = await request.post(`${path}/${method}`, params, {}, false);

    return response;
  },
  delete: async (params) => {
    const response = await request.post(`${path}/hapus`, params, {}, false);

    return response;
  },
  init: async () => {
    const response = await request.get(`${path}/init`);
    return response;
  },
  getKunjunganUnitDetailPelaksana: async (params) => {
    const response = await request.get(
      `${path}/view/${params.idKunjunganUnitDetail}`,
      params
    );
    return response;
  },
  getPelaksana: async (idSpesialisasi, idUnitLayanan) => {
    const response = await request.get(`${path}/pelaksana/${idSpesialisasi}`, {
      idUnitLayanan,
    });
    return response;
  },
  validationRules,
};
