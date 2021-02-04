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
import { Checkbox, Select } from '@simrs/components';
import indexActions from '../actions';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleChangeJenisKlasifikasi = this._handleChangeJenisKlasifikasi.bind(
      this
    );
    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.nama = createRef();
    this.aktif = createRef();
    this.st_tarif_manual = createRef();
    this.jenis_klasifikasi = createRef();

    this.formId = 'form-create';
  }

  render() {
    let { optionsJenisKlasifikasi, post, isDisableForm, t } = this.props;

    return (
      <Form id={this.formId} size="small">
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="required field">
                    <label>
                      {t(this._getKey('label.field.jenis_klasifikasi'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="jenis_klasifikasi"
                      placeholder={t(
                        this._getKey('placeholder.field.jenis_klasifikasi')
                      )}
                      inputRef={this.jenis_klasifikasi}
                      isDisabled={isDisableForm}
                      onChange={this._handleChangeJenisKlasifikasi}
                      value={this._getJenisKlasifikasiValue()}
                      onKeyDown={(e) => this._onFocusElement(e, 'nama')}
                      options={optionsJenisKlasifikasi}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="required field">
                    <label>{t(this._getKey('label.field.nama'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="nama"
                      ref={this.nama}
                      value={post.nama}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'st_tarif_manual')
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t(this._getKey('tarif_manual'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Checkbox
                      value={post.st_tarif_manual}
                      name="st_tarif_manual"
                      checked={post.st_tarif_manual ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                      inputRef={this.st_tarif_manual}
                      label={t(this._getKey('ya'))}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t(this._getKey('label.field.status'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
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

  componentDidMount() {}

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

  _handleChangeJenisKlasifikasi(selected) {
    this.props.action.onChangeJenisKlasifikasi(this.props.resource, selected);
  }

  _getJenisKlasifikasiValue() {
    let { post } = this.props;
    let value = null;
    if (post.jenis_klasifikasi && post.nama_jenis_klasifikasi) {
      value = {
        value: post.jenis_klasifikasi,
        label: post.nama_jenis_klasifikasi,
      };
    }

    return value;
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
    data,
  } = state.default.module;

  return {
    post,
    isDisableForm: isDisableForm(state.default.module),
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
    optionsJenisKlasifikasi: data.options_jenis_klasifikasi,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...actions,
        populateForm: indexActions.populateForm,
        onChangeJenisKlasifikasi: indexActions.onChangeJenisKlasifikasi,
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
  optionsJenisKlasifikasi: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
