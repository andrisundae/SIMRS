import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid } from 'semantic-ui-react';

import { isDisableForm, moduleActions as actions, moduleActionTypes } from '@simrs/main/src/modules/master/default';
import { Select, CurrencyInput } from '@simrs/components';
import indexActions from '../actions';
import SettingCounter from './SettingCounter';

class Create extends Component {
  constructor(props) {
      super(props);

      this._handleInputChange = this._handleInputChange.bind(this);
      this._handleFormatTanggalChange = this._handleFormatTanggalChange.bind(this);
      this._handleTypeResetChange = this._handleTypeResetChange.bind(this);
      this._onFocusElement = this._onFocusElement.bind(this);
      this._handleJumlahDigitChange = this._handleJumlahDigitChange.bind(this);

      this.alias = createRef();
      this.prefix = createRef();
      this.format_tanggal = createRef();
      this.type_reset = createRef();
      this.jumlah_digit = createRef();

      this.formId = 'form-create';
  }

  componentDidUpdate() {
    let { statusForm, focusElement } = this.props;
    if (statusForm === moduleActionTypes.ADD || statusForm === moduleActionTypes.EDIT) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          if (focusElement === 'jumlah_digit') {
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
      val = checked ? true : ''
    } else {
      val = value;
    }
    this.props.action.onChangeInput(this.props.resource, { name, value: val });
  }

  _handleFormatTanggalChange(selected) {
    this.props.action.onChangeSelect2(this.props.resource, 'format_tanggal', selected);
  }

  _handleTypeResetChange(selected) {
    this.props.action.onChangeSelect2(this.props.resource, 'type_reset', selected);
  }

  _handleJumlahDigitChange(e, maskedValue, floatValue) {
    this.props.action.onChangeInput(this.props.resource, { name: 'jumlah_digit', value: floatValue });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _getSelect2Value(name) {
    let { post } = this.props;
    let value = null;
    if (post[name]) {
      value = { value: post[name], label: post[name] };
    }

    return value;
  }

  _getKey(key) {
      return `${this.props.resource}:${key}`;
  }

  render() {
    let { optionsFormatTanggal, optionsTypeReset, post, isDisableForm, t } = this.props;

    return (
      <Form id={this.formId} size="small">
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="required field">
                      <label>{t(this._getKey('label.field.alias'))}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input
                          name="alias"
                          ref={this.alias}
                          value={post.alias}
                          disabled={isDisableForm}
                          onChange={this._handleInputChange}
                          onKeyDown={(e) => this._onFocusElement(e, 'prefix')}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="required field">
                      <label>{t(this._getKey('label.field.prefix'))}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input
                        name="prefix"
                        ref={this.prefix}
                        value={post.prefix}
                        disabled={isDisableForm}
                        onChange={this._handleInputChange}
                        onKeyDown={(e) => this._onFocusElement(e, 'jumlah_digit')}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="required field">
                      <label>{t(this._getKey('label.field.jumlah_digit'))}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <CurrencyInput
                        name="jumlah_digit"
                        inputRef={this.jumlah_digit}
                        value={post.jumlah_digit}
                        disabled={isDisableForm}
                        onChangeEvent={this._handleJumlahDigitChange}
                        onKeyDown={(e) => this._onFocusElement(e, 'format_tanggal')}
                        decimalSeparator=""
                        thousandSeparator=""
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="required field">
                      <label>{t(this._getKey('label.field.format_tanggal'))}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Select
                        name="format_tanggal"
                        placeholder={t(this._getKey('placeholder.field.format_tanggal'))}
                        inputRef={this.format_tanggal}
                        isDisabled={isDisableForm}
                        onChange={this._handleFormatTanggalChange}
                        value={this._getSelect2Value('format_tanggal')}
                        onKeyDown={(e) => this._onFocusElement(e, 'type_reset')}
                        options={optionsFormatTanggal}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="required field">
                      <label>{t(this._getKey('label.field.type_reset'))}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Select
                        name="type_reset"
                        placeholder={t(this._getKey('placeholder.field.type_reset'))}
                        inputRef={this.type_reset}
                        isDisabled={isDisableForm}
                        onChange={this._handleTypeResetChange}
                        value={this._getSelect2Value('type_reset')}
                        onKeyDown={(e) => this._onFocusElement(e, 'save')}
                        options={optionsTypeReset}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.props.showSettingCounter &&
            <SettingCounter {...this.props} />
          }
      </Form>
      )
  }
}

const mapStateToProps = function (state) {
  const { post, statusForm, focusElement, isSubmitted, submitting, data, settingCounter } = state.default.module;

  return {
    post,
    isDisableForm: isDisableForm(state.default.module),
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
    optionsFormatTanggal: data.options_format_tanggal,
    optionsTypeReset: data.options_type_reset,
    showSettingCounter: settingCounter.show
  }
}

const mapDispatchToProps = function (dispatch) {
    return {
      action: bindActionCreators(
        {
          ...actions,
          populateForm: indexActions.populateForm.request,
          onChangeSelect2: indexActions.onChangeSelect2,
        },
        dispatch
      ),
    }
}

Create.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func,
  action: PropTypes.object,
  isDisableForm: PropTypes.bool,
  post: PropTypes.object,
  statusForm: PropTypes.string,
  focusElement: PropTypes.string,
  isSubmitted: PropTypes.bool,
  submitting: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  optionsFormatTanggal: PropTypes.array,
  optionsTypeReset: PropTypes.array,
  showSettingCounter: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
