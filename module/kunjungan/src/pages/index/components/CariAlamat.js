import React, { Component, createRef } from 'react';
import { Grid, Form, Modal, Icon } from 'semantic-ui-react';
import { DatatableServerSide, CancelButton, constDatatable, SearchButton, SelectedButton } from '@simrs/components';

class CariPasien extends Component {
  constructor(props) {
    super(props);

    this.dataTable = createRef();
  }

  columns = [
    {
      headerName: 'Desa',
      field: "nama_desa",
      cellRenderer: "loadingRenderer",
    },
    {
      headerName: 'Kecamatan',
      field: "nama_kecamatan",
    },
    {
      headerName: 'Kota',
      field: "nama_kota",
    },
    {
      headerName: 'Provinsi',
      field: "nama_provinsi",
    }
  ]

  componentDidMount() {
    let refDatatable = this.getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate() {
    let { isReloadGrid, reloadType } = this.props;
    if (isReloadGrid) {
      this.reload(reloadType);
    }
  }

  getRefDatatable() {
    return this.dataTable.current.refs['wilayah'];
  }

  reload(reloadType) {
    if (reloadType === constDatatable.reloadType.purge) {
      this.gridApi.setInfiniteRowCount(1);
      this.gridApi.purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      this.gridApi.refreshInfiniteCache();
    }
  }

  filterChangeHandler = (e) => {
    const { name, value } = e.target;
    this.props.onChange(this.props.resource, { name, value });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.resource, this.props.data.post);
  }

  render() {
    const { show, onHide, data, dataSource, onSelect } = this.props;

    return (
      <Modal dimmer="inverted" open={show} onClose={onHide} closeOnEscape={false} closeOnDimmerClick={false}>
        <Modal.Header><Icon name="search" />Cari Alamat</Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC'}}>
          <Grid className="content-grid" >
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group widths='16' style={{marginBottom: 0}}>
                    <Form.Input
                      width="3"
                      label='Desa / Kelurahan'
                      placeholder='Desa / Kelurahan'
                      value={data.post.desa}
                      onChange={this.filterChangeHandler}
                      name="desa"
                    />
                    <Form.Input
                      width="3"
                      label='Kecamatan'
                      placeholder='Kecamatan'
                      value={data.post.kecamatan}
                      onChange={this.filterChangeHandler}
                      name="kecamatan"
                    />
                    <Form.Input
                      width="3"
                      label='Kota / Kabupaten'
                      placeholder='Kota / Kabupaten'
                      value={data.post.kota}
                      onChange={this.filterChangeHandler}
                      name="kota"
                    />
                    <Form.Input
                      width="3"
                      label='Provinsi'
                      placeholder='Provinsi'
                      value={data.post.provinsi}
                      onChange={this.filterChangeHandler}
                      name="provinsi"
                    />
                    <SearchButton onClick={this.onSubmitHandler} style={{top: '41%', right: 0, position: 'absolute'}}/>
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <DatatableServerSide
                  ref={this.dataTable}
                  columns={this.columns}
                  name="wilayah"
                  navigateToSelect={true}
                  enableServerSideSorting={true}
                  datasource={dataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="335px"
                  onRowSelected={onSelect}
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
          <SelectedButton
            onClick={this._onDuplication}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CariPasien;