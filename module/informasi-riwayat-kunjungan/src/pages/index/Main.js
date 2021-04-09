import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';

import RiwayatKunjungan from './containers/RiwayatKunjungan';
import FooterActions from './containers/FooterActions';
import Header from './components/Header';
import IdentitasPasien from './containers/IdentitasPasien';
import Summary from './containers/Summary';
import { loaderSelector, loaderMessageSelector } from '../index/redux/selector';
import { actions } from '../index';
import './assets/css/styles.css';

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
      <Segment secondary className="content-header">
        <Header title={props.t(getKey('title'))} />
      </Segment>
      <Segment style={{ backgroundColor: '#ECECEC' }}>
        <Grid className="content-grid riwayat-kunjungan">
          <Grid.Row>
            <Grid.Column>
              <IdentitasPasien />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <RiwayatKunjungan />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: -11 }}>
            <Grid.Column>
              <Summary />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ height: 30 }} />
        </Grid>
      </Segment>
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
