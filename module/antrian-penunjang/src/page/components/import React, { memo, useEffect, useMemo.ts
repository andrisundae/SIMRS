import React, { memo, useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import {
  DatatableServerSide,
  useModuleTrans,
  useDatatable,
} from '@simrs/components';
import { useListAntrianPenunjang } from '@simrs/billing/src/fetcher';
import { utils } from '@simrs/common';
import { staticConst } from '../../static';
// import { moduleSelector } from '../../redux/reducer/selector';
// import { ready } from '../../redux/reducer';

const List = ({ innerRef, params }) => {
  const t = useModuleTrans();
  const history = useHistory();
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();
  const { data, isLoading, status } = useListAntrianPenunjang(
    utils.cleanBlankValue(params)
  );

  const [columns] = useState([
    {
      headerName: t('cito'),
      field: 'st_cito',
      cellStyle: { 'background-color': '#f5f7f7' },
      valueFormatter: ({ value }) => {
        return value === 1 ? 'Ya' : 'Tidak';
      },
    },
    {
      headerName: t('tanggal_kunjungan'),
      field: 'tgl_mulai',
      sortable: true,
      cellStyle: { 'text-align': 'center' },
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('asal_pasien'),
      field: 'nama_unit_asal',
    },
    {
      headerName: t('tujuan_tempat_layanan'),
      field: 'nama_unit_layanan',
    },
    {
      headerName: t('no_antrian'),
      field: 'no_antrian',
    },
    {
      headerName: t('norm'),
      field: 'norm',
    },
    {
      headerName: t('nama_pasien'),
      field: 'nama_pasien',
    },
    {
      headerName: t('alamat_desa'),
      field: 'alamat',
    },
    {
      headerName: t('status_pasien'),
      field: 'nama_status_pasien',
    },
    {
      headerName: t('kelas'),
      field: 'nama_kelas',
    },
    {
      headerName: t('isi_permintaan'),
      field: 'permintaan',
    },
    {
      headerName: t('st_penunjang'),
      field: 'st_status_penunjang',
    },
    {
      headerName: t('dokter_tujuan'),
      field: 'nama_dokter_tujuan_penunjang',
    },
  ]);

  const dataSource = useMemo(() => {
    if (!data || status === 'error' || status === 'loading') {
      return emptySource;
    }

    return {
      rowCount: null,
      getRows: (params) => {
        params.successCallback(data, data.length);
      },
    };
  }, [emptySource, data, status]);

  // // Set datasource dari api
  useEffect(() => {
    if (gridApi && data && status === 'success') {
      console.log('sdfdsf');
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi, dataSource, status, data]);

  useEffect(() => {
    if (gridApi) {
      if (isLoading) {
        gridApi.showLoadingOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }
  }, [gridApi, isLoading]);

  const doubleClickRowHandler = useCallback(
    (params) => {
      history.push(
        `/billing/transaksi/penunjang/pemenuhan/${params.data.id}?route=_billing_transaksi_penunjang`
      );
    },
    [history]
  );
  const copyRowHandler = useCallback((gridApi, data) => {
    copy(data.norm);
  }, []);

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_ANTRIAN_PENUNJANG}
      navigateToSelect={true}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      // infiniteInitialRowCount={1}
      cacheBlockSize={100}
      containerHeight="330px"
      getRowNodeId={getRowNodeId}
      sizeColumnsToFit={true}
      onGridReady={onGridReady}
      contextMenuItems={[
        {
          title: 'Copy Norm',
          icon: 'copy outline',
          onClick: copyRowHandler,
        },
      ]}
      onRowDoubleClicked={doubleClickRowHandler}
    />
  );
};

List.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  params: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <List innerRef={ref || innerRef} {...props} />;
});

export default memo(Component, utils.compare);
