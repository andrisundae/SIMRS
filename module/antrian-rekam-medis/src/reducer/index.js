import { combineReducers } from 'redux';
import contentReducer from './content';

export default combineReducers({
  content: contentReducer,
});
