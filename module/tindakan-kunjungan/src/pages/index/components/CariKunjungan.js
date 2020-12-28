import React, { Component, createRef } from 'react';
import { Grid, Modal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  DatatableServerSide,
  CancelButton,
  SelectedButton,
} from '@simrs/components';
import { staticConst } from '../../index/static';

class CariKunjungan extends Component {
  constructor(props) {
    super(props);

    this.dataTable = createRef();
    this.onClickSelectedHandler = this.onClickSelectedHandler.bind(this);
    this.onRowDoubleClickHandler = this.onRowDoubleClickHandler.bind(this);
    this.onRowEnteredHandler = this.onRowEnteredHandler.bind(this);
  }

  componentDidMount() {
    const refDatatable = this.getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  getKey = (key) => {
    return `${this.props.resource}:${key}`;
  };

  getColumnDefs = () => {
    const { t } = this.props;
    const columns = [
      {
        headerName: t(this.getKey('tanggal_masuk')),
        field: 'tgl_mulai',
        sortable: true,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
      },
      {
        headerName: t(this.getKey('tanggal_selesai')),
        field: 'tgl_selesai',
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
      },
      {
        headerName: t(this.getKey('norm')),
        field: 'norm',
      },
      {
        headerName: t(this.getKey('no_billing')),
        field: 'kode_kunjungan_unit',
      },
      {
        headerName: t(this.getKey('nama_pasien')),
        field: 'nama_pasien',
      },
      {
        headerName: t(this.getKey('unit_layanan')),
        field: 'nama_unit_layanan',
      },
    ];

    return columns;
  };

  getRefDatatable() {
    return this.dataTable.current.refs[staticConst.TABLE_KUNJUNGAN];
  }

  onClickSelectedHandler() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.props.onSelect(selectedRows[0]);
    }
  }

  onRowDoubleClickHandler(params) {
    if (params.node.isSelected()) {
      this.props.onSelect(params.data);
    }
  }

  onRowEnteredHandler() {
    this.onClickSelectedHandler();
  }

  getRowNodeId = (item) => {
    return item.id_kunjungan_unit;
  };

  gridReadyHandler = () => {
    this.dataTable.current.setFirstRowSelected();
  };

  render() {
    const { show, onHide, dataSource, t } = this.props;

    return (
      <Modal
        dimmer="inverted"
        open={show}
        onClose={onHide}
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <Icon name="search" />
          {t(this.getKey('kunjungan_pasien'))}
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <DatatableServerSide
                  ref={this.dataTable}
                  columns={this.getColumnDefs()}
                  name={staticConst.TABLE_KUNJUNGAN}
                  navigateToSelect={true}
                  datasource={dataSource}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={100}
                  containerHeight="200px"
                  getRowNodeId={this.getRowNodeId}
                  sizeColumnsToFit={true}
                  onRowDoubleClicked={this.onRowDoubleClickHandler}
                  onRowEntered={this.onRowEnteredHandler}
                  onGridReady={this.gridReadyHandler}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <SelectedButton onClick={this.onClickSelectedHandler} />
          <CancelButton onClick={onHide} />
        </Modal.Actions>
      </Modal>
    );
  }
}

CariKunjungan.propTypes = {
  t: PropTypes.func,
  resource: PropTypes.string.isRequired,
  pasien: PropTypes.object,
  dataSource: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
};

export default CariKunjungan;
