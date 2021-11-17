import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterDokumen: '',
  filteredData: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    resetState: () => initialState,
    filterDokumenChange: (state, { payload }) => {
      state.filterDokumen = payload;
    },
    filteredDataChange: (state, { payload }) => {
      state.filteredData = payload;
    },
  },
});

export default listSlice.reducer;

export const {
  resetState,
  filterDokumenChange,
  filteredDataChange,
} = listSlice.actions;
