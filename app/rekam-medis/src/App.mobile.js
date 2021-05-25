import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PageLoader from '@simrs/components/src/loader/PageLoader';
import Footer from '@simrs/components/src/layout/Footer';
import routers from './routers.mobile';

const Init = lazy(() => import('./page/Init'));
const SetApiUrl = lazy(() => import('./page/SetApiUrl'));
const Login = lazy(() => import('./page/Login'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader active />}>
        <Switch>
          <Route path="/" exact render={(props) => <Init {...props} />} />
          <Route
            path="/set-api-url"
            render={(props) => <SetApiUrl {...props} />}
          />
          <Route path="/login" render={(props) => <Login {...props} />} />
          {routers.map((router, index) => {
            const Component = router.component;
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
        </Switch>
      </Suspense>
      <Footer actionsPosition="right" className="h-12" />
    </Router>
  );
}
