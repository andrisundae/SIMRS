import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { remote } from 'electron';

import { DatatableServerSide, constDatatable } from '@simrs/components';

import { moduleActions } from '../actions';
const { ipcMain } = remote;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cacheBlockSize: 10,
      totalRow: [],
    };

    this._getDataSource = this._getDataSource.bind(this);
    this._getRowStyle = this._getRowStyle.bind(this);
    this._getRowNodeId = this._getRowNodeId.bind(this);
    this._onCellValueChanged = this._onCellValueChanged.bind(this);
    this._handleFocusingCell = this._handleFocusingCell.bind(this);
    this._onModelUpdated = this._onModelUpdated.bind(this);

    this.dataTable = createRef();
  }

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
        onCellValueChanged={this._onCellValueChanged}
        enterMovesDownAfterEdit={true}
        defaultColDef={{ sortable: true }}
        pinnedBottomRowData={this.state.totalRow}
        onModelUpdated={this._onModelUpdated}
        getRowStyle={this._getRowStyle}
      />
    );
  }

  componentDidMount() {
    let refDatatable = this._getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;

    ipcMain.on('focusing-cell', this._handleFocusingCell);
  }

  componentDidUpdate(prevProps) {
    let { isReloadGrid, reloadType, error, editedCell } = this.props;

    if (isReloadGrid && !prevProps.isReloadGrid) {
      this._reload(reloadType);
    }

    if (error === true && prevProps.error === false) {
      if (editedCell.rowIndex !== null) {
        this.gridApi.startEditingCell({
          rowIndex: editedCell.rowIndex,
          colKey: editedCell.colKey,
        });
      }
    }

    this._bindKey();
  }

  _onModelUpdated() {
    this.setState({ totalRow: this._getTotalRow() });
  }

  _getRowStyle(params) {
    let style = {};
    if (params.node.rowPinned) {
      style = {
        backgroundColor: '#f5f7f7',
      };
    }

    return style;
  }

  _getTotalRow() {
    let jmlRealBed = 0;
    let jmlExtraBed = 0;
    let sisaRealBed = 0;
    let sisaExtraBed = 0;
    if (this.gridApi) {
      this.gridApi.forEachNode(function (rowNode) {
        if (rowNode.data) {
          jmlRealBed += rowNode.data.jml_real_bed;
          jmlExtraBed += rowNode.data.jml_extra_bed;
          sisaRealBed += rowNode.data.sisa_real_bed;
          sisaExtraBed += rowNode.data.sisa_extra_bed;
        }
      });
    }

    return [
      {
        no: 'Total',
        nama_unit_layanan: '',
        nama_kelas: '',
        jml_real_bed: jmlRealBed,
        jml_extra_bed: jmlExtraBed,
        sisa_real_bed: sisaRealBed,
        sisa_extra_bed: sisaExtraBed,
      },
    ];
  }

  componentWillUnmount() {
    ipcMain.removeListener('focusing-cell', this._handleFocusingCell);
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
      _this._setFocusedRow(0, 'jml_real_bed');
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
        let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
        let filterPost = {
          unit_layanan: _this.props.filterPost.unit_layanan,
          kelas: this.props.filterPost.kelas,
        };
        let post = {
          length: _this.state.cacheBlockSize,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          ...filterPost,
        };
        _this.props.action.loadAll(_this.props.resource, post, params);
      },
    };
  }

  _reload(reloadType) {
    if (reloadType === constDatatable.reloadType.purge) {
      this.gridApi.setInfiniteRowCount(1);
      this.gridApi.purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      this.gridApi.refreshInfiniteCache();
    }
  }

  _setFocusedRow(rowIndex, column) {
    this.gridApi.ensureIndexVisible(0);
    this.gridApi.setFocusedCell(rowIndex, column);
  }

  _onSelectionChanged() {
    this.gridApi.redrawRows();
  }

  _getRowNodeId(item) {
    return item.id;
  }

  _onCellValueChanged(params) {
    let { action, resource } = this.props;
    var colId = params.column.getId();
    if (
      (colId === 'jml_real_bed' || colId === 'jml_extra_bed') &&
      params.oldValue !== params.value
    ) {
      let status = colId === 'jml_real_bed' ? 'real' : 'extra';

      action.onChangeStok(resource, colId, {
        post: { ...params.data, status },
        detail: {
          oldValue: params.oldValue,
          value: params.value,
          rowIndex: params.rowIndex,
          id: params.data.id,
          colKey: colId,
        },
      });
    }
  }

  _getRefDatatable() {
    return this.dataTable.current.refs[this.props.resource];
  }

  _handleFocusingCell() {
    let cell = this.gridApi.getFocusedCell();
    if (cell) {
      this.gridApi.setFocusedCell(cell.rowIndex, cell.column.colId);
    }
  }

  _getColumnDefs() {
    return [
      {
        headerName: this.props.t(`${this.props.resource}:header.column.no`),
        field: 'no',
        cellRenderer: 'loadingRenderer',
        width: 50,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
        pinnedRowCellRenderer: 'footerPinnedRowRenderer',
        colSpan: function (params) {
          if (params.node.rowPinned) {
            return 3;
          }

          return 0;
        },
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.nama_unit_layanan`
        ),
        field: 'nama_unit_layanan',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.nama_kelas`
        ),
        field: 'nama_kelas',
        width: 100,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.jml_real_bed`
        ),
        field: 'jml_real_bed',
        width: 100,
        editable: true,
        cellEditor: 'numericInputRenderer',
        cellClass: 'ag-number-cell',
        pinnedRowCellRenderer: 'footerPinnedRowRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.jml_extra_bed`
        ),
        field: 'jml_extra_bed',
        width: 100,
        editable: true,
        cellEditor: 'numericInputRenderer',
        cellClass: 'ag-number-cell',
        pinnedRowCellRenderer: 'footerPinnedRowRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.sisa_real_bed`
        ),
        field: 'sisa_real_bed',
        width: 100,
        cellClass: 'ag-number-cell',
        pinnedRowCellRenderer: 'footerPinnedRowRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.sisa_extra_bed`
        ),
        field: 'sisa_extra_bed',
        width: 100,
        cellClass: 'ag-number-cell',
        pinnedRowCellRenderer: 'footerPinnedRowRenderer',
      },
    ];
  }
}

const mapStateToProps = function (state) {
  const { filter, module } = state.default;
  const {
    columnDefs,
    columnFooterDefs,
    editedCell,
    post,
    error,
    selectedRow,
  } = module;

  return {
    columnDefs,
    columnFooterDefs,
    filterPost: filter.post,
    post,
    isReloadGrid: state.datatable.isReload,
    reloadType: state.datatable.reloadType,
    editedCell,
    error,
    selectedRow,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        loadAll: moduleActions.loadAll,
        onChangeStok: moduleActions.onChangeStok,
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
