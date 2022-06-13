import React, { Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  Layout,
  PrivateRoute,
  Restricted,
  PermissionDenied,
  PageLoader,
  AppProvider,
  ModuleProvider,
} from '@simrs/components';
import { store, menu } from '@simrs/common';

import Dashboard from './Dashboard';
import rootRouters from './routers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Page() {
  // const [settings, setSettings] = useState([]);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Layout
            logo={'FARMASI'}
            contexts={menu.getMenuAplikasi(process.env.REACT_APP_KEY)}
            routers={rootRouters}
            username={store.main.get('user.username')}
          >
            <Suspense fallback={<PageLoader active={true} />}>
              <ModuleProvider>
                <Switch>
                  <PrivateRoute
                    path="/farmasi/dashboard"
                    render={_renderDashboard}
                  />
                  {rootRouters.map((router, index) => {
                    let Component = withTranslation(router.key)(
                      router.component
                    );

                    return (
                      <PrivateRoute
                        key={index}
                        path={router.path}
                        render={(props) => (
                          // <Restricted route={router.key} {...props}><Component useSuspense={true} resource={router.key} {...props} /></Restricted>
                          <Restricted
                            route={router.key}
                            {...props}
                            render={({ permissions, settings }) => (
                              <Component
                                settings={settings}
                                permissions={permissions}
                                resource={router.key}
                                {...props}
                              />
                            )}
                          />
                        )}
                      />
                    );
                  })}
                  <Route
                    path="/permission-denied"
                    render={(props) => <PermissionDenied {...props} />}
                  />
                  <Redirect to={'/farmasi/dashboard'} />
                </Switch>
              </ModuleProvider>
            </Suspense>
          </Layout>
        </AppProvider>
      </QueryClientProvider>
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
}
