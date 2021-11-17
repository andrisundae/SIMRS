import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// import { Segment, Header, Grid, Icon } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import {
  Header as PageHeader,
  Content,
} from '@simrs/main/src/modules/components';

import FormDetailPasien from './containers/DetailPasien';
import FooterActions from './containers/FooterActions';
import { loaderSelector, loaderMessageSelector } from '../index/redux/selector';
import { actions } from '../index';
// import './assets/css/styles.css';

const Main = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderSelector);
  const loaderMessage = useSelector(loaderMessageSelector);

  React.useEffect(() => {
    dispatch(actions.openForm(props.resource));
  }, []);

  const getKey = (key) => {
    return `${props.resource}:${key}`;
  };

  return (
    <Fragment>
      <PageHeader title={props.t(getKey('title'))} icon="user" />
      <Content>
        <FormDetailPasien {...props} />
      </Content>
      <PageLoader active={isLoading} message={loaderMessage} />
      <FooterActions {...props} />
    </Fragment>
  );
};

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Main;
