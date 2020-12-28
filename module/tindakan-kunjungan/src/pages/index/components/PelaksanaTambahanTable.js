import React from 'react';
// import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {
  DatatableServerSide,
  constDatatable,
  useModuleTrans,
} from '@simrs/components';
import { staticConst } from '../static';

const PelaksanaTambahanTable = ({
  disabled,
  dataSource,
  onRowSelected,
  innerRef,
}) => {
  const trans = useModuleTrans();

  const columns = [
    {
      headerName: trans('pelaksana'),
      field: 'nama_pelaksana',
      cellRenderer: 'loadingRenderer',
      sortable: true,
    },
    {
      headerName: trans('spesialisasi'),
      field: 'nama_spesialisasi',
      sortable: true,
    },
    {
      headerName: trans('status'),
      field: 'st_utama',
      valueFormatter: ({ value }) => {
        if (value === 1) {
          return trans('utama');
        } else if (value === 0) {
          return trans('sekunder');
        }

        return '';
      },
    },
  ];

  const getRowNodeId = (row) => row.id;

  const rowSelectedHandler = (params) => {
    if (params.node.isSelected()) {
      onRowSelected(params.data);
    }
  };

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_PELAKSANA_TAMBAHAN}
      navigateToSelect={!disabled}
      datasource={dataSource()}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={10}
      containerHeight="160px"
      getRowNodeId={getRowNodeId}
      disabled={disabled}
      suppressRowClickSelection={disabled}
      suppressCellSelection={disabled}
      onRowSelected={rowSelectedHandler}
    />
  );
};

PelaksanaTambahanTable.propTypes = {
  disabled: PropTypes.bool,
  dataSource: PropTypes.func,
  onRowSelected: PropTypes.func,
  innerRef: PropTypes.object,
};

export default React.forwardRef((props, ref) => (
  <PelaksanaTambahanTable innerRef={ref} {...props} />
));
