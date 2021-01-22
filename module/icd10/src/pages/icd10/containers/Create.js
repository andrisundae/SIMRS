import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, TextArea } from 'semantic-ui-react';
import { remote } from 'electron';

import {
  isDisableForm,
  moduleActions as actions,
} from '@simrs/main/src/modules/master/nested';
import { Checkbox } from '@simrs/components';

const { ipcMain } = remote;

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);
    this._handleFocusingField = this._handleFocusingField.bind(this);

    this.nama = createRef();
    this.kode = createRef();
    this.aktif = createRef();

    this.formId = 'form-create';
  }

  render() {
    let { post, isDisableForm, t } = this.props;

    return (
      <Form id={this.formId} size="mini">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="w-16">
              <label className="after:required-flag">
                {t(this._getKey('label.field.kode'))}
              </label>
            </div>
            <div className="w-60">
              <Input
                fluid
                name="kode"
                ref={this.kode}
                value={post.kode}
                disabled={isDisableForm}
                onChange={this._handleInputChange}
                onKeyDown={(e) => this._onFocusElement(e, 'nama')}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-16">
              <label className="after:required-flag">
                {t(this._getKey('label.field.nama'))}
              </label>
            </div>
            <div className="w-60">
              <Input
                fluid
                name="nama"
                ref={this.nama}
                value={post.nama}
                disabled={isDisableForm}
                onChange={this._handleInputChange}
                onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-16">
              <label>{t(this._getKey('label.field.status'))}</label>
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </Form>
    );
  }

  componentDidMount() {
    ipcMain.on('focusing-field', this._handleFocusingField);
  }

  componentWillUnmount() {
    ipcMain.removeListener('focusing-field', this._handleFocusingField);
  }

  _handleInputChange(e) {
    const { name, value, checked, type } = e.target;
    let val = '';
    if (type === 'checkbox') {
      val = checked ? true : '';
    } else {
      val = value;
    }
    this.props.action.onChangeInput(
      this.props.resource,
      this.props.subResource,
      { name, value: val }
    );
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      e.preventDefault();
      this.props.action.onFocusElement(
        this.props.resource,
        this.props.subResource,
        nameRef
      );
    }
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _handleFocusingField() {
    const { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }
  }
}

const mapStateToProps = function (state) {
  const {
    post,
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
  } = state.nested.module;

  return {
    post,
    isDisableForm: isDisableForm(state.nested.module),
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
  resource: PropTypes.string.isRequired,
  subResource: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
