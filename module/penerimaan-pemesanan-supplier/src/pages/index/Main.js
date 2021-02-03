import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useModuleTrans } from '@simrs/components';
import { currency } from '@simrs/common/src/utils';

import {
  loaderSelector,
  loaderMessageSelector,
  focusElementMaster,
  focusElementDetail,
  dataItemDetail,
} from '../index/redux/selector';

import { tableName } from '../static';

import {
  Main as Module,
  DetailList,
} from '@simrs/main/src/modules/transaksi/farmasi';

import MasterForm from './containers/MasterForm';
import DetailForm from './containers/DetailForm';

const Main = (props) => {
  const trans = useModuleTrans();
  const isLoading = useSelector(loaderSelector);
  const loaderMessage = useSelector(loaderMessageSelector);
  const focusElMaster = useSelector(focusElementMaster);
  const focusDetail = useSelector(focusElementDetail);
  const dataItem = useSelector(dataItemDetail);

  const [faktur, setFaktur] = useState(0);

  React.useEffect(() => {
    let totalFaktur = 0;

    dataItem.forEach((item) => {
      totalFaktur += parseFloat(item.total_harga);
    });

    setFaktur(totalFaktur);
  }, [dataItem]);

  const getColumnDefs = () => {
    return [
      {
        headerName: trans('header.column.kode_barang'),
        field: 'kode_barang',
        width: 150,
      },
      {
        headerName: trans('header.column.nama_barang'),
        field: 'nama_barang',
        width: 150,
      },
      {
        headerName: trans('header.column.satuan_terkecil'),
        field: 'satuan_terkecil',
        width: 80,
      },
      {
        headerName: trans('header.column.jumlah_pesan'),
        field: 'jumlah_pesan',
        width: 80,
        sortable: false,
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: trans('header.column.no_batch'),
        field: 'no_batch',
        width: 150,
      },
      {
        headerName: trans('header.column.expired'),
        field: 'expired_date',
        sortable: false,
        cellStyle: { 'text-align': 'center' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
        width: 110,
      },
      {
        headerName: trans('header.column.jumlah_terima'),
        field: 'jumlah_terima',
        sortable: false,
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: trans('header.column.harga_satuan'),
        field: 'harga_satuan',
        sortable: false,
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: trans('header.column.diskon'),
        field: 'diskon',
        sortable: false,
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: trans('header.column.ppn_rp'),
        field: 'ppn_rp',
        sortable: false,
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: trans('header.column.total_harga'),
        field: 'total_harga',
        sortable: false,
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
    ];
  };

  return (
    <Fragment>
      <Module
        isLoading={isLoading}
        loaderMessage={loaderMessage}
        resource={props.resource}
        t={props.t}
        i18n={props.i18n}
        permissions={props.permissions}
        noPaddingTopBot={true}
        icon={`dolly flatbed`}
        useLabel={true}
        labelHarga={<label>{`Total Nilai Faktur : ${currency(faktur)}`}</label>}
        masterForm={
          <MasterForm
            resource={props.resource}
            focusElement={focusElMaster}
            t={props.t}
          />
        }
        detailList={
          <DetailList
            t={props.t}
            isLoading={isLoading}
            loaderMessage={loaderMessage}
            resource={props.resource}
            columnDefs={getColumnDefs()}
            sizeColumnsToFit={false}
            containerHeight="180px"
            tableName={tableName.DETAIL_LIST}
          />
        }
        detailForm={
          <DetailForm
            resource={props.resource}
            focusElement={focusDetail}
            t={props.t}
          />
        }
      />
    </Fragment>
  );
};

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Main;
