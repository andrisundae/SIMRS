import React, { Component, createRef} from 'react';
import { Grid, Divider, Input } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { components } from 'react-select';
import { formatter } from '@simrs/common';
import PropTypes from 'prop-types';

import { Select, Radio, DatePicker } from '@simrs/components';

import CariAlamat from '../components/CariAlamat';
import actions from '../actions';
import { isDisable } from '../reducer';

const OptionInstalasi = (props) => {
  let { data } = props;
  return (
    <components.Option {...props}>
      <div className="react-select__option-label">{data.label}</div>
      <div className="react-select__option-caption">
        {`${data.nama_jenis_layanan} | ${data.nama_kelompok_jenis_layanan}`}
      </div>
    </components.Option>
  );
};

OptionInstalasi.propTypes = {
  data: PropTypes.object.isRequired
};

const KelasKamarSingleValue = ({ data, ...props }) => (
  <components.SingleValue {...props}>{`${data.label} (Rp ${formatter.currency(data.tarif)})`}</components.SingleValue>
);

const OptionKelasKamar = ({data, ...props}) => {
  return (
    <components.Option {...props}>
      <div className="react-select__option-label">{data.label}</div>
      <div className="react-select__option-caption">
        {`Tarif kamar : Rp ${formatter.currency(data.tarif)}`}
      </div>
    </components.Option>
  );
};

class InputPasien extends Component {
  constructor(props) {
    super(props);

    this.radio_jenis_umur = createRef();
    this.radio_jenis_tgl_lahir = createRef();
    this.tgl_lahir = createRef();
    this.umur = createRef();
    this.jenis_umur = createRef();
    this.alamat = createRef();
    this.rt = createRef();
    this.rw = createRef();
    this.desa = createRef();
    this.kecamatan = createRef();
    this.kota = createRef();
    this.provinsi = createRef();
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  select2ChangeHanlder = (name, selected) => {
    this.props.action.onChangeSelect2(this.props.resource, name, selected);
  }

  dataSourceWilayah = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
        let post = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          ...this.props.filterWilayah.post
        };

