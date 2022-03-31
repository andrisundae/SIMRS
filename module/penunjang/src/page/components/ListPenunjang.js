import React, { useCallback, memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import {
  DatatableServerSide,
  useModuleTrans,
  constDatatable,
} from '@simrs/components';
import { select as onSelect } from '../pemenuhan/redux/slice';
import { staticConst } from '../../static';

const ListPenunjang = ({
  innerRef,
  unitLayanan,
  statusPenunjang = '',
  data = [],
  loading,
}) => {
  const dispatch = useDispatch();
  const t = useModuleTrans();
  
  const formattedData = useMemo(() => {
    if (_.isEmpty(data)) {
      return [];
    }
    return data.map((row) => {
      return {
        ...row,
        unit_layanan: unitLayanan,
        jumlah: statusPenunjang === staticConst.PERMINTAAN ? 0 : row.jumlah,
      };
    });
  }, [data, statusPenunjang, unitLayanan]);

  const getRowNodeId = useCallback((row) => row.id, []);

  const columns = [
    {
      headerName: t('tanggal'),
      field: 'tgl',
      sortable: true,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('unit_layanan'),
      field: 'unit_layanan',
    },
    {
      headerName: t('nama_layanan'),
      field: 'nama_layanan',
    },
    {
      headerName: t('kelas'),
      field: 'kelas',
    },
    {
      headerName: t('pelaksana'),
      field: 'pelaksana',
    },
    {
      headerName: t('tarif'),
      field: 'tarif',
      cellRenderer: 'currencyRenderer',
      cellClass: 'ag-number-cell',
    },
    {
      headerName: t('jumlah'),
      field: 'jumlah',
    },
    {
      headerName: t('total_biaya'),
      field: 'total_biaya',
      cellRenderer: 'currencyRenderer',
      cellClass: 'ag-number-cell',
    },
    {
      headerName: t('petugas'),
      field: 'petugas',
    },
  ];

  useEffect(() => {
    if (innerRef.current) {
      if (loading) {
        innerRef.current?.gridApi?.showLoadingOverlay();
      } else {
        innerRef.current?.gridApi?.hideOverlay();
      }
    }
  }, [loading, innerRef]);

  useEffect(() => {
    if (innerRef.current) {
      if (!loading && _.isEmpty(data)) {
        innerRef.current?.gridApi?.showNoRowsOverlay();
      } else {
        if (!loading) {
          innerRef.current?.gridApi?.hideOverlay();
        }
      }
    }
  }, [data, loading, innerRef]);

  const rowSelectedHandler = useCallback(
    (params) => {
      if (params.node.isSelected()) {
        dispatch(onSelect(params.data));
      }
    },
    [dispatch]
  );

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_PENUNJANG}
      navigateToSelect={true}
      cacheBlockSize={100}
      containerHeight="200px"
      getRowNodeId={getRowNodeId}
      sizeColumnsToFit={true}
      rowModelType={constDatatable.rowModelType.clientSide}
      rowData={formattedData}
      onRowSelected={rowSelectedHandler}
    />
  );
};

ListPenunjang.propTypes = {
  innerRef: PropTypes.object,
  idKunjunganUnit: PropTypes.string,
  loading: PropTypes.bool,
  unitLayanan: PropTypes.string,
  kelas: PropTypes.string,
  statusPenunjang: PropTypes.string,
  data: PropTypes.array,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <ListPenunjang innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
