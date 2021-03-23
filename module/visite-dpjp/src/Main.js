import React, { lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import LoaderWithNoDimmer from '@simrs/rekam-medis/src/component/LoaderWithNoDimmer';
import _ from 'lodash';

const Index = lazy(() => import('./page/Index'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Router>
      <Suspense fallback={<LoaderWithNoDimmer />}>
        {/* <Switch> */}
        <Route path="/">
          <Index />
        </Route>
        {/* </Switch> */}
      </Suspense>
    </Router>
  );
}
