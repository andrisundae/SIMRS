import { request } from '@simrs/common';
import { path } from '../../pages/static';

export default {
  init: async () => {
    const response = await request.get(`${path.PEMBELIAN}/init`);
    return response;
  },
  initNon: async () => {
    const response = await request.get(`${path.PEMBELIAN_NON_HUTANG}/init`);
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
      `${path.PEMBELIAN}/${method}`,
      params,
      {},
      false
    );

    return response;
  },
  saveNon: async (method, params) => {
    const response = await request.post(
      `${path.PEMBELIAN_NON_HUTANG}/${method}`,
      params,
      {},
      false
    );

    return response;
  },
  delete: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN}/hapus`,
      params,
      {},
      false
    );

    return response;
  },
  deleteNon: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN_NON_HUTANG}/hapus`,
      params,
      {},
      false
    );

    return response;
  },
  finish: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN}/selesai`,
      params,
      {},
      false
    );

    return response;
  },
  finishNon: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN_NON_HUTANG}/selesai`,
      params,
      {},
      false
    );

    return response;
  },
  getListTransaksi: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN}/list`,
      params,
      {},
      false
    );

    return response;
  },
  saveDetail: async (method, params) => {
    const response = await request.post(
      `${path.PEMBELIAN_DETAIL}/${method}`,
      params,
      {},
      false
    );

    return response;
  },
  deleteDetail: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN_DETAIL}/hapus`,
      params,
      {},
      false
    );

    return response;
  },
  deleteDetailNon: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN_NON_HUTANG}/hapus`,
      params,
      {},
      false
    );

    return response;
  },
  getListDetail: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN_DETAIL}/view`,
      params,
      {},
      false
    );

    return response;
  },
  getListDetailNon: async (params) => {
    const response = await request.post(
      `${path.PEMBELIAN_NON_HUTANG}/view`,
      params,
      {},
      false
    );

    return response;
  },
  getListBarang: async (params) => {
    const response = await request.post(
      `${path.MASTER_BARANG}/cari-barang-unit`,
      params,
      {},
      false
    );

    return response;
  },
};
