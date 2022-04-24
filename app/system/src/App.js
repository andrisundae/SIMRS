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
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let mounted = true;
  //   setLoading(true);
  //   const fetchData = async () => {
  //     const result = await apiSettingAplikasi.getAturanAplikasi();
  //     if (mounted) {
  //       if (result.status) {
  //         setSettings(result.data);
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  //   return () => {
  //     // When cleanup is called, toggle the mounted variable to false
  //     mounted = false;
  //   };
  // }, []);

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
            <Suspense fallback={<PageLoader active={true} />}>
              <ModuleProvider>
                <Switch>
                  <Route path="/billing/dashboard">
                    <Dashboard />
                  </Route>
                  {rootRouters.map((router, index) => {
                    const Component = withTranslation(router.key)(
                      router.component
                    );
                    return (
                      <Route
                        key={index}
                        path={router.path}
                        render={(props) => (
                          <Restricted
                            {...props}
                            route={router.key}
                            render={({ permissions, settings }) => (
                              <Component
                                settings={settings || {}}
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
                  <Route path="/permission-denied">
                    <PermissionDenied />
                  </Route>
                  <Redirect to={'/billing/dashboard'} />
                </Switch>
              </ModuleProvider>
            </Suspense>
          </Layout>
        </AppProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader active={true} />}>
      <Page />
    </Suspense>
  );
}
