import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { aclReducer } from '@simrs/main/src/modules/auth';
import { reducer as aturanAplikasiReducer } from '@simrs/main/src/modules/setting/aturan-aplikasi';
import { loaderReducer, datatableMultiReducer } from '@simrs/components';
import {
  detailReducer,
  masterReducer,
  filterReducer,
} from './pages/index/reducer';

const index = combineReducers({
  detail: detailReducer,
  master: masterReducer,
  filter: filterReducer,
});

export default combineReducers({
  default: index,
  acl: aclReducer,
  aturanAplikasi: aturanAplikasiReducer,
  toastr: toastrReducer,
  loader: loaderReducer,
  datatable: datatableMultiReducer,
});
