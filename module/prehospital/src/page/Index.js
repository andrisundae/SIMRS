import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Divider,
  Icon,
  Table,
  Button,
  Label,
  Modal,
  Segment,
  Grid,
} from 'semantic-ui-react';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';

export default function Index() {
  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button as={Link} color="blue" to="/ubah" size="small">
            <Icon name="pencil" />
            Ubah
          </Button>
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="tasks" className="text-lg -mt-4" />
        Pengkajian Khusus - Pre-Hospital
      </Header>
      <Divider />
      <Header attached="top" block className="mt-3">
        Admin Linkar
        <div className="inline-block float-right">14/01/2021 14:29</div>
      </Header>
      <Segment attached className="mb-3">
        <Grid>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">GCS</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Eye</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                3 (Membuka mata terhadap rangsangan suara)
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Verbal</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">4 (Bersuara tapi tidak jelas)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Motorik</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                4 (Menarik terhadap rangsangan yang menyakitkan)
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Total</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">11 (Moderate)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Kesadaran</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Delirium</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Tekanan darah</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">10 mmHg</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Nadi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">10 x/menit</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Pernafasan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">10 x/menit</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Suhu</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">10 {'\u00b0'}C</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">
                SpO<sub>2</sub>
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">10 %</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Tindakan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Beban Tekan, ETT, Lainnya</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold">Obat</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Tidak ada</label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
}
