import React, { Component, createRef } from 'react';
import { Grid, Form, Modal, Icon, Input } from 'semantic-ui-react';
import {
  DatatableServerSide,
  CancelButton,
  constDatatable,
  SelectedButton,
  SearchButton
} from '@simrs/components';

class CariTindakan extends Component {
  constructor(props) {
    super(props);

    this.dataTable = createRef();
    this.search_tindakan = createRef();
    this.onClickSelectedHandler = this.onClickSelectedHandler.bind(this);
    this.onRowDoubleClickHandler = this.onRowDoubleClickHandler.bind(this);
    this.onRowEnteredHandler = this.onRowEnteredHandler.bind(this);

    this.state = {
      search: ''
    };
  }

  getColumns = () => {
    return [
      {
        headerName: this.props.t(this.getKey('kode_panggil')),
        field: 'kode_panggil',
        cellRenderer: 'loadingRenderer',
        sortable: true,
        cellStyle: { 'background-color': '#f5f7f7' },
        width: 110,
        cellClass: "ag-date-cell",
      },
      {
        headerName: this.props.t(this.getKey('kelompok')),
        field: 'nama_kelompok',
        width: 110,
        sortable: true,
      },
      {
        headerName: this.props.t(this.getKey('nama_layanan')),
        field: 'nama_layanan',
        sortable: true,
        width: 200,
      },
      {
        headerName: this.props.t(this.getKey('kelas')),
        field: 'nama_kelas',
        width: 120,
      },
      {
        headerName: this.props.t(this.getKey('tarif')),
        field: 'tarif',
        width: 120,
        cellRenderer: 'currencyRenderer',
        cellClass: "ag-number-cell"
      },
      {
        headerName: this.props.t(this.getKey('tanggal_aktif')),
        field: 'tgl_aktif_tarif',
        width: 120,
        cellRenderer: 'dateRenderer',
      },
      {
        headerName: this.props.t(this.getKey('nama_versi_tarif')),
        field: 'nama_versi_tarif',
        width: 120,
      },
    ];
  }

  componentDidMount() {
    let refDatatable = this.getRefDatatable();
    this.gridApi = refDatatable.api;
    this.columnApi = refDatatable.columnApi;
  }

  componentDidUpdate() {
    let { isReload, reloadType, focusElement } = this.props;
    if (isReload) {
      this.reload(reloadType);
    }

    if (this[focusElement]) {
      if (this[focusElement].current) {
        this[focusElement].current.focus();
      }
    }
  }

  getKey = (key) => {
    return `${this.props.resource}:${key}`;
  };

  getRefDatatable() {
    return this.dataTable.current.refs[this.props.name];
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
    const { value } = e.target;
    this.setState({search: value});
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.resource, {search: this.state.search});
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

  getRowNodeId = (item) => {
    return item.id;
  }

  dataSource = () => {
    const _this = this;
    return {
      rowCount: null,
      getRows: (params) => {
        const kunjungan = _this.props.kunjungan;
        const sortModel = params.sortModel.length > 0 ? params.sortModel[0] : {};
        const post = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
          id_unit_layanan: kunjungan.id_unit_layanan,
          id_instalasi: kunjungan.id_instalasi,
          st_cito: 0,
          id_kelas: kunjungan.id_kelas,
          search: _this.state.search,
        };

        this.props.onLoadData(post, params);
      },
    };
  };

  searchKeyDownHandler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.props.onSubmit(this.props.resource, { search: this.state.search });
    }
  }

  render() {
    const { show, onHide, name } = this.props;
    const { search } = this.state;

    return (
      <Modal
        dimmer="inverted"
        open={show}
        onClose={onHide}
        // size="small"
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <Icon name="search" />
          {this.props.t(this.getKey('cari_layanan'))}
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group widths="16" style={{ marginBottom: 0 }}>
                    <Form.Field width="14">
                      <label>{this.props.t(this.getKey('nama_layanan'))}</label>
                      <Input
                        ref={this.search_tindakan}
                        name="search_tindakan"
                        onKeyDown={this.searchKeyDownHandler}
                        value={search}
                        onChange={this.filterChangeHandler}
                      />
                    </Form.Field>
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
                  columns={this.getColumns()}
                  name={name}
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
                  // autoSizeColumn={false}
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

export default CariTindakan;
