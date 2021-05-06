import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DatatableServerSide } from '@simrs/components';

import { tableName } from '../../static';
import localActions from '../redux/actions';

const ItemPemesanan = ({ trans, resource }) => {
  const dispatch = useDispatch();

  let { id } = useParams();

  const tableRef = {
    itemPemesanan: useRef(),
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
        headerName: trans('header.column.jumlah_pesan'),
        field: 'jumlah_pesan',
        sortable: false,
        width: 110,
      },
      {
        headerName: trans('header.column.jumlah_pemenuhan'),
        sortable: true,
        field: 'jumlah_terpenuhi',
      },
    ];
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
          id: id,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
        };

        dispatch(
          localActions.loadItemPemesanan.request(resource, payload, params)
        );
      },
    };
  };

  return (
    <Fragment>
      <DatatableServerSide
        ref={tableRef.itemPemesanan}
        columns={columnDefs()}
        name={tableName.ITEM_PEMESANAN}
        navigateToSelect={true}
        datasource={getDataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={25}
        containerHeight="430px"
        sizeColumnsToFit={true}
      />
    </Fragment>
  );
};

export default ItemPemesanan;
