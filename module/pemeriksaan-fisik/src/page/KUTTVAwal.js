import React, { Fragment } from 'react';
import { Segment, Header, Grid } from 'semantic-ui-react';

export default function KUTTVAwal() {
  return (
    <Fragment>
      <Header attached="top" block className="mt-2">
        Keadaan Umum
      </Header>
      <Segment attached>
        <Grid>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">GCS</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Eye</label>
            </Grid.Column>
            <Grid.Column>
              <label>4</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Verbal</label>
            </Grid.Column>
            <Grid.Column>
              <label>5</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Motorik</label>
            </Grid.Column>
            <Grid.Column>
              <label>6</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Total</label>
            </Grid.Column>
            <Grid.Column>
              <label>15 (Minor)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Kesadaran</label>
            </Grid.Column>
            <Grid.Column>
              <label>Compos Mentis</label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Header attached="top" block className="mt-5">
        TTV
      </Header>
      <Segment attached>
        <Grid>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">Tekanan Darah</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Systolic</label>
            </Grid.Column>
            <Grid.Column>
              <label>130 mm/Hg</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Diastolic</label>
            </Grid.Column>
            <Grid.Column>
              <label>90 mm/Hg</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">Nadi</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Frekuensi</label>
            </Grid.Column>
            <Grid.Column>
              <label>80 bpm</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Kekuatan</label>
            </Grid.Column>
            <Grid.Column>
              <label>Kuat</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Suhu</label>
            </Grid.Column>
            <Grid.Column>
              <label>36,6 {'\u00b0'}C</label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
}
