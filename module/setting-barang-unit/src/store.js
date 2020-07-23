import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import { createSimrsLogger } from '@simrs/main/src/modules/log';

/*Reducers*/
import rootReducer from './reducers';

/*Sagas*/
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const logSimrsMiddleware = createSimrsLogger();
var loggerMiddleware = () => (next) => (action) => next(action);

export default () => {
  let composeEnhancers = compose;
  if ('development' === process.env.NODE_ENV) {
    loggerMiddleware = createLogger();
  }

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, logSimrsMiddleware, loggerMiddleware)
  );
  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
};
