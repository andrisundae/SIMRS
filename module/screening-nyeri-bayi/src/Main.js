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

const Index = lazy(() => import('./page/Index'));
const Add = lazy(() => import('./page/Add'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Router basename="/detail-rekam-medis/umum/pengkajian-khusus/screening-nyeri-bayi">
      <Suspense fallback={<LoaderWithNoDimmer />}>
        {/* <Switch> */}
        <Route path="/">
          <Index />
        </Route>

        <Modal
          closeIcon
          closeOnDimmerClick={false}
          centered={false}
          size="large"
          open={
            '/pengkajian-khusus/screening-nyeri-bayi/add' === location.pathname
          }
          onClose={() => {
            history.goBack();
          }}
        >
          <Route path="/add">
            <Add />
          </Route>
        </Modal>

        {/* </Switch> */}
      </Suspense>
    </Router>
  );
}
