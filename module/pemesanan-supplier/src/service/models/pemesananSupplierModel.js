import { request } from '@simrs/common';
import i18n from 'i18next';
import { path } from '../../static/staticConst';

const validationRules = (resource) => {
  return {
    rules: {
      id_supplier: { required: true },
      id_unit: { required: true },
    },
    messages: {
      id_supplier: {
        required: i18n.t(`${resource}:validator.supplier.required`),
      },
      id_unit: { required: i18n.t(`${resource}:validator.unit.required`) },
    },
  };
};

const validationDetailRules = (resource) => {
  return {
    rules: {
      jumlah_pesan: { required: true },
      harga_satuan: { required: true },
    },
    messages: {
      jumlah_pesan: {
        required: i18n.t(`${resource}:validator.jumlah_pesan.required`),
      },
      harga_satuan: {
        required: i18n.t(`${resource}:validator.harga_satuan.required`),
      },
    },
  };
};

const validateFinish = (resource) => {
  return {
    rules: {
      master: { required: true },
      details: { required: true },
    },
    messages: {
      master: { required: i18n.t(`${resource}:validator.master.required`) },
      details: { required: i18n.t(`${resource}:validator.barang.required`) },
    },
  };
};

const validateHapus = (resource) => {
  return {
    rules: {
      id: { required: true },
    },
    messages: {
      id: { required: i18n.t(`${resource}:validator.master.required`) },
    },
  };
};

export default {
  save: async (method, params) => {
    let response = await request.post(
      `${path.PEMESANAN_SUPPLIER}/${method}`,
      params
    );

    return response;
  },
  finish: async (params) => {
    let response = await request.post(
      `${path.PEMESANAN_SUPPLIER}/selesai`,
      params
    );

    return response;
  },
  hapus: async (params) => {
    let response = await request.post(
      `${path.PEMESANAN_SUPPLIER}/hapus`,
      params
    );

    return response;
  },
  deleteDetail: async (params) => {
    let response = await request.post(
      `${path.PEMESANAN_SUPPLIER}/hapus-detail`,
      params
    );

    return response;
  },
  getDataTransaksi: async (params) => {
    let response = await request.post(
      `${path.PEMESANAN_SUPPLIER}/cari-transaksi`,
      params
    );

    return response;
  },

  getDataBarang: async (params) => {
    let response = await request.post(
      `${path.MASTER_BARANG}/cari-barang-unit`,
      params
    );

    return response;
  },

  getDataTransaksi: async (params) => {
    let response = await request.post(
      `${path.PEMESANAN_SUPPLIER}/cari-transaksi`,
      params
    );

    return response;
  },

  getDataDetail: async (params) => {
    let response = await request.get(
      `${path.PEMESANAN_SUPPLIER}/get-detail`,
      params
    );

    return response;
  },

  getDataStok: async (params) => {
    let response = await request.get(`${path.MASTER_BARANG}/stok`, params);

    return response;
  },

  getInitialForm: async (params) => {
    let response = await request.get(`${path.PEMESANAN_SUPPLIER}/init`, params);

    return response;
  },
  validationRules,
  validationDetailRules,
  validateFinish,
  validateHapus,
};
