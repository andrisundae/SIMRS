import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Toastr } from '@simrs/components';
import Provinsi, { store as createProvinsiStore } from './pages/provinsi';
import Kota, { store as createKotaStore } from './pages/kota';
import Kecamatan, { store as createKecamatanStore } from './pages/kecamatan';
import Desa, { store as createDesaStore } from './pages/desa';

const provinsiStore = createProvinsiStore();
const kotaStore = createKotaStore();
const kecamatanStore = createKecamatanStore();
const desaStore = createDesaStore();

class SwitchComponent extends Component {
  constructor(props) {
    super(props);

    const { location } = props;

    this.previousLocation = location;
    this.previousLocationKota = location;
    this.previousLocationKecamatan = location;
  }

  render() {
    const { location, resource, t, i18n, permissions, settings } = this.props;
    const isKota = !!(
      location.state &&
      location.state.kota &&
      this.previousLocation !== location
    );

    const isKecamatan = !!(
      location.state &&
      location.state.kecamatan &&
      this.previousLocationKota !== location
    );

    const isDesa = !!(
      location.state &&
      location.state.desa &&
      this.previousLocationKecamatan !== location
    );

    return (
      <Fragment>
          <Provider store={provinsiStore}>
          <Fragment>
            <Switch location={isKota ? this.previousLocation : location}>
              <Route exact path="/" render={() => <Redirect to="/provinsi" />} />
              <Route exact path="/provinsi" render={(props) =>
                <Provinsi resource={resource} {...props} t={t} i18n={i18n} permissions={permissions} settings={settings} />} />
            </Switch>
            <Toastr preventDuplicates={false} />
          </Fragment>
        </Provider>
        {isKota &&
          <Provider store={kotaStore}>
            <Fragment>
              <Switch location={isKecamatan ? this.previousLocationKota : location}>
                <Route path="/kota/:provinsi" render={(props) =>
                  <Kota {...props} resource={resource} t={t} i18n={i18n} permissions={permissions} settings={settings} />} />
              </Switch>
              <Toastr preventDuplicates={false} />
            </Fragment>

          </Provider>
        }

        {isKecamatan &&
          <Provider store={kecamatanStore}>
            <Fragment>
              <Switch location={isDesa ? this.previousLocationKecamatan : location}>
              <Route path="/kecamatan/:kota" render={(props) =>
                <Kecamatan {...props} resource={resource} t={t} i18n={i18n} permissions={permissions} settings={settings} />} />
              </Switch>
              <Toastr preventDuplicates={false} />
            </Fragment>
          </Provider>
        }

        {isDesa &&
          <Provider store={desaStore}>
            <Fragment>
            <Route path="/desa/:kecamatan" render={(props) =>
              <Desa {...props} resource={resource} t={t} i18n={i18n} permissions={permissions} settings={settings} />} />
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
      (!location.state || !location.state.kota)
    ) {
      this.previousLocation = location;
    }

    if (
      history.action !== "POP" &&
      (!location.state || !location.state.kecamatan)
    ) {
      this.previousLocationKota = location;
    }

    if (
      history.action !== "POP" &&
      (!location.state || !location.state.desa)
    ) {
      this.previousLocationKecamatan = location;
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
