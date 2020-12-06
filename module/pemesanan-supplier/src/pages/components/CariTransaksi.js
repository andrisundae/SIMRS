import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Form, Input, Segment } from 'semantic-ui-react';
import {
  DatePicker,
  Select,
  SearchButton,
  Checkbox,
  withAppConsumer,
} from '@simrs/components';

import {
  filterActions,
  CariTransaksi as CariTransaksiContainer,
} from '@simrs/main/src/modules/transaksi/farmasi';

import localAction from '../index/actions';
import { tableName } from '../../static/staticConst';

class CariTransaksi extends Component {
  constructor() {
    super();

    this._onFocusElement = this._onFocusElement.bind(this);
    this._handleChangeTanggal = this._handleChangeTanggal.bind(this);
    this._handleSelectOption = this._handleSelectOption.bind(this);
    this._handleCari = this._handleCari.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

    this._createFormRef();
  }

  _createFormRef() {
    this.tgl_awal = createRef();
    this.tgl_akhir = createRef();
    this.use_tgl = createRef();
    this.filter = createRef();
    this.kata_kunci = createRef();
    this.btnCari = createRef();
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _handleInputChange(e) {
    let val = e.target.value.toUpperCase();
    if (e.target.type === 'checkbox') {
      val = e.target.checked ? true : false;
    }

    this.props.action.onChangeInput(this.props.resource, {
      name: e.target.name,
      value: val,
      form: 'cari_master',
    });
  }

  _handleChangeTanggal(date, field) {
    this.props.action.onFilterChangeTanggal(this.props.resource, {
      tgl: date,
      field: field,
    });
  }

  _handleSelectOption(idx, val, selected) {
    this.props.action.onFilterChangeSelect(this.props.resource, {
      idx,
      val,
      selected,
    });
  }

  _handleCari() {
    this.props.action.onSubmitFilterTransaksi(
      this.props.resource,
      this.props.post
    );
  }

  _generateSelectedValue(idx, val) {
    return idx && val ? { value: idx, label: val } : null;
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }

      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _columnDefs() {
    let { t } = this.props;

    return [
      {
        headerName: t(this._getKey('header.table.nomor_transaksi')),
        field: 'no_transaksi',
        sortable: true,
        width: 200,
      },
      {
        headerName: t(this._getKey('header.table.tanggal')),
        field: 'tanggal_transaksi',
        sortable: true,
        cellStyle: { 'text-align': 'center' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
        width: 110,
      },
      {
        headerName: t(this._getKey('header.table.supplier')),
        field: 'nama_supplier',
        sortable: true,
      },
      {
        headerName: t(this._getKey('header.table.unit')),
        sortable: true,
        field: 'nama_unit',
      },
    ];
  }

  componentDidMount() {
    let { show, focusElement } = this.props;

    if (show) {
      if (focusElement === 'btnCari') {
        this[focusElement].current.focus();
      }
    }
  }

  componentDidUpdate() {
    let { show, focusElement } = this.props;

    if (show) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          switch (focusElement) {
            case 'tgl_awal':
            case 'tgl_akhir':
              this[focusElement].current.setFocus();
              break;
            default:
              this[focusElement].current.focus();
              break;
          }
        }
      }
    }
  }

  render() {
    let { t, isDisableForm, post, resource, initial } = this.props;

    return (
      <CariTransaksiContainer
        resource={resource}
        show={this.props.show}
        columnDefs={this._columnDefs()}
        tableName={tableName.CARI_TRANSAKSI}
      >
        <Grid.Column>
          <Segment padded>
            <Form>
              <Form.Group widths="16">
                <Form.Field width="3">
                  <label>
                    {t(this._getKey('label.field.tanggal_transaksi'))}
                  </label>
                </Form.Field>
                <Form.Field width="3" style={{ padding: 0 }}>
                  <DatePicker
                    name="tgl_awal"
                    inputRef={this.tgl_awal}
                    selected={post.tgl_awal}
                    disabled={isDisableForm}
                    onChange={(date) =>
                      this._handleChangeTanggal(date, 'tgl_awal')
                    }
                    onKeyDown={(e) => this._onFocusElement(e, 'tgl_akhir')}
                    dateFormat="dd/MM/yyyy"
                    isClearable={isDisableForm ? false : true}
                  />
                </Form.Field>
                <Form.Field width="1">
                  <label>{t(this._getKey('label.field.s_d'))}</label>
                </Form.Field>
                <Form.Field width="3" style={{ padding: 0 }}>
                  <DatePicker
                    name="tgl_akhir"
                    inputRef={this.tgl_akhir}
                    selected={post.tgl_akhir}
                    disabled={isDisableForm}
                    onChange={(date) =>
                      this._handleChangeTanggal(date, 'tgl_akhir')
                    }
                    onKeyDown={(e) => this._onFocusElement(e, 'use_tgl')}
                    dateFormat="dd/MM/yyyy"
                    minDate={post.tgl_awal}
                    isClearable={isDisableForm ? false : true}
                  />
                </Form.Field>
                <Form.Field width="2" style={{ paddingTop: 3 }}>
                  <Checkbox
                    inputRef={this.use_tgl}
                    name="use_tgl"
                    value={post.use_tgl}
                    checked={post.use_tgl ? true : false}
                    disabled={isDisableForm}
                    onChange={this._handleInputChange}
                    onKeyDown={(e) => this._onFocusElement(e, 'filter')}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="16">
                <Form.Field width="3">
                  <label>{t(this._getKey('label.field.filter'))}</label>
                </Form.Field>
                <Form.Field width="7" style={{ padding: 0 }}>
                  <Select
                    name="filter"
                    placeholder={t(this._getKey('label.field.filter'))}
                    inputRef={this.filter}
                    isDisabled={isDisableForm}
                    onChange={(e) =>
                      this._handleSelectOption('filter_idx', 'filter', e)
                    }
                    value={this._generateSelectedValue(
                      post.filter_idx,
                      post.filter
                    )}
                    onKeyDown={(e) => this._onFocusElement(e, 'kata_kunci')}
                    options={initial.option_filter}
                    isClearable={false}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="16">
                <Form.Field width="3">
                  <label>{t(this._getKey('label.field.kata_kunci'))}</label>
                </Form.Field>
                <Form.Field width="7" style={{ padding: 0 }}>
                  <Input
                    name="filter_value"
                    ref={this.kata_kunci}
                    value={post.filter_value || ''}
                    disabled={isDisableForm}
                    onChange={this._handleInputChange}
                    onKeyDown={(e) => this._onFocusElement(e, 'btnCari')}
                  />
                </Form.Field>
                <Form.Field width="3">
                  <SearchButton
                    disabled={isDisableForm}
                    onClick={this._handleCari}
                    inputRef={this.btnCari}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </CariTransaksiContainer>
    );
  }
}

const mapStateToProps = function (state) {
  const { filter } = state.default;

  return {
    isDisableForm: false,
    post: filter.cari_master,
    initial: filter.data.initial,
    focusElement: filter.focusElement,
    show: filter.filter_modal.master_modal.show,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...filterActions,
        onFilterChangeSelect: localAction.onFilterChangeSelect,
        onFilterChangeTanggal: localAction.onFilterChangeTanggal,
      },
      dispatch
    ),
  };
};

CariTransaksi.propTypes = {
  resource: PropTypes.string.isRequired,
  action: PropTypes.object,
  post: PropTypes.object,
  t: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(CariTransaksi));
