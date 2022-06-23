import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  selected: {},
  focusElement: '',
  post: {},
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
    openForm: readyReducer,
    ready: readyReducer,
    finish: (state, { type }) => {
      state.statusForm = type;
      state.selected = {};
      state.focusElement = '';
    },
    reset: (state, { type }) => {
      state.statusForm = type;
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
  add,
  edit,
  openForm,
  ready,
  select,
  finish,
  savePermintaan,
  resetPostPermintaan,
  reset,
  cancel,
  showLoader,
  hideLoader,
} = moduleSlice.actions;

export default moduleSlice;
