import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Input, Segment, Divider } from 'semantic-ui-react';
import { Select, DatePicker, Radio, useModuleTrans } from '@simrs/components';
import { formatter } from '@simrs/common';

import { onChangeSelect2 } from '@module/kunjungan/src/pages/index/redux/penjaminPasienActions';

const FormDetailPasien = ({
  data,
  disabled,
  dataForm,
  selectedOption,
  kunjungan,
  focusElement,
  onChangeSelect,
  onChangeDatetime,
  onFocusElement,
  onEnterNorm,
  isDisabledNorm,
  onChangeInput,
  onToggleCariWilayah,
}) => {
  const t = useModuleTrans();
  const inputRef = {
    norm: React.useRef(),
    nama: React.useRef(),
    nama_panggilan: React.useRef(),
    id_jenis_kelamin: React.useRef(),
    no_ktp: React.useRef(),
    nama_ortu: React.useRef(),
    nama_suami_istri: React.useRef(),
    radio_jenis_umur: React.useRef(),
    radio_jenis_tgl_lahir: React.useRef(),
    tgl_lahir: React.useRef(),
    umur: React.useRef(),
    jenis_umur: React.useRef(),
    alamat: React.useRef(),
    rt: React.useRef(),
    rw: React.useRef(),
    id_desa: React.useRef(),
    id_agama: React.useRef(),
    id_pendidikan: React.useRef(),
    id_pekerjaan: React.useRef(),
    id_status_nikah: React.useRef(),
    id_kewarganegaraan: React.useRef(),
    id_bahasa_sehari_hari: React.useRef(),
    nilai_kepercayaan: React.useRef(),
  };

  React.useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        if (focusElement === 'tgl_lahir') {
          inputRef[focusElement].current.setFocus();
        } else {
          inputRef[focusElement].current.focus();
        }
      }
    }
  }, [focusElement]);

  const disabledTglLahir =
    data.jenis_tgl_lahir !== 'tgl_lahir_umur' ? true : false;
  const disabledUmur = data.jenis_tgl_lahir !== 'umur' ? true : false;

  const keyDownDesaHandler = (e) => {
    if (e.which === 13) {
      if (!e.target.value) {
        onToggleCariWilayah();
      } else {
        onFocusElement(e, 'id_agama');
      }
    }
  };

  return (
    <Form
      id="form-detail-pasien"
      size="mini"
      onSubmit={(e) => e.preventDefault()}
    >
      <Segment
        size="mini"
        style={{ paddingTop: 8, marginBottom: 8, paddingBottom: 20 }}
      >
        <Divider horizontal style={{ marginTop: 0, marginBottom: 35 }}>
          {t('identitas_pasien')}
        </Divider>
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('norm')}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Input
                      ref={inputRef.norm}
                      name="norm"
                      onKeyDown={onEnterNorm}
                      disabled={isDisabledNorm}
                      value={data.norm}
                      onChange={onChangeInput}
                      onFocus={(e) => {
                        if (e.target.value) {
                          e.target.select();
                        }
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('nama')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      ref={inputRef.nama}
                      name="nama"
                      disabled={disabled}
                      value={data.nama}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'nama_panggilan')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('nama_panggilan')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      ref={inputRef.nama_panggilan}
                      name="nama_panggilan"
                      disabled={disabled}
                      value={data.nama_panggilan}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'id_jenis_kelamin')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('jenis_kelamin')}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Select
                      options={dataForm.jenisKelamin}
                      name="id_jenis_kelamin"
                      value={selectedOption.id_jenis_kelamin}
                      onChange={(selected) =>
                        onChangeSelect('id_jenis_kelamin', selected)
                      }
                      isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) => onFocusElement(e, 'no_ktp')}
                      inputRef={inputRef.id_jenis_kelamin}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('no_ktp')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      ref={inputRef.no_ktp}
                      name="no_ktp"
                      disabled={disabled}
                      value={data.no_ktp}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'nama_ortu')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('nama_ortu')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      ref={inputRef.nama_ortu}
                      name="nama_ortu"
                      disabled={disabled}
                      value={data.nama_ortu}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'nama_suami_istri')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('nama_suami_istri')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      ref={inputRef.nama_suami_istri}
                      name="nama_suami_istri"
                      disabled={disabled}
                      value={data.nama_suami_istri}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'tgl_lahir')}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment
        size="mini"
        // style={{ paddingTop: 8, marginBottom: 8, paddingBottom: 20 }}
      >
        <Grid columns="2" className="my-1">
          <Grid.Row>
            <Grid.Column>
              <Divider hidden style={{ marginTop: 10, marginBottom: 10 }} />
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column
                    width="4"
                    className="field"
                    style={{ paddingRight: 5 }}
                  >
                    <label>{t('tgl_lahir')}</label>
                  </Grid.Column>
                  <Grid.Column width="2" className="field">
                    <Radio
                      value="tgl_lahir_umur"
                      name="jenis_tgl_lahir"
                      disabled={disabled}
                      onChange={onChangeInput}
                      checked={
                        data.jenis_tgl_lahir === 'tgl_lahir_umur' ? true : false
                      }
                      inputRef={inputRef.radio_jenis_tgl_lahir}
                    />
                  </Grid.Column>
                  <Grid.Column width="3" className="field">
                    <label>{t('tanggal')}</label>
                  </Grid.Column>
                  <Grid.Column width="7" className="field">
                    <DatePicker
                      name="tgl_lahir"
                      inputRef={inputRef.tgl_lahir}
                      dateFormat="dd/MM/yyyy"
                      disabled={disabled || disabledTglLahir}
                      selected={formatter.parseToDate(data.tgl_lahir)}
                      onChange={(date) => onChangeDatetime('tgl_lahir', date)}
                      onKeyDown={(e) => onFocusElement(e, 'alamat')}
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
                      disabled={disabled}
                      onChange={onChangeInput}
                      checked={data.jenis_tgl_lahir === 'umur' ? true : false}
                      inputRef={inputRef.radio_jenis_umur}
                    />
                  </Grid.Column>
                  <Grid.Column width="3" className="field">
                    <label>{t('umur')}</label>
                  </Grid.Column>
                  <Grid.Column width="2" className="field">
                    <Input
                      name="umur"
                      ref={inputRef.umur}
                      value={data.umur}
                      disabled={disabled || disabledUmur}
                      onChange={onChangeInput}
                      type="number"
                      min={1}
                    />
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <Select
                      options={dataForm.jenisUmur}
                      isDisabled={disabled || disabledUmur}
                      value={selectedOption.jenis_umur}
                      onChange={(selected) =>
                        onChangeSelect2('jenis_umur', selected)
                      }
                      isClearable={false}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('jalan_dusun')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="alamat"
                      ref={inputRef.alamat}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'rt')}
                      disabled={disabled}
                      value={data.alamat}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field" />
                  <Grid.Column width="2" className="field">
                    <label>{t('rt')}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Input
                      name="rt"
                      ref={inputRef.rt}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'rw')}
                      disabled={disabled}
                      value={data.rt}
                    />
                  </Grid.Column>
                  <Grid.Column width="2" className="field">
                    <label>{t('rw')}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Input
                      name="rw"
                      ref={inputRef.rw}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'id_desa')}
                      disabled={disabled}
                      value={data.rw}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('kelurahan_desa')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="id_desa"
                      ref={inputRef.id_desa}
                      action={{
                        content: 'Cari',
                        onClick: onToggleCariWilayah,
                        disabled: disabled,
                        color: 'blue',
                        type: 'button',
                      }}
                      disabled={disabled}
                      value={data.nama_desa}
                      onKeyDown={keyDownDesaHandler}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('kecamatan')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input disabled value={data.nama_kecamatan} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('kota_kabupaten')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input disabled value={data.nama_kota} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t('provinsi')}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input disabled value={data.nama_provinsi} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Divider hidden style={{ marginTop: 10, marginBottom: 10 }} />
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('agama')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      options={dataForm.agama}
                      name="id_agama"
                      value={selectedOption.id_agama}
                      onChange={(selected) =>
                        onChangeSelect('id_agama', selected)
                      }
                      // isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) => onFocusElement(e, 'id_pendidikan')}
                      inputRef={inputRef.id_agama}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('pendidikan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      options={dataForm.pendidikan}
                      name="id_pendidikan"
                      value={selectedOption.id_pendidikan}
                      onChange={(selected) =>
                        onChangeSelect('id_pendidikan', selected)
                      }
                      // isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) => onFocusElement(e, 'id_pekerjaan')}
                      inputRef={inputRef.id_pendidikan}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('pekerjaan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      options={dataForm.pekerjaan}
                      name="id_pekerjaan"
                      value={selectedOption.id_pekerjaan}
                      onChange={(selected) =>
                        onChangeSelect('id_pekerjaan', selected)
                      }
                      // isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) => onFocusElement(e, 'id_status_nikah')}
                      inputRef={inputRef.id_pekerjaan}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('status_nikah')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      options={dataForm.statusNikah}
                      name="id_status_nikah"
                      value={selectedOption.id_status_nikah}
                      onChange={(selected) =>
                        onChangeSelect('id_status_nikah', selected)
                      }
                      // isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) => onFocusElement(e, 'id_kewarganegaraan')}
                      inputRef={inputRef.id_status_nikah}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('kewarganegaraan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      options={dataForm.kewarganegaraan}
                      name="id_kewarganegaraan"
                      value={selectedOption.id_kewarganegaraan}
                      onChange={(selected) =>
                        onChangeSelect('id_kewarganegaraan', selected)
                      }
                      // isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) =>
                        onFocusElement(e, 'id_bahasa_sehari_hari')
                      }
                      inputRef={inputRef.id_kewarganegaraan}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('bahasa_sehari_hari')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      options={dataForm.bahasaSehariHari}
                      name="id_bahasa_sehari_hari"
                      value={selectedOption.id_bahasa_sehari_hari}
                      onChange={(selected) =>
                        onChangeSelect('id_bahasa_sehari_hari', selected)
                      }
                      // isClearable={false}
                      isDisabled={disabled}
                      onKeyDown={(e) => onFocusElement(e, 'nilai_kepercayaan')}
                      inputRef={inputRef.id_bahasa_sehari_hari}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t('nilai_kepercayaan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="nilai_kepercayaan"
                      ref={inputRef.nilai_kepercayaan}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'save')}
                      disabled={disabled}
                      value={data.nilai_kepercayaan}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  );
};

FormDetailPasien.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func,
  resource: PropTypes.string,
  disabled: PropTypes.bool,
  focusElement: PropTypes.string,
};

export default FormDetailPasien;
