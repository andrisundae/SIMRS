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
import { Checkbox, CurrencyInput } from '@simrs/components';
import KomponenTarifSelector from './KomponenTarifSelector';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleKomponenTarifChange = this._handleKomponenTarifChange.bind(
      this
    );
    this._handleCurrencyChange = this._handleCurrencyChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.nama = createRef();
    this.nama_cetakan = createRef();
    this.tarif = createRef();
    this.detail_komponen = createRef();
    this.aktif = createRef();

    this.formId = 'form-create';
  }

  componentDidUpdate() {
    let { statusForm, focusElement } = this.props;

    if (
      statusForm === moduleActionTypes.ADD ||
      statusForm === moduleActionTypes.EDIT
    ) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          if (focusElement === 'tarif') {
            this[focusElement].current.theInput.focus();
          } else {
            this[focusElement].current.focus();
          }
        }
      }
    }
  }

  _handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    let val = '';
    if (type === 'checkbox') {
      val = checked ? true : '';
    } else {
      val = value;
    }
    this.props.action.onChangeInput(this.props.resource, { name, value: val });
  }

  _handleCurrencyChange(e, maskedValue, floatValue) {
    this.props.action.onChangeInput(this.props.resource, {
      name: 'tarif',
      value: floatValue,
    });
  }

  _handleKomponenTarifChange(value) {
    this.props.action.onChangeInput(this.props.resource, {
      name: 'detail_komponen',
      value,
    });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      e.preventDefault();
      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
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
                  <Grid.Column width="4" className="required field">
                    <label>{t(this._getKey('label.field.nama'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama"
                      ref={this.nama}
                      value={post.nama}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'nama_cetakan')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="required field">
                    <label>{t(this._getKey('label.field.nama_cetakan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama_cetakan"
                      ref={this.nama_cetakan}
                      value={post.nama_cetakan}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'tarif')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="required field">
                    <label>{t(this._getKey('label.field.tarif'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <CurrencyInput
                      name="tarif"
                      disabled={isDisableForm}
                      value={post.tarif}
                      onChangeEvent={this._handleCurrencyChange}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'detail_komponen')
                      }
                      inputRef={this.tarif}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>
                      {t(this._getKey('label.field.detail_komponen'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <KomponenTarifSelector
                      name="detail_komponen"
                      ref={this.detail_komponen}
                      value={post.detail_komponen || []}
                      isDisabled={isDisableForm}
                      onChange={this._handleKomponenTarifChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.status'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Checkbox
                      value={post.aktif}
                      name="aktif"
                      checked={post.aktif ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'save')}
                      inputRef={this.aktif}
                      label={t(this._getKey('sublabel.field.status'))}
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
    action: bindActionCreators(actions, dispatch),
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
