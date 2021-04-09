import { request } from '@simrs/common';

const path = '/billing/informasi/riwayat-kunjungan';

export default {
  getPasienByNorm: async (norm) => {
    const response = await request.get(`/billing/master/pasien/${norm}`);
    return response;
  },
  getRiwayatKunjungan: async (params) => {
    const response = await request.get(`${path}/riwayat-kunjungan`, params);
    return response;
  },
  getRiwayatKunjunganUnit: async (params) => {
    const response = await request.get(
      `${path}/riwayat-kunjungan-unit`,
      params
    );
    return response;
  },
  getRiwayatKunjunganUnitDetail: async (params) => {
    const response = await request.get(
      `${path}/riwayat-kunjungan-unit-detail`,
      params
    );
    return response;
  },
  getKunjunganDetail: async (idKunjungan) => {
    const response = await request.get(
      `/billing/transaksi/kunjungan/${idKunjungan}`
    );

    return response;
  },
};
