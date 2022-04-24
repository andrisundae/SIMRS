import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Toastr } from '@simrs/components';
import Penunjang from '@module/penunjang';
import { store as createStore } from './redux';
import Index from './pages/index';

const storeRedux = createStore();

function SwitchComponent({
  location,
  resource,
  t,
  i18n,
  permissions,
  settings,
  ...props
}) {
  const background = location.state && location.state?.background;
  return (
    <>
      <Provider store={storeRedux}>
        <Switch location={background || location}>
          <Route path="/">
            <Index
              {...props}
              resource={resource}
              t={t}
              i18n={i18n}
              permissions={permissions}
              settings={settings}
            />
          </Route>
        </Switch>
        <Toastr />
      </Provider>
      {background && (
        <Switch location={location}>
          <Route
            path="/penunjang"
            render={(routeProps) => (
              <Penunjang
                {...routeProps}
                resource={resource}
                t={t}
                i18n={i18n}
                permissions={permissions}
                settings={settings}
              />
            )}
          />
        </Switch>
      )}
    </>
  );
}
function App({
  match,
  location,
  resource,
  t,
  i18n,
  permissions,
  settings,
  ...props
}) {
  return (
    <Router basename={match.url}>
      <Route
        render={(routeProps) => (
          <SwitchComponent
            {...routeProps}
            t={t}
            i18n={i18n}
            resource={resource}
            permissions={permissions}
            settings={settings}
          />
        )}
      />
    </Router>
  );
}

App.propTypes = {
  resource: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default App;
