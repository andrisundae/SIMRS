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

    this.nama = createRef();
    this.jenjang = createRef();
    this.aktif = createRef();
    this.kode_mapping_bpjs = createRef();

    this.formId = 'form-create';
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
                  <Grid.Column width="5" className="required field">
                    <label>{t(this._getKey('label.field.nama'))}</label>
                  </Grid.Column>
                  <Grid.Column width="11" className="field">
                    <Input
                      name="nama"
                      ref={this.nama}
                      value={post.nama}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'jenjang')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="required field">
                    <label>{t(this._getKey('label.field.jenjang'))}</label>
                  </Grid.Column>
                  <Grid.Column width="11" className="field">
                    <Input
                      type="number"
                      name="jenjang"
                      ref={this.jenjang}
                      value={post.jenjang}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'kode_mapping_bpjs')
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>
                      {t(this._getKey('label.field.kode_mapping_bpjs'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="11" className="field">
                    <Input
                      name="kode_mapping_bpjs"
                      ref={this.kode_mapping_bpjs}
                      value={post.kode_mapping_bpjs || ''}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                      maxLength={5}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(this._getKey('label.field.status'))}</label>
                  </Grid.Column>
                  <Grid.Column width="11" className="field">
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
