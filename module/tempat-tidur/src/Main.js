import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Toastr } from '@simrs/components';
import rootReducer from './reducer';
import Index from './page/Index';

const store = configureStore({
  reducer: rootReducer,
});

export default function Main({ location, settings }) {
  return (
    <Router>
      <Provider store={store}>
        <Switch location={location}>
          <Route
            path="/"
            render={(props) => (
              <Index
                {...props}
                settings={settings}
              />
            )}
          />
        </Switch>
        <Toastr />
      </Provider>
    </Router>
  );
}
