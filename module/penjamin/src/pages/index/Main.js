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
        filter={<Filter {...this.props} />}
        list={
          <List
            containerHeight="244px"
            columnDefs={this._getColumnDefs()}
            {...this.props}
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
        width: 150,
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.alamat`),
        field: 'alamat',
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.telp`),
        field: 'telp',
        width: 80,
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.kelas`),
        field: 'nama_kelas',
        width: 70,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.jaminan_penuh`
        ),
        field: 'jamin_penuh',
        width: 110,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.input_jaminan`
        ),
        field: 'input_jaminan',
        width: 110,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.st_naik_satu_tingkat`
        ),
        field: 'string_st_naik_satu_tingkat',
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.status`),
        field: 'string_aktif',
        width: 60,
      },
    ];
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
};

export default Main;
