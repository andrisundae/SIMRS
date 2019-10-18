import { request } from '@simrs/common';

const path = '/billing/master/koreksi-tarif-kelas';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    getAllTindakanKomponen: async (params) => {
        let response = await request.post(`${path}/view-tindakan-komponen`, params);

        return response;
    },
    getVersiTarif: async () => {
        let response = await request.post(`${path}/options-versi-tarif`);

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
    getKelas: async () => {
        let response = await request.post(`${path}/options-kelas`);

        return response;
    },
    save: async (params) => {
        let response = await request.post(`${path}/koreksi`, params);

        return response;
    },
    saveTindakanKomponen: async (params) => {
        let response = await request.post(`${path}/tambah-tindakan-komponen`, params);

        return response;
    },
};
