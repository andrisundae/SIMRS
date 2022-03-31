import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toastr } from '@simrs/components';
import configureModuleStore from './page/permintaan/redux/store';
import Permintaan from './page/permintaan';

const store = configureModuleStore();

export default function Main({ settings, location }) {
  const { path } = useRouteMatch();
  return (
    <Provider store={store}>
      <Switch location={location}>
        <Route
          path={`${path}/permintaan/:idKunjunganUnit`}
          render={(props) => <Permintaan settings={settings} show {...props} />}
        />
        <Toastr />
      </Switch>
    </Provider>
  );
}
