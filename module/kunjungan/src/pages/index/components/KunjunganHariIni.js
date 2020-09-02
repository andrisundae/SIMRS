import React, { Component, createRef } from 'react';
import { Grid, Form, Modal, Icon } from 'semantic-ui-react';
import {
  DatatableServerSide,
  CancelButton,
  SearchButton,
  constDatatable,
  SelectedButton,
  Button,
  Select,
} from '@simrs/components';
import { OptionInstalasi } from './CustomOptions';

class KunjunganHariIni extends Component {
  constructor(props) {
    super(props);

    this.dataTable = createRef();
  }

  columns = [
    {
      headerName: 'Tgl. MRS',
      field: 'tgl_kunjungan',
      cellRenderer: 'loadingRenderer',
      sortable: true,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      resizable: true,
      width: 110,
    },
    {
      headerName: 'No. RM',
      field: 'norm',
      sortable: true,
      resizable: true,
      width: 110,
    },
    {
      headerName: 'Pasien',
      field: 'nama_pasien',
      sortable: true,
      resizable: true,
      width: 200,
    },
    {
      headerName: 'Status Pasien',
      field: 'nama_status_pasien',
      resizable: true,
      width: 150,
    },
    {
      headerName: 'Tempat layanan',
      field: 'nama_unit_layanan',
      sortable: true,
      resizable: true,
      width: 180,
    },
    {
      headerName: 'Kelas',
      field: 'nama_kelas',
      sortable: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: 'Hak kelas',
      field: 'nama_hak_kelas',
      sortable: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: 'Petugas input',
      field: 'nama_petugas_input',
      sortable: true,
      resizable: true,
      width: 180,
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
    const { name, value } = e.target;
    this.props.onChange(this.props.resource, { name, value });
  };

  getRowNodeId(item) {
    return item.id;
  }

  getKey = (key) => {
    return `${this.props.resource}:${key}`;
  };

  render() {
    const {
      show,
      onHide,
      dataSource,
      post,
      loaderUnitLayanan,
      data,
      t,
      name,
      onSelectChange,
      onInputChange,
      onSubmit,
    } = this.props;

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
          Kunjungan hari ini
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Group widths="16" style={{ marginBottom: 0 }}>
                    <Form.Field width="4">
                      <label>{t(this.getKey('label.field.instalasi'))}</label>
                      <Select
                        options={data.options_instalasi}
                        name="instalasi_id"
                        components={{ Option: OptionInstalasi }}
                        onChange={(selected) =>
                          onSelectChange('instalasi_id', selected)
                        }
                        value={post.instalasi_id}
                        inputRef={this.instalasi_id}
                      />
                    </Form.Field>
                    <Form.Field width="4">
                      <label>
                        {t(this.getKey('label.field.unit_layanan'))}
                      </label>
                      <Select
                        options={data.options_unit_layanan}
                        isDisabled={!post.instalasi_id}
                        onChange={(selected) =>
                          onSelectChange('unit_layanan_id', selected)
                        }
                        name="unit_layanan_id"
                        isLoading={loaderUnitLayanan}
                        value={post.unit_layanan_id}
                        inputRef={this.unit_layanan_id}
                      />
                    </Form.Field>
                    <Form.Input
                      width="3"
                      label={t(this.getKey('pasien'))}
                      placeholder={t(this.getKey('ketik_nama_pasien'))}
                      value={post.namaPasien}
                      onChange={onInputChange}
                      name="nama_pasien"
                    />
                    <Form.Input
                      width="2"
                      label={t(this.getKey('label.field.norm'))}
                      placeholder={t(this.getKey('ketik_norm_pasien'))}
                      value={post.norm}
                      onChange={onInputChange}
                      name="norm"
                    />
                    <SearchButton
                      onClick={onSubmit}
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
                  name={name}
                  navigateToSelect={true}
                  datasource={dataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="335px"
                  sizeColumnsToFit={false}
                  getRowNodeId={this.getRowNodeId}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <CancelButton onClick={onHide} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default KunjunganHariIni;
