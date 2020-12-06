import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Form, Input, Segment, Divider } from 'semantic-ui-react';
import { Select, DatePicker, useModuleState } from '@simrs/components';
import { formatter } from '@simrs/common';
import { OptionInstalasi } from '@module/kunjungan';
// import { useModuleState } from '@simrs/components/src/provider';

import AdministrasiKonsulValue from './AdministrasiKonsulValue';
import AdministrasiKonsulOption from './AdministrasiKonsulOption';
import { staticConst } from '../static';

const FormKonsul = ({
  t,
  data,
  resource,
  disabled,
  dataForm,
  selectedOption,
  kunjungan,
  focusElement,
  onChangeSelect,
  onChangeDatetime,
  onFocusElement,
  administrasiKonsulLoader,
}) => {
  const module = useModuleState();
  const disabledTgl = () => {
    if (!_.includes(module.permissions, staticConst.KOREKSI_TANGGAL_KONSUL)) {
      return true;
    }

    if (disabled) {
      return true;
    }

    return false;
  };
  const inputRef = {
    id_kelompok: React.useRef(),
    id_instalasi: React.useRef(),
    id_unit_layanan: React.useRef(),
    id_tindakan: React.useRef(),
    tgl_mulai: React.useRef(),
    jam_mulai: React.useRef(),
  };

  React.useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        inputRef[focusElement].current.focus();
      }
    }
  }, [focusElement]);

  const getKey = (key) => {
    return `${resource}:${key}`;
  };

  const kurang =
    kunjungan.keringanan - kunjungan.bayar - kunjungan.pengembalian;

  return (
    <Form id="form-konsul" size="mini" onSubmit={(e) => e.preventDefault()}>
      <Segment
        size="mini"
        style={{ paddingTop: 8, marginBottom: 8, paddingBottom: 20 }}
      >
        <Grid columns="2" divided>
          <Grid.Row>
            <Grid.Column>
              <Divider hidden style={{ marginTop: 24, marginBottom: 20 }} />
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('tgl_mrs'))}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Input
                      name="tgl_kunjungan"
                      disabled
                      value={formatter.dateFormatClient(
                        kunjungan.tgl_kunjungan,
                        'DD/MM/YYYY'
                      )}
                    />
                  </Grid.Column>
                  <Grid.Column width="2" className="field">
                    <label>{t(getKey('jam'))}</label>
                  </Grid.Column>
                  <Grid.Column width="3" className="field">
                    <Input
                      name="jam_kunjungan"
                      disabled
                      value={formatter.dateFormatClient(
                        kunjungan.tgl_kunjungan,
                        'HH:mm'
                      )}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('asal_masuk'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama_asal_masuk"
                      disabled
                      value={kunjungan.nama_asal_masuk}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('penjamin_pasien'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama_penjamin"
                      disabled
                      value={kunjungan.nama_penjamin}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider horizontal style={{ marginTop: 20, marginBottom: 20 }}>
                {t(getKey('kunjungan_asal_konsul'))}
              </Divider>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('kelompok'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="kelompok"
                      disabled
                      value={kunjungan.nama_kelompok}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('instalasi'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="instalasi"
                      disabled
                      value={kunjungan.nama_instalasi}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('unit_layanan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="unit_layanan"
                      disabled
                      value={kunjungan.nama_unit_layanan}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('kelas_kamar'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="kelas_kamar"
                      disabled
                      value={kunjungan.nama_kelas}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Divider horizontal style={{ marginTop: 12, marginBottom: 20 }}>
                {t(getKey('tujuan_konsul'))}
              </Divider>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('tgl_mrs'))}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <DatePicker
                      name="tgl_mulai"
                      inputRef={inputRef.tgl_mulai}
                      dateFormat="dd/MM/yyyy"
                      disabled={disabledTgl()}
                      selected={data.tgl_mulai}
                      onChange={(date) => onChangeDatetime('tgl_mulai', date)}
                    />
                  </Grid.Column>
                  <Grid.Column width="2" className="field">
                    <label>{t(getKey('jam'))}</label>
                  </Grid.Column>
                  <Grid.Column width="3" className="field">
                    <DatePicker
                      inputRef={inputRef.jam_mulai}
                      selected={data.jam_mulai}
                      disabled={disabledTgl()}
                      onChange={(date) => onChangeDatetime('jam_mulai', date)}
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
                    <label>{t(getKey('kelompok'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      options={dataForm.kelompok}
                      name="id_kelompok"
                      value={selectedOption.id_kelompok}
                      onChange={(selected) =>
                        onChangeSelect('id_kelompok', selected)
                      }
                      isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) => onFocusElement(e, 'id_instalasi')}
                      inputRef={inputRef.id_kelompok}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('instalasi'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      options={dataForm.instalasi}
                      name="id_instalasi"
                      components={{ Option: OptionInstalasi }}
                      value={selectedOption.id_instalasi}
                      onChange={(selected) =>
                        onChangeSelect('id_instalasi', selected)
                      }
                      isClearable={false}
                      isDisabled={disabled || !data.id_kelompok}
                      onKeyDown={(e) => onFocusElement(e, 'id_unit_layanan')}
                      inputRef={inputRef.id_instalasi}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('unit_layanan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      options={dataForm.unitLayanan}
                      name="id_unit_layanan"
                      value={selectedOption.id_unit_layanan}
                      onChange={(selected) =>
                        onChangeSelect('id_unit_layanan', selected)
                      }
                      isClearable={false}
                      isDisabled={disabled || !data.id_instalasi}
                      onKeyDown={(e) => onFocusElement(e, 'id_tindakan')}
                      inputRef={inputRef.id_unit_layanan}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('kelas'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input name="id_kelas" disabled value={data.nama_kelas} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('administrasi_konsul'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      options={dataForm.administrasiKonsul}
                      name="id_tindakan"
                      value={selectedOption.id_tindakan}
                      onChange={(selected) =>
                        onChangeSelect('id_tindakan', selected)
                      }
                      isClearable={false}
                      isDisabled={disabled || !data.id_unit_layanan}
                      isLoading={administrasiKonsulLoader}
                      onKeyDown={(e) => onFocusElement(e, 'save')}
                      inputRef={inputRef.id_tindakan}
                      components={{
                        Option: AdministrasiKonsulOption,
                        SingleValue: AdministrasiKonsulValue,
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: 15 }}>
            <Grid.Column width="16">
              <Grid verticalAlign="middle" centered>
                <Grid.Column>
                  <Segment color="grey">
                    <Grid>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>{t(getKey('keringanan'))}</label>
                        </Grid.Column>
                        <Grid.Column
                          style={{ textAlign: 'right' }}
                          width="4"
                          className="field"
                        >
                          {formatter.currency(kunjungan.keringanan)}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>{t(getKey('sudah_dibayar'))}</label>
                        </Grid.Column>
                        <Grid.Column
                          style={{ textAlign: 'right' }}
                          width="4"
                          className="field"
                        >
                          {formatter.currency(kunjungan.bayar)}
                        </Grid.Column>
                        <Grid.Column width="4" className="field">
                          <label>{t(getKey('pengembalian'))}</label>
                        </Grid.Column>
                        <Grid.Column
                          style={{ textAlign: 'right' }}
                          width="4"
                          className="field"
                        >
                          {formatter.currency(kunjungan.pengembalian)}
                        </Grid.Column>
                      </Grid.Row>
                      <Divider style={{ margin: 0 }} />
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>{t(getKey('total_biaya_pengunjung'))}</label>
                        </Grid.Column>
                        <Grid.Column
                          style={{ textAlign: 'right' }}
                          width="4"
                          className="field"
                        >
                          {formatter.currency(kunjungan.biaya)}
                        </Grid.Column>
                        <Grid.Column width="4" className="field">
                          <label>{t(getKey('kurang'))}</label>
                        </Grid.Column>
                        <Grid.Column
                          style={{ textAlign: 'right' }}
                          width="4"
                          className="field"
                        >
                          {formatter.currency(kurang)}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  );
};

FormKonsul.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func,
  resource: PropTypes.string,
  disabled: PropTypes.bool,
  kunjungan: PropTypes.object,
  focusElement: PropTypes.string,
};

export default FormKonsul;
