import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  master: {
    nomor_transaksi: 'PK220100001',
    id_unit: null,
    tanggal: '2021-10-12',
  },
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
      if (state.statusForm === addTransaksi.type) {
        console.log(state.statusForm);
      }
    },
    batal: (state) => readyReducer(state),

    onChangeInput: (state, { payload: { formType, data }, type }) => {
      state[formType][data.target] = data.value;
    },
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
  onChangeInput,
} = moduleSlice.actions;

export default combineReducers({
  module: moduleSlice.reducer,
  toastr: toastrReducer,
});
