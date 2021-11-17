import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

import { DatatableServerSide, constDatatable } from '@simrs/components';

import actions from '../redux/actions';
import actionTypes from '../redux/actionTypes';
import { staticConst } from '../static';
import { disabledElement } from '../redux/selector';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cacheBlockSize: 10,
    };

    this.dataTable = createRef();
  }

  componentDidMount() {
    let refDatatable = this._getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate(prevProps) {
    let { isReloadGrid, reloadType, statusForm, disabled } = this.props;
    if (isReloadGrid && !prevProps.isReloadGrid) {
      this.reload(reloadType);
    } else {
      switch (statusForm) {
        case actionTypes.ADD:
          if (disabled) {
            this.gridApi.deselectAll();
          }
          break;
        case actionTypes.CANCEL:
          if (prevProps.selectedRow) {
            this.selectRow(prevProps.selectedRow);
          }
          break;
        case actionTypes.SELECTED_KUNJUNGAN:
          if (prevProps.selectedRow) {
            this.selectRow(prevProps.selectedRow);
          } else {
            if (this.props.selectedRow) {
              this.selectRow(this.props.selectedRow);
            } else {
              this.gridApi.deselectAll();
              this.gridApi.clearFocusedCell();
            }
          }
          break;
        default:
          return;
      }
    }

    this._bindKey();
  }

  selectRow = (id) => {
    if (this.dataTable.current) {
      this.dataTable.current.selectRow(id);
    }
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.isReloadGrid !== this.props.isReloadGrid) {
      return true;
    }
    if (
      nextProps.post.id_kunjungan_unit !== this.props.post.id_kunjungan_unit
    ) {
      return true;
    }
    if (nextProps.disabled !== this.props.disabled) {
      return true;
    }

    return false;
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
      _this.dataTable.current.setFirstRowSelected();
    });

    MouseTrap.bindGlobal('alt+r', function (e) {
      e.preventDefault();
      _this.reload(constDatatable.reloadType.purge);
    });
  }

  getDataSource = () => {
    const _this = this;
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};
        const post = {
          length: _this.state.cacheBlockSize,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          id_kunjungan_unit: _this.props.post.id_kunjungan_unit,
        };
        _this.props.action.loadAll(_this.props.resource, post, params);
      },
    };
  };

  reload = (reloadType) => {
    if (reloadType === constDatatable.reloadType.purge) {
      this.gridApi.purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      this.gridApi.refreshInfiniteCache();
    }
  };

  getRowNodeId = (item) => {
    return item.id;
  };

  _getRefDatatable() {
    return this.dataTable.current.refs[staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL];
  }

  _getColumnDefs() {
    const { t } = this.props;
    return [
      {
        headerName: t(this.getKey('tanggal')),
        field: 'tanggal',
        cellRenderer: 'dateRenderer',
        sortable: true,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
        width: 110,
        cellClass: 'ag-date-cell',
      },
      {
        headerName: t(this.getKey('unit_layanan')),
        field: 'nama_unit_layanan',
        width: 110,
        sortable: true,
      },
      {
        headerName: t(this.getKey('nama_layanan')),
        field: 'nama_layanan',
        sortable: true,
        width: 200,
      },
      {
        headerName: t(this.getKey('kelas')),
        field: 'nama_kelas',
        width: 120,
      },
      {
        headerName: t(this.getKey('pelaksana')),
        field: 'nama_pelaksana',
        width: 180,
      },
      {
        headerName: t(this.getKey('tarif')),
        field: 'harga',
        width: 120,
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t(this.getKey('jumlah')),
        field: 'jumlah',
        width: 120,
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t(this.getKey('biaya')),
        field: 'biaya',
        width: 120,
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
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

  onRowSelected = (params) => {
    if (params.node.isSelected()) {
      this.props.action.onSelected(this.props.resource, params.data);
    }
  };

  render() {
    const { disabled } = this.props;
    return (
      <DatatableServerSide
        ref={this.dataTable}
        columns={this._getColumnDefs()}
        name={staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL}
        navigateToSelect={true}
        datasource={this.getDataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={this.state.cacheBlockSize}
        containerHeight="200px"
        getRowNodeId={this.getRowNodeId}
        disabled={disabled}
        suppressRowClickSelection={disabled}
        suppressCellSelection={disabled}
        onRowSelected={this.onRowSelected}
      />
    );
  }
}

const mapStateToProps = function (state) {
  const { post, error, selectedRow, statusForm } = state.default;
  const datatable =
    state.datatable.datatables[staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL];

  return {
    post,
    isReloadGrid: datatable ? datatable.isReload : false,
    reloadType: datatable ? datatable.reloadType : '',
    error,
    selectedRow,
    statusForm,
    disabled: disabledElement(state, staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        loadAll: actions.getKunjunganUnitDetail.request,
        onSelected: actions.onSelected,
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
  disabled: PropTypes.bool,
  selectedRow: PropTypes.number,
  statusForm: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
