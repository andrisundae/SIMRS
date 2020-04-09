import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, Divider } from 'semantic-ui-react';

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
    this._handleJenisLayananChange = this._handleJenisLayananChange.bind(this);
    this._handleKelompokJenisLayananChange = this._handleKelompokJenisLayananChange.bind(
      this
    );
    this._onFocusElement = this._onFocusElement.bind(this);

    this.nama = createRef();
    this.aktif = createRef();
    this.st_sebagai_asal_kunjungan = createRef();
    this.jenis_layanan = createRef();
    this.kelompok_jenis_layanan = createRef();

    this.formId = 'form-create';
  }

  render() {
    let {
      optionsJenisLayanan,
      optionsKelompokJenisLayanan,
      post,
      isDisableForm,
      t,
    } = this.props;

    return (
      <Form id={this.formId} size="small">
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
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
                        this._onFocusElement(e, 'jenis_layanan')
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="required field">
                    <label>
                      {t(this._getKey('label.field.jenis_layanan'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="jenis_layanan"
                      placeholder={t(
                        this._getKey('placeholder.field.jenis_layanan')
                      )}
                      inputRef={this.jenis_layanan}
                      isDisabled={isDisableForm}
                      onChange={this._handleJenisLayananChange}
                      value={this._getJenisLayananValue()}
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'kelompok_jenis_layanan')
                      }
                      options={optionsJenisLayanan}
                      isClearable={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="required field">
                    <label>
                      {t(this._getKey('label.field.kelompok_jenis_layanan'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="kelompok_jenis_layanan"
                      placeholder={t(
                        this._getKey('placeholder.field.kelompok_jenis_layanan')
                      )}
                      inputRef={this.kelompok_jenis_layanan}
                      isDisabled={isDisableForm}
                      value={this._getKelompokJenisLayananValue()}
                      onChange={this._handleKelompokJenisLayananChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'aktif')}
                      options={optionsKelompokJenisLayanan}
                      isClearable={false}
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
                      onKeyDown={(e) =>
                        this._onFocusElement(e, 'st_sebagai_asal_kunjungan')
                      }
                      inputRef={this.aktif}
                      label={t(this._getKey('sublabel.field.status'))}
                    />
                    <Divider fitted style={{ marginTop: 5, marginBottom: 4 }} />
                    <Checkbox
                      value={post.st_sebagai_asal_kunjungan}
                      name="st_sebagai_asal_kunjungan"
                      checked={post.st_sebagai_asal_kunjungan ? true : false}
                      disabled={isDisableForm}
                      onChange={this._handleInputChange}
                      onKeyDown={(e) => this._onFocusElement(e, 'save')}
                      inputRef={this.st_sebagai_asal_kunjungan}
                      label={t(
                        this._getKey('sublabel.field.st_sebagai_asal_kunjungan')
                      )}
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

  _handleJenisLayananChange(selected) {
    this.props.action.onChangeSelect2(
      this.props.resource,
      'jenis_layanan',
      selected
    );
  }

  _handleKelompokJenisLayananChange(selected) {
    this.props.action.onChangeSelect2(
      this.props.resource,
      'kelompok_jenis_layanan',
      selected
    );
  }

  _getJenisLayananValue() {
    let { post } = this.props;
    let value = null;
    if (post.jenis_layanan && post.nama_jenis_layanan) {
      value = { value: post.jenis_layanan, label: post.nama_jenis_layanan };
    }

    return value;
  }

  _getKelompokJenisLayananValue() {
    let { post } = this.props;
    let value = null;
    if (post.kelompok_jenis_layanan && post.nama_kelompok_jenis_layanan) {
      value = {
        value: post.kelompok_jenis_layanan,
        label: post.nama_kelompok_jenis_layanan,
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
    optionsJenisLayanan: data.options_jenis_layanan,
    optionsKelompokJenisLayanan: data.options_kelompok_jenis_layanan,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...actions,
        populateForm: indexActions.populateForm,
        onChangeSelect2: indexActions.onChangeSelect2,
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
  optionsJenisLayanan: PropTypes.array,
  optionsKelompokJenisLayanan: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
