import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusForm: '',
  data: {
    instalasi: [],
    unitLayanan: [],
    penjamin: [],
    dpjp: [],
  },
  focusElement: '',
};

const readyReducer = (state, { type }) => {
  return {
    ...initialState,
    statusForm: type,
    focusElement: 'norm',
  };
};

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    openForm: readyReducer,
  },
});

export const { openForm } = moduleSlice.actions;

export default combineReducers({
  module: moduleSlice.reducer,
  toastr: toastrReducer,
});
