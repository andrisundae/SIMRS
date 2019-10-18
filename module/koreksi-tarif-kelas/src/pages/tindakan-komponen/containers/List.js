import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';

import { DatatableServerSide, constDatatable } from '@simrs/components';
import { formatter, toastr } from '@simrs/common';

import action from '../actions';
import { getTotalTarif } from '../selectors';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cacheBlockSize: 500
        }

        this._getDataSource = this._getDataSource.bind(this);
        this._getDataSourceTotal = this._getDataSourceTotal.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._onRowSelected = this._onRowSelected.bind(this);
        this._getRowNodeId = this._getRowNodeId.bind(this);
        this._onCellValueChanged = this._onCellValueChanged.bind(this);
        this._onModelUpdated = this._onModelUpdated.bind(this);
        this._getRowStyle = this._getRowStyle.bind(this);
        this._setFocusedRow = this._setFocusedRow.bind(this);

        this.dataTable = createRef();
        this.footerTable = createRef();
    }

    render() {
        let { subResource } = this.props;

        return (
            <DatatableServerSide
                ref={this.dataTable}
                columns={this._getColumnDefs()}
                name={subResource}
                rowSelection={constDatatable.selectionMultiple}
                rowDeselection={true}
                suppressRowClickSelection={true}
                datasource={this._getDataSource()}
                rowBuffer={0}
                maxConcurrentDatasourceRequests={1}
                infiniteInitialRowCount={1}
                cacheBlockSize={this.state.cacheBlockSize}
                containerHeight="330px"
                onSelectionChanged={this._onSelectionChanged}
                navigateToSelect={false}
                getRowNodeId={this._getRowNodeId}
                getRowStyle={this._getRowStyle}
                onModelUpdated={this._onModelUpdated}
                onCellValueChanged={this._onCellValueChanged}
                enterMovesDownAfterEdit={true}
                onRowSelected={this._onRowSelected}
                defaultColDef={{ sortable: true }}
                pinnedBottomRowData={[{
                    nama_komponen_tarif: `Tarif Layanan ${formatter.currency(this.props.post.tarif_tindakan)}`,
                    tarif: formatter.currency(this.props.totalTarif)
                }]}
        />
        )
    }

    componentDidMount() {
        let refDatatable = this._getRefDatatable();
        this.gridApi = refDatatable.api;
        this.columnApi = refDatatable.columnApi;
    }

    componentDidUpdate() {
        let { isReloadGrid, reloadType } = this.props;

        if (isReloadGrid) {
            this._reload(reloadType);
        }

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
            _this._setFocusedRow(0);
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
                    ..._this.props.filterPost
                };
                _this.props.action.loadAll(_this.props.resource, _this.props.subResource, post, params);
            }
        }
    }

    _getDataSourceTotal() {

        return {
            rowCount: null,
            getRows: (params) => {
                params.successCallback([{
                    nama_komponen_tarif: `Tarif Layanan ${formatter.currency(this.props.post.tarif_tindakan)}`,
                    tarif: this.props.totalTarif
                }])
            }
        }
    }

    _getRefDatatable() {
        return this.dataTable.current.refs[this.props.subResource];
    }

    _getRefFooterTable() {
        return this.footerTable.current.refs['subtotal'];
    }

    _reload(reloadType) {
        if (reloadType === constDatatable.reloadType.purge) {
            this.gridApi.setInfiniteRowCount(1);
            this.gridApi.purgeInfiniteCache();
        } else if (reloadType === constDatatable.reloadType.refresh) {
            this.gridApi.refreshInfiniteCache();
        }
    }

    _setFocusedRow(rowIndex) {
        this.gridApi.ensureIndexVisible(0);
        let firstCol = this.columnApi.getAllDisplayedColumns()[0];
        this.gridApi.ensureColumnVisible(firstCol);
        this.gridApi.setFocusedCell(rowIndex, firstCol);
    }

    _onSelectionChanged() {
        this.gridApi.redrawRows();
    }

    _onRowSelected(params) {
        let { action, resource, subResource, post, t } = this.props;
        let isSelected = params.node.isSelected();
        if (post.list_tindakan_komponen[params.data.komponen_tarif]) {
            let data = post.list_tindakan_komponen[params.data.komponen_tarif];
            let isCanSelect = true;
            if (!isSelected) {
                if (data.id && data.tarif > 0) {
                    toastr.warning(t(`${resource}:tindakan_komponen.message.tarif_must_be_zero`));
                    params.node.setSelected(true);
                    isCanSelect = false;
                    this._setFocusedRow(params.node.rowIndex);
                }
            }

            if (isCanSelect && (data.aktif !== params.node.isSelected())) {
                action.onRowSelected(resource, subResource, {
                    aktif: isSelected,
                    komponen_tarif: params.data.komponen_tarif
                })
            }
        }
    }

    _getRowNodeId(item) {
        return item.komponen_tarif;
    }

    _onCellValueChanged(params) {
        let { action, resource, subResource } = this.props;
        var colId = params.column.getId();
        if (colId === "tarif" && params.oldValue !== params.value) {
            action.onChangeTarif(resource, subResource, params.data);
        }
    }

    _onModelUpdated(params) {
        params.api.forEachNode(function (node) {
            if (node.data) {
                if (node.data.is_setting) {
                    node.setSelected(true);
                } else {
                    if (node.data.aktif === 1) {
                        node.setSelected(true);
                    } else {
                        node.setSelected(false);
                    }
                }
            }
        });
        params.api.redrawRows();
    }

    _getRowStyle(params) {
        let style = {};
        if (params.node.selected === true) {
            style = { background: 'white' }
        } else if (params.node.rowPinned) {
            style = { background: '#f5f7f7' }
        } else {
            if (params.data) {
                if (!params.data.is_setting) {
                    style = {
                        ...style,
                        color: 'red'
                    }
                }
            }
        }

        return style;
    }

    _getColumnDefs() {
        return [
            {
                headerName: this.props.t(`${this.props.resource}:header.column.komponen`),
                field: "nama_komponen_tarif",
                cellRenderer: "loadingRenderer",
                sortable: true,
                checkboxSelection: true,
                pinnedRowCellRenderer: "footerPinnedRowRenderer",
            },
            {
                headerName: this.props.t(`${this.props.resource}:header.column.tarif`),
                field: "tarif",
                cellRenderer: 'currencyRenderer',
                width: 100,
                cellClass: "ag-number-cell",
                editable: true,
                cellEditor: 'currencyInputRenderer',
                pinnedRowCellRenderer: "footerPinnedRowRenderer",
            },
        ]
    }
}

const mapStateToProps = function (state) {
    const { filter, module } = state.nested;
    const { columnDefs, reference, selectedRow } = module;

    return {
        columnDefs,
        selectedRow,
        filterPost: {
            ...filter.post,
            ...reference
        },
        post: {
            ...reference,
            ...module.post
        },
        totalTarif: getTotalTarif(state),
        isReloadGrid: state.datatable.isReload,
        reloadType: state.datatable.reloadType
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            onSelectionChanged: action.onSelectionChanged,
            onRowSelected: action.onRowSelected,
            loadAll: action.loadAll.request,
            onChangeTarif: action.onChangeTarif
        }, dispatch)
    }
}

List.propTypes = {
    resource: PropTypes.string.isRequired,
    subResource: PropTypes.string.isRequired,
    columnDefs: PropTypes.array,
    action: PropTypes.object,
    post: PropTypes.object,
    totalTarif: PropTypes.number,
    isReloadGrid: PropTypes.bool,
    reloadType: PropTypes.string,
    history: PropTypes.object,
    t: PropTypes.func,
    location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
