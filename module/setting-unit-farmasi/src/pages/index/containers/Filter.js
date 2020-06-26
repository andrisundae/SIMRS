import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Trans } from 'react-i18next';

import { Input, Select, FormField } from 'semantic-ui-react';
import {
  Filter as FilterContainer,
  isDisableForm,
  filterActions,
} from '@simrs/main/src/modules/master/default';
import { Radio } from '@simrs/components';
import { context } from '@simrs/main/src/modules/setting/aturan-aplikasi';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.filterIndex = createRef();
    this.filterValue = createRef();

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleSelectionChange = this._handleSelectionChange.bind(this);
  }

  __renderFilterField() {
    let { post, isDisableForm, minCharSearch, t } = this.props;

    switch (post.filter_index) {
      case 'stGudang':
      case 'stPenjualan':
      case 'stTerimaResep':
      case 'stUnitBankDarah':
      case 'aktif':
        return (
          <Fragment>
            <Radio
              value="Ya"
              name="filter_value"
              checked={post.filter_value === 'Ya' ? true : false}
              onChange={this._handleFilterChange}
              inputRef={this.filterValue}
              label={t(this._getKey('sub.label.ya'))}
              disabled={isDisableForm}
            />
            <Radio
              value="Tidak"
              name="filter_value"
              checked={post.filter_value === 'Tidak' ? true : false}
              onChange={this._handleFilterChange}
              label={t(this._getKey('sub.label.tdk'))}
              inputRef={this.filterValue}
              disabled={isDisableForm}
            />
          </Fragment>
        );

      default:
        return (
          <Input
            name="filter_value"
            ref={this.filterValue}
            value={post.filter_value}
            onChange={this._handleFilterChange}
            disabled={isDisableForm}
            placeholder={t(this._getKey('placeholder.filter'), {
              minCharSearch,
            })}
          />
        );
    }
  }

  render() {
    const { post, isDisableForm, resource } = this.props;
    return (
      <FilterContainer resource={resource}>
        <FormField>
          <label>
            <Trans i18nKey={this._getKey('label.filter')} />
          </label>
          <Select
            name="filter_index"
            onChange={this._handleSelectionChange}
            value={post.filter_index}
            disabled={isDisableForm}
            options={this._getFilterColumns()}
            placeholder="Pilih Filter"
          />
        </FormField>
        <FormField width="4">{this.__renderFilterField()}</FormField>
      </FilterContainer>
    );
  }

  componentDidMount() {
    let _this = this;

    MouseTrap.bind('alt+f', function (e) {
      e.preventDefault();
      if (!_this.props.isDisableForm) {
        if (_this.filterValue) {
          _this.filterValue.current.focus();
        }
      }
    });
  }

  _handleFilterChange(e) {
    const { name, value } = e.target;
    this.props.action.onChangeFilter(this.props.resource, { name, value });
  }

  _handleSelectionChange(e, { value }) {
    this.props.action.onChangeFilter(this.props.resource, {
      name: 'filter_index',
      value,
    });
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _getFilterColumns() {
    return [
      {
        key: 'unit_farmasi',
        value: 'idUnit',
        text: this.props.t(this._getKey('header.column.unit_farmasi')),
      },
      {
        key: 'st_gudang',
        value: 'stGudang',
        text: this.props.t(this._getKey('header.column.status_gudang')),
      },
      {
        key: 'st_penjualan',
        value: 'stPenjualan',
        text: this.props.t(this._getKey('header.column.penjualan')),
      },
      {
        key: 'st_terima_resep',
        value: 'stTerimaResep',
        text: this.props.t(this._getKey('header.column.terima_e_resep')),
      },
      {
        key: 'st_unit_bank_darah',
        value: 'stUnitBankDarah',
        text: this.props.t(this._getKey('header.column.unit_bank_darah')),
      },
    ];
  }
}

const mapStateToProps = function (state, props) {
  const { filter, module } = state.default;
  const minCharSearch = props.settings.find(
    (setting) => setting.aturan === context.MINCHARPENCARIANMASTER
  );

  return {
    post: filter.post,
    isDisableForm: !isDisableForm(module),
    minCharSearch: parseInt(minCharSearch ? minCharSearch.nilai : 0),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(filterActions, dispatch),
  };
};

Filter.propTypes = {
  post: PropTypes.object,
  action: PropTypes.object,
  isDisableForm: PropTypes.bool,
  minCharSearch: PropTypes.number,
  resource: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  settings: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
