import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form, Divider } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

import { Select } from '@simrs/components';
import {sumberLainActions, filterActions, moduleActions} from '@simrs/main/src/modules/setting/default';

class FilterSumberLain extends Component {
  constructor(props) {
    super(props);

    this.instalasi = createRef();
    this.unit_layanan = createRef();
    this.klasifikasi = createRef();
    this.kelompok = createRef();
    this.status_batasan = createRef();
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
          this[focusElement].current.focus();
      }
    }
  }

  _handleSelect2SumberLain(name, selected) {
    this.props.action.onSelect2SumberLainChange(this.props.resource, name, selected);
  }

  _handleSelect2Filter(name, selected) {
    let type = '';
    let filter = {};
    switch (name) {
      case 'instalasi':
        type = 'optional';
        filter = { target: "dataSumber", name: "unit_layanan", by: "instalasi" };
        break;

      case 'klasifikasi':
        type = 'needed';
        filter = { target: "filter", name: "kelompok", by: "klasifikasi" };
        break;

      case 'kelompok':
        type = 'optional';
        break;
      default:
      break;
    }

    let data = { ...selected, type, filter };
    this.props.action.onSelect2FilterChange(this.props.resource, name, data);
  }

  _getSelect2Value(name) {
    let value = null;

    switch (name) {
      case 'klasifikasi': {
        let selectedValue = this.props.postNeeded[name];
        if (selectedValue > 0) {
          value = this.props.dataFilter.data_filter_sumber[name].find(row => row.value === selectedValue);
        }
      }
        break;

      case 'unit_layanan':
      case 'status_batasan': {
        let selectedValue = this.props.postNeeded[name];
        if (selectedValue > 0) {
          value = this.props.dataSumberLain[name].find(row => row.value === selectedValue);
        }
      }
        break;

      case 'instalasi':
      case 'kelompok': {
        let selectedValue = this.props.postOptional[name];
        if (selectedValue > 0) {
          value = this.props.dataFilter.data_filter_sumber[name].find(row => row.value === selectedValue);
        }
      }
        break;
      default:
      break;
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

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  _getKey(key) {
      return `${this.props.resource}:${key}`;
  }

  render() {
    const { dataFilter, dataSumberLain, t} = this.props;

    return (
      <Form id={this.formId} size="mini">
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid className="form-grid">
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label><Trans i18nKey={this._getKey('label.field.instalasi')} /></label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="instalasi"
                      placeholder={t(this._getKey('placeholder.field.instalasi'))}
                      inputRef={this.instalasi}
                      value={this._getSelect2Value('instalasi')}
                      onChange={(selected) => this._handleSelect2Filter('instalasi', selected)}
                      onKeyDown={(e) => this._onFocusElement(e, 'unit_layanan')}
                      options={dataFilter.data_filter_sumber.instalasi}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.unit_layanan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="unit_layanan"
                      placeholder={t(this._getKey('placeholder.field.unit_layanan'))}
                      inputRef={this.unit_layanan}
                      value={this._getSelect2Value('unit_layanan')}
                      onChange={(selected) => this._handleSelect2SumberLain('unit_layanan', selected)}
                      onKeyDown={(e) => this._onFocusElement(e, 'klasifikasi')}
                      options={dataSumberLain.unit_layanan}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Divider fitted style={{ marginTop: 0, marginBottom: 6 }} />
          <Grid.Row>
            <Grid.Column>
              <Grid className="form-grid">
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.klasifikasi'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="klasifikasi"
                      placeholder={t(this._getKey('placeholder.field.klasifikasi'))}
                      inputRef={this.klasifikasi}
                      value={this._getSelect2Value('klasifikasi')}
                      onChange={(selected) => this._handleSelect2Filter('klasifikasi', selected)}
                      onKeyDown={(e) => this._onFocusElement(e, 'kelompok')}
                      options={dataFilter.data_filter_sumber.klasifikasi}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.kelompok'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="kelompok"
                      placeholder={t(this._getKey('placeholder.field.kelompok'))}
                      inputRef={this.kelompok}
                      value={this._getSelect2Value('kelompok')}
                      onChange={(selected) => this._handleSelect2Filter('kelompok', selected)}
                      onKeyDown={(e) => this._onFocusElement(e, 'status_batasan')}
                      options={dataFilter.data_filter_sumber.kelompok}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid className="form-grid">
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{t(this._getKey('label.field.status_batasan'))}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Select
                      name="status_batasan"
                      placeholder={t(this._getKey('label.field.status_batasan'))}
                      inputRef={this.status_batasan}
                      value={this._getSelect2Value('status_batasan')}
                      onChange={(selected) => this._handleSelect2SumberLain('status_batasan', selected)}
                      onKeyDown={(e) => this._onFocusElement(e, 'jumlah')}
                      options={dataSumberLain.status_batasan}
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
}

const mapStateToProps = function (state) {
    const page = state.page;

    return {
        dataFilter: page.filter.data,
        dataSumberLain: page.sumberLain.data,
        postNeeded: page.post.needed,
        postOptional: page.post.optional,
        focusElement: page.focusElement,
        submitting: page.submitting
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators(
          {
            onSelect2SumberLainChange: sumberLainActions.onSelect2Change,
            onSelect2FilterChange: filterActions.onSelect2Change,
            onFocusElement: moduleActions.onFocusElement
          },
          dispatch
        ),
    }
}

FilterSumberLain.propTypes = {
    action: PropTypes.object,
    resource: PropTypes.string.isRequired,
    dataFilter: PropTypes.object,
    dataSumberLain: PropTypes.object,
    postNeeded: PropTypes.object,
    postOptional: PropTypes.object,
    focusElement: PropTypes.string,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSumberLain);
