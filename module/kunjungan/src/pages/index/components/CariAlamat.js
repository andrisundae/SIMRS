import React, { Component, createRef } from 'react';
import { Grid, Form, Modal, Icon } from 'semantic-ui-react';
import {
  DatatableServerSide,
  CancelButton,
  constDatatable,
  SearchButton,
  SelectedButton,
} from '@simrs/components';

class CariAlamat extends Component {
  constructor(props) {
    super(props);

    this.dataTable = createRef();
    this.onClickSelectedHandler = this.onClickSelectedHandler.bind(this);
    this.onRowDoubleClickHandler = this.onRowDoubleClickHandler.bind(this);
    this.onRowEnteredHandler = this.onRowEnteredHandler.bind(this);

    this.state = {
      post: {
        desa: '',
        kecamatan: '',
        kota: '',
        provinsi: '',
      },
    };
  }

  columns = [
    {
      headerName: 'Desa',
      field: 'desa',
      cellRenderer: 'loadingRenderer',
      sortable: true,
      cellStyle: { 'background-color': '#f5f7f7' },
    },
    {
      headerName: 'Kecamatan',
      field: 'kecamatan',
      sortable: true,
    },
    {
      headerName: 'Kota',
      field: 'kota',
      sortable: true,
    },
    {
      headerName: 'Provinsi',
      field: 'provinsi',
      sortable: true,
    },
  ];

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
    this.setState((prevState) => {
      return {
        post: {
          ...prevState.post,
          [name]: value,
        },
      };
    });
    // this.props.onChange(this.props.resource, { name, value });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.resource, this.state.post);
  };

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

  dataSource = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        let sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
        let post = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          ...this.state.post,
        };

        this.props.onLoadData(this.props.resource, post, params);
      },
    };
  };

  render() {
    const { show, onHide } = this.props;
    const { post } = this.state;

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
          Cari Alamat
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group widths="16" style={{ marginBottom: 0 }}>
                    <Form.Input
                      width="3"
                      label="Desa / Kelurahan"
                      placeholder="Desa / Kelurahan"
                      value={post.desa}
                      onChange={this.filterChangeHandler}
                      name="desa"
                    />
                    <Form.Input
                      width="3"
                      label="Kecamatan"
                      placeholder="Kecamatan"
                      value={post.kecamatan}
                      onChange={this.filterChangeHandler}
                      name="kecamatan"
                    />
                    <Form.Input
                      width="3"
                      label="Kota / Kabupaten"
                      placeholder="Kota / Kabupaten"
                      value={post.kota}
                      onChange={this.filterChangeHandler}
                      name="kota"
                    />
                    <Form.Input
                      width="3"
                      label="Provinsi"
                      placeholder="Provinsi"
                      value={post.provinsi}
                      onChange={this.filterChangeHandler}
                      name="provinsi"
                    />
                    <SearchButton
                      onClick={this.onSubmitHandler}
                      style={{ top: '41%', right: 0, position: 'absolute' }}
                    />
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
                  datasource={this.dataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="335px"
                  onRowDoubleClicked={this.onRowDoubleClickHandler}
                  onRowEntered={this.onRowEnteredHandler}
                  autoSizeColumn={false}
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

export default CariAlamat;
