import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toastr } from '@simrs/components';
import configureModuleStore from './redux/store';
import Permintaan from './page/permintaan';
import CreatePermintaan from './page/permintaan/Create';

const store = configureModuleStore();

export default function Main({ settings, match }) {
  return (
    <Provider store={store}>
      <Route
        path={`${match.url}/permintaan/:idKunjunganUnit`}
        render={(props) => <Permintaan {...props} settings={settings} show />}
      />
      <Route
        path={`${match.url}/permintaan/:idKunjunganUnit/create`}
        render={(props) => <CreatePermintaan {...props} settings={settings} show />}
      />
      <Toastr />
    </Provider>
  );
}
