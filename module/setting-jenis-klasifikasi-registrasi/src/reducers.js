import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { aclReducer } from '@simrs/main/src/modules/auth';
import { reducer as aturanAplikasiReducer } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import { loaderReducer, datatableMultiReducer } from '@simrs/components';
import moduleReducer from './pages/index/reducer';

export default combineReducers({
  page: moduleReducer,
  acl: aclReducer,
  aturanAplikasi: aturanAplikasiReducer,
  toastr: toastrReducer,
  loader: loaderReducer,
  datatable: datatableMultiReducer,
});
