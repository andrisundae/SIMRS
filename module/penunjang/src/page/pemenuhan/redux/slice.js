import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  // Berisi data pasien dan kunjungan rawat inap aktif
  selectedKunjungan: {},
  selected: {},
  focusElement: '',
  postPermintaan: {},
  loading: false,
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
    openForm: (state) => {
      state.statusForm = 'module/fullfillmentConfirmation';
    },
    ready: readyReducer,
    finish: (state, { type }) => {
      state.statusForm = type;
      state.selectedKunjungan = {};
      state.selected = {};
      state.focusElement = '';
    },
    reset: (state, { type }) => {
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
      state.focusElement = 'kode_panggil';
      state.selected = {};
    },
    edit: (state, { type }) => {
      state.statusForm = type;
      state.focusElement = 'kode_panggil';
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
    cancel: (state, { type }) => {
      state.statusForm = type;
      state.focusElement = '';
    },
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
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
  showLoader,
  hideLoader,
} = moduleSlice.actions;

export default moduleSlice;
