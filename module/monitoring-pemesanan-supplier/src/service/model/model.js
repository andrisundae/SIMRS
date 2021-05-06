import { request } from '@simrs/common';
import { path } from '../../pages/static';

export default {
  getDetailPemesanan: async (params) => {
    return await request.get(`${path.PEMESANAN_SUPPLIER}/item`, params);
  },
  getInitialForm: async (params) => {
    return await request.get(`${path.PEMESANAN_SUPPLIER}/init`, params);
  },
  getListPemesanan: async (params) => {
    return await request.get(
      `${path.PEMESANAN_SUPPLIER}/view`,
      params,
      {},
      false
    );
  },
  getListPenerimaan: async (params) => {
    return await request.get(
      `${path.PEMESANAN_SUPPLIER}/penerimaan`,
      params,
      {},
      false
    );
  },
  getDetailPenerimaan: async (params) => {
    return await request.get(
      `${path.PEMESANAN_SUPPLIER}/detil-penerimaan`,
      params,
      {},
      false
    );
  },
};
