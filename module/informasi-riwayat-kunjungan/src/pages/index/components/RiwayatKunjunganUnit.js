import React from 'react';
import PropTypes from 'prop-types';
import { DatatableServerSide, useModuleTrans } from '@simrs/components';
import { staticConst } from '../static';
import useDatatable from '../hooks/useDatatable';

const RiwayatKunjunganUnit = ({
  dataSource,
  data,
  innerRef,
  onRowSelected,
}) => {
  const t = useModuleTrans();
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();

  const columns = [
    {
      headerName: t('tgl_mulai'),
      field: 'tgl_mulai',
      cellRenderer: 'dateRenderer',
      cellStyle: { 'background-color': '#f5f7f7' },
      cellClass: 'ag-date-cell',
      sortable: true,
    },
    {
      headerName: t('tgl_selesai'),
      field: 'tgl_selesai',
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('unit'),
      field: 'unit',
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
      name={staticConst.TABLE_RIWAYAT_KUNJUNGAN_UNIT}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={10}
      containerHeight="160px"
      getRowNodeId={getRowNodeId}
      autoSizeColumn={true}
      onGridReady={onGridReady}
      onRowSelected={onRowSelected}
    />
  );
};

RiwayatKunjunganUnit.propTypes = {
  data: PropTypes.object,
  dataSource: PropTypes.array,
  innerRef: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => (
  <RiwayatKunjunganUnit innerRef={ref} {...props} />
));

export default React.memo(Component);
