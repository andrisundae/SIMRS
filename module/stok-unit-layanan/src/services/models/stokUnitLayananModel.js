import { request } from '@simrs/common';

const path = '/billing/master/stok-unit-layanan';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getUnitLayanan: async () => {
        let response = await request.post(`${path}/options-layanan`, {});

        return response;
    },
    getKelas: async (params) => {
        let response = await request.post(`${path}/options-tindakan`, params);

        return response;
    },
    save: async (params) => {
        let response = await request.post(`${path}/koreksi`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus`, params);

        return response;
    },
};
