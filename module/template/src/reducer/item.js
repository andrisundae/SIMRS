import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  induk: {
    text: '',
    value: [],
  },
  urutan: [],
  labelItem: '',
  referensi: '',
  fontStyle: {
    fontSize: '14',
    bold: +false,
    italic: +false,
    underline: +false,
  },
  tipeComponent: 'label',
  labelComponent: {
    withCheckbox: +false,
  },
  textComponent: {
    format: 'text',
    textFormat: {
      panjangKarakter: '',
      jumlahBaris: '',
      satuan: '',
      placeholder: '',
    },
    dateTimeFormat: '',
  },
  dropdownComponent: {
    options: [],
    value: [],
    panjangKarakter: '',
    placeholder: '',
  },
  dropdownDBComponent: {
    source: 'diagnosis',
  },
  checkboxComponent: {
    horisontal: '',
    options: [],
    value: [],
    pilihanLain: {
      panjangKarakter: '',
      placeholder: '',
    },
  },
  radioComponent: {
    horisontal: '',
    options: [],
    value: [],
    pilihanLain: {
      panjangKarakter: '',
      placeholder: '',
    },
  },
  multipleComponent: {
    panjangKarakter: '',
    placeholder: '',
  },
  dataComponent: {
    value: {},
    nilaiKosong: +false,
  },
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    resetState: () => initialState,
    indukChange: (state, { payload }) => {
      state.induk = payload;
    },
    urutanChange: (state, { payload }) => {
      state.urutan = payload;
    },
    labelItemChange: (state, { payload }) => {
      state.labelItem = payload;
    },
    referensiChange: (state, { payload }) => {
      state.referensi = payload;
    },
    fontStyleChange: (state, { payload }) => {
      state.fontStyle = payload;
    },
    tipeComponentChange: (state, { payload }) => {
      state.tipeComponent = payload;
    },
    labelComponentChange: (state, { payload }) => {
      state.labelComponent = payload;
    },
    textComponentChange: (state, { payload }) => {
      state.textComponent = payload;
    },
    dropdownComponentChange: (state, { payload }) => {
      state.dropdownComponent = payload;
    },
    dropdownDBComponentChange: (state, { payload }) => {
      state.dropdownDBComponent = payload;
    },
    checkboxComponentChange: (state, { payload }) => {
      state.checkboxComponent = payload;
    },
    radioComponentChange: (state, { payload }) => {
      state.radioComponent = payload;
    },
    multipleComponentChange: (state, { payload }) => {
      state.multipleComponent = payload;
    },
    dataComponentChange: (state, { payload }) => {
      state.dataComponent = payload;
    },
  },
});

export default itemSlice.reducer;

export const {
  resetState,
  indukChange,
  urutanChange,
  labelItemChange,
  referensiChange,
  fontStyleChange,
  tipeComponentChange,
  labelComponentChange,
  textComponentChange,
  dropdownComponentChange,
  dropdownDBComponentChange,
  checkboxComponentChange,
  radioComponentChange,
  multipleComponentChange,
  dataComponentChange,
} = itemSlice.actions;
