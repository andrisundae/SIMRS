import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Grid, Form, Input, Tab, Segment, Divider } from 'semantic-ui-react';

import { Select } from '@simrs/components';

import CariPasien from '../components/CariPasien';
import CariKunjungan from '../components/CariKunjungan';
import PenjaminPasien from './PenjaminPasien';
import InputPasien from './InputPasien';

import actions from '../actions';
import {isDisable} from '../reducer';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.no_rm = createRef();
    this.nama = createRef();
    this.newPassword = createRef();
  }

  noRmKeyDownHandler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.props.action.toggleShowCariKunjungan();
    }
  }

  dataSourcePasien = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
        let post = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          filters: { ...this.props.filterPasien.post}
        };

        this.props.action.loadAllPasien(this.props.resource, post, params);
      }
    }
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
          filters: { ...this.props.filterWilayah.post }
        };

        this.props.action.loadAllWilayah(this.props.resource, post, params);
      }
    }
  }

  getStateDatatables = (name) => {
    return this.props.datatables[name];
  }

  onSelectedPasienHandler = (params) => {
    if (params.node.isSelected()) {
      this.props.action.onSelectedPasien(this.props.resource, params.data);
    }
  }

  select2ChangeHanlder = (name, selected) => {
    this.props.action.onChangeSelect2(this.props.resource, name, selected);
  }

  render() {
    const {
      post,
      t,
      data,
      showCariPasien,
      showCariKunjungan,
      filterPasien,
      action,
      resource,
      statusForm,
      selectedOption
    } = this.props;
    

    const panes = [
      {
        menuItem: '1. Pasien',
        render: () => {
          return (
            <Tab.Pane attached='top'>
              <InputPasien t={this.props.t} resource={this.props.resource} />
            </Tab.Pane>
          )
        },
      },
      {
        menuItem: '2. Penjamin Pasien',
        render: () => {
          return (
            <Tab.Pane attached='top'>
              <PenjaminPasien t={this.props.t} resource={this.props.resource} />
            </Tab.Pane>
          )
        },
      },
    ]

    const disabledDetail = isDisable('detail_pasien', statusForm);

    return (
      <Form id="form-kunjungan-pasien" size="mini">
        <Segment size="mini" style={{ paddingTop: 8, marginBottom: 8, paddingBottom: 20 }}>
          <Divider horizontal style={{ marginTop: 0, marginBottom: 35 }}>{t(this._getKey('label.field.identitas_pasien'))}</Divider>
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="3" className="field">
                      <label>{t(this._getKey('label.field.norm'))}</label>
                    </Grid.Column>
                    <Grid.Column width="5" className="field">
                      <Input
                        name="norm"
                        ref={this.norm}
                        onKeyDown={this.noRmKeyDownHandler}
                        disabled={isDisable('norm', statusForm)}
                        value={post.norm}
                      />
                    </Grid.Column>
                    <Grid.Column width="3" className="field">
                      <label>{t(this._getKey('label.field.kode_kunjungan'))}</label>
                    </Grid.Column>
                    <Grid.Column width="5" className="field">
                      <Input
                        name="kode_kunjungan"
                        ref={this.kode_kunjungan}
                        disabled={isDisable('kode_kunjungan', statusForm)}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="3" className="field">
                      <label>{t(this._getKey('label.field.nama'))}</label>
                    </Grid.Column>
                    <Grid.Column width="13" className="field">
                      <Input
                        name="nama"
                        ref={this.nama}
                        onKeyDown={(e) => this._onFocusElement(e, 'newPassword')}
                        action={{
                          content: 'Cari',
                          onClick: action.toggleShowCariPasien,
                          disabled: isDisable('search', statusForm),
                          color: "blue"
                        }}
                        disabled={disabledDetail}
                        value={post.nama}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width="10">
                      <Grid>
                        <Grid.Row className="form-row" style={{ marginTop: 14 }}>
                          <Grid.Column width="5" className="field">
                            <label>{t(this._getKey('label.field.jenis_kelamin'))}</label>
                          </Grid.Column>
                          <Grid.Column width="11" className="field">
                            <Select
                              name="id_jenis_kelamin"
                              options={data.options_jenis_kelamin}
                              isDisabled={disabledDetail}
                              value={selectedOption.jenis_kelamin}
                              onChange={(selected) => this.select2ChangeHanlder('jenis_kelamin', selected)}
                              isClearable={false}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="form-row">
                          <Grid.Column width="5" className="field">
                            <label>{t(this._getKey('label.field.nama_orangtua'))}</label>
                          </Grid.Column>
                          <Grid.Column width="11" className="field">
                            <Input
                              name="nama_ortu"
                              ref={this.nama_ortu}
                              disabled={disabledDetail}
                              value={post.nama_ortu}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column width="6" style={{textAlign: 'right'}}>
                      <h5 style={{ marginTop: 0 }}><strong>Kunjungan Aktif</strong></h5>
                      <h5 style={{ marginTop: 0 }}><strong>UMUM</strong></h5>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Tab menu={{ attached: 'bottom' }} panes={panes} />
        {showCariPasien &&
          <CariPasien
            show={showCariPasien}
            onHide={action.toggleShowCariPasien}
            onSelect={this.onSelectedPasienHandler}
            data={filterPasien}
            resource={resource}
            dataSource={this.dataSourcePasien}
            onChange={action.onChangeFilterPasien}
            onSubmit={action.onSubmitFilterPasien}
            isReloadGrid={this.getStateDatatables('table_pasien').isReload}
            reloadType={this.getStateDatatables('table_pasien').reloadType}
          />
        }
        
        <CariKunjungan
          show={showCariKunjungan}
          onHide={action.toggleShowCariKunjungan}
        />
      </Form>
    )
  }

  componentDidUpdate() {
    let { focusElement } = this.props;

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }
  }

  _handleInputChange(e) {
    const { name, value } = e.target;
    this.props.action.onChangeInput(this.props.resource, { name, value });
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      e.preventDefault();
      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }
}

const mapStateToProps = function (state) {
  const {
    post,
    focusElement,
    data,
    showCariPasien,
    showCariKunjungan,
    filterPasien,
    statusForm,
    selectedOption
  } = state.module;

  return {
    post,
    focusElement,
    data,
    showCariPasien,
    showCariKunjungan,
    filterPasien,
    datatables: state.datatable.datatables,
    statusForm,
    selectedOption
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  }
}

Create.propTypes = {
  action: PropTypes.object,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  data: PropTypes.object,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
