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
const Detail = lazy(() => import('./page/Detail'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  function checkPathname(type) {
    switch (type) {
      case 'add':
        return {
          status:
            '/pemeriksaan-penunjang/add' === location.pathname &&
            'add' === lastPathname,
          path: '/pemeriksaan-penunjang/add',
          component: <Add />,
        };

      case 'detail':
        return {
          status:
            '/pemeriksaan-penunjang/detail' === location.pathname &&
            'detail' === lastPathname,
          path: '/pemeriksaan-penunjang/detail',
          component: <Detail />,
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
          <Index withAdd={true} />
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
