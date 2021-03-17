import i18n from 'i18next';
import { request } from '@simrs/common';

export const validationRules = (resource) => {
  return {
    rules: {
      norm: { required: true },
      nama: { required: true },
      id_jenis_kelamin: { required: true },
      tgl_lahir: { required: true },
      alamat: { required: true },
      rt: { required: true },
      rw: { required: true },
      id_desa: { required: true },
    },
    messages: {
      norm: {
        required: i18n.t(`${resource}:validator.norm.required`),
      },
      nama_ortu: {
        required: i18n.t(`${resource}:validator.nama_ortu.required`),
      },
      nama: {
        required: i18n.t(`${resource}:validator.nama.required`),
      },
      id_jenis_kelamin: {
        required: i18n.t(`${resource}:validator.id_jenis_kelamin.required`),
      },
      tgl_lahir: {
        required: i18n.t(`${resource}:validator.tgl_lahir.required`),
      },
      alamat: {
        required: i18n.t(`${resource}:validator.alamat.required`),
      },
      rt: {
        required: i18n.t(`${resource}:validator.rt.required`),
      },
      rw: {
        required: i18n.t(`${resource}:validator.rw.required`),
      },
      id_desa: {
        required: i18n.t(`${resource}:validator.id_desa.required`),
      },
    },
  };
};

const path = '/billing/master/pasien';

export default {
  save: async (params) => {
    const response = await request.post(`${path}/koreksi`, params, {}, false);

    return response;
  },
  getPasienByNorm: async (norm) => {
    const response = await request.get(`/billing/master/pasien/${norm}`);
    return response;
  },
  init: async () => {
    const response = await request.get(`${path}/init`);
    return response;
  },
};
