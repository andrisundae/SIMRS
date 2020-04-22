import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Main as Default } from '@simrs/main/src/modules/setting/default';
import FilterSumberLain from './containers/FilterSumberLain';
import DataSetting from './containers/DataSetting';

class Main extends Component {
  componentDidCatch() {
    this.setState({ hasError: true });
  }

  getColumnDefs() {
    return [
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.layanan`
        ),
        field: 'layanan',
        cellRenderer: 'loadingRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.kelompok`
        ),
        field: 'kelompok',
      },
    ];
  }

  getSettingColumnDefs() {
    return [
      ...this.getColumnDefs(),
      {
        headerName: this.props.t(`${this.props.resource}:header.column.jumlah`),
        field: 'jumlah',
        suppressSorting: false,
        cellClass: 'ag-number-cell',
      },
    ];
  }

  render() {
    return (
      <Default
        {...this.props}
        filterSumberLain={<FilterSumberLain {...this.props} />}
        caption={this.props.t(`${this.props.resource}:title`)}
        settingColumns={this.getSettingColumnDefs()}
        sumberColumns={this.getColumnDefs()}
        dataSetting={<DataSetting {...this.props} />}
      />
    );
  }
}

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default Main;
