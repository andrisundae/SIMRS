import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    jenisLayanan: '',
    tempatLayanan: {},
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
  shiftChange,
  isPasienSayaChange,
  idDokterChange,
  sortChange,
} = contentSlice.actions;
