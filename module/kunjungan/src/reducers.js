import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { loaderReducer, datatableMultiReducer } from '@simrs/components';
import { reducer, penjaminPasienReducer } from './pages/index';

const moduleReducer = combineReducers({
  kunjungan: reducer,
  penjaminPasien: penjaminPasienReducer,
});

export default combineReducers({
  module: moduleReducer,
  toastr: toastrReducer,
  loader: loaderReducer,
  datatable: datatableMultiReducer,
});
