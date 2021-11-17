import React from 'react';
import { Grid, Form, Input, Segment, Divider, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const IdentitasPasien = ({
  t,
  data,
  resource,
  onEnterNorm,
  focusElement,
  isDisabledNorm,
  onChangeInput,
}) => {
  const inputRef = {
    norm: React.useRef(),
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

  return (
    <Form
      id="form-tindakan-kunjungan"
      size="mini"
      onSubmit={(e) => e.preventDefault()}
    >
      <Segment
        size="mini"
        className="pt-0 pb-6 mb-1"
      >
        <Divider horizontal className="mt-3 mb-6">
          {t(getKey('identitas_pasien'))}
        </Divider>
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('norm'))}</label>
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
                  <Grid.Column width="3" className="field">
                    <label>{t(getKey('no_billing'))}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <Input
                      name="kode_kunjungan_unit"
                      // ref={this.kode_kunjungan}
                      disabled
                      value={data.kode_kunjungan_unit}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('nama'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input name="nama" disabled value={data.nama_pasien} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(getKey('jenis_kelamin'))}</label>
                  </Grid.Column>
                  <Grid.Column width="4" className="field">
                    <Input
                      name="jenis_kelamin"
                      disabled
                      value={data.jenis_kelamin}
                    />
                  </Grid.Column>
                  <Grid.Column width="8" className="field">
                    <Header as="h4" color="grey" style={{ marginTop: 3 }}>
                      {data.umur}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t(getKey('nama_ortu'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input name="nama_ortu" disabled value={data.nama_ortu} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{t(getKey('alamat'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input name="alamat" disabled value={data.alamat} />
                  </Grid.Column>
                </Grid.Row>
                {data.id && (
                  <Grid.Row className="form-row">
                    <Grid.Column width="16" className="field" textAlign="right">
                      <Header as="h3" color="green" style={{ marginTop: 3 }}>
                        {data.st_pulang
                          ? t(getKey('kunjungan_selesai'))
                          : t(getKey('kunjungan_aktif'))}{' '}
                        - {data.nama_status_pasien}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Form>
  );
};

IdentitasPasien.propTypes = {
  data: PropTypes.object,
  t: PropTypes.func,
};

export default IdentitasPasien;
