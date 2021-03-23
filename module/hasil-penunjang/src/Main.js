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
const IsiHasil = lazy(() => import('./page/IsiHasil'));
const Dokumen = lazy(() => import('./page/Dokumen'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  function checkPathname(type) {
    switch (type) {
      case 'isi-hasil':
        return {
          status:
            '/hasil-penunjang/isi-hasil' === location.pathname &&
            'isi-hasil' === lastPathname,
          path: '/hasil-penunjang/isi-hasil',
          component: <IsiHasil />,
        };

      case 'dokumen':
        return {
          status:
            '/hasil-penunjang/dokumen' === location.pathname &&
            'dokumen' === lastPathname,
          path: '/hasil-penunjang/dokumen',
          component: <Dokumen />,
        };

      default:
        return {
          status: false,
          path: '/',
          component: null,
        };
    }
  }

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
          open={checkPathname(lastPathname).status}
          onClose={() => {
            history.goBack();
          }}
        >
          <Route path={checkPathname(lastPathname).path}>
            {checkPathname(lastPathname).component}
          </Route>
        </Modal>

        {/* </Switch> */}
      </Suspense>
    </Router>
  );
}
