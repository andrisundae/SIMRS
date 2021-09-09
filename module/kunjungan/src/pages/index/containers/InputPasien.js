import React, { Component, createRef } from 'react';
import { Grid, Divider, Input, Placeholder } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { formatter } from '@simrs/common';
import PropTypes from 'prop-types';

import { Select, Radio, DatePicker } from '@simrs/components';

import CariAlamat from '../components/CariAlamat';
import BiayaTindakan from '../components/BiayaTindakan';
import {
  OptionAsalKunjungan,
  OptionInstalasi,
  OptionKelasKamar,
  AsalKunjunganSingleValue,
  OptionStatusPasien,
} from '../components/CustomOptions';

import actions from '../redux/actions';
import actionTypes from '../redux/actionTypes';
import {
  isDisable,
  isDisabledKelompok,
  isDisabledUnitLayanan,
  isDisabledBiayaLain,
} from '../redux/selectors';
import { staticConst } from '../static';

class InputPasien extends Component {
  constructor(props) {
    super(props);

    this._onFocusElement = this._onFocusElement.bind(this);
    this.setFocus = this.setFocus.bind(this);

    this.radio_jenis_umur = createRef();
    this.radio_jenis_tgl_lahir = createRef();
    this.tgl_lahir = createRef();
    this.tgl_kunjungan = createRef();
    this.jam_kunjungan = createRef();
    this.tgl_jaminan = createRef();
    this.tgl_cetak_jaminan = createRef();
    this.umur = createRef();
    this.jenis_umur = createRef();
    this.alamat = createRef();
    this.rt = createRef();
    this.rw = createRef();
    this.id_desa = createRef();

    this.id_penjamin_pasien = createRef();
    this.nomor_anggota = createRef();
    this.id_kelas_penjamin_pasien = createRef();
    this.id_kepersertaan = createRef();
    this.id_asal_masuk = createRef();
    this.id_asal_masuk_detail = createRef();
    this.id_penjamin = createRef();
    this.id_kelompok = createRef();
    this.id_instalasi = createRef();
    this.id_unit_layanan = createRef();
    this.id_kelas = createRef();
    this.id_dpjp = createRef();
    this.id_kunjungan_asal = createRef();
  }

  componentDidUpdate() {
    this.setFocus();
  }

