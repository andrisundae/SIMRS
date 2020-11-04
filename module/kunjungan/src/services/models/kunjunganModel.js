import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      norm: { required: true },
      nama: { required: true },
      id_jenis_kelamin: { required: true },
      // nama_ortu: { required: true },
      tgl_lahir: { required: true },
      // umur: { required: true },
      alamat: { required: true },
      rt: { required: true },
      rw: { required: true },
      id_desa: { required: true },
      tgl_kunjungan: { required: true },
      id_asal_masuk: { required: true },
      id_asal_masuk_detail: { required: true },
      id_penjamin: { required: true },
      id_kelompok: { required: true },
      id_instalasi: { required: true },
      id_unit_layanan: { required: true },
      id_dpjp: { required: true },
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
      umur: {
        required: i18n.t(`${resource}:validator.umur.required`),
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
      tgl_kunjungan: {
        required: i18n.t(`${resource}:validator.tgl_kunjungan.required`),
      },
      id_asal_masuk: {
        required: i18n.t(`${resource}:validator.id_asal_masuk.required`),
      },
      id_asal_masuk_detail: {
        required: i18n.t(`${resource}:validator.id_asal_masuk_detail.required`),
      },
      id_penjamin: {
        required: i18n.t(`${resource}:validator.status_pasien.required`),
      },
      id_kelompok: {
        required: i18n.t(`${resource}:validator.id_kelompok.required`),
      },
      id_instalasi: {
        required: i18n.t(`${resource}:validator.id_instalasi.required`),
      },
      id_unit_layanan: {
        required: i18n.t(`${resource}:validator.id_unit_layanan.required`),
      },
      id_dpjp: {
        required: i18n.t(`${resource}:validator.id_dpjp.required`),
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
    let response = await request.get(
      '/system/generate/no-transaksi/master_pasien'
    );
    return response;
  },
  getPasienByNorm: async (norm) => {
    let response = await request.get(`/billing/master/pasien/${norm}`);
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
  getKunjunganHariIni: async (params) => {
    let response = await request.get(`${path}/kunjungan-hari-ini`, params);
    return response;
  },
  validationRules,
};
