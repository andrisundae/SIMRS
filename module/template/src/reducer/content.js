import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'pasienpulang',
  initialState: {
    filterDokumen: '',
    filteredData: [],
  },
  reducers: {
    filterDokumenChange: (state, { payload }) => {
      state.filterDokumen = payload;
    },
    filteredDataChange: (state, { payload }) => {
      state.filteredData = payload;
    },
    resetToInitialState: () => {},
  },
});

export default contentSlice.reducer;

export const {
  filterDokumenChange,
  filteredDataChange,
  resetToInitialState,
} = contentSlice.actions;
