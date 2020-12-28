import Main from './Main';

import reducer from './redux/reducer';
import actions from './redux/actions';
import actionTypes from './redux/actionTypes';
import pelaksanaTambahanReducer from './redux/pelaksanaTambahan/reducer';
import * as pelaksanaTambahanActions from './redux/pelaksanaTambahan/actions';
import * as pelaksanaTambahanActionTypes from './redux/pelaksanaTambahan/actionTypes';
export * from './static';

export {
  Main as default,
  reducer,
  actions,
  actionTypes,
  pelaksanaTambahanReducer,
  pelaksanaTambahanActions,
  pelaksanaTambahanActionTypes,
};
