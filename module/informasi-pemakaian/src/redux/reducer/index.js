import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  master: {},
  detail: {},
  filter: {
    dataDefault: {},
    selectedOptions: {},
    modalMaster: { show: false },
  },
  listData: [],
  focusElement: '',
};

const readyReducer = () => {
  return {
    ...initialState,
    statusForm: ready.type,
    focusElement: 'tambahTransaksi',
  };
};

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    openForm: (state) => readyReducer(state),
    ready: (state) => readyReducer(state),
    addTransaksi: (state, { type }) => {
      state.statusForm = type;
      state.focusElement = 'selectUnit';
    },
    openModal: (state, { payload, type }) => {
      state.filter[payload].show = true;
      state.statusForm = type;
      state.focusElement = 'keyWord';
    },
    closeModal: (state, { payload, type }) => {
      state.filter[payload.name].show = false;
      state.statusForm = type;
      state.focusElement = payload.next;
    },
    simpan: (state, { payload, type }) => {
      state.statusForm = type;
      state.focusElement = 'tambahItem';
    },
    batal: (state) => readyReducer(state),
  },
});

export const {
  openForm,
  addTransaksi,
  openModal,
  closeModal,
  simpan,
  batal,
  ready,
} = moduleSlice.actions;

export default combineReducers({
  module: moduleSlice.reducer,
  toastr: toastrReducer,
});
