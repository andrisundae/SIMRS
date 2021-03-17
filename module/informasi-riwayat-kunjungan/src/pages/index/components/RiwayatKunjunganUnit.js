import React from 'react';
import PropTypes from 'prop-types';
import { DatatableServerSide, useModuleTrans } from '@simrs/components';
import { staticConst } from '../static';

const RiwayatKunjunganUnit = ({ dataSource, data, innerRef }) => {
  const t = useModuleTrans();

  const columns = [
    {
      headerName: t('tgl_mulai'),
      field: 'nama_komponen',
      cellRenderer: 'loadingRenderer',
      sortable: true,
    },
    {
      headerName: t('tgl_selesai'),
      field: 'keterangan',
      sortable: true,
    },
    {
      headerName: t('unit'),
      field: 'keterangan',
      sortable: true,
    },
    {
      headerName: t('total_biaya'),
      field: 'keterangan',
      sortable: true,
    },
    {
      headerName: t('petugas_input'),
      field: 'keterangan',
      sortable: true,
    },
  ];

  const getRowNodeId = (row) => row.id;

  React.useEffect(() => {
    if (innerRef.current) {
      const gridApi = innerRef.current.gridApi;
      if (gridApi) {
        gridApi.setDatasource({
          rowCount: null,
          getRows: (res) => res.successCallback(dataSource, dataSource.length),
        });
      }
    }
  }, [dataSource, innerRef]);

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
    />
  );
};

RiwayatKunjunganUnit.propTypes = {
  data: PropTypes.object,
  dataSource: PropTypes.array,
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => (
  <RiwayatKunjunganUnit innerRef={ref} {...props} />
));

export default React.memo(Component);
