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
        list={<List columnDefs={this._getColumnDefs()} {...this.props} />}
        create={<Create {...this.props} />}
      />
    );
  }

  _getColumnDefs() {
    return [
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.jenis_klasifikasi`
        ),
        field: 'nama_jenis_klasifikasi',
      },
      {
        headerName: this.props.t(`${this.props.resource}:header.column.nama`),
        field: 'nama',
      },
      {
        headerName: this.props.t(`${this.props.resource}:tarif_manual`),
        field: 'st_tarif_manual',
        width: 80,
        valueFormatter: ({ value }) => {
          if (value === 1) {
            return this.props.t(`${this.props.resource}:ya`);
          }

          return this.props.t(`${this.props.resource}:tidak`);
        },
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
  t: PropTypes.func.isRequired,
};

export default Main;