  setFocus() {
    let { statusForm, focusElement } = this.props;
    if (
      statusForm === actionTypes.READY ||
      statusForm === actionTypes.ADD ||
      statusForm === actionTypes.ADD_WITH_SELECTED
    ) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          if (focusElement === 'tgl_lahir') {
            this[focusElement].current.setFocus();
          } else if (focusElement === 'tarif') {
            this[focusElement].current.theInput.focus();
          } else {
            this[focusElement].current.focus();
          }
        } else {
          this[focusElement].focus();
        }
      }
    }
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

  select2ChangeHanlder = (name, selected, isTindakan = false) => {
    this.props.action.onChangeSelect2(
      this.props.resource,
      name,
      selected,
      isTindakan
    );
  };

  onSelectedWilayahHandler = (data) => {
    this.props.action.onSelectedWilayah(this.props.resource, data);
  };

  getAsalMasukDetailOptions = () => {
    const { post, data } = this.props;
    let options = [];
    if (post.id_asal_masuk) {
      options = data.options_asal_masuk_detail.filter(
        (item) => item.asal_masuk_id === post.id_asal_masuk
      );
    }

    return options;
  };

  getInstalasiOptions = () => {
    const { post, data } = this.props;
    let options = [];
    if (post.id_kelompok) {
      options = data.options_instalasi.filter(
        (item) => item.kelompok_id === post.id_kelompok
      );
    }

    return options;
  };

  getUnitLayananOptions = () => {
    const { post, data } = this.props;
    let options = [];
    if (post.id_instalasi) {
      options = data.options_unit_layanan.filter(
        (item) => item.instalasi_id === post.id_instalasi
      );
    }

    return options;
  };

  inputChangeHandler = (e) => {
    const { name, value, checked, type } = e.target;
    const { resource, action } = this.props;
    let val = '';
    if (type === 'checkbox') {
      val = checked ? true : '';
    } else {
      val = value;
    }
    action.onChangeInput(resource, { name, value: val });
  };

  dateTimeChangeHandler = (name, date) => {
    const { resource, action } = this.props;
    action.onChangeInput(resource, { name, value: date });
  };

  renderDividerBiayaTambahan = () => {
    return (
      <Divider horizontal style={{ marginTop: 20, marginBottom: 20 }}>
        {this.props.t(this._getKey('label.field.biaya_tambahan'))}
      </Divider>
    );
  };

  renderJenisKlasifikasiRegistrasi = () => {
    const {
      data,
      loaderOptionsByUnitLayanan,
      selectedOption,
      disabledBiayaLain,
    } = this.props;

    if (loaderOptionsByUnitLayanan) {
      return (
        <React.Fragment>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </React.Fragment>
      );
    }

    const jenisKlasifikasiRegistrasi = [];
    const dataKeys = Object.keys(data.jenis_klasifikasi_registrasi);
    dataKeys.forEach((key, index) => {
      const dataSetting = data.jenis_klasifikasi_registrasi[key];
      const nextKey = dataKeys[index + 1] ? dataKeys[index + 1] : 'save';

      jenisKlasifikasiRegistrasi.push(
        <Grid.Row className="form-row" key={key}>
          <Grid.Column width="4" className="field">
            <label>{dataSetting.nama}</label>
          </Grid.Column>
          <Grid.Column width="9" className="field">
            <Select
              name={key}
              options={dataSetting.options}
              isDisabled={disabledBiayaLain}
              // isClearable={false}
              value={selectedOption[key] ? selectedOption[key] : null}
              onChange={(selected) =>
                this.select2ChangeHanlder(key, selected, true)
              }
              inputRef={(ref) => (this[key] = ref)}
              onKeyDown={(e) => this._onFocusElement(e, nextKey)}
            />
          </Grid.Column>
          <BiayaTindakan
            label={
              selectedOption[key]
                ? formatter.currency(selectedOption[key].tarif)
                : 0
            }
          />
        </Grid.Row>
      );
    });

    return <Grid>{jenisKlasifikasiRegistrasi.map((row) => row)}</Grid>;
  };

  isRawatInap = () => {
    const { selectedOption } = this.props;
    let isRawatInap = false;
    if (selectedOption.id_instalasi) {
      if (
        selectedOption.id_instalasi.alias_jenis_layanan ===
        staticConst.RAWAT_INAP_ALIAS
      ) {
        isRawatInap = true;
      }
    }

    return isRawatInap;
  };

  isShowAsalKunjungan = () => {
    const { selectedOption } = this.props;
    let isShowAsalKunjungan = false;
    if (selectedOption.id_unit_layanan) {
      if (selectedOption.id_unit_layanan.status_asal_kunjungan === 1) {
        isShowAsalKunjungan = true;
      }
    }

    return isShowAsalKunjungan;
  };

  getFirstJenisKlasifikasiRegistrasi = () => {
    const { data } = this.props;

    return Object.keys(data.jenis_klasifikasi_registrasi)[0];
  };

  openMenuStatusPasienHandler = () => {
    this.props.action.onOpenMenuStatusPasien(this.props.resource);
  };

  closeMenuStatusPasienHandler = () => {
    this.props.action.onCloseMenuStatusPasien(this.props.resource);
  };

  keyDownDesaHandler = (e) => {
    if (e.which === 13) {
      if (!e.target.value) {
        this.props.action.toggleShowCariWilayah(this.props.resource);
      } else {
        this._onFocusElement(e, 'id_penjamin_pasien');
      }
    }
  };

  render() {
    const {
      t,
      showCariWilayah,
      data,
      selectedOption,
      resource,
      filterWilayah,
      loaderOptionsByUnitLayanan,
      loaderSettingKelasPenjamin,
      action,
      datatable,
      post,
      optionsKelasPenjamin,
      optionsPenjamin,
      disabledDetail,
      disabledPenjamin,
      disabledKunjungan,
      disabledTglLahir,
      disabledUmur,
      disabledTglSep,
      disabledKelompok,
      disabledUnitLayanan,
    } = this.props;

    return (
      <Grid columns="2" divided>
        <Grid.Row>
          <Grid.Column>
            <Grid className="my-2">
              <Grid.Row className="form-row">
                <Grid.Column
                  width="4"
                  className="field"
                  style={{ paddingRight: 5 }}
                >
                  <label>{t(this._getKey('label.field.tgl_lahir_umur'))}</label>
                </Grid.Column>
                <Grid.Column width="2" className="field">
                  <Radio
                    value="tgl_lahir_umur"
                    name="jenis_tgl_lahir"
                    disabled={disabledDetail}
                    onChange={this.inputChangeHandler}
                    checked={
                      post.jenis_tgl_lahir === 'tgl_lahir_umur' ? true : false
                    }
                    inputRef={this.radio_jenis_tgl_lahir}
                  />
                </Grid.Column>
                <Grid.Column width="3" className="field">
                  <label>{t(this._getKey('label.field.tgl_lahir'))}</label>
                </Grid.Column>
                <Grid.Column width="7" className="field">
                  <DatePicker
                    name="tgl_lahir"
                    inputRef={this.tgl_lahir}
                    dateFormat="dd/MM/yyyy"
                    disabled={disabledDetail || disabledTglLahir}
                    selected={post.tgl_lahir}
                    onChange={(date) =>
                      this.dateTimeChangeHandler('tgl_lahir', date)
                    }
                    onKeyDown={(e) => this._onFocusElement(e, 'alamat')}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column
                  width="4"
                  className="field"
                  style={{ paddingRight: 5 }}
                >
                  <label></label>
                </Grid.Column>
                <Grid.Column width="2" className="field">
                  <Radio
                    value="umur"
                    name="jenis_tgl_lahir"
                    disabled={disabledDetail}
                    onChange={this.inputChangeHandler}
                    checked={post.jenis_tgl_lahir === 'umur' ? true : false}
                    inputRef={this.radio_jenis_umur}
                  />
                </Grid.Column>
                <Grid.Column width="3" className="field">
                  <label>{t(this._getKey('label.field.umur'))}</label>
                </Grid.Column>
                <Grid.Column width="2" className="field">
                  <Input
                    name="umur"
                    ref={this.umur}
                    value={post.umur}
                    disabled={disabledDetail || disabledUmur}
                    onChange={this.inputChangeHandler}
                    type="number"
                    min={1}
                  />
                </Grid.Column>
                <Grid.Column width="5" className="field">
                  <Select
                    options={data.options_umur}
                    isDisabled={disabledDetail || disabledUmur}
                    value={selectedOption.jenis_umur}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('jenis_umur', selected)
                    }
                    isClearable={false}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.jalan_dusun'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="alamat"
                    ref={this.alamat}
                    onChange={this.inputChangeHandler}
                    onKeyDown={(e) => this._onFocusElement(e, 'rt')}
                    disabled={disabledDetail}
                    value={post.alamat}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field" />
                <Grid.Column width="2" className="field">
                  <label>{t(this._getKey('label.field.rt'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <Input
                    name="rt"
                    ref={this.rt}
                    onChange={this.inputChangeHandler}
                    onKeyDown={(e) => this._onFocusElement(e, 'rw')}
                    disabled={disabledDetail}
                    value={post.rt}
                  />
                </Grid.Column>
                <Grid.Column width="2" className="field">
                  <label>{t(this._getKey('label.field.rw'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <Input
                    name="rw"
                    ref={this.rw}
                    onChange={this.inputChangeHandler}
                    onKeyDown={(e) => this._onFocusElement(e, 'id_desa')}
                    disabled={disabledDetail}
                    value={post.rw}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kelurahan_desa'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="id_desa"
                    ref={this.id_desa}
                    action={{
                      content: 'Cari',
                      onClick: () => action.toggleShowCariWilayah(resource),
                      disabled: disabledDetail,
                      color: 'blue',
                      type: 'button',
                    }}
                    disabled={disabledDetail}
                    value={post.nama_desa}
                    onKeyDown={this.keyDownDesaHandler}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kecamatan'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input disabled value={post.nama_kecamatan} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kota_kabupaten'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input disabled value={post.nama_kota} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.provinsi'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input disabled value={post.nama_provinsi} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider horizontal style={{ marginTop: 20, marginBottom: 20 }}>
              {t(this._getKey('label.field.penjamin_pasien'))}
            </Divider>
            <Grid>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.penjamin'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    inputRef={this.id_penjamin_pasien}
                    options={optionsPenjamin}
                    isDisabled={disabledPenjamin}
                    value={selectedOption.id_penjamin_pasien}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_penjamin_pasien', selected)
                    }
                    onKeyDown={(e) => this._onFocusElement(e, 'nomor_anggota')}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.no_anggota'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="nomor_anggota"
                    ref={this.nomor_anggota}
                    disabled={disabledPenjamin}
                    onChange={this.inputChangeHandler}
                    value={post.nomor_anggota}
                    onKeyDown={(e) =>
                      this._onFocusElement(e, 'id_kelas_penjamin_pasien')
                    }
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.hak_kelas'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    inputRef={this.id_kelas_penjamin_pasien}
                    options={optionsKelasPenjamin}
                    isDisabled={disabledPenjamin}
                    value={selectedOption.id_kelas_penjamin_pasien}
                    onChange={(selected) =>
                      this.select2ChangeHanlder(
                        'id_kelas_penjamin_pasien',
                        selected
                      )
                    }
                    isClearable={false}
                    onKeyDown={(e) =>
                      this._onFocusElement(e, 'id_kepersertaan')
                    }
                    isLoading={loaderSettingKelasPenjamin}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>
                    {t(this._getKey('label.field.status_kepersetaan'))}
                  </label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_status_kepersetaan}
                    isDisabled={disabledPenjamin}
                    value={selectedOption.id_kepersertaan}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_kepersertaan', selected)
                    }
                    isClearable={false}
                    inputRef={this.id_kepersertaan}
                    onKeyDown={(e) => this._onFocusElement(e, 'id_asal_masuk')}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Divider horizontal style={{ marginTop: 8, marginBottom: 20 }}>
              {t(this._getKey('label.field.kunjungan_pasien'))}
            </Divider>
            <Grid>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.tgl_kunjungan'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <DatePicker
                    name="tgl_kunjungan"
                    inputRef={this.tgl_kunjungan}
                    dateFormat="dd/MM/yyyy"
                    disabled
                    selected={post.tgl_kunjungan}
                    onChange={(date) =>
                      this.dateTimeChangeHandler('tgl_kunjungan', date)
                    }
                  />
                </Grid.Column>
                <Grid.Column width="2" className="field">
                  <label>{t(this._getKey('label.field.jam'))}</label>
                </Grid.Column>
                <Grid.Column width="3" className="field">
                  <DatePicker
                    inputRef={this.jam_kunjungan}
                    selected={post.jam_kunjungan}
                    disabled
                    onChange={(date) =>
                      this.dateTimeChangeHandler('jam_kunjungan', date)
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="HH:mm"
                    timeCaption="Jam"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.asal_masuk'))}</label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Select
                    inputRef={this.id_asal_masuk}
                    options={data.options_asal_masuk}
                    name="id_asal_masuk"
                    value={selectedOption.id_asal_masuk}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_asal_masuk', selected)
                    }
                    isClearable={false}
                    isDisabled={disabledKunjungan}
                    onKeyDown={(e) =>
                      this._onFocusElement(e, 'id_asal_masuk_detail')
                    }
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>
                    {t(this._getKey('label.field.detail_asal_masuk'))}
                  </label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Select
                    inputRef={this.id_asal_masuk_detail}
                    options={this.getAsalMasukDetailOptions()}
                    isClearable={false}
                    name="id_asal_masuk_detail"
                    isDisabled={disabledKunjungan}
                    onChange={(selected) =>
                      this.select2ChangeHanlder(
                        'id_asal_masuk_detail',
                        selected
                      )
                    }
                    value={selectedOption.id_asal_masuk_detail}
                    onKeyDown={(e) => this._onFocusElement(e, 'id_penjamin')}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.status_pasien'))}</label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Select
                    options={data.options_status_pasien}
                    isDisabled={disabledKunjungan}
                    value={selectedOption.id_penjamin}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_penjamin', selected)
                    }
                    isClearable={false}
                    name="id_penjamin"
                    inputRef={this.id_penjamin}
                    onKeyDown={(e) => this._onFocusElement(e, 'id_kelompok')}
                    onMenuOpen={this.openMenuStatusPasienHandler}
                    onMenuClose={this.closeMenuStatusPasienHandler}
                    components={{ Option: OptionStatusPasien }}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>
                    {t(this._getKey('label.field.penjamin_pasien'))}
                  </label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Input value={post.penjamin_pasien} disabled />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.tgl_sep'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    showPopperArrow={false}
                    name="tgl_jaminan"
                    inputRef={this.tgl_jaminan}
                    disabled={disabledKunjungan || disabledTglSep}
                    selected={post.tgl_jaminan}
                    onChange={(date) =>
                      this.dateTimeChangeHandler('tgl_jaminan', date)
                    }
                  />
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <label>
                    {t(this._getKey('label.field.tgl_awal_rujukan'))}
                  </label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <DatePicker
                    name="tgl_cetak_jaminan"
                    inputRef={this.tgl_cetak_jaminan}
                    selected={post.tgl_cetak_jaminan}
                    dateFormat="dd/MM/yyyy"
                    popperModifiers={{
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: 'viewport',
                      },
                    }}
                    disabled={disabledKunjungan || disabledTglSep}
                    onChange={(date) =>
                      this.dateTimeChangeHandler('tgl_cetak_jaminan', date)
                    }
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kelompok'))}</label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Select
                    options={data.options_kelompok}
                    name="id_kelompok"
                    value={selectedOption.id_kelompok}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_kelompok', selected)
                    }
                    isClearable={false}
                    isDisabled={disabledKelompok}
                    onKeyDown={(e) => this._onFocusElement(e, 'id_instalasi')}
                    inputRef={this.id_kelompok}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.instalasi'))}</label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Select
                    options={this.getInstalasiOptions()}
                    isClearable={false}
                    name="id_instalasi"
                    components={{ Option: OptionInstalasi }}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_instalasi', selected)
                    }
                    isDisabled={disabledKelompok || !post.id_kelompok}
                    value={selectedOption.id_instalasi}
                    onKeyDown={(e) =>
                      this._onFocusElement(e, 'id_unit_layanan')
                    }
                    inputRef={this.id_instalasi}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.unit_layanan'))}</label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Select
                    options={this.getUnitLayananOptions()}
                    isDisabled={disabledUnitLayanan || !post.id_instalasi}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_unit_layanan', selected)
                    }
                    isClearable={false}
                    name="id_unit_layanan"
                    value={selectedOption.id_unit_layanan}
                    onKeyDown={(e) =>
                      this._onFocusElement(
                        e,
                        this.isRawatInap()
                          ? 'id_kelas'
                          : this.isShowAsalKunjungan()
                          ? 'id_kunjungan_asal'
                          : 'id_dpjp'
                      )
                    }
                    inputRef={this.id_unit_layanan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kelas_kamar'))}</label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  {this.isRawatInap() ? (
                    <Select
                      options={data.options_kelas_kamar}
                      isDisabled={
                        disabledUnitLayanan || loaderOptionsByUnitLayanan
                      }
                      isLoading={loaderOptionsByUnitLayanan}
                      components={{ Option: OptionKelasKamar }}
                      onChange={(selected) =>
                        this.select2ChangeHanlder('id_kelas', selected, true)
                      }
                      isClearable={false}
                      value={selectedOption.id_kelas}
                      name="id_kelas"
                      onKeyDown={(e) =>
                        this._onFocusElement(
                          e,
                          this.isShowAsalKunjungan()
                            ? 'id_kunjungan_asal'
                            : 'id_dpjp'
                        )
                      }
                      inputRef={this.id_kelas}
                    />
                  ) : (
                    <Input value={post.nama_non_kelas || ''} disabled />
                  )}
                </Grid.Column>
                <BiayaTindakan
                  label={
                    selectedOption.id_kelas
                      ? formatter.currency(selectedOption.id_kelas.tarif)
                      : 0
                  }
                />
              </Grid.Row>
              {this.isShowAsalKunjungan() && (
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>
                      {t(this._getKey('label.field.asal_kunjungan'))}
                    </label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Select
                      options={data.options_asal_kunjungan}
                      isDisabled={
                        disabledKunjungan || loaderOptionsByUnitLayanan
                      }
                      isLoading={loaderOptionsByUnitLayanan}
                      components={{
                        Option: OptionAsalKunjungan,
                        SingleValue: AsalKunjunganSingleValue,
                      }}
                      onChange={(selected) =>
                        this.select2ChangeHanlder('id_kunjungan_asal', selected)
                      }
                      isClearable={false}
                      value={selectedOption.id_kunjungan_asal}
                      onKeyDown={(e) => this._onFocusElement(e, 'id_dpjp')}
                      inputRef={this.id_kunjungan_asal}
                      name="id_kunjungan_asal"
                    />
                  </Grid.Column>
                </Grid.Row>
              )}
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.dpjp'))}</label>
                </Grid.Column>
                <Grid.Column width="9" className="field">
                  <Select
                    options={data.options_dpjp}
                    isDisabled={disabledKunjungan || loaderOptionsByUnitLayanan}
                    isLoading={loaderOptionsByUnitLayanan}
                    onChange={(selected) =>
                      this.select2ChangeHanlder('id_dpjp', selected)
                    }
                    isClearable={false}
                    value={selectedOption.id_dpjp}
                    name="id_dpjp"
                    inputRef={this.id_dpjp}
                    onKeyDown={(e) =>
                      this._onFocusElement(
                        e,
                        this.getFirstJenisKlasifikasiRegistrasi()
                      )
                    }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {this.renderDividerBiayaTambahan()}
            {/* {!_.isEmpty(data.jenis_klasifikasi_registrasi) &&
              this.renderDividerBiayaTambahan()} */}
            {this.renderJenisKlasifikasiRegistrasi()}
          </Grid.Column>
        </Grid.Row>
        {showCariWilayah && (
          <CariAlamat
            show={showCariWilayah}
            onHide={action.toggleShowCariWilayah}
            onSelect={this.onSelectedWilayahHandler}
            data={filterWilayah}
            resource={resource}
            onSubmit={action.onSubmitFilterWilayah}
            onLoadData={action.loadAllWilayah}
            isReloadGrid={datatable.isReload}
            reloadType={datatable.reloadType}
          />
        )}
      </Grid>
    );
  }
}

