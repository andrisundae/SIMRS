import React, { Suspense} from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { Layout, PrivateRoute, Restricted, PermissionDenied, PageLoader} from '@simrs/components';
import { store, menu } from '@simrs/common';

import Dashboard from './Dashboard';
import rootRouters from './routers';

function Page() {
  return (
    <Router>
      <Layout
        logo={'SIMRS-BILLING'}
        contexts={menu.getMenuAplikasi(process.env.REACT_APP_KEY)}
        routers={rootRouters}
        username={store.main.get('user.username')}
      >
        <Suspense fallback={<PageLoader active={true} />}>
          <Switch>
            <PrivateRoute path="/billing/dashboard" render={_renderDashboard} />
            {rootRouters.map((router, index) => {
              let Component = withTranslation(router.key)(router.component);

              return (
                <PrivateRoute
                  key={index}
                  path={router.path}
                  render={(props) =>
                    // <Restricted route={router.key} {...props}><Component useSuspense={true} resource={router.key} {...props} /></Restricted>
                    <Restricted route={router.key} {...props}>
                      <Component resource={router.key} {...props} />
                    </Restricted>
                  }
                />
              )
            })}
            <Route path="/permission-denied" render={(props) => <PermissionDenied {...props} />} />
            <Redirect to={'/billing/dashboard'} />
          </Switch>
        </Suspense>
        
      </Layout>
    </Router>
  );

  function _renderDashboard(props) {
    return <Dashboard {...props} />;
  }
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader active={true} />}>
      <Page />
    </Suspense>
  );
};
