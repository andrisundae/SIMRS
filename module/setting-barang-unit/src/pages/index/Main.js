import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Main as Default } from '@simrs/main/src/modules/setting/default';
import FilterSumberLain from './containers/FilterSumberLain';
import localActions from './actions';

class Main extends Component {
  componentDidCatch() {
    this.setState({ hasError: true });

    this.checkboxRenderer = this.checkboxRenderer.bind(this);
  }

  getColumnDefs() {
    return [
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.nama_barang`
        ),
        field: 'nama_barang',
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
        withColumnAktif
        onAktifChanged={(params) =>
          this.props.action.onToggle(this.props.resource, params.data)
        }
      />
    );
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onToggle: localActions.onToggleCheck,
      },
      dispatch
    ),
  };
};

Main.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(Main);
