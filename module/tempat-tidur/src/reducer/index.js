import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { createSlice } from '@reduxjs/toolkit';

const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    statusForm: '',
    // Berisi data pasien dan kunjungan rawat inap aktif
    selectedKunjungan: {},
    selected: {},
    focusElement: '',
  },
  reducers: {
    selectKunjungan: (state, { payload, type }) => {
      state.selectedKunjungan = payload;
      state.statusForm = type;
      state.focusElement = 'add';
    },
    add: (state, { type }) => {
      state.statusForm = type;
      state.focusElement = 'id_ruang';
    },
    edit: (state, { type }) => {
      state.statusForm = type;
      state.focusElement = 'id_ruang';
    },
  },
});

export const {
  selectKunjungan,
  add,
  edit,
} = moduleSlice.actions;

export default combineReducers({
  module: moduleSlice.reducer,
  toastr: toastrReducer,
});
