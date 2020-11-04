import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Header, Grid, Icon } from 'semantic-ui-react';

import { PageLoader } from '@simrs/components';
import { utils } from '@simrs/common';

import IdentitasPasien from './containers/IdentitasPasien';
import FormTindakan from './containers/Tindakan';
import List from './containers/List';
import FooterActions from './containers/FooterActions';
import CariKunjungan from './components/CariKunjungan';
import {
  postSelector, loaderSelector, loaderMessageSelector,
  showCariKunjunganSelector, dataSelector
} from '../index/redux/selector';
import { actions, staticConst } from '../index';
import './assets/css/styles.css';

const Main = (props) => {
  const dispatch = useDispatch();
  const post = useSelector(state => postSelector(state));
  const isLoading = useSelector(state => loaderSelector(state));
  const loaderMessage = useSelector(state => loaderMessageSelector(state));
  const showCariKunjungan = useSelector(state => showCariKunjunganSelector(state));
  const data = useSelector(state => dataSelector(state));

  React.useEffect(() => {
    dispatch(actions.openForm(props.resource));
  }, []);

  const getKey = (key) => {
    return `${props.resource}:${key}`;
  }

  const renderDetailUnitLayanan = () => {
    if (!post.id) {
      return null;
    }

    return (
      <Header as="h5">
        {`${props.t(getKey('jenis_layanan'))} : ${post.nama_instalasi}, ${props.t(getKey('unit_layanan'))} : ${post.nama_unit_layanan}`}
      </Header>
    )
  };
  const renderDetailStatusPasien = () => {
    if (!post.id) {
      return null;
    }

    let desc = '';
    if (post.id_penjamin === staticConst.ID_PENJAMIN_UMUM) {
      desc = `Pasien ${post.nama_status_pasien}, Kelas Rumah Sakit ${post.nama_kelas}`;
    } else {
      desc = `Pasien ${post.nama_status_pasien} ${post.nama_hak_kelas}, Kelas Rumah Sakit ${post.nama_kelas}`;
    }

    return (
      <Header as="h5">{desc}</Header>
    )
  };
  const hideKunjunganHandler = () => dispatch(actions.cancelSelectedKunjungan(props.resource));
  const selectKunjunganHandler = (data) => dispatch(actions.onSelectKunjungan(props.resource, data));
  const dataSourceKunjungan = React.useMemo(() => {
    return {
      rowCount: null,
      getRows: (params) => {
        const dataAfterSorting = utils.sortData(params.sortModel, data.kunjungan);
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
          <Icon name="list" />
          {props.t(getKey('title'))}
        </Header>
      </Segment>
      <Segment style={{ backgroundColor: '#ECECEC', paddingTop: 6, paddingBottom: 0 }}>
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <IdentitasPasien {...props} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ top: -20 }}>
            <Grid.Column>
              <List {...props} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ top: -34 }}>
            <Grid.Column width={8} floated="left">
              {renderDetailStatusPasien()}
            </Grid.Column>
            <Grid.Column width={8} floated="right" textAlign="right">
              {renderDetailUnitLayanan()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ top: -48 }}>
            <Grid.Column>
              <FormTindakan {...props} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <PageLoader
        active={isLoading}
        message={loaderMessage}
      />
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
  )
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Main;
