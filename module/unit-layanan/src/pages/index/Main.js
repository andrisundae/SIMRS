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
        headerName: this.props.t(
          `${this.props.resource}:header.column.instalasi`
        ),
        field: 'nama_instalasi',
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.nama`),
        field: 'nama',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.kategori`
        ),
        field: 'kategori',
        sortable: false,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.rentang_umur`
        ),
        field: 'rentang_umur',
        sortable: false,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.inisial`
        ),
        field: 'inisial',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.kode_mapping_bpjs`
        ),
        field: 'kode_mapping_bpjs',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.asal_kunjungan`
        ),
        field: 'string_asal_kunjungan',
        sortable: false,
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
