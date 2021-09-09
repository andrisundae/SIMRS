import React from 'react';
import {
  Grid,
  Form,
  Input,
  Segment,
  Button,
  Icon,
  Header,
  Dropdown,
} from 'semantic-ui-react';
import { Select, CurrencyInput } from '@simrs/components';
import PropTypes from 'prop-types';
import { formatter } from '@simrs/common';
import { TagihanPasien } from '@simrs/billing/src/Components';

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
  showPelaksanaTambahan,
  onShowPelaksanaTambahan,
  onShowPelaksanaKomponen,
}) => {
  const inputRef = {
    id_tindakan: React.useRef(),
    id_pelaksana: React.useRef(),
    jumlah: React.useRef(),
    harga: React.useRef(),
  };

  React.useEffect(() => {
    if (
      focusElement &&
      inputRef[focusElement] &&
      inputRef[focusElement].current
    ) {
      if (focusElement === 'harga') {
        inputRef[focusElement].current.theInput.focus();
      } else {
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

  const changeInputHandler = (e) => {
    const { value, name } = e.target;
    onChangeInput({ value, name });
  };

  const changeHargaHandler = (e, maskedValue, floatValue) => {
    onChangeInput({ name: 'harga', value: floatValue });
  };

  const disabledBiayaPertindakan = disabled || !data.st_tarif_manual;

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
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field" />
                  <Grid.Column width="11" className="field">
                    {kunjungan.nama_dpjp && (
                      <Header as="h5" color="blue">
                        DPJP : {kunjungan.nama_dpjp}
                      </Header>
                    )}
                  </Grid.Column>
                </Grid.Row>
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
                      onChange={changeInputHandler}
                      onKeyDown={(e) =>
                        onFocusElement(
                          e,
                          !disabledBiayaPertindakan
                            ? 'biaya_per_tindakan'
                            : 'save'
                        )
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(getKey('biaya_per_tindakan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <CurrencyInput
                      name="harga"
                      inputRef={inputRef.harga}
                      value={data.harga}
                      disabled={disabledBiayaPertindakan}
                      onChangeEvent={changeHargaHandler}
                      onKeyDown={(e) => onFocusElement(e, 'save')}
                    />
                  </Grid.Column>
                  {showPelaksanaTambahan === true && (
                    <Grid.Column width="6" className="field" textAlign="right">
                      <Dropdown
                        text="Pelaksana"
                        icon="users"
                        floating
                        labeled
                        button
                        className="icon"
                        style={{
                          paddingTop: 6,
                          paddingBottom: 6,
                          marginRight: 7,
                        }}
                        direction="left"
                      >
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={onShowPelaksanaTambahan}
                            icon="user"
                            text={t(getKey('pelaksana_tambahan'))}
                          />
                          <Dropdown.Item
                            onClick={onShowPelaksanaKomponen}
                            icon="list"
                            text={t(getKey('pelaksana_komponen'))}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Grid.Column>
                  )}
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>{t(getKey('total_biaya'))}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <CurrencyInput name="biaya" disabled value={data.biaya} />
                  </Grid.Column>
                  <Grid.Column width="6" className="field">
                    <Button
                      size="mini"
                      color="orange"
                      // icon
                      // labelPosition='left'
                      floated="right"
                      compact
                      style={{ marginRight: 7 }}
                    >
                      <Icon name="copy outline" />
                      {t(getKey('sisa_seluruh_tagihan'))}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="my-3">
            <Grid.Column width={16}>
              <TagihanPasien
                keringanan={kunjungan.keringanan}
                bayar={kunjungan.bayar}
                pengembalian={kunjungan.pengembalian}
                biaya={kunjungan.biaya}
              />
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
  dataForm: PropTypes.object,
  selectedOption: PropTypes.object,
  onShowCariTindakan: PropTypes.func,
  onChangePelaksana: PropTypes.func,
  onChangeInput: PropTypes.func,
  onFocusElement: PropTypes.func,
  showPelaksanaTambahan: PropTypes.bool,
  onShowPelaksanaTambahan: PropTypes.func,
  onShowPelaksanaKomponen: PropTypes.func,
};

export default FormTindakan;
