import { combineReducers } from 'redux';
import anamnesisReducer from './anamnesis';

export default combineReducers({
  anamnesis: anamnesisReducer,
});
