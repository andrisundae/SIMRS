import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    idKelompokPemeriksaanFisik: '',
    idInstalasi: '',
    unconfiguredKeyword: '',
    configuredKeyword: '',
  },
  reducers: {
    idKelompokPemeriksaanFisikChange: (state, { payload }) => {
      state.idKelompokPemeriksaanFisik = payload;
    },
    idInstalasiChange: (state, { payload }) => {
      state.idInstalasi = payload;
    },
    unconfiguredKeywordChange: (state, { payload }) => {
      state.unconfiguredKeyword = payload;
    },
    configuredKeywordChange: (state, { payload }) => {
      state.configuredKeyword = payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  idKelompokPemeriksaanFisikChange,
  idInstalasiChange,
  unconfiguredKeywordChange,
  configuredKeywordChange,
} = filterSlice.actions;
