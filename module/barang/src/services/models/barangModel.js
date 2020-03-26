import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nama                    : { required: true },
            jenis_barang            : { required: true },
            kelompok_barang         : { required: true },
            golongan_barang         : { required: true },
            satuan_terkecil         : { required: true },
            metode_update_harga_jual: { required: true },
            persentase_profit       : { required: true, maxnumber: 100}
        },
        messages: {
            nama                    : { required: i18n.t(`${resource}:validator.nama.required`) },
            jenis_barang            : { required: i18n.t(`${resource}:validator.jenis.required`) },
            kelompok_barang         : { required: i18n.t(`${resource}:validator.kelompok.required`) },
            golongan_barang         : { required: i18n.t(`${resource}:validator.golongan.required`) },
            satuan_terkecil         : { required: i18n.t(`${resource}:validator.satuan_terkecil.required`) },
            metode_update_harga_jual: { required: i18n.t(`${resource}:validator.metode_update.required`) },
            persentase_profit       : { maxnumber: i18n.t(`${resource}:validator.persentase_profit.max`)}
        }
    }
}

const path = '/farmasi/master/barang';

export default {
    getAll: async (params) => {
        let response = await request.post(`${path}/view`, params);

        return response;
    },
    save: async (method, params) => {
        let response = await request.post(`${path}/${method}`, params);

        return response;
    },
    delete: async (params) => {
        let response = await request.post(`${path}/hapus`, params);

        return response;
    },
    getFormData: async (params) => {
        let response = await request.get(`${path}/referensi`, params);

        return response;
    },
    validationRules
};
