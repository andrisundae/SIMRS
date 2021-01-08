import React, { Suspense, useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import PageLoader from '@simrs/components/src/loader/PageLoader';
import { isDesktop } from '@simrs/common/src/helpers/deviceDetector';
import {
  Layout,
  PrivateRoute,
  Restricted,
  PermissionDenied,
  AppProvider,
  ModuleProvider,
} from '@simrs/components';
import apiSettingAplikasi from '@simrs/main/src/services/models/aturanAplikasiModel';
import routers from './routers';

function MobileApp() {
  return (
    <Router>
      <Suspense fallback={<PageLoader active />}>
        <Switch>
          {routers.map((router, index) => {
            const Component = withTranslation(router.key)(router.component);
            return (
              <Route
                path={router.path}
                render={(props) => (
                  <Component resource={router.key} {...props} />
                )}
                key={index}
              />
            );
          })}
          <Redirect to={'/main'} />
        </Switch>
      </Suspense>
    </Router>
  );
}

let DesktopApp;
if (isDesktop) {
  const { store, menu } = require('@simrs/common');

  DesktopApp = () => {
    return (
      <Router>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </Router>
    );
  };

  function AppContent() {
    const location = useLocation();
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
        mounted = false;
      };
    }, []);

    return (
      <Layout
        logo={'REKAM_MEDIS'}
        contexts={menu.getMenuAplikasi(process.env.REACT_APP_KEY)}
        routers={routers}
        username={store.main.get('user.username')}
        footer={{
          actionsPosition:
            -1 < location.pathname.indexOf('master') ? 'left' : 'right',
          className: classNames({
            'h-12': -1 === location.pathname.indexOf('master'),
          }),
        }}
      >
        {loading ? (
          <PageLoader active={true} />
        ) : (
          <Suspense fallback={<PageLoader active={true} />}>
            <ModuleProvider>
              <Switch>
                {routers.map((router, index) => {
                  const Component = withTranslation(router.key)(
                    router.component
                  );
                  // return (
                  //   <Route
                  //     path={router.path}
                  //     render={(props) => (
                  //       <Component resource={router.key} {...props} />
                  //     )}
                  //     key={index}
                  //   />
                  // );
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
                {/* <Route
              path="/permission-denied"
              render={(props) => <PermissionDenied {...props} />}
            /> */}
                {/* <Redirect to={'/main'} /> */}
              </Switch>
            </ModuleProvider>
          </Suspense>
        )}
      </Layout>
    );
  }
}

export default function App() {
  if (isDesktop) {
    return <DesktopApp />;
  }

  return <MobileApp />;
}
