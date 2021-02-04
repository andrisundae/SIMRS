import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, Form, Input, Segment } from 'semantic-ui-react';
import { SearchButton, withAppConsumer } from '@simrs/components';

import {
  filterActions,
  CariDetail as CariDetailContainer,
} from '@simrs/main/src/modules/transaksi/farmasi';

import { tableName } from '../../static/staticConst';

class CariDetail extends Component {
  constructor() {
    super();

    this._onKeyHandle = this._onKeyHandle.bind(this);
    this._handleCari = this._handleCari.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);

    this._createFormRef();
    this.tableRef = createRef();
  }

  _createFormRef() {
    this.filter_value = createRef();
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
      form: 'cari_detail',
    });
  }

  _handleCari() {
    this.props.action.onSubmitFilterDetail(
      this.props.resource,
      this.props.post
    );
  }

  _generateSelectedValue(idx, val) {
    return idx && val ? { value: idx, label: val } : null;
  }

  _onKeyHandle(e) {
    if (13 === e.which) {
      this._handleCari();
    }

    if (40 === e.which) {
      e.preventDefault();
      this.CariDetailContainer._setFirstRowSelected();
      this.props.action.onFocusElement(this.props.resource, '');
    }
  }

  _columnDefs() {
    let { t } = this.props;
    return [
      {
        headerName: t(this._getKey('header.column.kode_barang')),
        field: 'kode_barang',
        sortable: true,
        width: 200,
      },
      {
        headerName: t(this._getKey('header.column.nama_barang')),
        field: 'nama_barang',
        sortable: true,
      },
    ];
  }

  componentDidMount() {
    let { show, focusElement } = this.props;
    if (show) {
      if (focusElement === 'filter_value') {
        this[focusElement].current.focus();
      }
    }
  }

  componentDidUpdate() {
    let { show, focusElement } = this.props;

    if (show) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          this[focusElement].current.focus();
        }
      }
    }
  }

  render() {
    let { t, post, resource } = this.props;

    return (
      <CariDetailContainer
        resource={resource}
        show={this.props.show}
        columnDefs={this._columnDefs()}
        tableName={tableName.BARANG_LIST}
        tableRef={this.tableRef}
        {...this.props}
      >
        <Grid.Column>
          <Segment padded>
            <Form>
              <Form.Group widths="16">
                <Form.Field width="3">
                  <label>{t(this._getKey('label.field.nama_barang'))}</label>
                </Form.Field>
                <Form.Field width="6" style={{ padding: 0 }}>
                  <Input
                    name="filter_value"
                    ref={this.filter_value}
                    value={post.filter_value || ''}
                    onChange={this._handleInputChange}
                    onKeyDown={(e) => this._onKeyHandle(e, 'btnCari')}
                  />
                </Form.Field>
                <Form.Field width="3">
                  <SearchButton
                    onClick={this._handleCari}
                    inputRef={this.btnCari}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </CariDetailContainer>
    );
  }
}

const mapStateToProps = function (state) {
  const { filter } = state.default;

  return {
    post: filter.cari_detail,
    initial: filter.data.initial,
    focusElement: filter.focusElement,
    show: filter.filter_modal.detail_modal.show,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...filterActions,
      },
      dispatch
    ),
  };
};

CariDetail.propTypes = {
  resource: PropTypes.string.isRequired,
  action: PropTypes.object,
  post: PropTypes.object,
  t: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(CariDetail));
