import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Layout, PrivateRoute, PermissionDenied, Restricted } from 'main/dist/components';
import { store, menu } from 'common';
import Dashboard from './Dashboard';
import ChangePassword from 'change-password';
import rootRouters from './routers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      
      <Router>
        <Layout
          logo={
            <Fragment>
              <span className="font-blue-madison">SIMRS</span>
              <span className="font-red-mint"> - </span>
              <span className="font-green">BILLING</span>
            </Fragment>
          }
          logout={null}
          contexts={menu.getMenuAplikasi(process.env.REACT_APP_KEY)}
          routers={rootRouters}
          username={this._getUsername()}
        >
          <Switch>
            <PrivateRoute path="/billing/dashboard" render={this._renderDashboard} />
            {rootRouters.map((router, index) => {
              let Component = router.component;

              return (
                <PrivateRoute
                  key={index}
                  path={router.path}
                  render={(props) =>
                    <Restricted route={router.key} {...props}><Component resource={router.key} {...props} /></Restricted>
                  }
                />
              )
            })}
            <Route path="/system/portal/change-password" render={(props) => <ChangePassword {...props} resource="_system_portal_change_password" />} />
            <Route path="/permission-denied" render={(props) => <PermissionDenied {...props}/>}/>
            <Redirect to={'/billing/dashboard'} />
          </Switch>
        </Layout>
      </Router>
      
    );
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  _renderDashboard(props) {
    return <Dashboard {...props} />;
  }

  _getUsername() {
    return store.main.get('username');
  }
}

export default App;
