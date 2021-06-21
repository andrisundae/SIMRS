import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse } from 'querystring';
import { isEqual } from 'lodash';

import { PageLoader } from '@simrs/components';
import { usePermissions } from '@simrs/billing/src/fetcher';
import { useModuleAction } from './provider';

const Restriced = ({ role, route, location, render }) => {
  const { setPermissions } = useModuleAction();
  const currentRoute = React.useMemo(() => {
    const params = parse(location.search.substr(1));
    return params.route ? params.route : '_billing_master';
  }, [location]);
  const { data: permissions, isLoading } = usePermissions({
    route: route || currentRoute,
  });

  const isGranted = React.useMemo(() => {
    if (!permissions) {
      return false;
    }
    return permissions.find((permission) => permission === role);
  }, [permissions, role]);

  React.useEffect(() => {
    if (permissions && isGranted && !isLoading) {
      setPermissions(permissions);
    }
  }, [permissions, isGranted, isLoading, setPermissions]);

  if (isLoading) {
    return <PageLoader active={true} />;
  }

  if (isGranted) {
    return render(permissions);
  }

  return <Redirect to="/permission-denied" />;
};

Restriced.propTypes = {
  route: PropTypes.string,
  role: PropTypes.string,
  children: PropTypes.node,
  location: PropTypes.object,
};

Restriced.defaultProps = {
  role: 'view',
};

export default React.memo(Restriced, isEqual);
