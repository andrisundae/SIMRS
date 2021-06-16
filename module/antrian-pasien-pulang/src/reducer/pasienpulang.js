import { createSlice } from '@reduxjs/toolkit';

const pasienPulangSlice = createSlice({
  name: 'pasienpulang',
  initialState: {
    filter:
      null !== localStorage.getItem('pasien_pulang_filter')
        ? JSON.parse(localStorage.getItem('pasien_pulang_filter'))
        : {},
    cacheData:
      null !== localStorage.getItem('pasien_pulang_data')
        ? JSON.parse(localStorage.getItem('pasien_pulang_data'))
        : {},
    fragment:
      null !== localStorage.getItem('pasien_pulang_fragment')
        ? JSON.parse(localStorage.getItem('pasien_pulang_fragment'))
        : {},
  },
  reducers: {
    filterChange: (state, { payload }) => {
      state.filter = payload;
      localStorage.setItem('pasien_pulang_filter', JSON.stringify(payload));
    },
    cacheDataChange: (state, { payload }) => {
      state.data = payload;
      localStorage.setItem('pasien_pulang_data', JSON.stringify(payload));
    },
    fragmentChange: (state, { payload }) => {
      state.fragment = payload;
      localStorage.setItem('pasien_pulang_fragment', JSON.stringify(payload));
    },
  },
});

export default pasienPulangSlice.reducer;

export const {
  filterChange,
  cacheDataChange,
  fragmentChange,
} = pasienPulangSlice.actions;
