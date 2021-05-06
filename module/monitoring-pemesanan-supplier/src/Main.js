import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import { Toastr } from '@simrs/components';
import { store as createStore } from './redux';
import Index from './pages/index';
import Detail from './pages/detail';

const storeRedux = createStore();

function Main({ resource, t, i18n, permissions, settings }) {
  let { path } = useRouteMatch();

  const trans = (key) => {
    return t(`${resource}:${key}`);
  };

  return (
    <Provider store={storeRedux}>
      <Router>
        <Fragment>
          <Switch>
            <Route
              exact
              path={path}
              render={(props) => (
                <Index
                  {...props}
                  resource={resource}
                  trans={trans}
                  i18n={i18n}
                  permissions={permissions}
                  settings={settings}
                />
              )}
            />
            <Route
              path={`${path}/:id`}
              render={(props) => (
                <Detail
                  {...props}
                  resource={resource}
                  trans={trans}
                  i18n={i18n}
                  permissions={permissions}
                  settings={settings}
                />
              )}
            />
          </Switch>
          <Toastr />
        </Fragment>
      </Router>
    </Provider>
  );
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default Main;
