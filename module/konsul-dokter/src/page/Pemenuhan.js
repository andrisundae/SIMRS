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

const Index = lazy(() => import('../component/pemenuhan/Index'));
const IsiHasil = lazy(() => import('../component/pemenuhan/IsiHasil'));
const HasilKonsul = lazy(() => import('../component/pemenuhan/HasilKonsul'));

export default function Permintaan() {
  const history = useHistory();
  const location = useLocation();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  function checkPathname(type) {
    switch (type) {
      case 'isi-hasil':
        return {
          status:
            '/konsul-dokter/pemenuhan/isi-hasil' === location.pathname &&
            'isi-hasil' === lastPathname,
          component: <IsiHasil />,
        };

      case 'hasil-konsul':
        return {
          status:
            '/konsul-dokter/pemenuhan/hasil-konsul' === location.pathname &&
            'hasil-konsul' === lastPathname,
          component: <HasilKonsul />,
        };

      default:
        return {
          status: false,
          component: null,
        };
    }
  }

  return (
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
        open={checkPathname(lastPathname).status}
        onClose={() => {
          history.goBack();
        }}
      >
        <Route path="/konsul-dokter/pemenuhan/isi-hasil">
          {checkPathname(lastPathname).component}
        </Route>
        <Route path="/konsul-dokter/pemenuhan/hasil-konsul">
          {checkPathname(lastPathname).component}
        </Route>
      </Modal>

      {/* </Switch> */}
    </Suspense>
  );
}
