import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DatatableServerSide, constDatatable } from '@simrs/components';

import { datatableSelector } from '../redux/selector';
import { tableName } from '../../static';
import localActions from '../redux/actions';

const ItemPenerimaan = ({ trans, resource }) => {
  const dispatch = useDispatch();
  const datatables = useSelector(datatableSelector);
  const tableItemPenerimaan = datatables[tableName.ITEM_PENERIMAAN];

  const tableRef = {
    itemPenerimaan: useRef(),
  };

  const gridApiDet = () => {
    return tableRef.itemPenerimaan.current.gridApi;
  };

  const columnDefs = () => {
    return [
      {
        headerName: trans(`header.column.kode_barang`),
        field: 'kode_barang',
        cellRenderer: 'loadingRenderer',
        sortable: false,
        width: 70,
      },
      {
        headerName: trans('header.column.nama_barang'),
        field: 'nama_barang',
        sortable: true,
        width: 200,
      },
      {
        headerName: trans('header.column.jumlah_penerimaan'),
        field: 'jumlah_penerimaan',
        sortable: false,
        width: 110,
      },
    ];
  };

  const reloadDet = (reloadType) => {
    if (reloadType === constDatatable.reloadType.purge) {
      gridApiDet().purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      gridApiDet().refreshInfiniteCache();
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
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
        };

        dispatch(
          localActions.loadItemPenerimaan.request(resource, payload, params)
        );
      },
    };
  };

  useEffect(() => {
    if (tableItemPenerimaan) {
      if (tableItemPenerimaan.isReload) {
        reloadDet(tableItemPenerimaan.reloadType);
      }
    }
  }, [tableItemPenerimaan]);

  return (
    <Fragment>
      <DatatableServerSide
        ref={tableRef.itemPenerimaan}
        columns={columnDefs()}
        name={tableName.ITEM_PENERIMAAN}
        navigateToSelect={true}
        datasource={getDataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={25}
        containerHeight="185px"
        sizeColumnsToFit={true}
      />
    </Fragment>
  );
};

export default ItemPenerimaan;
