import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { aclReducer } from '@simrs/main/src/modules/auth';
import { loaderReducer, datatableReducer } from '@simrs/components';
import { reducer } from './pages/index';

export default combineReducers({
  module: reducer,
  acl: aclReducer,
  toastr: toastrReducer,
  loader: loaderReducer,
  datatable: datatableReducer,
});
