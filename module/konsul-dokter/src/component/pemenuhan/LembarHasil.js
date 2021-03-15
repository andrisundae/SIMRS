import React, { Fragment, useState } from 'react';
import { Table, Grid } from 'semantic-ui-react';
import _ from 'lodash';

export default function LembarHasil() {
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column className="text-center text-xl font-medium">
            HASIL KONSULTASI
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="p-0">
          <Grid.Column>
            <p>
              Dengan hormat <br />
              <br />
              Surat permintaan konsultasi sejawat, pada pemeriksaan pasien, kami
              dapatkan saat ini: <br />
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <label className="block">Subjective Data</label>
            <label className="block mt-3">Hasil Subjective Data</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <label className="block">Objective Data</label>
            <label className="block mt-3">Hasil Objective Data</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <label className="block">Kesimpulan Diagnosis</label>
            <label className="block mt-3">Hasil Diagnosis Data</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <label className="block">Planning</label>
            <label className="block mt-3">Hasil Planning</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column>
            <label className="block">
              Terima kasih atas perhatian dan kerjasamanya
            </label>
          </Grid.Column>
          <Grid.Column width="4">
            <label className="block">Tempat, Tanggal Dibuat</label>
            <label className="block mt-3">Hormat Kami</label>
            <label className="block mt-3">TTD</label>
            <label className="block mt-3">Nama Terang</label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
}
