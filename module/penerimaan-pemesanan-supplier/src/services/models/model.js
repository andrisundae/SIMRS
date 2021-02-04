import i18n from 'i18next';
import { request } from '@simrs/common';
import { path } from '../../pages/static';

export const validationMaster = (resource) => {
  return {
    rules: {
      nomor_faktur: { required: true },
      tanggal_faktur: { required: true },
      tanggal_jatuh_tempo: { required: true },
    },
    messages: {
      nomor_faktur: {
        required: i18n.t(`${resource}:validator.nomor_faktur.required`),
      },
      tanggal_faktur: {
        required: i18n.t(`${resource}:validator.tanggal_faktur.required`),
      },
      tanggal_jatuh_tempo: {
        required: i18n.t(`${resource}:validator.tanggal_jatuh_tempo.required`),
      },
    },
  };
};

export const validationDetail = (resource) => {
  return {
    rules: {
      no_batch: { required: true },
      jumlah_beli: { required: true },
      harga_satuan: { required: true },
      diskon: { required: true },
      diskon_rp: { required: true },
    },
    messages: {
      no_batch: { required: i18n.t(`${resource}:validator.no_batch.required`) },
      jumlah_beli: {
        required: i18n.t(`${resource}:validator.jumlah_beli.required`),
      },
      harga_satuan: {
        required: i18n.t(`${resource}:validator.harga_satuan.required`),
      },
      diskon: { required: i18n.t(`${resource}:validator.diskon.required`) },
      diskon_rp: {
        required: i18n.t(`${resource}:validator.diskon_rp.required`),
      },
    },
  };
};

export const validateFinish = (resource) => {
  return {
    rules: {
      id: { required: true },
    },
    messages: {
      id: { required: i18n.t(`${resource}:validator.pembelian.required`) },
    },
  };
};

export const validateHapus = (resource) => {
  return {
    rules: {
      id: { required: true },
    },
    messages: {
      id: { required: i18n.t(`${resource}:validator.pembelian.required`) },
    },
  };
};

export default {
  init: async () => {
    const response = await request.get(`${path.PENERIMAAN_PEMESANAN}/init`);
    return response;
  },
  getNormorTransaksi: async (alias) => {
    const response = await request.get(
      `${path.COMMON_NOMOR_TRANSAKSI}/${alias}`
    );
    return response;
  },
  save: async (method, params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN}/${method}`,
      params,
      {},
      false
    );

    return response;
  },
  delete: async (params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN}/hapus`,
      params,
      {},
      false
    );

    return response;
  },
  finish: async (params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN}/selesai`,
      params,
      {},
      false
    );

    return response;
  },
  getListTransaksi: async (params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN}/view`,
      params,
      {},
      false
    );

    return response;
  },
  saveDetail: async (method, params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN_DETAIL}/${method}`,
      params,
      {},
      false
    );

    return response;
  },
  deleteDetail: async (params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN_DETAIL}/hapus`,
      params,
      {},
      false
    );

    return response;
  },
  getListDetail: async (params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN_DETAIL}/view`,
      params,
      {},
      false
    );

    return response;
  },
  getListPemesanan: async (params) => {
    const response = await request.post(
      `${path.PEMESANAN_SUPPLIER}/list`,
      params,
      {},
      false
    );

    return response;
  },
  getListBarang: async (params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN}/list-barang`,
      params,
      {},
      false
    );

    return response;
  },
  getInfotBarang: async (params) => {
    const response = await request.post(
      `${path.PENERIMAAN_PEMESANAN}/info`,
      params,
      {},
      false
    );

    return response;
  },
};
