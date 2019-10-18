import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import { remote } from 'electron';

import { DatatableServerSide, constDatatable, confirmation } from '@simrs/components';
import { moduleActions } from '@simrs/main/src/modules/master/nested';
import action from '../actions';

const { ipcMain } = remote;

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cacheBlockSize: 25,
            start: false
        }

        this._getDataSource = this._getDataSource.bind(this);
        this._getRowNodeId = this._getRowNodeId.bind(this);
        this._onCellValueChanged = this._onCellValueChanged.bind(this);
        this._handleStatusNotBalance = this._handleStatusNotBalance.bind(this);
        this._setFocusedCell = this._setFocusedCell.bind(this);
        this._handleFocusingCell = this._handleFocusingCell.bind(this);

        this.dataTable = createRef();
    }

    render() {
        let { subResource } = this.props;

        return (
            <DatatableServerSide
                ref={this.dataTable}
                columns={this._getColumnDefs()}
                name={subResource}
                suppressRowClickSelection={true}
                datasource={this._getDataSource()}
                rowBuffer={0}
                maxConcurrentDatasourceRequests={1}
                infiniteInitialRowCount={1}
                cacheBlockSize={this.state.cacheBlockSize}
                containerHeight="330px"
                navigateToSelect={false}
                getRowNodeId={this._getRowNodeId}
                onCellValueChanged={this._onCellValueChanged}
                suppressHorizontalScroll={true}
                enterMovesDownAfterEdit={true}
                defaultColDef={{ sortable: true }}
                stopEditingWhenGridLosesFocus={true}
            />
        )
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;

        ipcMain.on('status-not-balance', this._handleStatusNotBalance);
        ipcMain.on('focusing-cell', this._handleFocusingCell);
    }

    componentDidUpdate() {
        let {
            isReloadGrid,
            reloadType,
            resource,
            subResource,
            post,
            location,
            action
        } = this.props;

        if (isReloadGrid) {
            this._reload(reloadType);
        }

        if (location.state) {
            if (location.state.is_edit_tindakan) {
                this.props.history.replace({
                    pathname: `/tindakan`,
                    state: {
                        is_edit_tindakan: false
                    }
                });
                action.onSaveSuccess(resource, subResource, { message: 'Data berhasil disimpan.', data: { id: post.id, isNotBalance: true } });
            }
        }

        this._bindKey();
    }

    componentWillUnmount() {
        ipcMain.removeListener('status-not-balance', this._handleStatusNotBalance);
        ipcMain.removeListener('focusing-cell', this._handleFocusingCell);
        this._unbindKey();
    }

    _handleStatusNotBalance() {
        confirmation({
            message: this.props.t(this._getKey('tindakan.not_balance.confirmation')),
            onCancel: () => this._startEditingCell(),
            onOk: () => this._next(),
        });
        this._setFocusedCell(this.props.editedCell.rowIndex);
    }

    _handleFocusingCell() {
        if (this.props.selectedRow) {
            let node = this.gridApi.getRowNode(this.props.selectedRow);
            if (node) {
                this._setFocusedCell(node.rowIndex);
            }
        }
    }

    _startEditingCell() {
        this.gridApi.startEditingCell({
            rowIndex: this.props.editedCell.rowIndex,
            colKey: 'tarif',
            charPress: this.props.editedCell.oldValue
        });
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.no`),
                field: "no",
                cellRenderer: "loadingRenderer",
                sortable: false,
                width: 60
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.versi_tarif`),
                field: "nama_versi_tarif",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.kelompok`),
                field: "nama_kelompok",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.layanan`),
                field: "nama_layanan",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.kelas`),
                field: "nama_kelas",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.tarif`),
                field: "tarif",
                cellRenderer: 'currencyRenderer',
                width: 100,
                cellClass: "ag-number-cell",
                editable: true,
                cellEditor: 'currencyInputRenderer',
            },
        ]
    }

    _next() {
        const { history, post, filterPost } = this.props;
        history.push({
            pathname: `/tindakan-komponen/${post.id}`,
            state: {
                ...this.props.location.state,
                tindakanKomponen: true,
                selectedData: { ...post },
                filterPost,
                is_edit_tindakan: true
            }
        });
    }

    _unbindKey() {
        MouseTrap.unbind("f2");
        MouseTrap.unbind("alt+r");
    }

    _bindKey() {
        let _this = this;

        MouseTrap.bind('f2', function (e) {
            e.preventDefault();
            _this._setFocusedCell(0);
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
                const { versi_tarif, klasifikasi, kelompok, kelas, nama_layanan } = _this.props.filterPost;
                let filterPost = { versi_tarif, klasifikasi, kelompok, kelas, nama_layanan };
                let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
                let post = {
                    length: _this.state.cacheBlockSize,
                    start: params.startRow,
                    sort_name: sortModel.colId ? sortModel.colId : '',
                    sort_order: sortModel.colId ? sortModel.sort : '',
                    ...filterPost
                };
                _this.props.action.loadAll(_this.props.resource, _this.props.subResource, post, params);
            }
        }
    }

    _getRefDatatable() {
        return this.dataTable.current.refs[this.props.subResource];
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
        this.gridApi.setFocusedCell(rowIndex, 'tarif');
    }

    _getRowNodeId(item) {
        return item.id;
    }

    _onCellValueChanged(params) {
        let { action, resource, subResource } = this.props;
        var colId = params.column.getId();

        if (colId === "tarif") {
            action.onChangeTarif(resource, subResource, {
                post: params.data,
                detail: {
                    oldValue: params.oldValue,
                    value: params.value,
                    rowIndex: params.rowIndex,
                    id: params.data.id
                }
            });
        }
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { filter, module } = state.nested;
    const { editedCell, post, statusForm, selectedRow } = module;

    return {
        filterPost: filter.post,
        post,
        isReloadGrid: state.datatable.isReload,
        reloadType: state.datatable.reloadType,
        editedCell,
        statusForm,
        selectedRow
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            loadAll: action.loadAll.request,
            onChangeTarif: action.onChangeTarif,
            onFocusElement: moduleActions.onFocusElement,
            onSaveSuccess: moduleActions.save.requestSuccess,
            onChangeStatusNotBalance: action.onChangeStatusNotBalance,
        }, dispatch)
    }
}

List.propTypes = {
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    action: PropTypes.object,
    post: PropTypes.object,
    editedCell: PropTypes.object,
    filterPost: PropTypes.object,
    isReloadGrid: PropTypes.bool,
    reloadType: PropTypes.string,
    statusForm: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
