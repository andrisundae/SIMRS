import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Toastr } from '@simrs/components';
import Versi, { store as createVersiStore } from './pages/versi';
import Diagnosis, { store as createDiagnosisStore } from './pages/diagnosis';

const versiStore = createVersiStore();
const diagnosisStore = createDiagnosisStore();

class SwitchComponent extends Component {
  constructor(props) {
    super(props);

    const { location } = props;

    this.previousLocation = location;
  }

  render() {
    const { location, resource, t, i18n, permissions, settings } = this.props;
    const isDiagnosis = !!(
      location.state &&
      location.state.diagnosis &&
      this.previousLocation !== location
    );

    return (
      <Fragment>
        <Provider store={versiStore}>
          <Fragment>
            <Switch location={isDiagnosis ? this.previousLocation : location}>
              <Route exact path="/" render={() => <Redirect to="/versi" />} />
              <Route exact path="/versi" render={(props) =>
                <Versi {...props} resource={resource} t={t} i18n={i18n} permissions={permissions} settings={settings} />} />
            </Switch>
            <Toastr preventDuplicates={false} />
          </Fragment>
        </Provider>
        {isDiagnosis &&
          <Provider store={diagnosisStore}>
            <Fragment>
            <Route path="/diagnosis/:versi" render={(props) =>
              <Diagnosis {...props} resource={resource} t={t} i18n={i18n} permissions={permissions} settings={settings} />} />
              <Toastr preventDuplicates={false} />
            </Fragment>

          </Provider>
        }
      </Fragment>
    );
  }

  componentDidUpdate() {
    const { location, history } = this.props;
    if (
      history.action !== "POP" &&
      (!location.state || !location.state.diagnosis)
    ) {
      this.previousLocation = location;
    }
  }
}

SwitchComponent.propTypes = {
  resource: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
};


function App({ match, t, i18n, resource, permissions, settings}) {
  return (
    <Router basename={match.url}>
      <Route render={(props) =>
        <SwitchComponent {...props} t={t} i18n={i18n} resource={resource} permissions={permissions} settings={settings} />} />
    </Router>
  );
}

App.propTypes = {
  resource: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
};

export default App;
