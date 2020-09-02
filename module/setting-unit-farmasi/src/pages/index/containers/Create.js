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
    this.unit_farmasi = createRef();
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
                    width="7"
                    className="required field left aligned"
                  >
                    <label>{t(this._getKey('label.field.unit_farmasi'))}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="unit_farmasi"
                      ref={this.unit_farmasi}
                      value={post.unit_layanan}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="7" className="field left aligned">
                    <label>
                      {t(this._getKey('label.field.status_gudang'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Checkbox
                      value={post.st_gudang}
                      name="st_gudang"
                      inputRef={this.st_gudang}
                      checked={post.st_gudang ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'st_penjualan')}
                      label={''}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="7" className="field left aligned">
                    <label>{t(this._getKey('label.field.penjualan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Checkbox
                      value={post.st_penjualan}
                      name="st_penjualan"
                      inputRef={this.st_penjualan}
                      checked={post.st_penjualan ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'st_terima_resep')
                      }
                      label={''}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="7" className="field left aligned">
                    <label>
                      {t(this._getKey('label.field.terima_e_resep'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Checkbox
                      value={post.st_terima_resep}
                      name="st_terima_resep"
                      inputRef={this.st_terima_resep}
                      checked={post.st_terima_resep ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'unit_bank_darah')
                      }
                      label={''}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="7" className="field left aligned">
                    <label>
                      {t(this._getKey('label.field.unit_bank_darah'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Checkbox
                      value={post.st_unit_bank_darah}
                      name="st_unit_bank_darah"
                      inputRef={this.st_unit_bank_darah}
                      checked={post.st_unit_bank_darah ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'save')}
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

  _handleInputChange(e) {
    const { name, value, checked } = e.target;
    let val = checked ? true : false;
    this.props.action.onToggleCheck(this.props.resource, {
      name: name,
      value: val,
    });
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
