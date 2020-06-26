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
        headerName: this.props.t(
          `${this.props.resource}:header.column.unit_farmasi`
        ),
        field: 'unit_layanan',
        width: 300,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.status_gudang`
        ),
        field: 'str_st_gudang',
        width: 130,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.penjualan`
        ),
        field: 'str_st_penjualan',
        width: 100,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.terima_e_resep`
        ),
        field: 'str_st_terima_resep',
        width: 150,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.unit_bank_darah`
        ),
        field: 'str_st_unit_bank_darah',
        width: 200,
      },
    ];
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
