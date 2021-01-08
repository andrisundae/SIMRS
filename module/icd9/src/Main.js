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
import Versi, { store as createVersiStore } from './pages/versi';
import Diagnosis, { store as createDiagnosisStore } from './pages/diagnosis';

const versiStore = createVersiStore();
const diagnosisStore = createDiagnosisStore();

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
            <Route exact path="/" render={() => <Redirect to="/versi" />} />
            <Route
              exact
              path="/versi"
              render={(props) => (
                <Provider store={versiStore}>
                  <Versi
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
              path="/diagnosis/:versi"
              render={(props) => (
                <Provider store={diagnosisStore}>
                  <Diagnosis
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
