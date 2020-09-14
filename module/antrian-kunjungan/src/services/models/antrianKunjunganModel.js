import { request } from '@simrs/common';

const path = '/billing/antrian/kunjungan';

export default {
  getAll: async (params) => {
    let response = await request.get(`${path}`, params);

    return response;
  },
  init: async () => {
    let response = await request.get(`${path}/init`);
    return response;
  },
  getDpjp: async (idUnitLayanan) => {
    let response = await request.get(`${path}/dpjp/${idUnitLayanan}`);
    return response;
  },
};
