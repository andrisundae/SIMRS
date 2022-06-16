import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from './containers/Filter';
import Create from './containers/Create';
import { Main as Module, List } from '@simrs/main/src/modules/master/default';

const aktifGetter = (params) => {
  if (!params.data) {
    return '';
  }
  return params.data.aktif ? 'Ya' : 'Tidak';
};

class Main extends Component {
  render() {
    return (
      <Module
        {...this.props}
        filter={<Filter {...this.props} />}
        list={<List columnDefs={this._getColumnDefs()} {...this.props} />}
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
        headerName: this.props.t(
          `${this.props.resource}:header.column.nama_cetakan`
        ),
        field: 'nama_cetakan',
        width: 300,
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.tarif`),
        field: 'tarif',
        width: 100,
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
        headerClass: 'ag-right-aligned-header',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.detail_komponen`
        ),
        field: 'detail_komponen',
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.status`),
        field: 'string_aktif',
        width: 60,
        valueGetter: aktifGetter,
      },
    ];
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
