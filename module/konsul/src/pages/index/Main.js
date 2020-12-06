import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Header, Grid, Icon } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import { utils } from '@simrs/common';

import IdentitasPasien from './containers/IdentitasPasien';
import FormKonsul from './containers/Konsul';
import FooterActions from './containers/FooterActions';
import CariKunjungan from './components/CariKunjungan';
import {
  loaderSelector,
  loaderMessageSelector,
  showCariKunjunganSelector,
  dataSelector,
} from '../index/redux/selector';
import { actions } from '../index';
import './assets/css/styles.css';

const Main = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loaderSelector);
  const loaderMessage = useSelector(loaderMessageSelector);
  const showCariKunjungan = useSelector(showCariKunjunganSelector);
  const data = useSelector(dataSelector);

  React.useEffect(() => {
    dispatch(actions.openForm(props.resource));
  }, []);

  const getKey = (key) => {
    return `${props.resource}:${key}`;
  };
  const hideKunjunganHandler = () =>
    dispatch(actions.cancelSelectedKunjungan(props.resource));
  const selectKunjunganHandler = (data) =>
    dispatch(actions.onSelectKunjungan(props.resource, data));
  const dataSourceKunjungan = React.useMemo(() => {
    return {
      rowCount: null,
      getRows: (params) => {
        const dataAfterSorting = utils.sortData(
          params.sortModel,
          data.kunjungan
        );
        const rowsThisPage = dataAfterSorting.slice(
          params.startRow,
          params.endRow
        );
        let lastRow = -1;
        if (dataAfterSorting.length <= params.endRow) {
          lastRow = dataAfterSorting.length;
        }
        params.successCallback(rowsThisPage, lastRow);
      },
    };
  }, [data.kunjungan]);

  return (
    <Fragment>
      <Segment secondary className="content-header">
        <Header as="h4">
          <Icon name="accessible" />
          {props.t(getKey('title'))}
        </Header>
      </Segment>
      <Segment style={{ backgroundColor: '#ECECEC' }}>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <IdentitasPasien {...props} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ top: -15 }}>
            <Grid.Column>
              <FormKonsul {...props} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <PageLoader active={isLoading} message={loaderMessage} />
      {showCariKunjungan && (
        <CariKunjungan
          t={props.t}
          show={showCariKunjungan}
          onHide={hideKunjunganHandler}
          dataSource={dataSourceKunjungan}
          onSelect={selectKunjunganHandler}
          resource={props.resource}
        />
      )}
      <FooterActions {...props} />
    </Fragment>
  );
};

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Main;
