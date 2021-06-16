import React, { Suspense, useState, useEffect } from 'react';
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
import apiSettingAplikasi from '@simrs/main/src/services/models/aturanAplikasiModel';

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
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const fetchData = async () => {
      const result = await apiSettingAplikasi.getAturanAplikasi();
      if (mounted) {
        if (result.status) {
          setSettings(result.data);
        }
      }
      setLoading(false);
    };
    fetchData();
    return () => {
      // When cleanup is called, toggle the mounted variable to false
      mounted = false;
    };
  }, []);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Layout
            logo={'BILLING'}
            contexts={menu.getMenuAplikasi(process.env.REACT_APP_KEY)}
            routers={rootRouters}
            username={store.main.get('user.username')}
          >
            {loading ? (
              <PageLoader active={true} />
            ) : (
              <Suspense fallback={<PageLoader active={true} />}>
                <ModuleProvider>
                  <Switch>
                    <PrivateRoute
                      path="/billing/dashboard"
                      render={_renderDashboard}
                    />
                    {rootRouters.map((router, index) => {
                      const Component = withTranslation(router.key)(
                        router.component
                      );
                      return (
                        <PrivateRoute
                          key={index}
                          path={router.path}
                          render={(props) => (
                            <Restricted
                              {...props}
                              route={router.key}
                              render={(permissions) => (
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
                    <Redirect to={'/billing/dashboard'} />
                  </Switch>
                </ModuleProvider>
              </Suspense>
            )}
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
