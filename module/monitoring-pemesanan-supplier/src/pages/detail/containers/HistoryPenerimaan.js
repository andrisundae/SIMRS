import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DatatableServerSide } from '@simrs/components';

import useDebounce from '../use-debounce';
import { tableName } from '../../static';
import localActions from '../redux/actions';

const HistoryPenerimaan = ({ trans, resource }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');

  let { id } = useParams();

  const tableRef = {
    historyPenerimaan: useRef(),
  };

  const itemPenerimaan = useDebounce(data, 1000);

  const columnDefs = () => {
    return [
      {
        headerName: trans(`header.column.no_penerimaan`),
        field: 'nomor_transaksi',
        cellRenderer: 'loadingRenderer',
        sortable: false,
        width: 70,
      },
      {
        headerName: trans('header.column.tgl_penerimaan'),
        field: 'tanggal',
        sortable: true,
        cellStyle: { 'text-align': 'center' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
        width: 110,
      },
      {
        headerName: trans('header.column.no_faktur'),
        field: 'nomor_faktur',
        sortable: false,
        width: 110,
      },
      {
        headerName: trans('header.column.tgl_faktur'),
        field: 'tanggal_faktur',
        sortable: true,
        cellStyle: { 'text-align': 'center' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
        width: 110,
      },
      {
        headerName: trans('header.column.petugas'),
        sortable: true,
        field: 'nama_petugas',
      },
    ];
  };

  useEffect(() => {
    if (itemPenerimaan) {
      dispatch(localActions.onSelectItem(resource, { itemPenerimaan }));
    }
  }, [itemPenerimaan]);

  const onSelectedRow = (row) => {
    if (row.node.isSelected()) {
      setData(row.data);
    }
  };

  const getDataSource = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};

        let payload = {
          length: 25,
          start: params.startRow,
          id_pemesanan: id,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
        };

        dispatch(
          localActions.loadPenerimaan.request(resource, payload, params)
        );
      },
    };
  };

  return (
    <Fragment>
      <DatatableServerSide
        ref={tableRef.historyPenerimaan}
        columns={columnDefs()}
        name={tableName.PENERIMAAN}
        navigateToSelect={true}
        datasource={getDataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        onRowSelected={onSelectedRow}
        cacheBlockSize={25}
        containerHeight="185px"
        sizeColumnsToFit={true}
      />
    </Fragment>
  );
};

export default HistoryPenerimaan;
