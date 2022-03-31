import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  // Berisi data pasien dan kunjungan rawat inap aktif
  selectedKunjungan: {},
  selected: {},
  focusElement: '',
  postPermintaan: {}
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
      state.selected = payload;
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
    savePermintaan: (state, { type, payload }) => {
      state.statusForm = type;
      state.postPermintaan = payload;
    },
    resetPostPermintaan: (state) => {
      state.postPermintaan = {};
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
  savePermintaan,
  resetPostPermintaan,
} = moduleSlice.actions;

export default moduleSlice;
