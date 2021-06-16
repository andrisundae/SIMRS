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
const Dokumen = lazy(() => import('./page/Dokumen'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Suspense fallback={<LoaderWithNoDimmer />}>
      {/* <Switch> */}
      <Route path="/antrian/pasien-pulang">
        <Index />
      </Route>
      <Route path="/antrian/pasien-pulang/dokumen-klaim">
        <Dokumen />
      </Route>
      {/* </Switch> */}
    </Suspense>
  );
}
