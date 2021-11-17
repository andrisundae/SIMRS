import { combineReducers } from 'redux';
import listReducer from './list';
import formReducer from './form';
import itemReducer from './item';

const combines = combineReducers({
  list: listReducer,
  form: formReducer,
  item: itemReducer,
});

const rootReducer = (state, action) => {
  const actionReset = [];

  if (actionReset.indexOf(action.type) > -1) {
    state = undefined;
  }
  return combines(state, action);
};

export default rootReducer;
