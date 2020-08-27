import React, { Component, createRef } from 'react';
import { Grid, Form, Modal, Icon } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';
import {
  DatatableServerSide,
  CancelButton,
  SearchButton,
  constDatatable,
  SelectedButton,
} from '@simrs/components';

class CariPasien extends Component {
  constructor(props) {
    super(props);

    this.dataTable = createRef();
    this.onClickSelectedHandler = this.onClickSelectedHandler.bind(this);
    this.onRowDoubleClickHandler = this.onRowDoubleClickHandler.bind(this);
    this.onRowEnteredHandler = this.onRowEnteredHandler.bind(this);

    this.state = {
      post: {
        nama: '',
        desa: '',
        norm: '',
      },
    };
  }

  columns = [
    {
      headerName: 'No. RM',
      field: 'norm',
      cellRenderer: 'loadingRenderer',
      sortable: true,
      width: 110,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
    },
    {
      headerName: 'Nama Pasien',
      field: 'nama',
      sortable: true,
    },
    {
      headerName: 'Alamat',
      field: 'alamat',
      sortable: true,
    },
    {
      headerName: 'Desa',
      field: 'desa',
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
    return this.dataTable.current.refs['pasien'];
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

  getRowNodeId(item) {
    return item.id;
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
          filters: { ...this.state.post },
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
        size="small"
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <Icon name="search" />
          Cari Pasien
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group widths="16" style={{ marginBottom: 0 }}>
                    <Form.Input
                      width="7"
                      label="Nama pasien"
                      placeholder="Nama pasien"
                      value={post.nama}
                      onChange={this.filterChangeHandler}
                      name="nama"
                    />
                    <Form.Input
                      width="7"
                      label="Desa / Kelurahan"
                      placeholder="Desa / Kelurahan"
                      value={post.desa}
                      onChange={this.filterChangeHandler}
                      name="desa"
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
                  name="pasien"
                  navigateToSelect={true}
                  datasource={this.dataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="335px"
                  onRowDoubleClicked={this.onRowDoubleClickHandler}
                  onRowEntered={this.onRowEnteredHandler}
                  sizeColumnsToFit={true}
                  getRowNodeId={this.getRowNodeId}
                  autoSizeColumn={false}
                  contextMenuItems={[
                    {
                      title: 'Copy Norm',
                      icon: 'copy outline',
                      onClick: (gridApi, data) => {
                        copy(data.norm);
                      },
                    },
                  ]}
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

export default CariPasien;
