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
    focusElement: '',
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
    reset: (state, { type }) => {
      state.statusForm = type;
      state.selectedKunjungan = {};
      state.selected = {};
      state.focusElement = '';
    },
    select: (state, { payload, type }) => {
      state.selected = payload;
      state.statusForm = type;
      // state.focusElement = 'add';
    },
    add: (state, { type }) => {
      state.statusForm = type;
      state.focusElement = 'id_unit_layanan';
    },
    edit: (state, { type }) => {
      state.statusForm = type;
      state.focusElement = 'id_dokter_peminta_penunjang';
    },
    savePermintaan: (state, { type, payload }) => {
      state.statusForm = type;
      state.postPermintaan = payload;
    },
    resetPostPermintaan: (state) => {
      state.postPermintaan = {};
    },
    focusElement: (state, { payload }) => {
      state.focusElement = payload.focusElement;
    },
    cancel: (state) => {
      if (state.statusForm === add.type) {
        state.statusForm = ready.type;
      } else if (state.statusForm === edit.type) {
        state.statusForm = select.type;
      }

      state.focusElement = '';
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
  cancel,
  reset,
  focusElement,
} = moduleSlice.actions;

export default moduleSlice;
