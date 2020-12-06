import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Form, Grid, Input } from 'semantic-ui-react';
import CariDetail from '../components/CariDetail';

import {
  isDisableFormDetail,
  filterActions,
  detailActions,
  detailActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

import { withAppConsumer, CurrencyInput } from '@simrs/components';

class DetailForm extends Component {
  constructor(props) {
    super();

    this._createFormRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _createFormRef() {
    this.nama_barang = createRef();
    this.kode_barang = createRef();
    this.stok = createRef();
    this.satuan_terkecil = createRef();
    this.jumlah_pesan = createRef();
    this.harga_satuan = createRef();
  }

  _handleSubmit(e) {
    e.preventDefault;
  }

  _handleCurency(name, e) {
    let { t } = this.props;
    let curency = e;
    curency = parseFloat(curency.replace(/\./g, '').replace(/,/g, '.'));
    this.props.action.onChangeInput(this.props.resource, {
      name,
      value: curency,
    });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }

      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  componentDidUpdate() {
    let { statusForm, focusElement } = this.props;
    if (
      statusForm === detailActionTypes.ADD ||
      statusForm === detailActionTypes.EDIT
    ) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          switch (focusElement) {
            case 'jumlah_pesan':
            case 'harga_satuan':
              this[focusElement].current.theInput.focus();
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
    let { post, t, isDisableForm } = this.props;

    return (
      <Fragment>
        <Form id="detail-pemesanan" onSubmit={this._handleSubmit} size="mini">
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>
                        {t(this._getKey('label.field.kode_barang'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <Input
                        name="kode_barang"
                        ref={this.kode_barang}
                        value={post.kode_barang || ''}
                        disabled={true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>
                        {t(this._getKey('label.field.nama_barang'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <Input
                        name="nama_barang"
                        ref={this.nama_barang}
                        value={post.nama_barang || ''}
                        disabled={true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>
                        {t(this._getKey('label.field.satuan_terkecil'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <Input
                        name="satuan_terkecil"
                        ref={this.satuan_terkecil}
                        value={post.satuan_terkecil || ''}
                        disabled={true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t(this._getKey('label.field.stok'))}</label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <Input
                        name="stok"
                        ref={this.stok}
                        value={post.stok || ''}
                        disabled={true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>
                        {t(this._getKey('label.field.jumlah_pesan'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <CurrencyInput
                        name="jumlah_pesan"
                        inputRef={this.jumlah_pesan}
                        value={parseFloat(post.jumlah_pesan)}
                        disabled={isDisableForm}
                        thousandSeparator="."
                        selectAllOnFocus={true}
                        onChange={(e) => this._handleCurency('jumlah_pesan', e)}
                        onKeyDown={(e) =>
                          this._onFocusElement(e, 'harga_satuan')
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>
                        {t(this._getKey('label.field.harga_satuan'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <CurrencyInput
                        name="harga_satuan"
                        inputRef={this.harga_satuan}
                        value={parseFloat(post.harga_satuan)}
                        disabled={isDisableForm}
                        precision={2}
                        decimalSeparator=","
                        thousandSeparator="."
                        selectAllOnFocus={true}
                        onChange={(e) => this._handleCurency('harga_satuan', e)}
                        onKeyDown={(e) => this._onFocusElement(e, 'save')}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        {this.props.show && <CariDetail {...this.props} />}
      </Fragment>
    );
  }
}

const mapStateToProps = function (state) {
  const { filter, detail } = state.default;

  return {
    post: detail.post,
    statusForm: detail.statusForm,
    focusElement: detail.focusElement,
    show: filter.filter_modal.detail_modal.show,
    isDisableForm: !isDisableFormDetail(detail),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...detailActions,
        // onChangeSelect: localAction.onChangeSelect,
        onOpenDialog: filterActions.onOpenDialog,
      },
      dispatch
    ),
  };
};

DetailForm.propTypes = {
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
)(withAppConsumer(DetailForm));
