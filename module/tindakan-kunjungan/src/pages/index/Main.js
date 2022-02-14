import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { PageLoader } from '@simrs/components';
import { utils } from '@simrs/common';
import {
  Header as PageHeader,
  Content,
} from '@simrs/main/src/modules/components';

import IdentitasPasien from './containers/IdentitasPasien';
import FormTindakan from './containers/Tindakan';
import List from './containers/List';
import FooterActions from './containers/FooterActions';
import CariKunjungan from './components/CariKunjungan';
import {
  postSelector,
  loaderSelector,
  loaderMessageSelector,
  showCariKunjunganSelector,
  dataSelector,
} from '../index/redux/selector';
import { actions, staticConst } from '../index';
import './assets/css/styles.css';

const Main = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => postSelector(state));
  const isLoading = useSelector((state) => loaderSelector(state));
  const loaderMessage = useSelector((state) => loaderMessageSelector(state));
  const showCariKunjungan = useSelector((state) =>
    showCariKunjunganSelector(state)
  );
  const data = useSelector((state) => dataSelector(state));

  React.useEffect(() => {
    dispatch(actions.openForm(props.resource));
  }, [dispatch, props.resource]);

  const getKey = (key) => {
    return `${props.resource}:${key}`;
  };

  const renderDetailUnitLayanan = () => {
    if (!post.id) {
      return null;
    }

    return (
      <div className="">
        {`${props.t(getKey('jenis_layanan'))} : ${
          post.nama_instalasi
        }, ${props.t(getKey('unit_layanan'))} : ${post.nama_unit_layanan}`}
      </div>
    );
  };
  const renderDetailStatusPasien = () => {
    if (!post.id) {
      return null;
    }

    let desc = '';
    if (post.id_penjamin === staticConst.ID_PENJAMIN_UMUM) {
      desc = `${post.nama_status_pasien}, Kelas RS ${post.nama_kelas}`;
    } else {
      desc = `${post.nama_status_pasien} Hak Kelas ${post.nama_hak_kelas} | Kelas RS ${post.nama_kelas}`;
    }

    return <div className="">{desc}</div>;
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
      <PageHeader title={props.t(getKey('title'))} icon="syringe" />
      <Content>
        <IdentitasPasien {...props} />
        {post.id > 0 && (
          <div className="flex items-center justify-between text-base mt-0 font-semibold">
            {renderDetailUnitLayanan()}
            {renderDetailStatusPasien()}
          </div>
        )}
        <div className="mb-1">
          <List {...props} />
        </div>
        <FormTindakan {...props} />
      </Content>
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
