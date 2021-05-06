import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Trans } from 'react-i18next';
import { Input, Select, FormField, Grid } from 'semantic-ui-react';

import {
  Filter as FilterContainer,
  filterActions,
} from '@simrs/main/src/modules/master/nested';
import { Select as Select2 } from '@simrs/components';
import { context } from '@simrs/main/src/modules/setting/aturan-aplikasi';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.filterIndex = createRef();
    this.filterValue = createRef();

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleSelectionChange = this._handleSelectionChange.bind(this);
    this._onClickPrev = this._onClickPrev.bind(this);
    this._onClickNext = this._onClickNext.bind(this);
  }

  render() {
    const {
      isDisableNext,
      isDisablePrev,
      subResource,
      postFilter,
      resource,
      minCharSearch,
      t,
    } = this.props;

    return (
      <Fragment>
        <Grid className="form-grid">
          <Grid.Row className="form-row">
            <Grid.Column width="7" className="field" style={{ marginTop: 5 }}>
              <Select2
                name="versi_tarif"
                isDisabled={true}
                value={this.props.location.state.selectedVersiTarif}
                options={[]}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <FilterContainer
          resource={resource}
          subResource={subResource}
          isDisableNext={isDisableNext}
          isDisablePrev={isDisablePrev}
          onNext={this._onClickNext}
          rowStyle={{ paddingTop: 5 }}
          onPrev={this._onClickPrev}
          {...this.props}
        >
          <FormField>
            <Select2
              className="filter-select"
              name="klasifikasi"
              isDisabled={true}
              value={this.props.location.state.selectedKlasifikasi}
              options={[]}
            />
          </FormField>
          <FormField>
            <label>
              <Trans i18nKey={this._getKey('label.filter')} />
            </label>
            <Select
              name="filter_index"
              onChange={this._handleSelectionChange}
              value={postFilter.filter_index}
              // disabled={isDisabledFilter}
              options={this._getFilterColumns()}
              placeholder="Pilih Filter"
            />
          </FormField>
          <FormField width="4">
            <Input
              name="filter_value"
              ref={this.filterValue}
              value={postFilter.filter_value}
              onChange={this._handleFilterChange}
              // disabled={isDisabledFilter}
              placeholder={t(this._getKey('placeholder.filter'), {
                minCharSearch,
              })}
            />
          </FormField>
        </FilterContainer>
      </Fragment>
    );
  }

  componentDidUpdate() {
    this._bindKey();
  }

  componentWillUnmount() {
    this._unbindKey();
  }

  _bindKey() {
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

  _unbindKey() {
    MouseTrap.unbind('alt+f');
  }

  _handleFilterChange(e) {
    const { name, value } = e.target;
    this.props.action.onChangeFilter(
      this.props.resource,
      this.props.subResource,
      { name, value }
    );
  }

  _handleSelectionChange(e, { value }) {
    this.props.action.onChangeFilter(
      this.props.resource,
      this.props.subResource,
      { name: 'filter_index', value }
    );
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _getFilterColumns() {
    return [
      {
        key: 'nama',
        value: 'nama',
        text: this.props.t(this._getKey('header.column.nama')),
      },
    ];
  }

  _onClickPrev(e) {
    e.preventDefault();
    const { location } = this.props;
    this.props.history.push({
      pathname: `/kelompok`,
      state: {
        // ...this.props.location.state,
        id_kelompok: location.state.id_kelompok,
        nama_kelompok: location.state.nama_kelompok,
        selectedVersiTarif: location.state.selectedVersiTarif,
        selectedKlasifikasi: location.state.selectedKlasifikasi,
        kelompok: true,
      },
    });
  }

  _onClickNext(e) {
    e.preventDefault();
    const { selectedRow, post, location } = this.props;
    this.props.history.push({
      pathname: `/tindakan/${selectedRow}`,
      state: {
        // ...this.props.location.state,
        id_kelompok: location.state.id_kelompok,
        nama_kelompok: location.state.nama_kelompok,
        selectedVersiTarif: location.state.selectedVersiTarif,
        selectedKlasifikasi: location.state.selectedKlasifikasi,
        tindakan: true,
        id_layanan: selectedRow,
        nama_layanan: post.nama,
        is_edit_tindakan: false,
      },
    });
  }
}

const mapStateToProps = function (state, props) {
  const { filter, module } = state.nested;
  const selectedRow = module.selectedRow;
  const minCharSearch = props.settings.find(
    (setting) => setting.aturan === context.MINCHARPENCARIANMASTER
  );

  return {
    data: filter.data,
    postFilter: filter.post,
    post: module.post,
    isDisableNext: selectedRow < 1,
    isDisablePrev: false,
    selectedRow,
    minCharSearch: parseInt(minCharSearch ? minCharSearch.nilai : 0),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(filterActions, dispatch),
  };
};

Filter.propTypes = {
  postFilter: PropTypes.object,
  post: PropTypes.object,
  data: PropTypes.object,
  action: PropTypes.object,
  isDisableNext: PropTypes.bool,
  isDisablePrev: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  subResource: PropTypes.string.isRequired,
  selectedRow: PropTypes.number,
  history: PropTypes.object,
  location: PropTypes.object.isRequired,
  minCharSearch: PropTypes.number,
  t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
