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

  componentDidMount() {
    let refDatatable = this.getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate(prevProps) {
    let { isReloadGrid, reloadType } = this.props;
    if (isReloadGrid && !prevProps.isReloadGrid) {
      this.reload(reloadType);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isReloadGrid !== this.props.isReloadGrid) {
      return true;
    }
    if (nextState.post !== this.state.post) {
      return true;
    }
    if (nextProps.show !== this.props.show) {
      return true;
    }

    return false;
  }

  getColumnDefs = () => {
    const { t } = this.props;
    return [
      {
        headerName: t(this.getKey('norm')),
        field: 'norm',
        cellRenderer: 'loadingRenderer',
        sortable: true,
        width: 110,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      },
      {
        headerName: t(this.getKey('nama_pasien')),
        field: 'nama',
        sortable: true,
      },
      {
        headerName: t(this.getKey('alamat')),
        field: 'alamat',
        sortable: true,
      },
      {
        headerName: t(this.getKey('desa_kelurahan')),
        field: 'desa',
        sortable: true,
      },
    ];
  }

  getRefDatatable() {
    return this.dataTable.current.refs['pasien'];
  }

  reload = (reloadType) => {
    if (reloadType === constDatatable.reloadType.purge) {
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

  getKey = (key) => {
    return `${this.props.resource}:${key}`;
  };

  searchKeyDownHandler = (e) => {
    if (e.which === 40) {
      this.dataTable.current.setFirstRowSelected();
    }
  }

  render() {
    const { show, onHide, t } = this.props;
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
          {t(this.getKey('cari_pasien'))}
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group widths="16" style={{ marginBottom: 0 }}>
                    <Form.Input
                      width="7"
                      label={t(this.getKey('nama_pasien'))}
                      placeholder={t(this.getKey('nama_pasien'))}
                      value={post.nama}
                      onChange={this.filterChangeHandler}
                      name="nama"
                      onKeyDown={this.searchKeyDownHandler}
                    />
                    <Form.Input
                      width="7"
                      label={t(this.getKey('desa_kelurahan'))}
                      placeholder={t(this.getKey('desa_kelurahan'))}
                      value={post.desa}
                      onChange={this.filterChangeHandler}
                      name="desa"
                      onKeyDown={this.searchKeyDownHandler}
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
                  columns={this.getColumnDefs()}
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
