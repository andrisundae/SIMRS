import React, { Fragment } from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';

export default function PemeriksaanFisikAsal() {
  return (
    <Fragment>
      <Header attached="top" block className="mt-2">
        Status Generalis
      </Header>
      <Segment attached>
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Anemia</label>
            </Grid.Column>
            <Grid.Column>- (Negatif)</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Icterus</label>
            </Grid.Column>
            <Grid.Column>- (Negatif)</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Cyanosis</label>
            </Grid.Column>
            <Grid.Column>- (Negatif)</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Dispneau</label>
            </Grid.Column>
            <Grid.Column>- (Negatif)</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Kepala</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Mata</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">THT</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Mulut</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Leher</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block mt-2 font-bold">Thorax</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Payudara</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Jantung</label>
            </Grid.Column>
            <Grid.Column>S1S2 Tunggal reguler, murmur -, gallop -</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 ml-8 font-bold">Paru</label>
            </Grid.Column>
            <Grid.Column>ves +/+, Ronki -/-, wheezing -/-</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Abdomen</label>
            </Grid.Column>
            <Grid.Column>
              supel +, BU + normal, met -, mass -, nyeri tekan epigastrium +
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">
                Kulit & Sistem Limfatik
              </label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Tulang Belakang</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Sistem Saraf</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">
                Genetalia, Anus dan Rectum
              </label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Extermitas</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Lainnya</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Header attached="top" block className="mt-3">
        Status Lokalis
      </Header>
      <Segment attached>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">Lainnya</label>
            </Grid.Column>
            <Grid.Column>dbn</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
}
