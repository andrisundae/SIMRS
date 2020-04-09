import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from './containers/Filter';
import Create from './containers/Create';
import { Main as Module, List } from '@simrs/main/src/modules/master/default';

class Main extends Component {
  render() {
    return (
      <Module
        {...this.props}
        icon={`dolly flatbed`}
        filter={<Filter {...this.props} />}
        list={
          <List
            columnDefs={this._getColumnDefs()}
            {...this.props}
            sizeColumnsToFit={false}
          />
        }
        create={<Create {...this.props} />}
      />
    );
  }

  _getColumnDefs() {
    return [
      {
        headerName: this.props.t(`${this.props.resource}:header.column.nama`),
        field: 'nama',
        width: 300,
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.jenis`),
        field: 'jenis_barang',
        width: 300,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.kelompok`
        ),
        field: 'kelompok_barang',
        width: 300,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.golongan`
        ),
        field: 'golongan_barang',
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
        headerName: this.props.t(`${this.props.resource}:header.column.het`),
        field: 'het',
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.persentase_profit`
        ),
        field: 'persentase_profit',
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.otomatis_update_harga`
        ),
        field: 'str_auto_update',
        width: 60,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.include_diskon_beli`
        ),
        field: 'str_include_diskon',
        width: 60,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_jual`
        ),
        field: 'harga_jual',
        cellRenderer: 'currencyRenderer',
        width: 100,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.metode_update_harga`
        ),
        field: 'metode_update_harga_jual',
        width: 150,
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.status`),
        field: 'str_aktif',
        width: 60,
      },
    ];
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
