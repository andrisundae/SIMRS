import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  // Berisi data pasien dan kunjungan rawat inap aktif
  selectedKunjungan: {},
  selected: {},
  focusElement: '',
};

const readyReducer = () => {
  return {
    ...initialState,
    statusForm: ready.type,
    focusElement: 'norm',
  };
};

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    openForm: (state) => readyReducer(state),
    ready: (state) => readyReducer(state),
    finish: (state) => readyReducer(state),
    selectKunjungan: (state, { payload, type }) => {
      state.selectedKunjungan = payload;
      state.statusForm = type;
      state.focusElement = 'add';
    },
    select: (state, { payload, type }) => {
      state.selectedKunjungan = payload;
      state.statusForm = type;
      // state.focusElement = 'add';
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
  openForm,
  ready,
  select,
  finish,
} = moduleSlice.actions;

export default combineReducers({
  module: moduleSlice.reducer,
  toastr: toastrReducer,
});
