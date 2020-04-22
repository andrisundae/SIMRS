import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Grid } from 'semantic-ui-react';

import { Select, SearchButton } from '@simrs/components';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.versi_tarif = createRef();
    this.klasifikasi = createRef();
    this.kelompok = createRef();
    this.kelas = createRef();
    this.nama_layanan = createRef();
    this.search = createRef();
  }

  render() {
    const {
      selectedKelas,
      selectedKelompok,
      selectedVersiTarif,
      selectedKlasifikasi,
      nama_layanan,
    } = this.props.location.state.filterPost;
    const { t } = this.props;

    return (
      <Form id={this.formId} size="small" disabled>
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.versi_tarif'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      name="versi_tarif"
                      placeholder={t(
                        this._getKey('placeholder.field.versi_tarif')
                      )}
                      inputRef={this.versi_tarif}
                      isDisabled={true}
                      value={selectedVersiTarif}
                      options={[]}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.klasifikasi'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      name="klasifikasi"
                      placeholder={t(
                        this._getKey('placeholder.field.klasifikasi')
                      )}
                      inputRef={this.klasifikasi}
                      onChange={this._handleChangeKlasifikasi}
                      isDisabled={true}
                      value={selectedKlasifikasi}
                      options={[]}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.kelompok'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      name="kelompok"
                      placeholder={t(
                        this._getKey('placeholder.field.kelompok')
                      )}
                      inputRef={this.kelompok}
                      isDisabled={true}
                      value={selectedKelompok}
                      options={[]}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid className="form-grid">
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.kelas'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Select
                      name="kelas"
                      placeholder={t(this._getKey('placeholder.field.kelas'))}
                      inputRef={this.kelas}
                      onChange={this._handleChangeKelas}
                      isDisabled={true}
                      value={selectedKelas}
                      options={[]}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.layanan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="12" className="field">
                    <Input
                      name="nama_layanan"
                      ref={this.nama_layanan}
                      value={nama_layanan}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid className="form-grid">
                <Grid.Row className="form-row">
                  <Grid.Column width="8" className="field">
                    <SearchButton inputRef={this.search} disabled={true} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

Filter.propTypes = {
  resource: PropTypes.string.isRequired,
  subResource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Filter;
