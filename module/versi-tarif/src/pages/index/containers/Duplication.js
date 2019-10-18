import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Modal, Input, Grid, Divider, Icon, Form } from 'semantic-ui-react';

import { SaveButton, CancelButton, DatatableServerSide, constDatatable, confirmation } from '@simrs/components';
import action from '../actions';

const TABLE_DUPLICATION = 'data_duplication';

class Duplication extends Component {
    constructor(props) {
        super(props);

        this._onCancel = this._onCancel.bind(this);
        this._onDuplication = this._onDuplication.bind(this);
        this._onRowSelected = this._onRowSelected.bind(this);

        this.state = {
            cacheBlockSize: 25
        }

        this.dataTable = createRef();
    }

    render() {
        const { selectedAsal, selectedTujuan, t, show } = this.props;

        return (
            <Modal open={show} onClose={this._onCancel} size="tiny" closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header><Icon name="copy outline" />{t(this._getKey('duplikasi.title'))}</Modal.Header>
                <Modal.Content>
                    <Grid className="content-grid" >
                        <Grid.Row>
                            <Grid.Column>
                                <DatatableServerSide
                                    ref={this.dataTable}
                                    columns={this._getColumnDefs()}
                                    name={TABLE_DUPLICATION}
                                    navigateToSelect={true}
                                    enableServerSideSorting={true}
                                    datasource={this._getDataSource()}
                                    rowBuffer={0}
                                    maxConcurrentDatasourceRequests={1}
                                    infiniteInitialRowCount={1}
                                    cacheBlockSize={this.state.cacheBlockSize}
                                    containerHeight="200px"
                                    onRowSelected={this._onRowSelected}
                                    getRowNodeId={this._getRowNodeId}
                                    sizeColumnsToFit={true}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Divider style={{ marginBottom: 15, marginTop: 0 }} />
                        <Grid.Row>
                            <Grid.Column>
                                <Form id={this.formId} size="small">
                                    <Grid className="form-grid">
                                        <Grid.Row className="form-row">
                                            <Grid.Column width="3" className="required field">
                                                <label>{t(this._getKey('label.field.versi_tarif_tujuan'))}</label>
                                            </Grid.Column>
                                            <Grid.Column width="8" className="field">
                                                <Input
                                                    value={selectedTujuan.nama}
                                                    disabled={true}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row className="form-row">
                                            <Grid.Column width="3" className="required field">
                                                <label>{t(this._getKey('label.field.versi_tarif_asal'))}</label>
                                            </Grid.Column>
                                            <Grid.Column width="8" className="field">
                                                <Input
                                                    value={selectedAsal.nama}
                                                    disabled={true}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <CancelButton
                        onClick={this._onCancel}
                    />
                    <SaveButton
                        onClick={this._onDuplication}
                    />
                </Modal.Actions>
            </Modal>
        )
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;
        this._bindKey();
    }

    componentWillUnmount() {
        this._unbindKey();
    }

    _unbindKey() {
        MouseTrap.unbind("f2");
        MouseTrap.unbind("alt+r");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bind('f2', function (e) {
            e.preventDefault();
            _this._setFirstRowSelected();
        });

        MouseTrap.bind('alt+r', function (e) {
            e.preventDefault();
            _this._reload(constDatatable.reloadType.purge);
        });
    }

    _getDataSource() {
        let _this = this;

        return {
            rowCount: null,
            getRows: (params) => {
                let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
                let post = {
                    length: _this.state.cacheBlockSize,
                    start: params.startRow,
                    sort_name: sortModel.colId ? sortModel.colId : '',
                    sort_order: sortModel.colId ? sortModel.sort : '',
                    id: _this.props.selectedRow
                };
                _this.props.action.loadAllOnDuplication(_this.props.resource, post, params);
            }
        }
    }

    _getRefDatatable() {
        console.log(this.dataTable.current)
        return this.dataTable.current.refs[TABLE_DUPLICATION];
    }

    _reload(reloadType) {
        if (reloadType === constDatatable.reloadType.purge) {
            this.gridApi.setInfiniteRowCount(1);
            this.gridApi.purgeInfiniteCache();
        } else if (reloadType === constDatatable.reloadType.refresh) {
            this.gridApi.refreshInfiniteCache();
        }
    }

    _selectRow(id) {
        this.gridApi.deselectAll();
        this.gridApi.clearFocusedCell();

        let node = this.gridApi.getRowNode(id);
        if (node) {
            node.setSelected(true, true);
        }
    }

    _setFirstRowSelected() {
        this.gridApi.ensureIndexVisible(0);
        let firstCol = this.columnApi.getAllDisplayedColumns()[0];
        this.gridApi.ensureColumnVisible(firstCol);
        this.gridApi.setFocusedCell(0, firstCol);
        let cell = this.gridApi.getFocusedCell();
        if (cell) {
            let node = this.gridApi.getModel().getRow(cell.rowIndex);
            if (node) {
                node.setSelected(true, true);
            }
        }
    }

    _onRowSelected(params) {
        if (params.node.isSelected()) {
            this.props.action.onSelectedDuplication(this.props.resource, params.data);
        }
    }

    _getRowNodeId(item) {
        return item.id;
    }

    _onCancel() {
        this.props.action.onCancelDuplication(this.props.resource);
    }

    _onDuplication(e) {
        e.preventDefault();
        const {selectedAsal, selectedTujuan, post, resource} = this.props;
        confirmation({
            onOk: () => this.props.action.onDuplication(resource, post),
            message: `Versi tarif ${selectedTujuan.nama} akan di duplikasi data dari versi tarif ${selectedAsal.nama}, apakah akan dilanjutkan ? `
        });
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.no`),
                field: "no",
                cellRenderer: "loadingRenderer",
                sortable: false,
                width: 70,
                cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' }
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama`),
                field: "nama",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.tgl_aktif_tarif`),
                field: "tgl_aktif_tarif",
                cellRenderer: 'dateRenderer',
                width: 150
            }
        ]
    }
}

const mapStateToProps = function (state) {
    const { duplication, selectedRow, post } = state.default.module;

    return {
        show: duplication.show,
        columnDefs: duplication.columnDefs,
        selectedTujuan: post,
        selectedAsal: duplication.selectedData,
        selectedRow,
        post: duplication.post
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            loadAllOnDuplication: action.loadAllOnDuplication,
            onDuplication: action.duplication.request,
            onSelectedDuplication: action.onSelectedDuplication,
            onCancelDuplication: action.onCancelDuplication
        }, dispatch)
    }
}

Duplication.propTypes = {
    show: PropTypes.bool,
    selectedRow: PropTypes.number,
    columnDefs: PropTypes.array,
    resource: PropTypes.string.isRequired,
    action: PropTypes.object,
    selectedTujuan: PropTypes.object,
    selectedAsal: PropTypes.object,
    post: PropTypes.object,
    t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Duplication);
