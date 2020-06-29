import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from './containers/Filter';
import Create from './containers/Create';
import FooterActions from './containers/FooterActions';
import { Main as Module, List } from '@simrs/main/src/modules/master/default';

class Main extends Component {
  render() {
    return (
      <Module
        {...this.props}
        icon={`tag`}
        filter={<Filter {...this.props} />}
        list={<List columnDefs={this._getColumnDefs()} {...this.props} />}
        create={<Create {...this.props} />}
        footerActions={<FooterActions {...this.props} />}
      />
    );
  }

  _getColumnDefs() {
    return [
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.kode_barcode`
        ),
        field: 'kode_barcode',
        width: 80,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.nama_barang`
        ),
        field: 'nama_barang',
        width: 200,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.satuan_terkecil`
        ),
        field: 'satuan_terkecil',
        width: 100,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_terakhir`
        ),
        field: 'harga_terakhir',
        cellRenderer: 'currencyRenderer',
        width: 90,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_average`
        ),
        field: 'harga_average',
        cellRenderer: 'currencyRenderer',
        width: 90,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_jual`
        ),
        field: 'harga_jual',
        cellRenderer: 'currencyRenderer',
        width: 90,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
    ];
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
