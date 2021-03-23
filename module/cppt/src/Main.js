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
const Previous = lazy(() => import('./page/Previous'));
const Verified = lazy(() => import('./page/Verified'));
const Rangkaian = lazy(() => import('./page/Rangkaian'));

export default function Main() {
  const history = useHistory();
  const location = useLocation();
  const lastPathname = _.last(_.split(location.pathname, '/'));

  function checkPathname(type) {
    switch (type) {
      case 'add':
        return {
          status: '/cppt/add' === location.pathname && 'add' === lastPathname,
          path: '/cppt/add',
          component: <Add />,
        };

      case 'previous':
        return {
          status:
            '/cppt/previous' === location.pathname &&
            'previous' === lastPathname,
          path: '/cppt/previous',
          component: <Previous />,
        };

      case 'verified':
        return {
          status:
            '/cppt/verified' === location.pathname &&
            'verified' === lastPathname,
          path: '/cppt/verified',
          component: <Verified />,
        };

      case 'rangkaian':
        return {
          status:
            '/cppt/rangkaian' === location.pathname &&
            'rangkaian' === lastPathname,
          path: '/cppt/rangkaian',
          component: <Rangkaian />,
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
          size="fullscreen"
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
