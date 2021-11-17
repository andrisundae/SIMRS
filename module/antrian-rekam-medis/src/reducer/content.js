import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    jenisLayanan: '',
    tempatLayanan: {},
    tanggal: new Date().toString(),
    shift: 'pagi',
    isPasienSaya: false,
    idDokter: '',
    sort: {
      column: 'tanggal',
      direction: 'asc',
    },
  },
  reducers: {
    jenisLayananChange: (state, { payload }) => {
      state.jenisLayanan = payload;
    },
    tempatLayananChange: (state, { payload }) => {
      state.tempatLayanan = payload;
    },
    tanggalChange: (state, { payload }) => {
      state.tanggal = payload;
    },
    shiftChange: (state, { payload }) => {
      state.shift = payload;
    },
    isPasienSayaChange: (state, { payload }) => {
      state.isPasienSaya = payload;
    },
    idDokterChange: (state, { payload }) => {
      state.idDokter = payload;
    },
    sortChange: (state, { payload }) => {
      state.sort = payload;
    },
  },
});

export default contentSlice.reducer;
export const {
  jenisLayananChange,
  tempatLayananChange,
  tanggalChange,
  shiftChange,
  isPasienSayaChange,
  idDokterChange,
  sortChange,
} = contentSlice.actions;
