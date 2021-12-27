import React, { useCallback, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  DatatableServerSide,
  useModuleTrans,
  useDatatable,
} from '@simrs/components';
import { staticConst } from '../../static';
// import { moduleSelector } from '../../redux/reducer/selector';
import { ready } from '../../redux/reducer';
import { useInformasiIndex } from '@simrs/farmasi/src/fetcher';

const DataList = ({ innerRef }) => {
  const t = useModuleTrans();

  // const {
  //   statusForm,
  //   selectedKunjungan: { id_kunjungan_unit: idKunjunganUnit },
  // } = useSelector(moduleSelector);
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();
  const { data: informasiPemakaian, isLoading, status } = useInformasiIndex({});

  const columns = [
    {
      headerName: t('No.'),
      field: 'ruangan',
    },
    {
      headerName: t('Kode Barang'),
      field: 'ruangan',
    },
    {
      headerName: t('Nama Barang'),
      field: 'kelas',
    },
    {
      headerName: t('Jumlah Pakai'),
      field: 'dpjp',
    },
    {
      headerName: t('Satuan Barang'),
      field: 'tarif',
      cellRenderer: 'currencyRenderer',
      cellClass: 'ag-number-cell',
    },
    {
      headerName: t('Keterangan'),
      field: 'hp',
    },
  ];

  const dataSource = useCallback(
    (informasiPemakaian) => {
      if (!informasiPemakaian || status === 'error' || status === 'loading') {
        return emptySource;
      }

      return {
        rowCount: null,
        getRows: (params) => {
          params.successCallback(informasiPemakaian, informasiPemakaian.length);
        },
      };
    },
    [emptySource, informasiPemakaian, status]
  );

  // Set datasource dari api
  // useEffect(() => {
  //   if (gridApi && idKunjunganUnit && status === 'success') {
  //     gridApi.setDatasource(dataSource(informasiPemakaian));
  //   }
  // }, [gridApi, dataSource, status, idKunjunganUnit]);

  // Reset datasource karena selesai
  // useEffect(() => {
  //   if (!idKunjunganUnit && statusForm === ready.type && gridApi) {
  //     gridApi.setDatasource(dataSource());
  //   }
  // }, [statusForm, ready, idKunjunganUnit]);

  // Reset datasource karena selesai
  useEffect(() => {
    if (gridApi) {
      if (isLoading) {
        gridApi.showLoadingOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }
  }, [isLoading]);

  return (
    <DatatableServerSide
      dataSource={emptySource}
      ref={innerRef}
      columns={columns}
      name={staticConst.DATA_LIST}
      navigateToSelect={true}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={100}
      containerHeight="200px"
      getRowNodeId={getRowNodeId}
      sizeColumnsToFit={true}
      // onRowDoubleClicked={this.onRowDoubleClickHandler}
      // onRowEntered={this.onRowEnteredHandler}
      onGridReady={onGridReady}
    />
  );
};

DataList.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <DataList innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
