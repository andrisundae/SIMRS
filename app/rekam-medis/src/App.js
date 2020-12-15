import React, { Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PageLoader from '@simrs/components/src/loader/PageLoader';
import routers from './routers';

export default function App() {
  return (
    <div className="pt-32">
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
    </div>
  );
}
