import i18n from 'i18next';
import { request } from '@simrs/common';

export const validationRules = (resource) => {
  return {
    rules: {
      id_kelompok: { required: true },
      id_instalasi: { required: true },
      id_unit_layanan: { required: true },
      id_tindakan: { required: true },
    },
    messages: {
      id_kelompok: {
        required: i18n.t(`${resource}:validator.id_kelompok.required`),
      },
      id_instalasi: {
        required: i18n.t(`${resource}:validator.id_instalasi.required`),
      },
      id_unit_layanan: {
        required: i18n.t(`${resource}:validator.id_unit_layanan.required`),
      },
      id_tindakan: {
        required: i18n.t(`${resource}:validator.id_tindakan.required`),
      },
    },
  };
};

const path = '/billing/transaksi/konsul';

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
    const response = await request.get(
      `/billing/transaksi/kunjungan/${idKunjungan}`
    );

    return response;
  },
  init: async () => {
    const response = await request.get(`${path}/init`);
    return response;
  },
  getKunjunganUnitDetail: async (idKunjunganUnit) => {
    const response = await request.get(
      `${path}/kunjungan-unit/${idKunjunganUnit}`
    );
    return response;
  },
  getAdministrasiKonsul: async (params) => {
    const response = await request.get(`${path}/administrasi-konsul`, params);
    return response;
  },
};
