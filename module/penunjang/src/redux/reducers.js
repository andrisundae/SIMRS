import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import moduleSlice from './slice';

export default combineReducers({
  module: moduleSlice.reducer,
  toastr: toastrReducer,
});