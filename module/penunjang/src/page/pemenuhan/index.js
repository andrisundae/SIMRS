import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toastr } from '@simrs/components';
import configureModuleStore from './redux/store';
import Pemenuhan from './Main';

const store = configureModuleStore();

export default function Main({ settings, location }) {
  return (
    <Provider store={store}>
      <Pemenuhan settings={settings} />
      <Toastr />
    </Provider>
  );
}
