import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import { createSimrsLogger } from './modules/log';

/*Reducers*/
import rootReducer from './reducers';

import { authSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const logSimrsMiddleware = createSimrsLogger();
var loggerMiddleware = () => (next) => (action) => next(action);

export default () => {
  let composeEnhancers = compose;
  if ('development' === process.env.NODE_ENV) {
    // if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    //     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    // }
    loggerMiddleware = createLogger();
  }

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, logSimrsMiddleware, loggerMiddleware)
  );
  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(authSaga);

  return store;
};
