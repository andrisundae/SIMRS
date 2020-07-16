import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      id_pasien: { required: true },
      norm: { required: true },
      id_penjamin: { required: true },
      nomor_anggota: { required: true },
      id_kelas_penjamin_pasien: { required: true },
      id_kepersertaan: { required: true },
    },
    messages: {
      id_pasien: {
        required: i18n.t(`${resource}:validator.id_pasien.required`),
      },
      norm: {
        required: i18n.t(`${resource}:validator.norm.required`),
      },
      id_penjamin: {
        required: i18n.t(`${resource}:validator.id_penjamin.required`),
      },
      nomor_anggota: {
        required: i18n.t(`${resource}:validator.nomor_anggota.required`),
      },
      id_kelas_penjamin_pasien: {
        required: i18n.t(
          `${resource}:validator.id_kelas_penjamin_pasien.required`
        ),
      },
      id_kepersertaan: {
        required: i18n.t(`${resource}:validator.id_kepersertaan.required`),
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
