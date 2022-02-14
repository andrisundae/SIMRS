import React, { useCallback, memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  DatatableServerSide,
  useModuleTrans,
  useDatatable,
} from '@simrs/components';
import { useListAntrianPenunjang } from '@simrs/billing/src/fetcher';
import { staticConst } from '../../static';
// import { moduleSelector } from '../../redux/reducer/selector';
// import { ready } from '../../redux/reducer';

const List = ({ innerRef }) => {
  const t = useModuleTrans();
  // const { id_kunjungan_unit: idKunjunganUnit } = useSelector(
  //   selectedKunjunganSelector
  // );
  // const {statusForm, selectedKunjungan: {id_kunjungan_unit: idKunjunganUnit}} = useSelector(moduleSelector);
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();
  const { data, isLoading, status } = useListAntrianPenunjang();

  const columns = [
    {
      headerName: t('cito'),
      field: 'cito',
    },
    {
      headerName: t('tanggal_kunjungan'),
      field: 'tanggal_kunjungan',
      sortable: true,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('asal_pasien'),
      field: 'asal_pasien',
    },
    {
      headerName: t('tujuan_tempat_layanan'),
      field: 'tujuan_tempat_layanan',
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
      field: 'status_pasien',
    },
    {
      headerName: t('kelas'),
      field: 'kelas',
    },
    {
      headerName: t('isi_permintaan'),
      field: 'permintaan',
    },
    {
      headerName: t('st_penunjang'),
      field: 'st_penunjang',
    },
    {
      headerName: t('dokter_tujuan'),
      field: 'dokter_tujuan',
    },
  ];

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

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_ANTRIAN_PENUNJANG}
      navigateToSelect={true}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={100}
      containerHeight="330px"
      getRowNodeId={getRowNodeId}
      sizeColumnsToFit={true}
      onGridReady={onGridReady}
    />
  );
};

List.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <List innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
