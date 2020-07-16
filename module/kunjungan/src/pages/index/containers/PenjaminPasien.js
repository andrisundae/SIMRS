import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Segment, Input, Divider } from 'semantic-ui-react';
import { Select, Checkbox } from '@simrs/components';

import Datatable from '../components/PenjaminPasienTable';
import * as actions from '../redux/penjaminPasienActions';
import * as actionTypes from '../redux/penjaminPasienActionTypes';
import { isDisableForm } from '../redux/penjaminPasienSelector';
import { staticConst } from '../static';

class PenjaminPasien extends Component {
  constructor(props) {
    super(props);

    this.tableName = 'penjamin_pasien';
    this.resource = '_billing_master_penjamin_pasien';
    this.dataTable = createRef();

    this.id_penjamin_pasien = createRef();
    this.nomor_anggota = createRef();
    this.id_kelas_penjamin_pasien = createRef();
    this.id_kepersertaan = createRef();
    this.aktif = createRef();
  }

  componentDidMount() {
    this.props.onReady(this.resource);
  }

  componentDidUpdate(prevProps) {
    const { statusForm, focusElement, datatable, selectedRow } = this.props;

    if (
      statusForm === actionTypes.ADD_PENJAMIN_PASIEN ||
      statusForm === actionTypes.EDIT_PENJAMIN_PASIEN
    ) {
      if (this[focusElement]) {
        if (this[focusElement].current) {
          this[focusElement].current.focus();
        }
      }
    }

    if (!datatable.isReload) {
      const gridApi = this.gridApi();
      console.log(gridApi);
      if (gridApi) {
        switch (statusForm) {
          case actionTypes.ADD_PENJAMIN_PASIEN:
            if (isDisableForm) {
              this.gridApi().deselectAll();
            }
            break;
          case actionTypes.CANCEL_PENJAMIN_PASIEN:
            if (prevProps.selectedRow) {
              this.selectRow(prevProps.selectedRow);
            }
            break;
          // case actionTypes.AFTER_SAVE:
          //   this._selectRow(selectedRow);
          //   break;
          case actionTypes.READY_PENJAMIN_PASIEN:
            if (prevProps.selectedRow) {
              this.selectRow(prevProps.selectedRow);
            } else {
              if (selectedRow) {
                this.selectRow(selectedRow);
              } else {
                this.gridApi().deselectAll();
                this.gridApi().clearFocusedCell();
              }
            }

            break;
          default:
            return;
        }
      }
    }
  }

  gridApi = () => {
    return this.dataTable.current.gridApi;
  };

  columnApi = () => {
    return this.dataTable.current.columnApi;
  };

  selectRow = (id) => {
    this.gridApi().deselectAll();
    this.gridApi().clearFocusedCell();

    let node = this.gridApi().getRowNode(id);
    if (node) {
      this.setFocusedCell(node.rowIndex);
      node.setSelected(true, true);
    }
  };

  setFocusedCell(rowIndex) {
    this.gridApi().ensureIndexVisible(0);
    const firstCol = this.columnApi().getAllDisplayedColumns()[0];
    this.gridApi().ensureColumnVisible(firstCol);
    this.gridApi().setFocusedCell(rowIndex, firstCol);
  }

