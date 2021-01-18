import React, { Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PageLoader from '@simrs/components/src/loader/PageLoader';
import Footer from '@simrs/components/src/layout/Footer';
import routers from './routers.mobile';

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader active />}>
        <Switch>
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
          <Redirect to={'/main'} />
        </Switch>
      </Suspense>
      <Footer actionsPosition="right" className="h-12" />
    </Router>
  );
}
