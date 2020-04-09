import React, { Component } from 'react';
import { Grid, Segment, Form, Divider } from 'semantic-ui-react';
import { DatatableServerSide, Select, Checkbox } from '@simrs/components';

class PenjaminPasien extends Component {
  columns = [
    {
      headerName: 'No. Anggota',
      field: 'no_anggota',
      cellRenderer: 'loadingRenderer',
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
    },
    {
      headerName: 'Penjamin',
      field: 'nama_penjamin',
    },
    {
      headerName: 'Kelas',
      field: 'nama_kelas',
    },
    {
      headerName: 'Status',
      field: 'status',
    },
    {
      headerName: 'Aktif',
      field: 'string_aktif',
    },
  ];

  _getDataSource() {
    return {
      rowCount: null,
      getRows: (params) => {
        params.successCallback([], 0);
      },
    };
  }

  _getKey(key) {
    return `${this.props.resource}:${key}`;
  }

  render() {
    const { t } = this.props;

    return (
      <Grid className="content-grid">
        <Grid.Row>
          <Grid.Column>
            <Divider horizontal style={{ marginTop: 10, marginBottom: 10 }}>
              Data Penjamin
            </Divider>
          </Grid.Column>
        </Grid.Row>
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
              containerHeight="230.5px"
              onRowSelected={this._onRowSelected}
              getRowNodeId={this._getRowNodeId}
              sizeColumnsToFit={true}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment padded>
              <Form size="mini">
                <Grid columns="2">
                  <Grid.Row>
                    <Grid.Column>
                      <Grid style={{ marginTop: 0, marginBottom: -11 }}>
                        <Grid.Row className="form-row">
                          <Grid.Column width="4" className="field">
                            <label>
                              {t(this._getKey('label.field.penjamin'))}
                            </label>
                          </Grid.Column>
                          <Grid.Column width="12" className="field">
                            <Select />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="form-row">
                          <Grid.Column width="4" className="field">
                            <label>
                              {t(this._getKey('label.field.no_anggota'))}
                            </label>
                          </Grid.Column>
                          <Grid.Column width="12" className="field">
                            <Select />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="form-row">
                          <Grid.Column width="4" className="field">
                            <label>
                              {t(this._getKey('label.field.hak_kelas'))}
                            </label>
                          </Grid.Column>
                          <Grid.Column width="12" className="field">
                            <Select />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="form-row">
                          <Grid.Column width="4" className="field">
                            <label>
                              {t(
                                this._getKey('label.field.status_kepersetaan')
                              )}
                            </label>
                          </Grid.Column>
                          <Grid.Column width="12" className="field">
                            <Select />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="form-row">
                          <Grid.Column width="4" className="field">
                            <label>Aktif</label>
                          </Grid.Column>
                          <Grid.Column width="12" className="field">
                            <Checkbox
                              name="aktif"
                              inputRef={this.aktif}
                              label=""
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default PenjaminPasien;
