import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import filterReducer from './filter';

export default combineReducers({
  filter: filterReducer,
  toastr: toastrReducer,
});
