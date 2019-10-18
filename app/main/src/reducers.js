import { combineReducers } from 'redux';
import { notificationReducers, loaderReducer } from '@simrs/components';

import { authReducer } from './modules/auth';

export default combineReducers({
    auth: authReducer,
    notification: notificationReducers,
    loader: loaderReducer
});
