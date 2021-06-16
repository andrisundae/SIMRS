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
const Add = lazy(() => import('./page/Add'));

export default function Main(props) {
  const history = useHistory();
  const location = useLocation();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  function checkPathname(type) {
    switch (type) {
      case 'add':
        return {
          status:
            ('/dokumen/add' === location.pathname && 'add' === lastPathname) ||
            ('/antrian/pasien-pulang/dokumen-klaim/add' === location.pathname &&
              'add' === lastPathname),
          path: location.pathname,
          component: <Add />,
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
    <Suspense fallback={<LoaderWithNoDimmer />}>
      {/* <Switch> */}
      <Route path="/">
        <Index {...props} />
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
  );
}
