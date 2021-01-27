import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import copy from 'copy-to-clipboard';
import { withRouter } from 'react-router-dom';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

import { DatatableServerSide, constDatatable } from '@simrs/components';
import { formatter } from '@simrs/common';

import actions from '../redux/actions';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cacheBlockSize: 10,
    };

    this._getDataSource = this._getDataSource.bind(this);
    this._getRowNodeId = this._getRowNodeId.bind(this);

    this.dataTable = createRef();
  }

  componentDidMount() {
    let refDatatable = this._getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate(prevProps) {
    let { isReloadGrid, reloadType } = this.props;

    if (isReloadGrid && !prevProps.isReloadGrid) {
      this.reload(reloadType);
    }

    this._bindKey();
  }

  componentWillUnmount() {
    this._unbindKey();
  }

  _unbindKey() {
    MouseTrap.unbind('f2');
    MouseTrap.unbind('alt+r');
  }

  _bindKey() {
    let _this = this;

    MouseTrap.bindGlobal('f2', function (e) {
      e.preventDefault();
    });

    MouseTrap.bindGlobal('alt+r', function (e) {
      e.preventDefault();
      _this.reload(constDatatable.reloadType.purge);
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
          ...this.props.post,
        };
        _this.props.action.loadAll(_this.props.resource, post, params);
      },
    };
  }

  reload(reloadType) {
    if (reloadType === constDatatable.reloadType.purge) {
      this.gridApi.purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      this.gridApi.refreshInfiniteCache();
    }
  }

  _getRowNodeId(item) {
    return item.id;
  }

  _getRefDatatable() {
    return this.dataTable.current.refs[this.props.resource];
  }

  _getColumnDefs() {
    const { t } = this.props;
    return [
      {
        headerName: t(this.getKey('tgl_kunjungan')),
        field: 'tgl_mulai',
        cellRenderer: 'loadingRenderer',
        sortable: true,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
        width: 110,
        valueFormatter: (params) => {
          if (!params.value) {
            return '';
          }
          return formatter.dateFormatClient(params.value);
        },
      },
      {
        headerName: t(this.getKey('nomor_antrian')),
        field: 'nomor_antrian_unit',
        width: 110,
        sortable: true,
      },
      {
        headerName: t(this.getKey('norm')),
        field: 'norm',
        sortable: true,
        width: 110,
      },
      {
        headerName: t(this.getKey('pasien')),
        field: 'nama_pasien',
        sortable: true,
        width: 200,
      },
      {
        headerName: t(this.getKey('alamat')),
        field: 'alamat',
        width: 300,
      },
      {
        headerName: t(this.getKey('jenis_layanan')),
        field: 'nama_jenis_layanan',
        width: 180,
      },
      {
        headerName: t(this.getKey('unit_layanan')),
        field: 'nama_unit_layanan',
        width: 180,
      },
      {
        headerName: t(this.getKey('status_pasien')),
        field: 'nama_status_pasien',
        width: 150,
      },
      {
        headerName: t(this.getKey('kelas')),
        field: 'nama_kelas',
        width: 120,
      },
      {
        headerName: t(this.getKey('hak_kelas')),
        field: 'nama_hak_kelas',
        width: 120,
      },
      {
        headerName: t(this.getKey('petugas_input')),
        field: 'nama_petugas_input',
        width: 180,
      },
    ];
  }

  getKey = (key) => {
    return `${this.props.resource}:${key}`;
  };

  doubleClickRowHandler = (params) => {
    this.props.history.replace(
      `/billing/transaksi/tindakan?route=${this.props.resource}&norm=${params.data.norm}`
    );
  };

  render() {
    let { resource } = this.props;

    return (
      <DatatableServerSide
        ref={this.dataTable}
        columns={this._getColumnDefs()}
        name={resource}
        rowDeselection={true}
        suppressRowClickSelection={true}
        datasource={this._getDataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={this.state.cacheBlockSize}
        containerHeight="330px"
        navigateToSelect={false}
        getRowNodeId={this._getRowNodeId}
        contextMenuItems={[
          {
            title: 'Copy Norm',
            icon: 'copy outline',
            onClick: (gridApi, data) => {
              copy(data.norm);
            },
          },
        ]}
        onRowDoubleClicked={this.doubleClickRowHandler}
      />
    );
  }
}

const mapStateToProps = function (state) {
  const { post, error, selectedRow } = state.default;

  return {
    post,
    isReloadGrid: state.datatable.isReload,
    reloadType: state.datatable.reloadType,
    error,
    selectedRow,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        loadAll: actions.loadAll,
      },
      dispatch
    ),
  };
};

List.propTypes = {
  t: PropTypes.func,
  resource: PropTypes.string.isRequired,
  columnDefs: PropTypes.array,
  columnFooterDefs: PropTypes.array,
  action: PropTypes.object,
  post: PropTypes.object,
  editedCell: PropTypes.object,
  filterPost: PropTypes.object,
  isReloadGrid: PropTypes.bool,
  reloadType: PropTypes.string,
  error: PropTypes.bool,
  selectedRow: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
