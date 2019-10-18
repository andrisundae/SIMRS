import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

import { DatatableServerSide, constDatatable } from '@simrs/components';
import actions from '../actions';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cacheBlockSize: 100
        }

        this._getDataSource = this._getDataSource.bind(this);
        this._getRowNodeId = this._getRowNodeId.bind(this);

        this.dataTable = createRef();
    }

    render() {
        return (
            <DatatableServerSide
                ref={this.dataTable}
                columns={this._getColumnDefs()}
                name={this.props.resource}
                suppressRowClickSelection={true}
                datasource={this._getDataSource()}
                rowBuffer={0}
                maxConcurrentDatasourceRequests={1}
                infiniteInitialRowCount={1}
                cacheBlockSize={this.state.cacheBlockSize}
                containerHeight="350px"
                sizeColumnsToFit={false}
                navigateToSelect={false}
                getRowNodeId={this._getRowNodeId}
                defaultColDef={{ sortable: false }}
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

    _getColumnDefs() {
        const { t, headerColumnKomponen} = this.props;
        return [
            {
                headerName: t(`${this.props.resource}:header.column.no`),
                field: "no",
                cellRenderer: "loadingRenderer",
                width: 60,
                cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
            },
            {
                headerName: t(`${this.props.resource}:header.column.versi_tarif`),
                field: "versi_tarif",
                width: 130
            },
            {
                headerName: t(`${this.props.resource}:header.column.nama_versi_tarif`),
                field: "nama_versi_tarif",
                width: 130
            },
            {
                headerName: t(`${this.props.resource}:header.column.klasifikasi`),
                field: "klasifikasi",
                width: 130,
            },
            {
                headerName: t(`${this.props.resource}:header.column.nama_klasifikasi`),
                field: "nama_klasifikasi",
                width: 130
            },
            {
                headerName: t(`${this.props.resource}:header.column.kelompok`),
                field: "kelompok",
                width: 130,
            },
            {
                headerName: t(`${this.props.resource}:header.column.nama_kelompok`),
                field: "nama_kelompok",
                width: 130
            },
            {
                headerName: t(`${this.props.resource}:header.column.layanan`),
                field: "layanan",
                width: 130,
            },
            {
                headerName: t(`${this.props.resource}:header.column.nama_layanan`),
                field: "nama_layanan",
                width: 130
            },
            {
                headerName: t(`${this.props.resource}:header.column.kelas`),
                field: "kelas",
                width: 130,
            },
            {
                headerName: t(`${this.props.resource}:header.column.nama_kelas`),
                field: "nama_kelas",
                width: 130
            },
            {
                headerName: t(`${this.props.resource}:header.column.kode_panggil`),
                field: "kode_panggil",
                width: 130,
            },
            {
                headerName: t(`${this.props.resource}:header.column.id`),
                field: "id",
                width: 130
            },
            {
                headerName: t(`${this.props.resource}:header.column.tarif`),
                field: "tarif",
                width: 130,
                cellClass: "ag-number-cell",
                cellRenderer: 'currencyRenderer',
            },
            ...headerColumnKomponen
        ]
    }

    _unbindKey() {
        MouseTrap.unbind("alt+r");
    }

    _bindKey() {
        let _this = this;

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
                let post = {
                    length: _this.state.cacheBlockSize,
                    start: params.startRow,
                    orders: _this.props.post.orders,
                    versi_tarif: _this.props.post.versi_tarif,
                    jenis_ekspor: _this.props.post.jenis_ekspor,
                };
                if (post.versi_tarif) {
                    _this.props.action.loadAll(_this.props.resource, post, params);
                } else {
                    params.successCallback([], 0)
                }
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

    _getRowNodeId(item) {
        return item.id;
    }

    _getKey(key) {
        return `${this.props.resource}:${key}`;
    }
}

const mapStateToProps = function (state) {
    const { form, headerColumnKomponen } = state.default;

    return {
        post: form.post,
        isReloadGrid: state.datatable.isReload,
        reloadType: state.datatable.reloadType,
        headerColumnKomponen
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        action: bindActionCreators({
            loadAll: actions.loadAll,
        }, dispatch)
    }
}

List.propTypes = {
    resource: PropTypes.string.isRequired,
    post: PropTypes.object,
    action: PropTypes.object,
    orderPost: PropTypes.object,
    isReloadGrid: PropTypes.bool,
    reloadType: PropTypes.string,
    headerColumnKomponen: PropTypes.array,
    t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
