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
import { Checkbox } from '@simrs/components';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.formId = 'form-create';

    this._createFormRef();
  }

  _createFormRef() {
    this.nama = createRef();
    this.alamat = createRef();
    this.email = createRef();
    this.telp = createRef();
    this.npwp = createRef();
    this.alias = createRef();
    this.nama_cp = createRef();
    this.telp_cp = createRef();
    this.aktif = createRef();
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
                  <Grid.Column
                    width="4"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.nama'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama"
                      ref={this.nama}
                      value={post.nama}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'alamat')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="left aligned field">
                    <label>{t(this._getKey('label.field.alamat'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="alamat"
                      ref={this.alamat}
                      value={post.alamat}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'email')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="left aligned field">
                    <label>{t(this._getKey('label.field.email'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="email"
                      ref={this.email}
                      value={post.email}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'telp')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="left aligned field">
                    <label>{t(this._getKey('label.field.telp'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="telp"
                      ref={this.telp}
                      value={post.telp}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'npwp')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="left aligned field">
                    <label>{t(this._getKey('label.field.npwp'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="npwp"
                      ref={this.npwp}
                      value={post.npwp}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'nama_cp')}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field left aligned">
                    <label>{t(this._getKey('label.field.nama_cp'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama_cp"
                      ref={this.nama_cp}
                      value={post.nama_cp}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'telp_cp')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field left aligned">
                    <label>{t(this._getKey('label.field.telp_cp'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="telp_cp"
                      ref={this.telp_cp}
                      value={post.telp_cp}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="4"
                    className="field required left aligned"
                  >
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
                      label={''}
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
          this[focusElement].current.focus();
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

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      e.preventDefault();
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
