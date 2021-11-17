import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kategori: '',
  namaTemplate: '',
  jenisLayanan: '',
  aksesDokumen: '',
  ttdPasien: +false,
  headingOtomatis: +false,
  klaim: +false,
  pelayanan: +true,
  dokumenKhusus: +false,
  withTTD: +true,
  aktif: +true,
  modalItem: false,
  modalInduk: false,
  modalUrutan: false,
  modalShowHasil: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetState: () => initialState,
    kategoriChange: (state, { payload }) => {
      state.kategori = payload;
    },
    namaTemplateChange: (state, { payload }) => {
      state.namaTemplate = payload;
    },
    jenisLayananChange: (state, { payload }) => {
      state.jenisLayanan = payload;
    },
    aksesDokumenChange: (state, { payload }) => {
      state.aksesDokumen = payload;
    },
    ttdPasienChange: (state, { payload }) => {
      state.ttdPasien = payload;
    },
    headingOtomatisChange: (state, { payload }) => {
      state.headingOtomatis = payload;
    },
    klaimChange: (state, { payload }) => {
      state.klaim = payload;
    },
    pelayananChange: (state, { payload }) => {
      state.pelayanan = payload;
    },
    dokumenKhususChange: (state, { payload }) => {
      state.dokumenKhusus = payload;
    },
    withTTDChange: (state, { payload }) => {
      state.withTTD = payload;
    },
    aktifChange: (state, { payload }) => {
      state.aktif = payload;
    },
    modalItemChange: (state, { payload }) => {
      state.modalItem = payload;
    },
    modalIndukChange: (state, { payload }) => {
      state.modalInduk = payload;
    },
    modalUrutanChange: (state, { payload }) => {
      state.modalUrutan = payload;
    },
    modalShowHasilChange: (state, { payload }) => {
      state.modalShowHasil = payload;
    },
  },
});

export default formSlice.reducer;

export const {
  resetState,
  kategoriChange,
  namaTemplateChange,
  jenisLayananChange,
  aksesDokumenChange,
  ttdPasienChange,
  headingOtomatisChange,
  klaimChange,
  pelayananChange,
  dokumenKhususChange,
  withTTDChange,
  aktifChange,
  modalItemChange,
  modalIndukChange,
  modalUrutanChange,
  modalShowHasilChange,
} = formSlice.actions;
