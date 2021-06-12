import { createSlice } from '@reduxjs/toolkit';

const anamnesisSlice = createSlice({
  name: 'anamnesis',
  initialState: {
    detailData: {},
  },
  reducers: {
    detailDataChange: (state, { payload }) => {
      state.detailData = payload;
    },
  },
});

export default anamnesisSlice.reducer;

export const { detailDataChange } = anamnesisSlice.actions;
