import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import MouseTrap from 'mousetrap';
import { Modal, Grid, Icon } from 'semantic-ui-react';
import { AddButton, CancelButton, DatatableServerSide, constDatatable } from '@simrs/components';

import { Checkbox } from '@simrs/components';

import action from '../actions';

const TABLE_KELAS = 'data_kelas';

class ImportKelas extends Component {
    constructor(props) {
        super(props);

        this._onCancel = this._onCancel.bind(this);
        this._onAdd = this._onAdd.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._handleChangeNonKelas = this._handleChangeNonKelas.bind(this);

        this.state = {
            cacheBlockSize: 25
        }

        this.dataTable = createRef();
        this.nonKelas = createRef();
    }

    render() {
        const { show, t } = this.props;

        return (
            <Modal open={show} onClose={this._onCancel} size="mini" closeOnEscape={false} closeOnDimmerClick={false}>
                <Modal.Header><Icon name="copy outline" />{t(this._getKey('import_kelas.title'))}</Modal.Header>
                <Modal.Content>
                    <Grid className="content-grid" >
                        <Grid.Row>
                            <Grid.Column>
                                <DatatableServerSide
                                    ref={this.dataTable}
                                    columns={this._getColumnDefs()}
                                    name={TABLE_KELAS}
                                    rowSelection={constDatatable.selectionMultiple}
                                    rowDeselection={true}
                                    suppressRowClickSelection={true}
                                    datasource={this._getDataSource()}
                                    rowBuffer={0}
                                    maxConcurrentDatasourceRequests={1}
                                    infiniteInitialRowCount={1}
                                    cacheBlockSize={this.state.cacheBlockSize}
                                    containerHeight="250px"
                                    onSelectionChanged={this._onSelectionChanged}
                                    getRowNodeId={this._getRowNodeId}
                                    sizeColumnsToFit={true}
                                    enableColResize={false}
                                    onModelUpdated={() => this._selectAll()}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Grid columns="2">
                        <Grid.Row>
                            <Grid.Column width="6" floated='left'>
                                <Checkbox
                                    onChange={this._handleChangeNonKelas}
                                    inputRef={this.nonKelas}
                                    label={t(this._getKey('label.field.non_kelas'))}
                                />
                            </Grid.Column>
                            <Grid.Column width="10" floated='right'>
                                <CancelButton
                                    onClick={this._onCancel}
                                />
                                <AddButton
                                    onClick={this._onAdd}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Actions>
            </Modal>
        )
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;
    }

    componentDidUpdate() {
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
                };
                _this.props.action.loadAllOnImportKelas(_this.props.resource, _this.props.subResource, post, params);
            }
        }
    }

    _getRefDatatable() {
        return this.dataTable.current.refs[TABLE_KELAS];
    }

    _reload(reloadType) {
        if (reloadType === constDatatable.reloadType.purge) {
            this.gridApi.setInfiniteRowCount(1);
            this.gridApi.purgeInfiniteCache();
        } else if (reloadType === constDatatable.reloadType.refresh) {
            this.gridApi.refreshInfiniteCache();
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

    _onSelectionChanged(params) {
        let { action, resource, subResource } = this.props;
        let selectedRows = params.api.getSelectedRows().map(row => row.id);
        action.onSelectionChangedKelas(resource, subResource, selectedRows);
    }

    _handleChangeNonKelas(e) {
        const { checked } = e.target;
        if (checked) {
            let selectedNodes = this.gridApi.getSelectedNodes();
            selectedNodes.forEach(node => {
                if (node.data.alias === 'non_kelas') {
                    node.setSelected(true, true);
                }
            })
        } else {
            this._selectAll();
        }
    }

    _selectAll() {
        this.gridApi.forEachNode(function (node) {
            node.setSelected(true);
        });
    }

    _getRowNodeId(item) {
        return item.id;
    }

    _onCancel() {
        this.props.action.onCancelImportKelas(this.props.resource, this.props.subResource);
    }

    _onAdd() {
        const { post, resource, subResource } = this.props;
        this.props.action.onImportKelas(resource, subResource, post)
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.kelas`),
                field: "nama",
                cellRenderer: "loadingRenderer",
                checkboxSelection: true,
                sortable: true
            }
        ]
    }
}

const mapStateToProps = function (state) {
    const { importKelas, selectedRow, reference } = state.nested.module;

    return {
        show: importKelas.show,
        selectedRow,
        post: {
            ...reference,
            list_kelas: importKelas.selectedRows
        }
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            loadAllOnImportKelas: action.loadAllOnImportKelas,
            onImportKelas: action.importKelas.request,
            onSelectionChangedKelas: action.onSelectionChangedKelas,
            onCancelImportKelas: action.onCancelImportKelas
        }, dispatch)
    }
}

ImportKelas.propTypes = {
    show: PropTypes.bool,
    selectedRow: PropTypes.number,
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    action: PropTypes.object,
    selectedTujuan: PropTypes.object,
    selectedAsal: PropTypes.object,
    post: PropTypes.object,
    t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportKelas);
