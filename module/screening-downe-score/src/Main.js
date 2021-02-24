import React, { lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import _ from 'lodash';
import LoaderWithNoDimmer from '@simrs/rekam-medis/src/component/LoaderWithNoDimmer';

const Index = lazy(() => import('./page/Index'));
const Add = lazy(() => import('./page/Add'));
const UbahKelahiran = lazy(() => import('./page/UbahKelahiran'));
const AddRiwayat = lazy(() => import('./page/AddRiwayat'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  function checkPathname(type) {
    switch (type) {
      case 'add':
        return {
          status:
            '/pengkajian-khusus/screening-downe-score/add' ===
              location.pathname && 'add' === lastPathname,
          path: '/add',
          component: <Add />,
        };

      case 'ubah-kelahiran':
        return {
          status:
            '/pengkajian-khusus/screening-downe-score/ubah-kelahiran' ===
              location.pathname && 'ubah-kelahiran' === lastPathname,
          path: '/ubah-kelahiran',
          component: <UbahKelahiran />,
        };

      case 'add-riwayat':
        return {
          status:
            '/pengkajian-khusus/screening-downe-score/add-riwayat' ===
              location.pathname && 'add-riwayat' === lastPathname,
          path: '/add-riwayat',
          component: <AddRiwayat />,
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
    <Router basename="/detail-rekam-medis/umum/pengkajian-khusus/screening-downe-score">
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
