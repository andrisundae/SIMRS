import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { aclReducer } from '@simrs/main/src/modules/auth';
import { loaderReducer } from '@simrs/components';
import { reducer as indexReducer } from './pages/index';

export default combineReducers({
  module: indexReducer,
  acl: aclReducer,
  toastr: toastrReducer,
  loader: loaderReducer,
});
