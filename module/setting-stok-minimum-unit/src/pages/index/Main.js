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
        icon={`tag`}
        filter={<Filter {...this.props} />}
        list={
          <List
            columnDefs={this._getColumnDefs()}
            {...this.props}
            sizeColumnsToFit={true}
          />
        }
        create={<Create {...this.props} />}
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
        width: 100,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.nama_barang`
        ),
        field: 'nama_barang',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.satuan_terkecil`
        ),
        field: 'satuan_terkecil',
        width: 150,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.stok_minimum`
        ),
        field: 'str_minimum',
        width: 100,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.stok_maximum`
        ),
        field: 'str_maximum',
        width: 100,
      },
    ];
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
