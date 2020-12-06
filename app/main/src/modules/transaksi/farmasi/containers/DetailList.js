import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import _ from 'lodash';

import {
  DatatableServerSide,
  constDatatable,
  withAppConsumer,
} from '@simrs/components';
import { detailActions } from '../actions';
import { isDisableListDetail } from '../reducer';
import { masterActionTypes, detailActionTypes } from '../actionTypes';

class DetailList extends Component {
  constructor(props) {
    super();
    this._getDataSource = this._getDataSource.bind(this);
    this._onRowSelected = this._onRowSelected.bind(this);
    this._getRowNodeId = this._getRowNodeId.bind(this);
    this._getRowStyle = this._getRowStyle.bind(this);

    this.detailTable = createRef();
  }

  _getRefDatatable() {
    return this.detailTable.current.refs[this.props.tableName];
  }

  componentDidMount() {
    let refDatatable = this._getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate(prevProps) {
    let {
      isDisableForm,
      dtStatusForm,
      isReloadGrid,
      selectedRow,
      reloadType,
    } = this.props;

    if (isReloadGrid) {
      this._reload(reloadType);
    } else {
      switch (dtStatusForm) {
        case detailActionTypes.ADD:
          if (isDisableForm) {
            this.gridApi.deselectAll();
          }
          break;
        case detailActionTypes.CANCEL:
          if (prevProps.selectedRow) {
            this._selectRow(prevProps.selectedRow);
          }
          break;
        case detailActionTypes.AFTER_SAVE:
          this._selectRow(selectedRow);
          break;
        case detailActionTypes.READY:
          if (prevProps.selectedRow) {
            this._selectRow(prevProps.selectedRow);
          } else {
            if (selectedRow) {
              this._selectRow(selectedRow);
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

  render() {
    let {
      tableName,
      isDisableForm,
      containerHeight,
      sizeColumnsToFit,
      statusForm,
    } = this.props;

    let isDisabledList = isDisableForm;

    if (masterActionTypes.MANAGE === statusForm) {
      isDisabledList = false;
    }

    return (
      <DatatableServerSide
        ref={this.detailTable}
        columns={this._getColumnDefs()}
        name={tableName}
        navigateToSelect={!isDisabledList}
        datasource={this._getDataSource()}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={25}
        containerHeight={containerHeight}
        onRowSelected={this._onRowSelected}
        suppressRowClickSelection={isDisabledList}
        suppressCellSelection={isDisabledList}
        getRowNodeId={this._getRowNodeId}
        disabled={isDisabledList}
        sizeColumnsToFit={sizeColumnsToFit}
        getRowStyle={this._getRowStyle}
        defaultColDef={{ sortable: true }}
      />
    );
  }

  _bindKey() {
    let that = this;

    MouseTrap.bindGlobal('f2', function (e) {
      e.preventDefault();
      if (
        _.includes(
          [
            detailActionTypes.READY,
            detailActionTypes.SELECTED,
            detailActionTypes.CANCEL,
          ],
          that.props.dtStatusForm
        )
      ) {
        that._setFirstRowSelected();
      }
    });

    MouseTrap.bindGlobal('alt+r', function (e) {
      e.preventDefault();
      that._reload(constDatatable.reloadType.purge);
    });
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
      this._setFocusedCell(node.rowIndex);
      node.setSelected(true, true);
    }
  }

  _setFocusedCell(rowIndex) {
    this.gridApi.ensureIndexVisible(0);
    let firstCol = this.columnApi.getAllDisplayedColumns()[0];
    this.gridApi.ensureColumnVisible(firstCol);
    this.gridApi.setFocusedCell(rowIndex, firstCol);
  }

  _setFirstRowSelected() {
    this._setFocusedCell(0);
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
  _getDataSource() {
    let that = this;

    return {
      rowCount: null,
      getRows: (params) => {
        let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
        let post = {
          ...that.props.savedData,
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
        };

        that.props.action.loadDetail(that.props.resource, post, params);
      },
    };
  }
}

const mapStateToProps = function (state, props) {
  const { master, filter, detail } = state.default;
  var isReloadGrid, reloadType;

  if (state.datatable.datatables) {
    if (state.datatable.datatables[props.tableName]) {
      isReloadGrid = state.datatable.datatables[props.tableName].isReload;
      reloadType = state.datatable.datatables[props.tableName].reloadType;
    }
  } else {
    isReloadGrid = state.datatable.isReload;
    reloadType = state.datatable.reloadType;
  }

  return {
    isDisableForm: !isDisableListDetail(detail),
    statusForm: master.statusForm,
    savedData: master.post,
    masterOpen: master.openForm,
    detailOpen: detail.openForm,
    dtStatusForm: detail.statusForm,
    selectedRow: detail.data.selectedRow,
    isReloadGrid,
    reloadType,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(detailActions, dispatch),
  };
};

DetailList.propTypes = {
  columnDefs: PropTypes.array,
  selectedRow: PropTypes.number,
  isDisableForm: PropTypes.bool,
  statusForm: PropTypes.string,
  isReloadGrid: PropTypes.bool,
  reloadType: PropTypes.string,
  sizeColumnsToFit: PropTypes.bool,
  containerHeight: PropTypes.string,
};

DetailList.defaultProps = {
  sizeColumnsToFit: true,
  containerHeight: '273px',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(DetailList));
