import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// import Filter from './containers/Filter';
import {
  Main as Module,
  DetailList,
} from '@simrs/main/src/modules/transaksi/farmasi';
import MasterForm from '../container/MasterForm';
import DetailForm from '../container/DetailForm';
import { tableName } from '../../static/staticConst';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Module
          {...this.props}
          icon={`dolly flatbed`}
          masterForm={<MasterForm {...this.props} />}
          detailList={
            <DetailList
              columnDefs={this._getColumnDefs()}
              {...this.props}
              sizeColumnsToFit={false}
              tableName={tableName.DETAIL_LIST}
            />
          }
          detailForm={<DetailForm {...this.props} />}
        />
      </Fragment>
    );
  }

  _getColumnDefs() {
    return [
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.kode_barang`
        ),
        field: 'kode_barang',
        width: 150,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.nama_barang`
        ),
        field: 'nama_barang',
        width: 300,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.satuan_terkecil`
        ),
        field: 'satuan_terkecil',
        width: 150,
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.stok`),
        field: 'stok',
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.jumlah_pesan`
        ),
        field: 'jumlah_pesan',
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_satuan`
        ),
        field: 'harga_satuan',
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: false,
        cellEditor: 'currencyInputRenderer',
      },
    ];
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
