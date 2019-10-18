import { request } from '@simrs/common';

const path = '/billing/master/non-aktif-layanan';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getKlasifikasi: async () => {
        let response = await request.post(`${path}/options-klasifikasi`);

        return response;
    },
    getKelompok: async (params) => {
        let response = await request.post(`${path}/options-kelompok`, params);

        return response;
    },
    save: async (params) => {
        let response = await request.post(`${path}/koreksi`, params);

        return response;
    },
};
