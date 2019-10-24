import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Toastr } from '@simrs/components';
import Kelompok, { store as createKelompokStore } from './pages/kelompok';
import Layanan, { store as createLayananStore } from './pages/layanan';

const kelompokStore = createKelompokStore();
const layananStore = createLayananStore();

class SwitchComponent extends Component {
  constructor(props) {
    super(props);

    const { location } = props;

    this.previousLocation = location;
  }

  render() {
    const { location, resource, t, i18n, permissions, settings } = this.props;
    const isLayanan = !!(
      location.state &&
      location.state.layanan &&
      this.previousLocation !== location
    );

    return (
      <Fragment>
        <Provider store={kelompokStore}>
          <Fragment>
            <Switch location={isLayanan ? this.previousLocation : location}>
              <Route exact path="/" render={() => <Redirect to="/kelompok" />} />
              <Route exact path="/kelompok" render={(props) =>
                <Kelompok resource={resource} t={t} i18n={i18n} permissions={permissions} settings={settings} {...props} />} />
            </Switch>
            <Toastr preventDuplicates={false} />
          </Fragment>
        </Provider>
        {isLayanan &&
          <Provider store={layananStore}>
            <Fragment>
            <Route path="/layanan/:kelompok" render={(props) =>
              <Layanan resource={resource} t={t} i18n={i18n} permissions={permissions} settings={settings} {...props} />} />
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
      (!location.state || !location.state.layanan)
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