  _getDataSource = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        const idPasien = this.props.idPasien;
        if (idPasien) {
          let sortModel =
            params.sortModel.length > 0 ? params.sortModel[0] : {};
          let post = {
            length: 25,
            start: params.startRow,
            sort_name: sortModel.colId ? sortModel.colId : '',
            sort_order: sortModel.colId ? sortModel.sort : '',
            id_pasien: idPasien,
          };

          this.props.onLoadPenjaminPasien(this.props.resource, post, params);
        } else {
          params.successCallback([], 0);
        }
      },
    };
  };

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  select2ChangeHanlder = (name, selected) => {
    this.props.onChangeSelect2(this.resource, name, selected);
  };

  focusElementHanlder = (e, nameRef) => {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }
      this.props.onFocusElement(this.props.resource, nameRef);
    }
  };

  selectedRowHandler = (data) => {
    this.props.onSelectedRow(this.props.resource, data);
  };

  render() {
    const {
      t,
      datatable,
      isDisableForm,
      optionsPenjamin,
      optionsStatusKepesertaan,
      optionsKelasPenjamin,
      loaderSettingKelasPenjamin,
      selectedOption,
      post,
    } = this.props;
    const isDisabledHakKelas =
      isDisableForm || !post.id_penjamin_pasien || loaderSettingKelasPenjamin;

    return (
      <Grid className="content-grid">
        <Grid.Row>
          <Grid.Column>
            <Divider horizontal style={{ marginTop: 10, marginBottom: 10 }}>
              Data Penjamin
            </Divider>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Datatable
              dataSource={this._getDataSource}
              onRowSelected={this.selectedRowHandler}
              isReload={datatable.isReload}
              reloadType={datatable.reloadType}
              ref={this.dataTable}
              name={this.tableName}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment padded>
              <Grid columns="2">
                <Grid.Row>
                  <Grid.Column>
                    <Grid style={{ marginTop: 0, marginBottom: -11 }}>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>
                            {t(this._getKey('label.field.penjamin'))}
                          </label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Select
                            inputRef={this.id_penjamin_pasien}
                            options={optionsPenjamin}
                            isDisabled={isDisableForm}
                            value={selectedOption.id_penjamin_pasien}
                            onChange={(selected) =>
                              this.select2ChangeHanlder(
                                'id_penjamin_pasien',
                                selected
                              )
                            }
                            isClearable={false}
                            onKeyDown={(e) =>
                              this.focusElementHanlder(e, 'nomor_anggota')
                            }
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>
                            {t(this._getKey('label.field.no_anggota'))}
                          </label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Input
                            name="nomor_anggota"
                            ref={this.nomor_anggota}
                            disabled={isDisableForm}
                            onChange={this.inputChangeHandler}
                            value={post.nomor_anggota}
                            onKeyDown={(e) =>
                              this.focusElementHanlder(
                                e,
                                isDisabledHakKelas
                                  ? 'id_kepersertaan'
                                  : 'id_kelas_penjamin_pasien'
                              )
                            }
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>
                            {t(this._getKey('label.field.hak_kelas'))}
                          </label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Select
                            inputRef={this.id_kelas_penjamin_pasien}
                            options={optionsKelasPenjamin}
                            isDisabled={isDisabledHakKelas}
                            value={selectedOption.id_kelas_penjamin_pasien}
                            onChange={(selected) =>
                              this.select2ChangeHanlder(
                                'id_kelas_penjamin_pasien',
                                selected
                              )
                            }
                            isClearable={false}
                            onKeyDown={(e) =>
                              this.focusElementHanlder(e, 'id_kepersertaan')
                            }
                            isLoading={loaderSettingKelasPenjamin}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>
                            {t(this._getKey('label.field.status_kepersetaan'))}
                          </label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Select
                            options={optionsStatusKepesertaan}
                            isDisabled={isDisableForm}
                            value={selectedOption.id_kepersertaan}
                            onChange={(selected) =>
                              this.select2ChangeHanlder(
                                'id_kepersertaan',
                                selected
                              )
                            }
                            isClearable={false}
                            inputRef={this.id_kepersertaan}
                            onKeyDown={(e) =>
                              this.focusElementHanlder(e, 'aktif')
                            }
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className="form-row">
                        <Grid.Column width="4" className="field">
                          <label>{t(this._getKey('label.field.status'))}</label>
                        </Grid.Column>
                        <Grid.Column width="12" className="field">
                          <Checkbox
                            value={post.aktif}
                            name="aktif"
                            checked={post.aktif ? true : false}
                            disabled={isDisableForm}
                            onChange={this.inputChangeHandler}
                            onKeyDown={(e) =>
                              this.focusElementHanlder(e, 'save')
                            }
                            inputRef={this.aktif}
                            label={t(this._getKey('sublabel.field.status'))}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = function (state) {
  const { post: postKunjungan, data } = state.module.kunjungan;
  const {
    post,
    loaderSettingKelasPenjamin,
    data: dataPenjaminPasien,
    focusElement,
    selectedOption,
    statusForm,
    selectedRow,
  } = state.module.penjaminPasien;

  return {
    datatable: state.datatable.datatables.table_penjamin_pasien,
    idPasien: postKunjungan.id_pasien,
    isDisableForm: isDisableForm(state.module.penjaminPasien),
    optionsKelasPenjamin: dataPenjaminPasien.options_setting_kelas_penjamin.filter(
      (row) => row.value !== staticConst.ID_NON_KELAS
    ),
    optionsStatusKepesertaan: data.options_status_kepersetaan,
    optionsPenjamin: data.options_penjamin.filter(
      (row) => row.value !== staticConst.ID_PENJAMIN_UMUM
    ),
    post,
    loaderSettingKelasPenjamin,
    focusElement,
    selectedOption,
    statusForm,
    selectedRow,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onLoadPenjaminPasien: (resource, post, tableParams) =>
      dispatch(actions.loadAllPenjaminPasien(resource, post, tableParams)),
    onReady: (resource) => dispatch(actions.onReady(resource)),
    onFocusElement: (resource, element) =>
      dispatch(actions.onFocusElement(resource, element)),
    onSelectedRow: (resource, data) =>
      dispatch(actions.onSelected(resource, data)),
    onChangeSelect2: (resource, name, data) =>
      dispatch(actions.onChangeSelect2(resource, name, data)),
  };
};

PenjaminPasien.propTypes = {
  resource: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  datatable: PropTypes.object,
  post: PropTypes.object,
  idPasien: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  action: PropTypes.object,
  onLoadPenjaminPasien: PropTypes.func,
  onReady: PropTypes.func,
  onChangeSelect2: PropTypes.func,
  onFocusElement: PropTypes.func,
  onSelectedRow: PropTypes.func,
  isDisableForm: PropTypes.bool,
  loaderSettingKelasPenjamin: PropTypes.bool,
  optionsStatusKepesertaan: PropTypes.array,
  optionsPenjamin: PropTypes.array,
  optionsKelasPenjamin: PropTypes.array,
  focusElement: PropTypes.string,
  statusForm: PropTypes.string,
  selectedOption: PropTypes.object,
  selectedRow: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(PenjaminPasien);
