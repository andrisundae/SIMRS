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

const Index = lazy(() => import('../component/permintaan/Index'));
const Add = lazy(() => import('../component/permintaan/Add'));

export default function Permintaan() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Router>
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
            '/kerja-sama-medis/alih-dpjp/permintaan/add' === location.pathname
          }
          onClose={() => {
            history.goBack();
          }}
        >
          <Route path="/kerja-sama-medis/alih-dpjp/permintaan/add">
            <Add />
          </Route>
        </Modal>

        {/* </Switch> */}
      </Suspense>
    </Router>
  );
}
