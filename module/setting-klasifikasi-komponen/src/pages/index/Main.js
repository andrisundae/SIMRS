import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Main as Default } from '@simrs/main/src/modules/setting/default';
import FilterSumberLain from './containers/FilterSumberLain';

class Main extends Component {
  componentDidCatch() {
    this.setState({ hasError: true });
  }

  getColumnDefs() {
    return [
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.komponen`
        ),
        field: 'komponen',
        cellRenderer: 'loadingRenderer',
      },
    ];
  }

  render() {
    return (
      <Default
        {...this.props}
        filterSumberLain={<FilterSumberLain {...this.props} />}
        caption={this.props.t(`${this.props.resource}:title`)}
        settingColumns={this.getColumnDefs()}
        sumberColumns={this.getColumnDefs()}
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
