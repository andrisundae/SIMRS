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
import VersiIcd10, { store as createVersiIcd10Store } from './pages/versiIcd10';
import Icd10, { store as createIcd10Store } from './pages/icd10';

const versiIcd10Store = createVersiIcd10Store();
const icd10Store = createIcd10Store();

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
              render={() => <Redirect to="/versi-icd10" />}
            />
            <Route
              exact
              path="/versi-icd10"
              render={(props) => (
                <Provider store={versiIcd10Store}>
                  <VersiIcd10
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
              path="/icd10/:versiIcd10"
              render={(props) => (
                <Provider store={icd10Store}>
                  <Icd10
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
