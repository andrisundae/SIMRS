import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Index from './page/Index';
import Template from './page/Template';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default function Main() {
  return (
    <Router>
      <Provider store={store}>
        <Route exact path="/template">
          <Index />
        </Route>
        <Route path="/template/add">
          <Template />
        </Route>
        <Route path="/template/edit">
          <Template />
        </Route>
      </Provider>
    </Router>
  );
}
