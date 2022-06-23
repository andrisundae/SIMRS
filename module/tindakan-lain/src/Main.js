import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toastr } from '@simrs/components';
import configureModuleStore from './page/index/redux/store';
import Page from './page/index/index';

const store = configureModuleStore();

export default function Main({ settings, location }) {
  const { path } = useRouteMatch();
  return (
    <Provider store={store}>
      <Switch location={location}>
        <Route
          path="/"
          render={(props) => <Page {...props} settings={settings} />}
        />
        <Toastr />
      </Switch>
    </Provider>
  );
}
