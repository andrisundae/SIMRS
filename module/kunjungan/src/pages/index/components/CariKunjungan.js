import React, { Component, } from 'react';
import { Grid, Form, Modal, Icon } from 'semantic-ui-react';
import { DatatableServerSide, CancelButton, SaveButton, Radio } from '@simrs/components';

class CariKunjungan extends Component {
  columns = [
    {
      headerName: 'Tgl. Masuk',
      field: "tgl_masuk",
      cellRenderer: "loadingRenderer",
      sortable: false,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' }
    },
    {
      headerName: 'Tgl. Keluar',
      field: "tgl_keluar",
    },
    {
      headerName: 'No. RM',
      field: "no_rm",
    },
    {
      headerName: 'No. Billing',
      field: "no_billing",
    },
    {
      headerName: 'Nama Pasien',
      field: "nama_pasien",
    },
    {
      headerName: 'Tempat Layanan',
      field: "nama_layanan",
    }
  ]

  _getDataSource() {
    return {
      rowCount: null,
      getRows: (params) => {
        params.successCallback([], 0)
      }
    }
  }

  render() {
    const { show, onHide, onOk } = this.props;

    return (
      <Modal dimmer="inverted" open={show} onClose={onHide} closeOnEscape={false} closeOnDimmerClick={false}>
        <Modal.Header><Icon name="search" />Cari Kunjungan</Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid" >
            <Grid.Row>
              <Grid.Column>
                <DatatableServerSide
                  ref={this.dataTable}
                  columns={this.columns}
                  name="pasien"
                  navigateToSelect={true}
                  enableServerSideSorting={true}
                  datasource={this._getDataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="200px"
                  onRowSelected={this._onRowSelected}
                  getRowNodeId={this._getRowNodeId}
                  sizeColumnsToFit={true}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <CancelButton
            onClick={onHide}
          />
          <SaveButton
            onClick={this._onDuplication}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CariKunjungan;