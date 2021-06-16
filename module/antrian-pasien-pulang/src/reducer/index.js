import { combineReducers } from 'redux';
import pasienPulangReducer from './pasienpulang';

export default combineReducers({
  pasienpulang: pasienPulangReducer,
});