        this.props.action.loadAllWilayah(this.props.resource, post, params);
      }
    }
  }

  onSelectedWilayahHandler = (params) => {
    if (params.node.isSelected()) {
      this.props.action.onSelectedWilayah(this.props.resource, params.data);
    }
  }

  getAsalMasukDetailOptions = () => {
    const {post, data} = this.props;
    let options = [];
    if (post.id_asal_masuk) {
      options = data.options_asal_masuk_detail.filter(item => item.asal_masuk_id === post.id_asal_masuk);
    }

    return options;
  }

  getInstalasiOptions = () => {
    const { post, data } = this.props;
    let options = [];
    if (post.id_kelompok) {
      options = data.options_instalasi.filter(item => item.kelompok_id === post.id_kelompok);
    }

    return options;
  }

  getUnitLayananOptions = () => {
    const { post, data } = this.props;
    let options = [];
    if (post.id_instalasi) {
      options = data.options_unit_layanan.filter(item => item.instalasi_id === post.id_instalasi);
    }

    return options;
  }

  inputChangeHandler = (e) => {
    const { name, value, checked, type } = e.target;
    const { resource, action} = this.props;
    let val = '';
    if (type === 'checkbox') {
      val = checked ? true : ''
    } else {
      val = value;
    }
    action.onChangeInput(resource, { name, value: val });
  }

  dateTimeChangeHandler = (name, date) => {
    const { resource, action } = this.props;
    action.onChangeInput(resource, { name, value: date });
  }

  render() {
    const {
      t, showCariWilayah,data, selectedOption,
      resource, filterWilayah, loaderOptionsByUnitLayanan,
      action, datatable, statusForm, post
    } = this.props;

    const disabledDetail = isDisable('detail_pasien', statusForm);
    const disabledPenjamin = isDisable('penjamin_pasien', statusForm);
    const disabledKunjungan = isDisable('kunjungan_pasien', statusForm);
    const disabledTglLahir = post.jenis_tgl_lahir !== 'tgl_lahir_umur' ? true : false;
    const disabledUmur = post.jenis_tgl_lahir !== 'umur' ? true : false;

    return (
      <Grid columns="2" divided>
        <Grid.Row>
          <Grid.Column>
            <Divider hidden style={{ marginTop: 20, marginBottom: 20 }} />
            <Grid>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field" style={{ paddingRight: 5 }}>
                  <label>{t(this._getKey('label.field.tgl_lahir_umur'))}</label>
                </Grid.Column>
                <Grid.Column width="2" className="field">
                  <Radio
                    value="tgl_lahir_umur"
                    name="jenis_tgl_lahir"
                    disabled={disabledDetail}
                    onChange={this.inputChangeHandler}
                    checked={post.jenis_tgl_lahir === 'tgl_lahir_umur' ? true : false}
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
                    onChange={(date) => this.dateTimeChangeHandler('tgl_lahir', date)}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field" style={{ paddingRight: 5 }}>
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
                    onChange={(selected) => this.select2ChangeHanlder('jenis_umur', selected)}
                    isClearable={false}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row" style={{ paddingRight: 5 }}>
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.jalan_dusun'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="alamat"
                    ref={this.alamat}
                    onChange={this.inputChangeHandler}
                    // onKeyDown={(e) => this._onFocusElement(e, 'rt')}
                    disabled={disabledDetail}
                    value={post.alamat}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row" style={{ paddingRight: 5 }}>
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.rt'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <Input
                    name="rt"
                    ref={this.rt}
                    onChange={this.inputChangeHandler}
                    // onKeyDown={(e) => this._onFocusElement(e, 'save')}
                    disabled={disabledDetail}
                    value={post.rt}
                  />
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.rw'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <Input
                    name="rw"
                    ref={this.rw}
                    onChange={this.inputChangeHandler}
                    // onKeyDown={(e) => this._onFocusElement(e, 'save')}
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
                    name="desa"
                    ref={this.desa}
                    action={{
                      content: 'Cari',
                      onClick: action.toggleShowCariWilayah,
                      disabled: disabledDetail,
                      color: 'blue'
                    }}
                    disabled={disabledDetail}
                    value={post.desa}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kecamatan'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="kecamatan"
                    ref={this.kecamatan}
                    disabled
                    value={post.kecamatan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kota_kabupaten'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="kota"
                    ref={this.kota}
                    disabled
                    value={post.kota}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.provinsi'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="provinsi"
                    ref={this.provinsi}
                    disabled
                    value={post.provinsi}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider horizontal style={{ marginTop: 20, marginBottom: 20 }}>{t(this._getKey('label.field.penjamin_pasien'))}</Divider>
            <Grid>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.penjamin'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_penjamin}
                    isDisabled={disabledPenjamin}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.no_anggota'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Input
                    name="no_anggota"
                    ref={this.no_anggota}
                    disabled={disabledPenjamin}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.hak_kelas'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_kelas}
                    isDisabled={disabledPenjamin}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.status_kepersetaan'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_status_kepersetaan}
                    isDisabled={disabledPenjamin}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Divider horizontal style={{ marginTop: 8, marginBottom: 20 }}>{t(this._getKey('label.field.kunjungan_pasien'))}</Divider>
            <Grid>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.tgl_kunjungan'))}</label>
                </Grid.Column>
                <Grid.Column width="7" className="field">
                  <DatePicker
                    name="tgl_aktif_tarif"
                    dateFormat="dd/MM/yyyy"
                    disabled={disabledKunjungan}
                  />
                </Grid.Column>
                <Grid.Column width="2" className="field">
                  <label>{t(this._getKey('label.field.jam'))}</label>
                </Grid.Column>
                <Grid.Column width="3" className="field">
                  <DatePicker
                    showTimeSelect
                    timeFormat="HH:mm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="HH:mm"
                    timeCaption="Jam"
                    disabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.asal_masuk'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_asal_masuk}
                    name="id_asal_masuk"
                    value={selectedOption.id_asal_masuk}
                    onChange={(selected) => this.select2ChangeHanlder('id_asal_masuk', selected)}
                    isClearable={false}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.detail_asal_masuk'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={this.getAsalMasukDetailOptions()}
                    isClearable={false}
                    name="id_asal_masuk_detail"
                    isDisabled={disabledKunjungan}
                    onChange={(selected) => this.select2ChangeHanlder('id_asal_masuk_detail', selected)}
                    value={selectedOption.id_asal_masuk_detail}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.status_pasien'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_status_pasien}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.penjamin_pasien'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_penjamin_pasien}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.tgl_sep'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <DatePicker
                    name="tgl_aktif_tarif"
                    dateFormat="dd/MM/yyyy"
                    showPopperArrow={false}
                    disabled={disabledKunjungan}
                  />
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.tgl_awal_rujukan'))}</label>
                </Grid.Column>
                <Grid.Column width="4" className="field">
                  <DatePicker
                    name="tgl_aktif_tarif"
                    dateFormat="dd/MM/yyyy"
                    popperModifiers={{
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "viewport"
                      }
                    }}
                    disabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kelompok'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_kelompok}
                    name="id_kelompok"
                    value={selectedOption.id_kelompok}
                    onChange={(selected) => this.select2ChangeHanlder('id_kelompok', selected)}
                    isClearable={false}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.instalasi'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={this.getInstalasiOptions()}
                    isClearable={false}
                    name="id_instalasi"
                    components={{ Option: OptionInstalasi }}
                    onChange={(selected) => this.select2ChangeHanlder('id_instalasi', selected)}
                    isDisabled={disabledKunjungan || !post.id_kelompok}
                    value={selectedOption.id_instalasi}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.unit_layanan'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={this.getUnitLayananOptions()}
                    isDisabled={disabledKunjungan || !post.id_instalasi}
                    onChange={(selected) => this.select2ChangeHanlder('id_unit_layanan', selected)}
                    isClearable={false}
                    name="id_unit_layanan"
                    value={selectedOption.id_unit_layanan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.kelas_kamar'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_kelas_kamar}
                    isDisabled={disabledKunjungan}
                    isLoading={loaderOptionsByUnitLayanan}
                    components={{ SingleValue: KelasKamarSingleValue, Option: OptionKelasKamar }}
                    onChange={(selected) => this.select2ChangeHanlder('id_kelas_kamar', selected)}
                    isClearable={false}
                    value={selectedOption.id_kelas_kamar}
                    name="id_kelas_kamar"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.asal_kunjungan'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_asal_kunjungan}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.dpjp'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_dpjp}
                    isDisabled={disabledKunjungan}
                    isLoading={loaderOptionsByUnitLayanan}
                    onChange={(selected) => this.select2ChangeHanlder('id_dpjp', selected)}
                    isClearable={false}
                    value={selectedOption.id_dpjp}
                    name="id_dpjp"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider horizontal style={{ marginTop: 20, marginBottom: 20 }}>{t(this._getKey('label.field.biaya_tambahan'))}</Divider>
            <Grid>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.karcis'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_karcis}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.pemeriksaan'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_pemeriksaan}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="form-row">
                <Grid.Column width="4" className="field">
                  <label>{t(this._getKey('label.field.administrasi_rm'))}</label>
                </Grid.Column>
                <Grid.Column width="12" className="field">
                  <Select
                    options={data.options_administrasi_rm}
                    isDisabled={disabledKunjungan}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        {showCariWilayah &&
          <CariAlamat
            show={showCariWilayah}
            onHide={action.toggleShowCariWilayah}
            onSelect={this.onSelectedWilayahHandler}
            data={filterWilayah}
            resource={resource}
            dataSource={this.dataSourceWilayah}
            onChange={action.onChangeFilterWilayah}
            onSubmit={action.onSubmitFilterWilayah}
            isReloadGrid={datatable.isReload}
            reloadType={datatable.reloadType}
          />
        }
      </Grid>
    )
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
    statusForm
  } = state.module;

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
    statusForm
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPasien);