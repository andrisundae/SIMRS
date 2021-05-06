import React from 'react';
import PropTypes from 'prop-types';
import { DatatableServerSide, useModuleTrans } from '@simrs/components';
import { staticConst } from '../static';
import useDatatable from '../hooks/useDatatable';

const RiwayatKunjungan = ({ innerRef, data, dataSource, onRowSelected }) => {
  const t = useModuleTrans();
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();

  const columns = [
    {
      headerName: t('tgl_mrs'),
      field: 'tgl_mrs',
      cellRenderer: 'dateRenderer',
      cellStyle: { 'background-color': '#f5f7f7' },
      cellClass: 'ag-date-cell',
      sortable: true,
    },
    {
      headerName: t('tgl_krs'),
      field: 'tgl_krs',
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
      sortable: true,
    },
    {
      headerName: t('unit'),
      field: 'unit',
      sortable: true,
    },
    {
      headerName: t('penjamin'),
      field: 'penjamin',
      sortable: true,
    },
    {
      headerName: t('pulang'),
      field: 'st_pulang',
    },
    {
      headerName: t('petugas_pulang'),
      field: 'petugas_pulang',
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
      name={staticConst.TABLE_RIWAYAT_KUNJUNGAN}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={10}
      containerHeight="160px"
      getRowNodeId={getRowNodeId}
      autoSizeColumn={true}
      onGridReady={onGridReady}
      onRowSelected={onRowSelected}
      // navigateToSelect={true}
    />
  );
};

RiwayatKunjungan.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <RiwayatKunjungan innerRef={ref || innerRef} {...props} />;
});

export default React.memo(Component);
