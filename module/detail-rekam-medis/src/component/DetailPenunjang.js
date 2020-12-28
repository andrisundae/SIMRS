import React, { Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import LoaderWithNoDimmer from '@simrs/rekam-medis/src/component/LoaderWithNoDimmer';
import routers from '../routers';
import PemeriksaanPenunjang from './PemeriksaanPenunjang';

export default function DetailUmum() {
  return (
    <Router basename="/detail-rekam-medis/umum">
      <Suspense fallback={<LoaderWithNoDimmer />}>
        <Switch>
          <Route path="/" exact>
            <PemeriksaanPenunjang />
          </Route>
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
          <Redirect to={'/'} />
        </Switch>
      </Suspense>
    </Router>
  );
}
