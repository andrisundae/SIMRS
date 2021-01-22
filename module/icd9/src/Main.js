import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Toastr } from '@simrs/components';
import VersiIcd9, { store as createVersiIcd9Store } from './pages/versiIcd9';
import Icd9, { store as createIcd9Store } from './pages/icd9';

const versiIcd9Store = createVersiIcd9Store();
const icd9Store = createIcd9Store();

class SwitchComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { resource, t, i18n, permissions, settings } = this.props;

    return (
      <Fragment>
        <Fragment>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/versi-icd9" />}
            />
            <Route
              exact
              path="/versi-icd9"
              render={(props) => (
                <Provider store={versiIcd9Store}>
                  <VersiIcd9
                    {...props}
                    resource={resource}
                    t={t}
                    i18n={i18n}
                    permissions={permissions}
                    settings={settings}
                  />
                  <Toastr preventDuplicates={false} />
                </Provider>
              )}
            />
            <Route
              path="/icd9/:versiIcd9"
              render={(props) => (
                <Provider store={icd9Store}>
                  <Icd9
                    {...props}
                    resource={resource}
                    t={t}
                    i18n={i18n}
                    permissions={permissions}
                    settings={settings}
                  />
                  <Toastr preventDuplicates={false} />
                </Provider>
              )}
            />
          </Switch>
        </Fragment>
      </Fragment>
    );
  }
}

SwitchComponent.propTypes = {
  resource: PropTypes.string.isRequired,
  history: PropTypes.object,
};

export default function Main({
  match,
  t,
  i18n,
  resource,
  permissions,
  settings,
}) {
  return (
    <Router basename={match.url}>
      <SwitchComponent
        t={t}
        i18n={i18n}
        resource={resource}
        permissions={permissions}
        settings={settings}
      />
    </Router>
  );
}
Main.propTypes = {
  resource: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};
