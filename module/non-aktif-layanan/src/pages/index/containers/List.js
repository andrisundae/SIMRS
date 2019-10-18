import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { remote } from 'electron';

import { DatatableServerSide, constDatatable } from '@simrs/components';
import { moduleActions as action } from '../actions';

const { ipcMain } = remote;

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cacheBlockSize: 25
        }

        this._getDataSource = this._getDataSource.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._getRowNodeId = this._getRowNodeId.bind(this);
        this._onModelUpdated = this._onModelUpdated.bind(this);
        this._getRowStyle = this._getRowStyle.bind(this);
        this._handleFocusingCell = this._handleFocusingCell.bind(this);

        this.dataTable = createRef();
    }

    render() {
        return (
            <DatatableServerSide
                ref={this.dataTable}
                columns={this._getColumnDefs()}
                name={this.props.resource}
                rowSelection={constDatatable.selectionMultiple}
                rowDeselection={true}
                suppressRowClickSelection={true}
                datasource={this._getDataSource()}
                rowBuffer={0}
                maxConcurrentDatasourceRequests={1}
                infiniteInitialRowCount={1}
                cacheBlockSize={this.state.cacheBlockSize}
                containerHeight="360px"
                onSelectionChanged={this._onSelectionChanged}
                navigateToSelect={false}
                getRowNodeId={this._getRowNodeId}
                onModelUpdated={this._onModelUpdated}
                suppressHorizontalScroll={true}
                getRowStyle={this._getRowStyle}
                defaultColDef={{ sortable: true }}
            />
        )
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;

        ipcMain.on('focusing-cell', this._handleFocusingCell);
    }

    componentDidUpdate() {
        let { isReloadGrid, reloadType } = this.props;

        if (isReloadGrid) {
            this._reload(reloadType);
        }

        this._bindKey();
    }

    componentWillUnmount() {
        ipcMain.removeListener('focusing-cell', this._handleFocusingCell);
        this._unbindKey();
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama`),
                field: "nama",
                cellRenderer: "loadingRenderer",
                checkboxSelection: true,
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama_kelompok`),
                field: "nama_kelompok",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.nama_klasifikasi`),
                field: "nama_klasifikasi",
            }
        ]
    }

    _unbindKey() {
        MouseTrap.unbind("f2");
        MouseTrap.unbind("alt+r");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bindGlobal('f2', function (e) {
            e.preventDefault();
            _this._setFocusedCell(0);
        });

        MouseTrap.bindGlobal('alt+r', function (e) {
            e.preventDefault();
            _this._reload(constDatatable.reloadType.purge);
        });
    }

    _getDataSource() {
        let _this = this;
        
        return {
            rowCount: null,
            getRows: (params) => {
                const { filter_index, filter_value, klasifikasi, status, kelompok } = _this.props.filterPost;
                let filterPost = { filter_index, filter_value, klasifikasi, status, kelompok };
                let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
                let post = {
                    length: _this.state.cacheBlockSize,
                    start: params.startRow,
                    sort_name: sortModel.colId ? sortModel.colId : '',
                    sort_order: sortModel.colId ? sortModel.sort : '',
                    ...filterPost
                };
                _this.props.action.loadAll(_this.props.resource, post, params);
            }
        }
    }

    _handleFocusingCell() {
        if (this.props.selectedRow) {
            let node = this.gridApi.getRowNode(this.props.selectedRow);
            if (node) {
                this._setFocusedCell(node.rowIndex);
            }
        }
    }

    _getRefDatatable() {
        return this.dataTable.current.refs[this.props.resource];
    }

    _reload(reloadType) {
        if (reloadType === constDatatable.reloadType.purge) {
            this.gridApi.setInfiniteRowCount(1);
            this.gridApi.purgeInfiniteCache();
        } else if (reloadType === constDatatable.reloadType.refresh) {
            this.gridApi.refreshInfiniteCache();
        }
    }

    _setFocusedCell(rowIndex) {
        this.gridApi.ensureIndexVisible(0);
        let firstCol = this.columnApi.getAllDisplayedColumns()[0];
        this.gridApi.ensureColumnVisible(firstCol);
        this.gridApi.setFocusedCell(rowIndex, firstCol);
    }

    _onSelectionChanged(params) {
        let { action, resource } = this.props;
        let cell = params.api.getFocusedCell();
        if (cell) {
            let node = this.gridApi.getModel().getRow(cell.rowIndex);
            if (node) {
                action.onSelectionChanged(resource, {
                    aktif: node.isSelected() ? 'true' : 'false',
                    id: node.data.id
                });
                params.api.redrawRows();
            }
        }
    }

    _getRowNodeId(item) {
        return item.id;
    }

    _onModelUpdated(params) {
        params.api.forEachNode(function (node) {
            if (node.data) {
                if (node.data.aktif === 1) {
                    node.setSelected(true);
                } else {
                    node.setSelected(false);
                }
            }
        });
        params.api.redrawRows();
    }

    _getRowStyle(params) {
        let style = {};
        if (params.node.selected === true) {
            style = { background: 'white' }
        } else {
            style = { color: 'red' };
        }

        return style;
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { filter, module } = state.default;
    const { selectedRow } = module;

    return {
        selectedRow,
        filterPost: filter.post,
        post: module.post,
        isReloadGrid: state.datatable.isReload,
        reloadType: state.datatable.reloadType
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onSelectionChanged: action.onSelectionChanged,
            loadAll: action.loadAll.request,
        }, dispatch)
    }
}

List.propTypes = {
    resource: PropTypes.string.isRequired,
    filterPost: PropTypes.object,
    columnDefs: PropTypes.array,
    action: PropTypes.object,
    post: PropTypes.object,
    isReloadGrid: PropTypes.bool,
    reloadType: PropTypes.string,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
