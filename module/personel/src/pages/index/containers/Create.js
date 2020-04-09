import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Input, Grid, Header, Segment, Icon } from 'semantic-ui-react';

import {
  isDisableForm,
  moduleActions,
  moduleActionTypes,
} from '@simrs/main/src/modules/master/default';
import { Select, Checkbox } from '@simrs/components';
import { isGranted } from '@simrs/main/src/modules/auth';

import actions from '../actions';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.nip = createRef();
    this.nama = createRef();
    this.inisial = createRef();
    this.id_jenis_kelamin = createRef();
    this.telp = createRef();
    this.id_pendidikan = createRef();
    this.id_jenis_pegawai = createRef();
    this.id_spesialisasi_pegawai = createRef();
    this.id_jabatan_fungsional = createRef();
    this.alias_status_aplikasi = createRef();
    this.username = createRef();
    this.password = createRef();

    this.form = 'form-create';
  }

  render() {
    const {
      post,
      isDisableForm,
      statusForm,
      customPermissions,
      t,
    } = this.props;

    return (
      <Form id={this.formId} size="small">
        <Grid>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.nip'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Input
                name="nip"
                ref={this.nip}
                value={post.nip || ''}
                disabled={isDisableForm}
                onChange={this._handleInputChange}
                onKeyDown={(e) => this._onFocusElement(e, 'nama')}
                maxLength={20}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.nama'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Input
                name="nama"
                ref={this.nama}
                value={post.nama || ''}
                disabled={isDisableForm}
                onChange={this._handleInputChange}
                onKeyDown={(e) => this._onFocusElement(e, 'inisial')}
                maxLength={70}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.inisial'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Input
                name="inisial"
                ref={this.inisial}
                value={post.inisial || ''}
                disabled={isDisableForm}
                onChange={this._handleInputChange}
                onKeyDown={(e) => this._onFocusElement(e, 'id_jenis_kelamin')}
                maxLength={5}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.jenis_kelamin'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Select
                name="id_jenis_kelamin"
                placeholder={t(this._getKey('placeholder.field.jenis_kelamin'))}
                inputRef={this.id_jenis_kelamin}
                isDisabled={isDisableForm}
                value={this._getSelect2Value('id_jenis_kelamin')}
                // value={selectedOptions.id_jenis_kelamin}
                onChange={(selected) =>
                  this._handleSelect2Change('id_jenis_kelamin', selected)
                }
                onKeyDown={(e) => this._onFocusElement(e, 'telp')}
                options={this.props.optionsJenisKelamin}
                isClearable={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.telp'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Input
                name="telp"
                ref={this.telp}
                value={post.telp || ''}
                disabled={isDisableForm}
                onChange={this._handleInputChange}
                onKeyDown={(e) => this._onFocusElement(e, 'id_pendidikan')}
                maxLength={20}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.pendidikan'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Select
                name="id_pendidikan"
                placeholder={t(this._getKey('placeholder.field.pendidikan'))}
                inputRef={this.id_pendidikan}
                isDisabled={isDisableForm}
                value={this._getSelect2Value('id_pendidikan')}
                onChange={(selected) =>
                  this._handleSelect2Change('id_pendidikan', selected)
                }
                onKeyDown={(e) => this._onFocusElement(e, 'id_jenis_pegawai')}
                options={this.props.optionsPendidikan}
                isClearable={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.jenis_pegawai'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Select
                name="id_jenis_pegawai"
                placeholder={t(this._getKey('placeholder.field.jenis_pegawai'))}
                inputRef={this.id_jenis_pegawai}
                isDisabled={isDisableForm}
                value={this._getSelect2Value('id_jenis_pegawai')}
                onChange={(selected) =>
                  this._handleSelect2Change('id_jenis_pegawai', selected)
                }
                onKeyDown={(e) =>
                  this._onFocusElement(e, 'id_spesialisasi_pegawai')
                }
                options={this.props.optionsJenisPegawai}
                isClearable={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>
                {t(this._getKey('label.field.spesialisasi_pegawai'))}
              </label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Select
                name="id_spesialisasi_pegawai"
                placeholder={t(
                  this._getKey('placeholder.field.spesialisasi_pegawai')
                )}
                inputRef={this.id_spesialisasi_pegawai}
                isDisabled={isDisableForm}
                value={this._getSelect2Value('id_spesialisasi_pegawai')}
                onChange={(selected) =>
                  this._handleSelect2Change('id_spesialisasi_pegawai', selected)
                }
                onKeyDown={(e) =>
                  this._onFocusElement(e, 'id_jabatan_fungsional')
                }
                options={this.props.optionsSpesialisasi}
                isClearable={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>{t(this._getKey('label.field.jabatan_fungsional'))}</label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Select
                name="id_jabatan_fungsional"
                placeholder={t(
                  this._getKey('placeholder.field.jabatan_fungsional')
                )}
                inputRef={this.id_jabatan_fungsional}
                isDisabled={isDisableForm}
                value={this._getSelect2Value('id_jabatan_fungsional')}
                onChange={(selected) =>
                  this._handleSelect2Change('id_jabatan_fungsional', selected)
                }
                onKeyDown={(e) =>
                  this._onFocusElement(e, 'alias_status_aplikasi')
                }
                options={this.props.optionsJabatanFungsional}
                isClearable={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="form-row">
            <Grid.Column width="5" className="required field">
              <label>
                {t(this._getKey('label.field.alias_status_aplikasi'))}
              </label>
            </Grid.Column>
            <Grid.Column width="11" className="field">
              <Select
                name="alias_status_aplikasi"
                placeholder={t(
                  this._getKey('placeholder.field.alias_status_aplikasi')
                )}
                inputRef={this.alias_status_aplikasi}
                isDisabled={isDisableForm}
                value={this._getSelect2Value('alias_status_aplikasi')}
                onChange={(selected) =>
                  this._handleSelect2Change('alias_status_aplikasi', selected)
                }
                onKeyDown={(e) =>
                  this._onFocusElement(
                    e,
                    this._isNotPelaksana() ? 'username' : 'grup_0'
                  )
                }
                options={this.props.optionsStatusAplikasi}
                isClearable={false}
              />
            </Grid.Column>
          </Grid.Row>
          {this._isNotPelaksana() && (
            <Fragment>
              <Grid.Row className="form-row">
                <Grid.Column width="5" className="required field">
                  <label>{t(this._getKey('label.field.username'))}</label>
                </Grid.Column>
                <Grid.Column width="11" className="field">
                  <Input
                    name="username"
                    ref={this.username}
                    value={post.username}
                    disabled={isDisableForm}
                    onChange={this._handleInputChange}
                    onKeyDown={(e) =>
                      this._onFocusElement(
                        e,
                        statusForm === moduleActionTypes.ADD
                          ? 'password'
                          : 'grup_0'
                      )
                    }
                    maxLength={70}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="5" className="required field">
                  <label>{t(this._getKey('label.field.password'))}</label>
                </Grid.Column>
                <Grid.Column width="11" className="field">
                  <Input
                    type="password"
                    name="password"
                    ref={this.password}
                    value={post.password}
                    disabled={
                      statusForm === moduleActionTypes.ADD ? false : true
                    }
                    onChange={this._handleInputChange}
                    onKeyDown={(e) => this._onFocusElement(e, 'grup_0')}
                    maxLength={70}
                  />
                </Grid.Column>
              </Grid.Row>
            </Fragment>
          )}
        </Grid>
        {customPermissions.canSettingGroup && (
          <Fragment>
            <Header as="h5" attached="top" block>
              <Icon name="list alternate" />
              Grup Personel
            </Header>
            <Segment attached size="mini">
              <Grid columns="2">
                {this.props.optionsGrup.map((grup, index) => {
                  let selectedGrup = post.grups.find((row) => row === grup.id);
                  let isSelected = selectedGrup ? true : false;

                  return (
                    <Grid.Column key={grup.id}>
                      <Checkbox
                        value={grup.id}
                        checked={isSelected}
                        disabled={isDisableForm}
                        onChange={(e) =>
                          this._handleGrupChange(e, isSelected, index)
                        }
                        inputRef={(input) => (this['grup_' + index] = input)}
                        onKeyDown={(e) =>
                          this._onFocusElement(
                            e,
                            this._countGroup() - 1 === index
                              ? 'save'
                              : `grup_${index + 1}`
                          )
                        }
                        label={grup.nama}
                      />
                    </Grid.Column>
                  );
                })}
              </Grid>
            </Segment>
          </Fragment>
        )}
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
        } else {
          this[focusElement].focus();
        }
      }
    }
  }

  _countGroup() {
    return this.props.optionsGrup.length;
  }

  _isNotPelaksana() {
    const { post } = this.props;
    return post.alias_status_aplikasi &&
      post.alias_status_aplikasi.toUpperCase() !== 'PELAKSANA'
      ? true
      : false;
  }

  _getSelect2Value(element) {
    let selectedValue = this.props.post[element];
    let value = null;

    if (selectedValue) {
      switch (element) {
        case 'id_jenis_kelamin':
          value = this.props.optionsJenisKelamin.find(
            (row) => row.value === selectedValue
          );
          break;
        case 'id_pendidikan':
          value = this.props.optionsPendidikan.find(
            (row) => row.value === selectedValue
          );
          break;
        case 'id_jenis_pegawai':
          value = this.props.optionsJenisPegawai.find(
            (row) => row.value === selectedValue
          );
          break;

        case 'id_spesialisasi_pegawai':
          value = this.props.optionsJenisPegawai.find(
            (row) => row.value === selectedValue
          );
          break;
        case 'id_jabatan_fungsional':
          value = this.props.optionsJabatanFungsional.find(
            (row) => row.value === selectedValue
          );
          break;
        case 'alias_status_aplikasi':
          value = this.props.optionsStatusAplikasi.find(
            (row) => row.value === selectedValue
          );
          break;
        default:
          break;
      }
    }

    return value;
  }

  _handleSelect2Change(element, selected) {
    this.props.action.onSelect2Change(this.props.resource, element, selected);
  }

  _handleInputChange(e) {
    const { name, value } = e.target;
    this.props.action.onChangeInput(this.props.resource, { name, value });
  }

  _handleGrupChange(e, isSelected, index) {
    const { value } = e.target;
    this.props.action.onGrupChange(this.props.resource, {
      value: parseInt(value),
      index,
      isSelected,
    });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      if (nameRef === 'save') {
        e.preventDefault();
      }

      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

const mapStateToProps = function (state, props) {
  const { module } = state.default;
  const {
    post,
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
    data,
  } = module;

  return {
    post,
    isDisableForm: isDisableForm(state.default.module),
    statusForm,
    focusElement,
    isSubmitted,
    submitting,
    optionsJenisKelamin: data.options_jenis_kelamin,
    optionsPendidikan: data.options_pendidikan,
    optionsJenisPegawai: data.options_jenis_pegawai,
    optionsSpesialisasi: data.options_spesialisasi,
    optionsJabatanFungsional: data.options_jabatan_fungsional,
    optionsStatusAplikasi: data.options_status_aplikasi,
    optionsGrup: data.options_grup,
    customPermissions: {
      canSettingGroup: isGranted(props.permissions, 'setting_grup'),
    },
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...moduleActions,
        populateForm: actions.populateForm.request,
        onSelect2Change: actions.onSelect2Change,
        onGrupChange: actions.onGrupChange,
      },
      dispatch
    ),
  };
};

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
  optionsJenisKelamin: PropTypes.array,
  optionsPendidikan: PropTypes.array,
  optionsJenisPegawai: PropTypes.array,
  optionsSpesialisasi: PropTypes.array,
  optionsJabatanFungsional: PropTypes.array,
  optionsStatusAplikasi: PropTypes.array,
  optionsGrup: PropTypes.array,
  permissions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
