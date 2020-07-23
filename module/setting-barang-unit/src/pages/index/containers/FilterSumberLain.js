import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form, Divider } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

import { Select } from '@simrs/components';
import {
  sumberLainActions,
  filterActions,
  moduleActions,
} from '@simrs/main/src/modules/setting/default';

class FilterSumberLain extends Component {
  constructor(props) {
    super(props);

    this.unit_layanan = createRef();
    this.kelompok = createRef();
    this.golongan = createRef();
    this.jenis = createRef();
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  _handleSelect2SumberLain(name, selected) {
    this.props.action.onSelect2SumberLainChange(
      this.props.resource,
      name,
      selected
    );
  }

  _handleSelect2Filter(name, selected) {
    let type = '';
    switch (name) {
      case 'kelompok':
      case 'golongan':
      case 'jenis':
        type = 'optional';
        break;
      default:
        break;
    }

    let data = { ...selected, type };
    this.props.action.onSelect2FilterChange(this.props.resource, name, data);
  }

  _getSelect2Value(name) {
    let value = null;

    switch (name) {
      case 'unit_layanan':
        let selectedValue = this.props.postNeeded[name];
        if (selectedValue > 0) {
          value = this.props.dataSumberLain[name].find(
            (row) => row.value === selectedValue
          );
        }

        break;
      case 'kelompok':
      case 'golongan':
      case 'jenis':
        let selectedOptions = this.props.postOptional[name];
        if (selectedOptions > 0) {
          value = this.props.dataFilter.data_filter_sumber[name].find(
            (row) => row.value === selectedOptions
          );
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

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  render() {
    const { dataFilter, dataSumberLain, t, postNeeded } = this.props;
    return (
      <Form id={this.formId} size="mini">
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid className="form-grid">
                <Grid.Row className="form-row">
                  <Grid.Column width="5" className="field">
                    <label>
                      <Trans
                        i18nKey={this._getKey('label.field.unit_layanan')}
                      />
                    </label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Select
                      name="unit_layanan"
                      placeholder={t(
                        this._getKey('placeholder.field.unit_layanan')
                      )}
                      inputRef={this.unit_layanan}
                      value={this._getSelect2Value('unit_layanan')}
                      onChange={(selected) =>
                        this._handleSelect2SumberLain('unit_layanan', selected)
                      }
                      options={dataSumberLain.unit_layanan}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Divider fitted style={{ marginTop: 0, marginBottom: 6 }} />
        </Grid>

        <Grid columns="2">
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <Grid className="form-grid">
                  <Grid.Row className="form-row">
                    <Grid.Column width="5" className="field">
                      <label>{t(this._getKey('label.field.jenis'))}</label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <Select
                        name="jenis"
                        placeholder={t(this._getKey('placeholder.field.jenis'))}
                        inputRef={this.jenis}
                        value={this._getSelect2Value('jenis')}
                        onChange={(selected) =>
                          this._handleSelect2Filter('jenis', selected)
                        }
                        options={dataFilter.data_filter_sumber.jenis}
                        isDisabled={postNeeded.unit_layanan ? false : true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Grid className="form-grid">
                  <Grid.Row className="form-row">
                    <Grid.Column width="5" className="field">
                      <label>{t(this._getKey('label.field.kelompok'))}</label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <Select
                        name="kelompok"
                        placeholder={t(
                          this._getKey('placeholder.field.kelompok')
                        )}
                        inputRef={this.kelompok}
                        value={this._getSelect2Value('kelompok')}
                        onChange={(selected) =>
                          this._handleSelect2Filter('kelompok', selected)
                        }
                        options={dataFilter.data_filter_sumber.kelompok}
                        isDisabled={postNeeded.unit_layanan ? false : true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <Grid className="form-grid">
                  <Grid.Row className="form-row">
                    <Grid.Column width="5" className="field">
                      <label>{t(this._getKey('label.field.golongan'))}</label>
                    </Grid.Column>
                    <Grid.Column width="9" className="field">
                      <Select
                        name="golongan"
                        placeholder={t(
                          this._getKey('placeholder.field.golongan')
                        )}
                        inputRef={this.golongan}
                        value={this._getSelect2Value('golongan')}
                        onChange={(selected) =>
                          this._handleSelect2Filter('golongan', selected)
                        }
                        options={dataFilter.data_filter_sumber.golongan}
                        isDisabled={postNeeded.unit_layanan ? false : true}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
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
    submitting: page.submitting,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        onSelect2SumberLainChange: sumberLainActions.onSelect2Change,
        onSelect2FilterChange: filterActions.onSelect2Change,
        onFocusElement: moduleActions.onFocusElement,
      },
      dispatch
    ),
  };
};

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
