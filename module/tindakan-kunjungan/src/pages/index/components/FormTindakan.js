import React from 'react';
import {
  Grid,
  Form,
  Input,
  Segment,
  Button,
  Icon,
  Header,
  Divider,
} from 'semantic-ui-react';
import { Select } from '@simrs/components';
import { formatter } from '@simrs/common';
import PropTypes from 'prop-types';

const FormTindakan = ({
  t,
  data,
  resource,
  disabled,
  dataForm,
  selectedOption,
  kunjungan,
  focusElement,
  onShowCariTindakan,
  onChangePelaksana,
  onChangeInput,
  onFocusElement,
}) => {
  const inputRef = {
    id_tindakan: React.useRef(),
    id_pelaksana: React.useRef(),
    jumlah: React.useRef(),
  };

  React.useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        console.log(focusElement);
        inputRef[focusElement].current.focus();
      }
    }
  }, [focusElement]);

  const getKey = (key) => {
    return `${resource}:${key}`;
  };

  const keyDownKodePanggilHandler = (e) => {
    if (13 === e.which) {
      onShowCariTindakan();
    }
  };

  const kurang =
    kunjungan.keringanan - kunjungan.bayar - kunjungan.pengembalian;

  return (
    <Form
      id="form-tindakan-kunjungan"
      size="mini"
      onSubmit={(e) => e.preventDefault()}
    >
      <Segment size="mini" style={{ paddingTop: 8, marginBottom: 8 }}>
        <Grid columns="2" style={{ marginTop: 10 }}>
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('kode_panggil'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="kode_panggil"
                      ref={inputRef.id_tindakan}
                      onKeyDown={keyDownKodePanggilHandler}
                      action={{
                        content: 'Cari',
                        onClick: onShowCariTindakan,
                        disabled: disabled,
                        color: 'blue',
                        type: 'button',
                      }}
                      disabled={disabled}
                      value={data.kode_panggil}
                      // onChange={this.inputChangeHandler}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('kelompok'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="kelompok"
                      disabled
                      value={data.nama_kelompok}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('nama_layanan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama_layanan"
                      disabled
                      value={data.nama_layanan}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('kelas'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input name="kelas" disabled value={data.nama_kelas} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="10" className="field">
                    {kunjungan.nama_dpjp && (
                      <Header as="h5" color="red">
                        DPJP : {kunjungan.nama_dpjp}
                      </Header>
                    )}
                  </Grid.Column>
                  <Grid.Column width="6" className="field">
                    <Button
                      size="mini"
                      color="orange"
                      // icon
                      // labelPosition='left'
                      floated="right"
                      compact
                    >
                      <Icon name="copy outline" />
                      {t(getKey('sisa_seluruh_tagihan'))}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(getKey('pelaksana'))}</label>
                  </Grid.Column>
                  <Grid.Column width="11" className="field">
                    <Select
                      name="id_pelaksana"
                      isDisabled={disabled}
                      options={dataForm.pelaksana}
                      onChange={onChangePelaksana}
                      isClearable={false}
                      value={selectedOption.id_pelaksana}
                      inputRef={inputRef.id_pelaksana}
                      onKeyDown={(e) => onFocusElement(e, 'jumlah')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(getKey('jumlah_tindakan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <Input
                      ref={inputRef.jumlah}
                      name="jumlah"
                      disabled={disabled}
                      value={data.jumlah}
                      onChange={onChangeInput}
                      onKeyDown={(e) => onFocusElement(e, 'save')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(getKey('biaya_per_tindakan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <Input
                      name="biaya_per_tindakan"
                      disabled
                      value={data.harga}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(getKey('total_biaya'))}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <Input name="biaya" disabled value={data.biaya} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(getKey('tanggal'))}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <Input
                      name="tanggal"
                      disabled
                      value={formatter.dateFormatClient(
                        data.tanggal,
                        'DD/MM/YYYY'
                      )}
                    />
                  </Grid.Column>
                  <Grid.Column width="2" className="field">
                    <label>{t(getKey('jam'))}</label>
                  </Grid.Column>
                  <Grid.Column width="3" className="field">
                    <Input
                      name="tanggal"
                      disabled
                      value={formatter.dateFormatClient(data.tanggal, 'HH:mm')}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
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

FormTindakan.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func,
  resource: PropTypes.string,
  disabled: PropTypes.bool,
  kunjungan: PropTypes.object,
  focusElement: PropTypes.string,
};

export default FormTindakan;
