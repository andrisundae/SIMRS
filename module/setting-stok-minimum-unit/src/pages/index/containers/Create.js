import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid } from 'semantic-ui-react';

import {
  isDisableForm,
  moduleActions as actions,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/default';

import { CurrencyInput } from '@simrs/components';

import localActions from '../actions';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleCurency = this._handleCurency.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.formId = 'form-create';

    this._createFormRef();
  }

  _createFormRef() {
    this.stok_minimum = createRef();
    this.stok_maximum = createRef();
  }

  render() {
    let { post, isDisableForm, t } = this.props;

    return (
      <Form id={this.formId} size="small">
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="7" className="field left aligned">
                    <label>{t(this._getKey('label.field.kode_barcode'))}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="kode_barcode"
                      ref={this.kode_barcode}
                      value={post.kode_barcode || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="7" className="field left aligned">
                    <label>{t(this._getKey('label.field.nama_barang'))}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="nama_barang"
                      ref={this.nama_barang}
                      value={post.nama_barang}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="7" className="field left aligned">
                    <label>
                      {t(this._getKey('label.field.satuan_terkecil'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="satuan_terkecil"
                      ref={this.satuan_terkecil}
                      value={post.satuan_terkecil}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="7"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.stok_minimum'))}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <CurrencyInput
                      name="stok_minimum"
                      inputRef={this.stok_minimum}
                      value={parseFloat(post.stok_minimum)}
                      disabled={isDisableForm}
                      precision={0}
                      selectAllOnFocus={true}
                      thousandSeparator="."
                      onChange={(e) => this._handleCurency('stok_minimum', e)}
                      onKeyDown={(e) => this._onFocusElement(e, 'stok_maximum')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="7"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.stok_maximum'))}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <CurrencyInput
                      name="stok_maximum"
                      inputRef={this.stok_maximum}
                      value={parseFloat(post.stok_maximum)}
                      disabled={isDisableForm}
                      precision={0}
                      selectAllOnFocus={true}
                      thousandSeparator="."
                      onChange={(e) => this._handleCurency('stok_maximum', e)}
                      onKeyDown={(e) => this._onFocusElement(e, 'save')}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
            case 'stok_minimum':
            case 'stok_maximum':
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

  _handleCurency(name, e) {
    let curency = parseFloat(e.replace(/\./g, ''));

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

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

const mapStateToProps = function (state) {
  const {
    post,
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
  } = state.default.module;

  return {
    post,
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
        onToggleCheck: localActions.onToggleCheck,
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
