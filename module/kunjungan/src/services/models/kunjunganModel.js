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

const path = '/billing/transaksi/kunjungan';

export default {
  save: async (method, params) => {
    let response = await request.post(`${path}/${method}`, params, {}, false);

    return response;
  },
  delete: async (params) => {
    let response = await request.post(`${path}/hapus`, params);

    return response;
  },
  init: async () => {
    let response = await request.get(`${path}/init`);
    return response;
  },
  getAsalMasukDetailOptions: async (idAsalMasuk) => {
    let response = await request.get(
      `${path}/asal-masuk-detail-options/${idAsalMasuk}`
    );
    return response;
  },
  getInstalasiOptions: async (idKelompok) => {
    let response = await request.get(`${path}/instalasi-options/${idKelompok}`);
    return response;
  },
  getUnitLayananOptions: async (idInstalasi) => {
    let response = await request.get(
      `${path}/unitlayanan-options/${idInstalasi}`
    );
    return response;
  },
  getAllPasien: async (params) => {
    let response = await request.post('/billing/master/pasien/view', params);

    return response;
  },
  getAllWilayah: async (params) => {
    let response = await request.post('/billing/master/wilayah/view', params);
    return response;
  },
  getOptionsByUnitLayanan: async (idUnitLayanan, params) => {
    let response = await request.get(
      `${path}/options-by-unitlayanan/${idUnitLayanan}`,
      params
    );
    return response;
  },
  getNextNorm: async () => {
    let response = await request.get(`${path}/norm/next`);
    return response;
  },
  getPasienByNorm: async (norm) => {
    let response = await request.post(`/billing/master/pasien/${norm}`);
    return response;
  },
  getKunjunganDetail: async (idKunjunganUnit) => {
    let response = await request.get(`${path}/detail/${idKunjunganUnit}`);
    return response;
  },
  getKunjunganTerakhir: async (idPasien) => {
    let response = await request.get(`${path}/terakhir/${idPasien}`);
    return response;
  },
  getPenjaminPasien: async (idPasien) => {
    let response = await request.get(`${path}/penjamin-pasien/${idPasien}`);
    return response;
  },
  getDetailRangkaianKunjungan: async (idKunjunganUnit) => {
    let response = await request.get(
      `${path}/detail-rangkaian/${idKunjunganUnit}`
    );
    return response;
  },
  getSettingKelasPenjamin: async (idPenjamin) => {
    let response = await request.get(
      `${path}/setting-kelas-penjamin/${idPenjamin}`
    );
    return response;
  },
  validationRules,
};
