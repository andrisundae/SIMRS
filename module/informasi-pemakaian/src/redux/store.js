import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { createSimrsLogger } from '@simrs/main/src/modules/log';

/*Reducers*/
import rootReducer from './reducer';

export default function configureModuleStore(preloadedState) {
  const logSimrsMiddleware = createSimrsLogger();
  let loggerMiddleware = () => (next) => (action) => next(action);
  if ('development' === process.env.NODE_ENV) {
    loggerMiddleware = createLogger();
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([logSimrsMiddleware, loggerMiddleware]),
    preloadedState,
  });

  return store;
}
