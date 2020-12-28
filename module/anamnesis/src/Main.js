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
const Detail = lazy(() => import('./page/Detail'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Router basename="/detail-rekam-medis/umum/anamnesis">
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
          open={'/anamnesis/detail' === location.pathname}
          onClose={() => {
            history.goBack();
          }}
        >
          <Route path="/detail">
            <Detail />
          </Route>
        </Modal>

        <Modal
          closeIcon
          closeOnDimmerClick={false}
          centered={false}
          size="fullscreen"
          open={'/anamnesis/add' === location.pathname}
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
