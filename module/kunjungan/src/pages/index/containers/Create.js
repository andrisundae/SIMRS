import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  Grid,
  Form,
  Input,
  Tab,
  Segment,
  Divider,
  Header,
} from 'semantic-ui-react';

import { Select } from '@simrs/components';
import { formatter, utils } from '@simrs/common';

import CariPasien from '../components/CariPasien';
import CariKunjungan from '../components/CariKunjungan';
import NormModal from '../components/NormModal';
import PenjaminPasien from './PenjaminPasien';
import InputPasien from './InputPasien';

import actions from '../redux/actions';
import actionTypes from '../redux/actionTypes';
import { isDisable } from '../redux/selectors';

class Create extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);
    this._onFocusElement = this._onFocusElement.bind(this);

    this.norm = createRef();
    this.nama = createRef();
    this.id_jenis_kelamin = createRef();
    this.nama_ortu = createRef();
    this.nama_panggilan = createRef();
    this.nama_suami_istri = createRef();
  }

  componentDidUpdate() {
    const { statusForm, focusElement } = this.props;
    if (
      statusForm === actionTypes.READY ||
      statusForm === actionTypes.ADD ||
      statusForm === actionTypes.ADD_WITH_SELECTED
    ) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          this[focusElement].current.focus();
        }
      }
    }
  }

  _onFocusElement(e, nameRef) {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }
      this.props.action.onFocusElement(this.props.resource, nameRef);
    }
  }

  noRmKeyDownHandler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      if (e.target.value) {
        this.props.onGetPasien(this.props.resource, { norm: e.target.value });
      }
    }
  };

  dataSourceKunjunganTerakhir = () => {
    const data = this.props.data.kunjungan_terakhir;
    return {
      rowCount: null,
      getRows: (params) => {
        const dataAfterSorting = utils.sortData(params.sortModel, data);
        const rowsThisPage = dataAfterSorting.slice(
          params.startRow,
          params.endRow
        );
        let lastRow = -1;
        if (dataAfterSorting.length <= params.endRow) {
          lastRow = dataAfterSorting.length;
        }
        params.successCallback(rowsThisPage, lastRow);
      },
    };
  };

  getStateDatatables = (name) => {
    return this.props.datatables[name];
  };

  onSelectedPasienHandler = (data) => {
    this.props.action.onSelectedPasien(this.props.resource, {
      id: data.id,
      nama: data.nama,
      norm: data.norm,
      alamat: data.alamat,
      nama_kecamatan: data.kecamatan,
      nama_kota: data.kota,
      nama_provinsi: data.provinsi,
      nama_desa: data.desa,
      id_desa: data.id_desa,
      rt: data.rt,
      rw: data.rw,
      nama_ortu: data.nama_ortu,
      id_jenis_kelamin: data.jenis_kelamin_id,
      nama_jenis_kelamin: data.jenis_kelamin,
      tgl_lahir: data.tgl_lahir,
    });
  };

  select2ChangeHanlder = (name, selected) => {
    this.props.action.onChangeSelect2(this.props.resource, name, selected);
  };

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    const { resource, action } = this.props;
    action.onChangeInput(resource, { name, value });
  };

  onSelectKunjunganHandler = (data) => {
    this.props.action.onSelectedKunjungan(this.props.resource, data);
  };

  getPanes = () => {
    const { resource, t, statusForm } = this.props;
    const disableTabPenjaminPasien = isDisable(
      'tab_penjamin_pasien',
      statusForm
    );

    return [
      {
        menuItem: { key: 'pasien', content: '1. Pasien' },
        render: () => {
          return (
            <Tab.Pane attached="top">
              <InputPasien t={t} resource={resource} />
            </Tab.Pane>
          );
        },
      },
      {
        menuItem: {
          key: 'penjamin_pasien',
          content: '2. Penjamin Pasien',
          disabled: disableTabPenjaminPasien,
        },
        render: () => {
          return (
            <Tab.Pane attached="top">
              <PenjaminPasien t={t} resource={resource} />
            </Tab.Pane>
          );
        },
      },
    ];
  };

  render() {
    const {
      post,
      t,
      data,
      showCariPasien,
      showCariKunjungan,
      showNormModal,
      action,
      resource,
      statusForm,
      selectedOption,
      activeTabIndex,
    } = this.props;

    const disabledDetail = isDisable('detail_pasien', statusForm);
    const disableNoRm = isDisable('norm', statusForm);
    const datatablePasienState = this.getStateDatatables('table_pasien');

    return (
      <Form
        id="form-kunjungan-pasien"
        size="mini"
        onSubmit={(e) => e.preventDefault()}
      >
        <Segment
          size="mini"
          className="pt-3 mb-1 mt-0"
          // style={{ paddingTop: 8, marginBottom: 8, paddingBottom: 20 }}
        >
          <Divider horizontal className="mt-0 mb-6">
            {t(this._getKey('label.field.identitas_pasien'))}
          </Divider>
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t(this._getKey('label.field.norm'))}</label>
                    </Grid.Column>
                    <Grid.Column width="4" className="field">
                      <Input
                        name="norm"
                        ref={this.norm}
                        onKeyDown={this.noRmKeyDownHandler}
                        disabled={disableNoRm}
                        value={
                          disableNoRm
                            ? formatter.textSplitter(post.norm)
                            : post.norm
                        }
                        onChange={this.inputChangeHandler}
                      />
                    </Grid.Column>
                    <Grid.Column width="3" className="field">
                      <label>
                        {t(this._getKey('label.field.kode_kunjungan'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="5" className="field">
                      <Input
                        name="kode_kunjungan"
                        ref={this.kode_kunjungan}
                        disabled={isDisable('kode_kunjungan', statusForm)}
                        value={post.kode_kunjungan}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t(this._getKey('label.field.nama'))}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <Input
                        name="nama"
                        ref={this.nama}
                        onKeyDown={(e) =>
                          this._onFocusElement(e, 'id_jenis_kelamin')
                        }
                        action={{
                          content: 'Cari',
                          onClick: action.toggleShowCariPasien,
                          disabled: isDisable('search', statusForm),
                          color: 'blue',
                        }}
                        disabled={disabledDetail}
                        value={post.nama}
                        onChange={this.inputChangeHandler}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>
                        {t(this._getKey('label.field.jenis_kelamin'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="4" className="field">
                      <Select
                        name="id_jenis_kelamin"
                        options={data.options_jenis_kelamin}
                        isDisabled={disabledDetail}
                        value={selectedOption.id_jenis_kelamin}
                        onChange={(selected) =>
                          this.select2ChangeHanlder(
                            'id_jenis_kelamin',
                            selected
                          )
                        }
                        isClearable={false}
                        inputRef={this.id_jenis_kelamin}
                        onKeyDown={(e) =>
                          this._onFocusElement(e, 'nama_panggilan')
                        }
                      />
                    </Grid.Column>
                    <Grid.Column width="3" className="field">
                      <label>{t(this._getKey('nama_panggilan'))}</label>
                    </Grid.Column>
                    <Grid.Column width="5" className="field">
                      <Input
                        name="nama_panggilan"
                        ref={this.nama_panggilan}
                        disabled={disabledDetail}
                        value={post.nama_panggilan}
                        onKeyDown={(e) => this._onFocusElement(e, 'nama_ortu')}
                        onChange={this.inputChangeHandler}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>
                        {t(this._getKey('label.field.nama_orangtua'))}
                      </label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input
                        name="nama_ortu"
                        ref={this.nama_ortu}
                        disabled={disabledDetail}
                        value={post.nama_ortu}
                        onChange={this.inputChangeHandler}
                        onKeyDown={(e) =>
                          this._onFocusElement(e, 'nama_suami_istri')
                        }
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="6" className="field">
                      <label>{t(this._getKey('nama_suami_istri'))}</label>
                    </Grid.Column>
                    <Grid.Column width="10" className="field">
                      <Input
                        name="nama_suami_istri"
                        ref={this.nama_suami_istri}
                        disabled={disabledDetail}
                        value={post.nama_suami_istri}
                        onChange={this.inputChangeHandler}
                        onKeyDown={(e) => this._onFocusElement(e, 'tgl_lahir')}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {post.id && (
                    <Grid.Row className="form-row">
                      <Grid.Column
                        className="field"
                        textAlign="right"
                        width="16"
                      >
                        <Header as="h3" color="green" style={{ marginTop: 3 }}>
                          {post.st_pulang
                            ? t(this._getKey('kunjungan_selesai'))
                            : t(this._getKey('kunjungan_aktif'))}{' '}
                          -{' '}
                          {selectedOption.id_penjamin
                            ? selectedOption.id_penjamin.label
                            : ''}
                        </Header>
                        {/* <h5 style={{ marginTop: 0 }}>
                          <strong>
                            {post.st_pulang
                              ? t(this._getKey('kunjungan_selesai'))
                              : t(this._getKey('kunjungan_aktif'))}
                          </strong>
                        </h5>
                        <h5 style={{ marginTop: 0 }}>
                          <strong>
                            {selectedOption.id_penjamin
                              ? selectedOption.id_penjamin.label
                              : ''}
                          </strong>
                        </h5> */}
                      </Grid.Column>
                    </Grid.Row>
                  )}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Tab
          menu={{ attached: 'bottom' }}
          panes={this.getPanes()}
          onTabChange={(e, { activeIndex }) =>
            this.props.action.onChangeTab(resource, { activeIndex })
          }
          activeIndex={activeTabIndex}
        />
        {showCariPasien && (
          <CariPasien
            show={showCariPasien}
            onHide={action.toggleShowCariPasien}
            onSelect={this.onSelectedPasienHandler}
            resource={resource}
            onChange={action.onChangeFilterPasien}
            onSubmit={action.onSubmitFilterPasien}
            isReloadGrid={datatablePasienState.isReload}
            reloadType={datatablePasienState.reloadType}
            onLoadData={action.loadAllPasien}
            t={t}
          />
        )}
        {showCariKunjungan && (
          <CariKunjungan
            show={showCariKunjungan}
            onHide={action.toggleShowCariKunjungan}
            dataSource={this.dataSourceKunjunganTerakhir}
            onSelect={this.onSelectKunjunganHandler}
            resource={resource}
            t={t}
          />
        )}
        {showNormModal && (
          <NormModal
            show={showNormModal}
            onHide={action.toggleShowNormModal}
            pasien={{ norm: post.norm, nama: post.nama }}
          />
        )}
      </Form>
    );
  }

  _handleInputChange(e) {
    const { name, value } = e.target;
    this.props.action.onChangeInput(this.props.resource, { name, value });
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
    showNormModal,
    statusForm,
    selectedOption,
    activeTabIndex,
  } = state.module.kunjungan;

  return {
    post,
    focusElement,
    data,
    showCariPasien,
    showCariKunjungan,
    showNormModal,
    datatables: state.datatable.datatables,
    statusForm,
    selectedOption,
    activeTabIndex,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
    onGetPasien: (resource, data) =>
      dispatch(actions.getPasien.request(resource, data)),
  };
};

Create.propTypes = {
  action: PropTypes.object,
  post: PropTypes.object,
  focusElement: PropTypes.string,
  statusForm: PropTypes.string,
  data: PropTypes.object,
  selectedOption: PropTypes.object,
  resource: PropTypes.string.isRequired,
  t: PropTypes.func,
  onGetPasien: PropTypes.func,
  showCariPasien: PropTypes.bool,
  showCariKunjungan: PropTypes.bool,
  showNormModal: PropTypes.bool,
  datatables: PropTypes.object,
  activeTabIndex: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
