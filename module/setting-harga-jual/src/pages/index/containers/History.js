import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Modal, Input, Grid, Icon, Button } from 'semantic-ui-react';
import { DatatableServerSide, constDatatable } from '@simrs/components';

import actions from '../actions';

const TABLE_HISTORY = 'table_history';

class History extends Component {
  constructor(props) {
    super(props);

    this._onExit = this._onExit.bind(this);

    this.state = {
      cacheBlockSize: 25,
    };

    this.dataTable = createRef();
    this.exitBtn = createRef();
    this.nama_barang = createRef();
  }

  render() {
    const { t, show, post } = this.props;

    return (
      <Modal
        open={show}
        onClose={this._onExit}
        size="large"
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <Icon name="copy outline" />
          {t(this._getKey('header.tabel.log'))}
        </Modal.Header>
        <Modal.Content>
          <Grid className="content-grid">
            <Grid.Row className="form-row">
              <Grid.Column width="3" className="field left aligned">
                <label>{t(this._getKey('label.field.nama_barang'))}</label>
              </Grid.Column>
              <Grid.Column width="13" className="field">
                <Input
                  name="nama_barang"
                  ref={this.nama_barang}
                  value={post.nama_barang}
                  disabled={true}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <DatatableServerSide
                  ref={this.dataTable}
                  columns={this._getColumnDefs()}
                  name={TABLE_HISTORY}
                  navigateToSelect={false}
                  enableServerSideSorting={false}
                  datasource={this._getDataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={this.state.cacheBlockSize}
                  containerHeight="200px"
                  sizeColumnsToFit={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            ref={this.exitBtn}
            name="ecit_btn"
            size="mini"
            color="blue"
            onClick={this._onExit}
          >
            <label>{t(this._getKey('label.button.keluar'))}</label>
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  componentDidMount() {
    let refDatatable = this._getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
    // this._bindKey();
  }

  componentWillUnmount() {
    // this._unbindKey();
  }

  _getDataSource() {
    let that = this;

    return {
      rowCount: null,
      getRows: (params) => {
        let post = {
          length: that.state.cacheBlockSize,
          start: params.startRow,
          sort_name: '',
          sort_order: '',
          id: that.props.post.id,
        };
        that.props.action.loadLogHarga(that.props.resource, post, params);
      },
    };
  }

  _getRefDatatable() {
    return this.dataTable.current.refs[TABLE_HISTORY];
  }

  _reload(reloadType) {
    if (reloadType === constDatatable.reloadType.purge) {
      this.gridApi.setInfiniteRowCount(1);
      this.gridApi.purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      this.gridApi.refreshInfiniteCache();
    }
  }

  _onExit() {
    this.props.action.showLog(this.props.resource, { show: false });
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  _getColumnDefs() {
    return [
      {
        headerName: this.props.t(
          `${this.props.resource}:header.history.column.no`
        ),
        field: 'no',
        cellRenderer: 'loadingRenderer',
        sortable: false,
        width: 70,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.history.column.tgl_ubah`
        ),
        field: 'tgl_update',
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
        width: 100,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.history.column.petugas`
        ),
        field: 'petugas',
        width: 80,
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_terakhir`
        ),
        field: 'harga_terakhir',
        cellRenderer: 'currencyRenderer',
        width: 90,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_average`
        ),
        field: 'harga_average',
        cellRenderer: 'currencyRenderer',
        width: 90,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
      {
        headerName: this.props.t(
          `${this.props.resource}:header.column.harga_jual`
        ),
        field: 'harga_jual',
        cellRenderer: 'currencyRenderer',
        width: 90,
        cellClass: 'ag-number-cell',
        editable: true,
        cellEditor: 'currencyInputRenderer',
      },
    ];
  }
}

const mapStateToProps = function (state) {
  const { history, post } = state.default.module;

  return {
    show: history.show,
    post: post,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    action: bindActionCreators(
      {
        loadLogHarga: actions.loadLogHarga,
        showLog: actions.showLog,
      },
      dispatch
    ),
  };
};

History.propTypes = {
  show: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  action: PropTypes.object,
  post: PropTypes.object,
  t: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
