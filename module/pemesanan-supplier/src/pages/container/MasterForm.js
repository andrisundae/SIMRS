import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { Form, Grid, Input, Button, Icon } from 'semantic-ui-react';
import CariTransaksi from '../components/CariTransaksi';

import {
  masterActions,
  isDisableForm,
  isDisableFormDetail,
  filterActions,
  masterActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';
import { Select, withAppConsumer } from '@simrs/components';
import localAction from '../index/actions';

class MasterForm extends Component {
  constructor() {
    super();

    this._createFormRef();

    this._handleSelectOption = this._handleSelectOption.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _createFormRef() {
    this.no_transaksi = createRef();
    this.tanggal_transaksi = createRef();
    this.cari_transaksi = createRef();
    this.id_supplier = createRef();
    this.id_unit = createRef();
  }

  _onSearch() {
    this.props.action.onOpenDialog(this.props.resource, {
      form: 'master_modal',
    });
  }

  _handleSelectOption(idx, val, selected) {
    this.props.action.onChangeSelect(this.props.resource, {
      idx,
      val,
      selected,
    });
  }

  _generateSelectedValue(idx, val) {
    return idx && val ? { value: idx, label: val } : null;
  }

  _fixValue() {
    let { initial, post } = this.props;
    let fixValue = {
      nomor_transaksi: post.no_transaksi
        ? post.no_transaksi
        : initial.nomor_transaksi,
      tanggal_transaksi: post.tanggal_transaksi
        ? post.tanggal_transaksi
        : initial.tanggal_transaksi,
    };

    return fixValue;
  }

  componentDidUpdate() {
    let { statusForm, focusElement } = this.props;

    if (
      statusForm === masterActionTypes.ADD ||
      statusForm === masterActionTypes.EDIT
    ) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          switch (focusElement) {
            default:
              this[focusElement].current.focus();
              break;
          }
        }
      }
    }
  }

  _onFocusElement(e, nameRef) {
    if ('Enter' === e.key) {
      if (e.target.name) {
        e.preventDefault();
      }

      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  render() {
    let { t, initial, post, isDisableForm, statusForm } = this.props;
    let fixValue = this._fixValue();

    return (
      <Fragment>
        <Form
          id="master-pemesanan"
          onSubmit={(e) => e.preventDefault()}
          size="mini"
        >
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>
                        {t(this._getKey('label.field.no_transaksi'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="6" className="field">
                      <Input
                        name="no_transaksi"
                        ref={this.no_transaksi}
                        value={fixValue.nomor_transaksi || ''}
                        disabled={true}
                      />
                    </Grid.Column>
                    <Grid.Column width="6" className="left aligned">
                      <Button
                        ref={this.cari_transaksi}
                        name="cari_transaksi"
                        size="mini"
                        color="blue"
                        onClick={this._onSearch}
                        disabled={
                          !isDisableForm ||
                          statusForm === masterActionTypes.FILLED
                        }
                      >
                        <Icon name="search" />
                        <Trans
                          i18nKey={`${this.props.resource}:label.btn.cari_transaksi`}
                        />
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>
                        {t(this._getKey('label.field.tanggal_transaksi'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="6" className="field">
                      <Input
                        name="tanggal_transaksi"
                        ref={this.tanggal_transaksi}
                        value={fixValue.tanggal_transaksi || ''}
                        disabled={true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column
                      width="5"
                      className="required field left aligned"
                    >
                      <label>{t(this._getKey('label.field.supplier'))}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Select
                        name="id_supplier"
                        placeholder={t(
                          this._getKey('placeholder.field.supplier')
                        )}
                        inputRef={this.id_supplier}
                        isDisabled={isDisableForm}
                        onChange={(e) => {
                          this._handleSelectOption(
                            'id_supplier',
                            'nama_supplier',
                            e
                          );
                        }}
                        value={this._generateSelectedValue(
                          post.id_supplier,
                          post.nama_supplier
                        )}
                        onKeyDown={(e) => {
                          this._onFocusElement(e, 'id_unit');
                        }}
                        options={initial.option_supplier}
                        isClearable={false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column
                      width="5"
                      className="required field left aligned"
                    >
                      <label>
                        {t(this._getKey('label.field.unit_pemesanan'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Select
                        name="id_unit"
                        placeholder={t(
                          this._getKey('placeholder.field.unit_pemesanan')
                        )}
                        inputRef={this.id_unit}
                        isDisabled={isDisableForm}
                        onChange={(e) =>
                          this._handleSelectOption('id_unit', 'nama_unit', e)
                        }
                        value={this._generateSelectedValue(
                          post.id_unit,
                          post.nama_unit
                        )}
                        onKeyDown={(e) => this._onFocusElement(e, 'save')}
                        options={initial.option_unit}
                        isClearable={false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>

        {this.props.show && <CariTransaksi {...this.props} />}
      </Fragment>
    );
  }
}

const mapStateToProps = function (state) {
  const { master, filter, detail } = state.default;

  return {
    post: master.post,
    statusForm: master.statusForm,
    focusElement: master.focusElement,
    initial: master.data.initial,
    show: filter.filter_modal.master_modal.show,
    isDisableForm: !isDisableForm(master),
    isDisableFormDetail: !isDisableFormDetail(detail),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...masterActions,
        onChangeSelect: localAction.onChangeSelect,
        onOpenDialog: filterActions.onOpenDialog,
      },
      dispatch
    ),
  };
};

MasterForm.propTypes = {
  post: PropTypes.object,
  action: PropTypes.object,
  isDisableForm: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(MasterForm));
