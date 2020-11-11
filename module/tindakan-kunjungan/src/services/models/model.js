import i18n from 'i18next';
import { request } from '@simrs/common';

export const validationRules = (resource) => {
  return {
    rules: {
      id_tindakan: { required: true },
      id_pelaksana: { required: true },
      jumlah: { required: true },
    },
    messages: {
      id_tindakan: {
        required: i18n.t(`${resource}:validator.id_tindakan.required`),
      },
      id_pelaksana: {
        required: i18n.t(`${resource}:validator.id_pelaksana.required`),
      },
      jumlah: {
        required: i18n.t(`${resource}:validator.jumlah.required`),
      },
    },
  };
};

const path = '/billing/transaksi/tindakan';

export default {
  save: async (method, params) => {
    const response = await request.post(`${path}/${method}`, params, {}, false);

    return response;
  },
  delete: async (params) => {
    const response = await request.post(`${path}/hapus`, params, {}, false);

    return response;
  },
  getPasienByNorm: async (norm) => {
    const response = await request.get(`/billing/master/pasien/${norm}`);
    return response;
  },
  getKunjungan: async (idPasien) => {
    const response = await request.get(`${path}/kunjungan/${idPasien}`);

    return response;
  },
  getKunjunganDetail: async (idKunjungan) => {
    const response = await request.get(`/billing/transaksi/kunjungan/${idKunjungan}`);

    return response;
  },
  init: async () => {
    const response = await request.get(`${path}/init`);
    return response;
  },
  getKunjunganUnitDetail: async (idKunjunganUnit) => {
    const response = await request.get(`${path}/kunjungan-unit-detail/${idKunjunganUnit}`);
    return response;
  },
  tindakanSuggestion: async (params) => {
    const response = await request.get('/billing/master/tindakan/suggestion', params);
    return response;
  },
  getOptionsByUnitLayanan: async (idUnitLayanan) => {
    const response = await request.get(`${path}/options-by-unitlayanan/${idUnitLayanan}`);
    return response;
  },
};
