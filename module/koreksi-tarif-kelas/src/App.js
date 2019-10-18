import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Toastr } from '@simrs/components';
import Tindakan, { store as createTindakanStore } from './pages/tindakan-layanan';
import TindakanKomponen, { store as createTindakanKomponenStore } from './pages/tindakan-komponen';

const tindakanStore = createTindakanStore();
const tindakanKomponenStore = createTindakanKomponenStore();

class SwitchComponent extends Component {
  constructor(props) {
    super(props);

    const { location } = props;

    this.previousLocation = location;
  }

  render() {
    const { location, resource, t, i18n } = this.props;

    const isTindakanKomponen = !!(
      location.state &&
      location.state.tindakanKomponen &&
      this.previousLocationTindakan !== location
    );

    return (
      <Fragment>
        <Provider store={tindakanStore}>
          <Fragment>
            <Switch location={isTindakanKomponen ? this.previousLocation : location}>
              <Route exact path="/" render={() => <Redirect to="/tindakan" />} />
              <Route exact path="/tindakan" render={(props) => <Tindakan resource={resource} t={t} i18n={i18n} {...props}/>} />
            </Switch>
            <Toastr preventDuplicates={false} />
          </Fragment>
        </Provider>

        {isTindakanKomponen &&
          <Provider store={tindakanKomponenStore}>
            <Fragment>
            <Route path="/tindakan-komponen/:tindakan" render={(props) => <TindakanKomponen resource={resource} t={t} i18n={i18n} {...props} />} />
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
      (!location.state || !location.state.tindakanKomponen)
    ) {
      this.previousLocation = location;
    }
  }
}

SwitchComponent.propTypes = {
  resource: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  t: PropTypes.func,
  i18n: PropTypes.object,
};


function App({ match, t, i18n, resource}) {
  return (
    <Router basename={match.url}>
      <Route render={(props) => <SwitchComponent t={t} i18n={i18n} resource={resource} {...props} />} />
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
