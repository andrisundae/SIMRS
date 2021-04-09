import React from 'react';
import PropTypes from 'prop-types';
import { DatatableServerSide, useModuleTrans } from '@simrs/components';
import { staticConst } from '../static';
import useDatatable from '../hooks/useDatatable';

const RiwayatKunjunganUnitDetail = ({ dataSource, data, innerRef }) => {
  const t = useModuleTrans();
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();

  const columns = [
    {
      headerName: t('tanggal'),
      field: 'tanggal',
      cellRenderer: 'dateRenderer',
      cellStyle: { 'background-color': '#f5f7f7' },
      cellClass: 'ag-date-cell',
      sortable: true,
    },
    {
      headerName: t('kelompok'),
      field: 'kelompok',
      sortable: true,
    },
    {
      headerName: t('layanan'),
      field: 'layanan',
      sortable: true,
    },
    {
      headerName: t('kelas'),
      field: 'kelas',
      sortable: true,
    },
    {
      headerName: t('pelaksana'),
      field: 'pelaksana',
      sortable: true,
    },
    {
      headerName: t('jumlah'),
      field: 'jumlah',
      cellRenderer: 'currencyRenderer',
      sortable: true,
    },
    {
      headerName: t('harga'),
      field: 'harga',
      cellRenderer: 'currencyRenderer',
      sortable: true,
    },
    {
      headerName: t('total_biaya'),
      field: 'total_biaya',
      cellRenderer: 'currencyRenderer',
      sortable: true,
    },
    {
      headerName: t('petugas_input'),
      field: 'petugas_input',
      sortable: true,
    },
  ];

  React.useEffect(() => {
    if (gridApi && data.id) {
      gridApi.setDatasource(dataSource);
    } else if (gridApi && !data.id) {
      gridApi.setDatasource(emptySource);
    }
  }, [data.id, gridApi, dataSource, emptySource]);

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_RIWAYAT_KUNJUNGAN_UNIT_DETAIL}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={10}
      containerHeight="160px"
      getRowNodeId={getRowNodeId}
      autoSizeColumn={true}
      onGridReady={onGridReady}
    />
  );
};

RiwayatKunjunganUnitDetail.propTypes = {
  data: PropTypes.object,
  dataSource: PropTypes.array,
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => (
  <RiwayatKunjunganUnitDetail innerRef={ref} {...props} />
));

export default React.memo(Component);
