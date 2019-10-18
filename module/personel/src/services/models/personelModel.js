import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
    return {
        rules: {
            nip: { required: true },
            nama: { required: true },
            inisial: { required: true },
            id_jenis_kelamin: { required: true },
            telp: { required: true },
            id_pendidikan: { required: true },
            id_jenis_pegawai: { required: true },
            id_spesialisasi_pegawai: { required: true },
            id_jabatan_fungsional: { required: true },
            alias_status_aplikasi: { required: true },
        },
        messages: {
            nip: { required: i18n.t(`${resource}:validator.nip.required`) },
            nama: { required: i18n.t(`${resource}:validator.nama.required`) },
            inisial: { required: i18n.t(`${resource}:validator.inisial.required`) },
            id_jenis_kelamin: { required: i18n.t(`${resource}:validator.jenis_kelamin.required`) },
            telp: { required: i18n.t(`${resource}:validator.telp.required`) },
            id_pendidikan: { required: i18n.t(`${resource}:validator.pendidikan.required`) },
            id_jenis_pegawai: { required: i18n.t(`${resource}:validator.jenis_pegawai.required`) },
            id_spesialisasi_pegawai: { required: i18n.t(`${resource}:validator.spesialisasi_pegawai.required`) },
            id_jabatan_fungsional: { required: i18n.t(`${resource}:validator.jabatan_fungsional.required`) },
            alias_status_aplikasi: { required: i18n.t(`${resource}:validator.alias_status_aplikasi.required`) },
        }
    }
}

const validationUploadGambarRules = (resource) => {
    return {
        rules: {
            id_personel: { required: true },
            id_jenis_gambar_personel: { required: true },
            // file: { required: true },
        },
        messages: {
            id_personel: { required: i18n.t(`${resource}:validator.id_personel.required`) },
            id_jenis_gambar_personel: { required: i18n.t(`${resource}:validator.id_jenis_gambar_personel.required`) },
            // file: { required: i18n.t(`${resource}:validator.file.required`) },
        }
    }
}

const path = '/system/manajemen-user/personel';

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
    changeStatus: async (params) => {
        let response = await request.post(`${path}/ganti-status`, params);

        return response;
    },
    getFormData: async () => {
        let response = await request.post(`${path}/form/data`, { grup_order_by: 'nama' });

        return response;
    },
    saveUploadGambar: async (params) => {
        let response = await request.post(`${path}/form-upload-gambar/upload`, params);

        return response;
    },
    getFormUploadGambarData: async () => {
        let response = await request.post(`${path}/form-upload-gambar/data`, {});

        return response;
    },
    getFormUploadGambarDetail: async (params) => {
        let response = await request.post(`${path}/form-upload-gambar/detail`, params);

        return response;
    },
    deleteUploadGambar: async (params) => {
        let response = await request.post(`${path}/form-upload-gambar/hapus`, params);

        return response;
    },
    validationRules,
    validationUploadGambarRules
};
