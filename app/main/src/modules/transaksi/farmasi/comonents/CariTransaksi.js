import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { Grid, Modal, Button, Icon } from 'semantic-ui-react';
import MouseTrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

import {
  PilihButton,
  withAppConsumer,
  DatatableServerSide,
  constDatatable,
} from '@simrs/components';

import { filterActions, masterActions } from '../actions';

class CariTransaksi extends Component {
  constructor(props) {
    super();

    this._onClose = this._onClose.bind(this);
    this._handleRowEnter = this._handleRowEnter.bind(this);
    this._handlePilih = this._handlePilih.bind(this);

    this.tableMaster = createRef();
    this._createFormRef();
  }

  _createFormRef() {
    this.btn_pilih = createRef();
    this.btn_batal = createRef();
  }

  reload(reloadType) {
    if (reloadType === constDatatable.reloadType.purge) {
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

  getRefDatatable() {
    return this.tableMaster.current.refs[this.props.tableName];
  }

  getRowNodeId(item) {
    return item.id;
  }

  dataSource = () => {
    let that = this;

    return {
      rowCount: null,
      getRows: (params) => {
        let sortOrder = params.sortModel[0];
        let post = {
          ...that.props.post,
          length: 25,
          start: params.startRow,
          sort_name: sortOrder ? sortOrder.colId : '',
          sort_order: sortOrder ? sortOrder.sort : '',
        };

        that.props.action.loadTransaksi(that.props.resource, post, params);
      },
    };
  };

  _handleRowEnter() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.onSelect(selectedRows[0]);
    }
  }

  _handlePilih() {
    this._handleRowEnter();
  }

  componentDidMount() {
    this._bindKey();

    if (this.props.show) {
      let refDatatable = this.getRefDatatable();
      this.gridApi = refDatatable.api;
      this.columnApi = refDatatable.columnApi;
    }
  }

  componentDidUpdate() {
    let { isReload, reloadType } = this.props.datatables[this.props.tableName];
    let { filtered_data } = this.props;

    if (this.props.show) {
      if (isReload) {
        this.reload(reloadType);
      }

      if (filtered_data > 0) {
        this._setFirstRowSelected();
      }
    }
  }

  componentWillUnmount() {
    this._unbindKey();
  }

  render() {
    const { show, children } = this.props;

    return (
      <Modal
        open={show}
        onClose={this._onClose}
        size="small"
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Content>
          <Grid className="content-grid">
            <Grid.Row>{children}</Grid.Row>
            <Grid.Row>
              <Grid.Column width="16">
                <DatatableServerSide
                  ref={this.tableMaster}
                  columns={this.props.columnDefs}
                  name={this.props.tableName}
                  navigateToSelect={true}
                  datasource={this.dataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="335px"
                  onRowEntered={this._handleRowEnter}
                  sizeColumnsToFit={false}
                  getRowNodeId={this.getRowNodeId}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <PilihButton onClick={this._handlePilih} inputRef={this.btn_pilih} />
          <Button
            ref={this.btn_batal}
            name="Batal Pilih"
            size="mini"
            color="blue"
            onClick={this._onClose}
          >
            <Icon name="undo" />
            <Trans i18nKey="common:action.cancel" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  _unbindKey() {
    MouseTrap.unbind('alt+p');
    MouseTrap.unbind('f2');
    MouseTrap.unbind('alt+r');
  }

  _bindKey() {
    let that = this;

    MouseTrap.bindGlobal('alt+p', function (e) {
      e.preventDefault();

      that.btn_pilih.current.focus();
      that._handleRowEnter();
    });

    MouseTrap.bindGlobal('f2', function (e) {
      e.preventDefault();
      if (that.props.show) {
        that._setFirstRowSelected();
      }
    });

    MouseTrap.bindGlobal('alt+r', function (e) {
      e.preventDefault();
      that.reload(constDatatable.reloadType.purge);
    });
  }

  _onClose() {
    this.props.action.onCloseDialog(this.props.resource, {
      idx: 'master_modal',
    });
  }

  onSelect(selectedData) {
    this.props.action.onSelectedData(this.props.resource, selectedData);
    this._onClose();
  }
}

const mapStateToProps = function (state) {
  const { filter } = state.default;

  return {
    filtered_data: filter.cari_master.filtered_data,
    datatables: state.datatable.datatables,
    show: filter.filter_modal.master_modal.show,
    post: filter.cari_master,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        ...filterActions,
        onSelectedData: masterActions.onSelectedData,
      },
      dispatch
    ),
  };
};

CariTransaksi.propTypes = {
  show: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  action: PropTypes.object,
  t: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAppConsumer(CariTransaksi));
