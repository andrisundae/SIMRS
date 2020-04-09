import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Toastr } from '@simrs/components';
import createStore from './store';
import Index from './pages/index';

const storeRedux = createStore();

function App({ location, resource, t, i18n }) {
  return (
    <Provider store={storeRedux}>
      <Router>
        <Fragment>
          <Switch location={location}>
            <Route
              path="/"
              render={(props) => (
                <Index resource={resource} {...props} t={t} i18n={i18n} />
              )}
            />
          </Switch>
          <Toastr />
        </Fragment>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  resource: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default App;
