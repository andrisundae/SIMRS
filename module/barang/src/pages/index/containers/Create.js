import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, Segment, Header } from 'semantic-ui-react';

import {
  isDisableForm,
  moduleActions as actions,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/default';
import { Checkbox, Select, CurrencyInput } from '@simrs/components';

import localActions from '../actions';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.formId = 'form-create';

    this._createFormRef();
  }

  _createFormRef() {
    this.barcode = createRef();
    this.nama = createRef();
    this.jenis_barang = createRef();
    this.kelompok_barang = createRef();
    this.golongan_barang = createRef();
    this.satuan_terkecil = createRef();
    this.het = createRef();
    this.persentase_profit = createRef();
    this.st_expired = createRef();
    this.otomatis_update = createRef();
    this.include_diskon = createRef();
    this.metode_update_harga_jual = createRef();
    this.aktif = createRef();
  }

  render() {
    let { post, isDisableForm, t, dataForm } = this.props;

    return (
      <Form id={this.formId} size="small">
        <Grid columns="3">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field left aligned">
                    <label>{t(this._getKey('label.field.barcode'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="barcode"
                      ref={this.barcode}
                      value={post.barcode || ''}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'nama')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.nama'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="nama"
                      ref={this.nama}
                      value={post.nama}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'jenis_barang')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.jenis'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="jenis_barang"
                      placeholder={t(this._getKey('placeholder.field.jenis'))}
                      inputRef={this.jenis_barang}
                      isDisabled={isDisableForm}
                      onChange={(e) =>
                        this._handleSelectOption('id_jenis', 'jenis_barang', e)
                      }
                      value={this._generateSelectedValue(
                        post.id_jenis,
                        post.jenis_barang
                      )}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'kelompok_barang')
                      }
                      options={dataForm.options_jenis_barang}
                      isClearable={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.kelompok'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="kelompok_barang"
                      placeholder={t(
                        this._getKey('placeholder.field.kelompok')
                      )}
                      inputRef={this.kelompok_barang}
                      isDisabled={isDisableForm}
                      onChange={(e) =>
                        this._handleSelectOption(
                          'id_kelompok',
                          'kelompok_barang',
                          e
                        )
                      }
                      value={this._generateSelectedValue(
                        post.id_kelompok,
                        post.kelompok_barang
                      )}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'golongan_barang')
                      }
                      options={dataForm.options_kelompok_barang}
                      isClearable={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.golongan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="golongan_barang"
                      placeholder={t(
                        this._getKey('placeholder.field.golongan')
                      )}
                      inputRef={this.golongan_barang}
                      isDisabled={isDisableForm}
                      onChange={(e) =>
                        this._handleSelectOption(
                          'id_golongan',
                          'golongan_barang',
                          e
                        )
                      }
                      value={this._generateSelectedValue(
                        post.id_golongan,
                        post.golongan_barang
                      )}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'satuan_terkecil')
                      }
                      options={dataForm.options_golongan_barang}
                      isClearable={false}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>
                      {t(this._getKey('label.field.satuan_terkecil'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="satuan_terkecil"
                      placeholder={t(
                        this._getKey('placeholder.field.satuan_terkecil')
                      )}
                      inputRef={this.satuan_terkecil}
                      isDisabled={isDisableForm}
                      onChange={(e) =>
                        this._handleSelectOption(
                          'id_satuan_terkecil',
                          'satuan_terkecil',
                          e
                        )
                      }
                      value={this._generateSelectedValue(
                        post.id_satuan_terkecil,
                        post.satuan_terkecil
                      )}
                      onKeyDown={(e) => this._onFocusElement(e, 'het')}
                      options={dataForm.options_satuan_barang}
                      isClearable={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.het'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <CurrencyInput
                      name="het"
                      inputRef={this.het}
                      value={parseFloat(post.het)}
                      disabled={isDisableForm}
                      precision={2}
                      prefix={t(this._getKey('curency.prefix'))}
                      decimalSeparator=","
                      thousandSeparator="."
                      selectAllOnFocus={true}
                      onChange={(e) => this._handleCurency('het', e)}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'persentase_profit')
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>
                      {t(this._getKey('label.field.persentase_profit'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <CurrencyInput
                      name="persentase_profit"
                      inputRef={this.persentase_profit}
                      value={parseFloat(post.persentase_profit)}
                      disabled={isDisableForm}
                      precision={2}
                      suffix={t(this._getKey('curency.suffix.percent'))}
                      selectAllOnFocus={true}
                      decimalSeparator=","
                      thousandSeparator="."
                      onChange={(e) =>
                        this._handleCurency('persentase_profit', e)
                      }
                      onKeyDown={(e) => this._onFocusElement(e, 'st_expired')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.status_exp'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Checkbox
                      value={post.st_expired}
                      name="st_expired"
                      checked={post.st_expired ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                      inputRef={this.st_expired}
                      label={''}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="6"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.status'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Checkbox
                      value={post.is_aktif}
                      name="is_aktif"
                      checked={post.is_aktif ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'otomatis_update')
                      }
                      inputRef={this.aktif}
                      label={''}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Header as="h5" attached="top" block>
                <label>{t(this._getKey('label.header'))}</label>
              </Header>
              <Segment attached size="mini">
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column
                      width="8"
                      className="required field left aligned"
                    >
                      <label>
                        {t(this._getKey('label.field.otomatis_update'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Checkbox
                        value={post.auto_update_harga_jual}
                        name="auto_update_harga_jual"
                        checked={post.auto_update_harga_jual ? true : false}
                        disabled={isDisableForm}
                        onChange={this._handleInputChange}
                        onKeyDown={(e) =>
                          this._onFocusElement(e, 'include_diskon')
                        }
                        inputRef={this.otomatis_update}
                        label={''}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column
                      width="8"
                      className="required field left aligned"
                    >
                      <label>
                        {t(this._getKey('label.field.include_diskon'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Checkbox
                        value={post.include_diskon_pembelian}
                        name="include_diskon_pembelian"
                        checked={post.include_diskon_pembelian ? true : false}
                        disabled={isDisableForm}
                        onChange={this._handleInputChange}
                        onKeyDown={(e) =>
                          this._onFocusElement(e, 'metode_update_harga_jual')
                        }
                        inputRef={this.include_diskon}
                        label={''}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column
                      width="8"
                      className="required field left aligned"
                    >
                      <label>
                        {t(this._getKey('label.field.metode_update'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="8" className="field">
                      <Select
                        name="metode_update_harga_jual"
                        placeholder={t(
                          this._getKey('placeholder.field.metode_update')
                        )}
                        inputRef={this.metode_update_harga_jual}
                        isDisabled={isDisableForm}
                        onChange={(e) =>
                          this._handleSelectOption(
                            'id_metode_update_harga',
                            'metode_update_harga_jual',
                            e
                          )
                        }
                        value={this._generateSelectedValue(
                          post.id_metode_update_harga,
                          post.metode_update_harga_jual
                        )}
                        onKeyDown={(e) => this._onFocusElement(e, 'save')}
                        options={dataForm.options_metode_update}
                        isClearable={false}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }

  componentDidUpdate() {
    let { statusForm, focusElement } = this.props;

    if (
      statusForm === moduleActionTypes.ADD ||
      statusForm === moduleActionTypes.EDIT
    ) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          switch (focusElement) {
            case 'persentase_profit':
            case 'het':
              this[focusElement].current.theInput.focus();
              break;
            case 'tanggal':
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

  _generateSelectedValue(idx, val) {
    let value = null;

    if (idx && val) {
      value = { value: idx, label: val };
    }

    return value;
  }

  _handleSelectOption(idx, val, selected) {
    this.props.action.onChangeSelect(this.props.resource, {
      idx,
      val,
      selected,
    });
  }

  _handleCurency(name, e) {
    let { t } = this.props;
    let curency = e
      .replace(t(this._getKey('curency.prefix')), '')
      .replace(t(this._getKey('curency.suffix.percent')), '');
    curency = parseFloat(curency.replace(/\./g, '').replace(/,/g, '.'));
    this.props.action.onChangeInput(this.props.resource, {
      name,
      value: curency,
    });
  }

  _handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    let val = value;
    if (type === 'checkbox') {
      val = checked ? true : false;
    }

    this.props.action.onChangeInput(this.props.resource, { name, value: val });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      console.log(e.target.name);
      if (e.target.name) {
        e.preventDefault();
      }

      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

const mapStateToProps = function (state) {
  const {
    post,
    dataForm,
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
  } = state.default.module;

  return {
    post,
    dataForm,
    isDisableForm: isDisableForm(state.default.module),
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...actions,
        onChangeSelect: localActions.onChangeSelect,
      },
      dispatch
    ),
  };
};

Create.propTypes = {
  action: PropTypes.object,
  isDisableForm: PropTypes.bool,
  post: PropTypes.object,
  statusForm: PropTypes.string,
  focusElement: PropTypes.string,
  isSubmitted: PropTypes.bool,
  submitting: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
