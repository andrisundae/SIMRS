import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { aclReducer } from '@simrs/main/src/modules/auth';
import { reducer as aturanAplikasiReducer } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import { loaderReducer, datatableReducer } from '@simrs/components';
import { moduleReducer, filterReducer } from './pages/index/reducer';

const index = combineReducers({
  module: moduleReducer,
  filter: filterReducer,
});

export default combineReducers({
  default: index,
  acl: aclReducer,
  aturanAplikasi: aturanAplikasiReducer,
  toastr: toastrReducer,
  loader: loaderReducer,
  datatable: datatableReducer,
});
