import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Form, Input, Segment, Button, Icon } from 'semantic-ui-react';

import { pemesananSupplier } from '../redux/selector';

const Header = (props) => {
  const data = useSelector(pemesananSupplier);

  let { trans } = props;

  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Grid columns="3">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.no_pemesanan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input value={data.nomor_transaksi || ''} disabled={true} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.tgl_pemesanan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input value={data.tanggal || ''} disabled={true} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.supplier')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input value={data.nama_supplier || ''} disabled={true} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.unit_pemesan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input value={data.nama_unit || ''} disabled={true} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.status_pemesanan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      value={data.status_terpenuhi || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.petugas')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input value={data.nama_petugas || ''} disabled={true} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default Header;
