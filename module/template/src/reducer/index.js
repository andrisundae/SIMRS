import { combineReducers } from 'redux';
import contentReducer from './content';

const combines = combineReducers({
  content: contentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'pasienpulang/resetToInitialState') {
    state = undefined;
  }
  return combines(state, action);
};

export default rootReducer;
