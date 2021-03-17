import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import _ from 'lodash';

import { DatatableServerSide, constDatatable } from '@simrs/components';
import { moduleActions as actions } from '../actions';
import { isDisableForm } from '../reducer';
import { moduleActionTypes } from '../actionTypes';
import { selectors, context } from '../../../setting/aturan-aplikasi';

const MIN_CHAR_CONTEXT = context.MINCHARPENCARIANMASTER;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cacheBlockSize: 25,
    };

    this._getDataSource = this._getDataSource.bind(this);
    this._onRowSelected = this._onRowSelected.bind(this);
    this._getRowNodeId = this._getRowNodeId.bind(this);
    this._getRowStyle = this._getRowStyle.bind(this);

    this.dataTable = createRef();
  }

  render() {
    let {
      isDisableForm,
      resource,
      sizeColumnsToFit,
      containerHeight,
    } = this.props;

    return (
      <DatatableServerSide
        ref={this.dataTable}
        columns={this._getColumnDefs()}
        name={resource}
        navigateToSelect={!isDisableForm}
        datasource={this._getDataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={this.state.cacheBlockSize}
        containerHeight={containerHeight}
        onRowSelected={this._onRowSelected}
        suppressRowClickSelection={isDisableForm}
        suppressCellSelection={isDisableForm}
        getRowNodeId={this._getRowNodeId}
        disabled={isDisableForm}
        sizeColumnsToFit={sizeColumnsToFit}
        getRowStyle={this._getRowStyle}
        defaultColDef={{ sortable: true }}
      />
    );
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
          ..._this.props.filterPost,
        };
        params.pastAction = _this.props.statusForm;
        post.sort_name =
          post.sort_name === 'string_aktif' ? 'aktif' : post.sort_name;

        if (
          _this.props.filterPost.filter_value.toString().length <
          _this.props.minCharSearch
        ) {
          post.filter_value = '';
        }

        _this.props.action.loadAll(_this.props.resource, post, params);
      },
    };
  }

  componentDidMount() {
    let refDatatable = this._getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate(prevProps) {
    let {
      isDisableForm,
      statusForm,
      isReloadGrid,
      selectedRow,
      reloadType,
    } = this.props;
    console.log(isReloadGrid);
    if (isReloadGrid && !prevProps.isReloadGrid) {
      this._reload(reloadType);
    } else {
      switch (statusForm) {
        case moduleActionTypes.ADD:
          if (isDisableForm) {
            this.gridApi.deselectAll();
          }
          break;
        case moduleActionTypes.CANCEL:
          if (prevProps.selectedRow) {
            this._selectRow(prevProps.selectedRow);
          }
          break;
        case moduleActionTypes.AFTER_SAVE:
          this._selectRow(selectedRow);
          break;
        case moduleActionTypes.READY:
          if (prevProps.selectedRow) {
            this._selectRow(prevProps.selectedRow);
          } else {
            if (this.props.selectedRow) {
              this._selectRow(this.props.selectedRow);
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
      if (
        _.includes(
          [
            moduleActionTypes.READY,
            moduleActionTypes.SELECTED,
            moduleActionTypes.CANCEL,
          ],
          _this.props.statusForm
        )
      ) {
        _this._setFirstRowSelected();
      }
    });

    MouseTrap.bindGlobal('alt+r', function (e) {
      e.preventDefault();
      _this._reload(constDatatable.reloadType.purge);
    });
  }

  _getRefDatatable() {
    return this.dataTable.current.refs[this.props.resource];
  }

  _reload(reloadType) {
    if (reloadType === constDatatable.reloadType.purge) {
      this.gridApi.purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      if (this.gridApi.getDisplayedRowCount() === 0) {
        this.gridApi.purgeInfiniteCache();
      } else {
        this.gridApi.refreshInfiniteCache();
      }
    }
  }

  _selectRow(id) {
    if (this.dataTable.current) {
      this.dataTable.current.selectRow(id);
    }
  }

  _setFocusedCell(rowIndex) {
    if (this.dataTable.current) {
      this.dataTable.current.setFocusedCell(rowIndex);
    }
  }

  _setFirstRowSelected() {
    if (this.dataTable.current) {
      this.dataTable.current.setFirstRowSelected();
    }
  }

  _onRowSelected(params) {
    if (params.node.isSelected()) {
      this.props.action.onSelected(this.props.resource, params.data);
    }
  }

  _getRowNodeId(item) {
    return item.id;
  }

  _getRowStyle(params) {
    let style = {};
    if (params.data) {
      if (params.data.aktif === 0) {
        style = {
          ...style,
          color: 'red',
        };
      }
    }

    return style;
  }

  _getColumnDefs() {
    return [
      {
        headerName: this.props.t(`${this.props.resource}:header.column.no`),
        field: 'no',
        cellRenderer: 'loadingRenderer',
        sortable: false,
        width: 70,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      },
      ...this.props.columnDefs,
    ];
  }
}

const mapStateToProps = function (state, props) {
  const { filter, module } = state.default;
  var isReloadGrid, reloadType;
  if (state.datatable.datatables) {
    if (state.datatable.datatables[props.resource]) {
      isReloadGrid = state.datatable.datatables[props.resource].isReload;
      reloadType = state.datatable.datatables[props.resource].reloadType;
    }
  } else {
    isReloadGrid = state.datatable.isReload;
    reloadType = state.datatable.reloadType;
  }

  return {
    // columnDefs: module.columnDefs,
    filterPost: filter.post,
    isDisableForm: !isDisableForm(module),
    statusForm: module.statusForm,
    selectedRow: module.selectedRow,
    isReloadGrid,
    reloadType,
    minCharSearch: parseInt(selectors.get(state, MIN_CHAR_CONTEXT)) || 0,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
};

List.propTypes = {
  action: PropTypes.object,
  columnDefs: PropTypes.array,
  filterPost: PropTypes.object,
  selectedRow: PropTypes.number,
  isDisableForm: PropTypes.bool,
  statusForm: PropTypes.string,
  isReloadGrid: PropTypes.bool,
  reloadType: PropTypes.string,
  resource: PropTypes.string.isRequired,
  onRowDoubleClicked: PropTypes.func,
  onRowEntered: PropTypes.func,
  sizeColumnsToFit: PropTypes.bool,
  containerHeight: PropTypes.string,
  minCharSearch: PropTypes.number,
};

List.defaultProps = {
  sizeColumnsToFit: true,
  containerHeight: '273px',
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