const mapStateToProps = function (state) {
  const {
    post,
    focusElement,
    data,
    showCariWilayah,
    selectedOption,
    loaderAsalMasukDetail,
    loaderInstalasi,
    loaderUnitLayanan,
    loaderOptionsByUnitLayanan,
    filterWilayah,
    statusForm,
    loaderJenisKlasifikasiRegistrasi,
    loaderSettingKelasPenjamin,
  } = state.module.kunjungan;

  const disabledDetail = isDisable('detail_pasien', statusForm);
  const disabledPenjamin = isDisable('penjamin_pasien', statusForm);
  const disabledKunjungan = isDisable('kunjungan_pasien', statusForm);
  const disabledTglLahir =
    post.jenis_tgl_lahir !== 'tgl_lahir_umur' ? true : false;
  const disabledUmur = post.jenis_tgl_lahir !== 'umur' ? true : false;
  const disabledTglSep =
    post.id_penjamin === staticConst.ID_PENJAMIN_UMUM ? true : false;

  return {
    post,
    focusElement,
    data,
    showCariWilayah,
    selectedOption,
    loaderAsalMasukDetail,
    loaderInstalasi,
    loaderUnitLayanan,
    loaderOptionsByUnitLayanan,
    datatable: state.datatable.datatables['table_wilayah'],
    filterWilayah,
    statusForm,
    optionsKelasPenjamin: data.options_setting_kelas_penjamin.filter(
      (row) => row.value !== staticConst.ID_NON_KELAS
    ),
    optionsPenjamin: data.options_penjamin.filter(
      (row) => row.value !== staticConst.ID_PENJAMIN_UMUM
    ),
    loaderJenisKlasifikasiRegistrasi,
    loaderSettingKelasPenjamin,
    disabledDetail,
    disabledPenjamin,
    disabledKunjungan,
    disabledTglLahir,
    disabledUmur,
    disabledTglSep,
    disabledKelompok: isDisabledKelompok(state),
    disabledUnitLayanan: isDisabledUnitLayanan(state),
    disabledBiayaLain: isDisabledBiayaLain(state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
};

InputPasien.propTypes = {
  action: PropTypes.object,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  statusForm: PropTypes.string,
  data: PropTypes.object,
  selectedOption: PropTypes.object,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func,
  datatable: PropTypes.object,
  showCariWilayah: PropTypes.bool,
  filterWilayah: PropTypes.object,
  loaderOptionsByUnitLayanan: PropTypes.bool,
  loaderSettingKelasPenjamin: PropTypes.bool,
  optionsKelasPenjamin: PropTypes.array,
  optionsPenjamin: PropTypes.array,
  disabledDetail: PropTypes.bool,
  disabledPenjamin: PropTypes.bool,
  disabledKunjungan: PropTypes.bool,
  disabledTglLahir: PropTypes.bool,
  disabledUmur: PropTypes.bool,
  disabledTglSep: PropTypes.bool,
  disabledKelompok: PropTypes.bool,
  disabledUnitLayanan: PropTypes.bool,
  disabledBiayaLain: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputPasien);
