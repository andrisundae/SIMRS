import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  // Berisi data pasien dan kunjungan rawat inap aktif
  selectedKunjungan: {},
  selected: {},
  focusElement: '',
  postPermintaan: {},
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
    openForm: (state, { type }) => {
      state.statusForm = 'module/fullfillmentConfirmation';
    },
    ready: readyReducer,
    finish: (state, { payload, type }) => {
      state.statusForm = type;
      state.selectedKunjungan = {};
      state.selected = {};
      state.focusElement = '';
    },
    reset: (state, { payload, type }) => {
      state.statusForm = type;
      state.selectedKunjungan = {};
      state.selected = {};
      state.focusElement = '';
    },
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
    fullfillmentConfirmation: (state, { type }) => {
      state.statusForm = type;
    },
    willbefullfilled: (state, { type }) => {
      state.statusForm = type;
    },
    cancel: (state) => {
      state.statusForm = select.type;
      // state.focusElement = 'id_ruang';
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
  fullfillmentConfirmation,
  willbefullfilled,
  reset,
  cancel,
} = moduleSlice.actions;

export default moduleSlice;
