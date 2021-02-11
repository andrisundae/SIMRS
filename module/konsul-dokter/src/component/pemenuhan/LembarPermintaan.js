import React, { Fragment, useState } from 'react';
import { Table, Grid } from 'semantic-ui-react';
import _ from 'lodash';

export default function LembarPermintaan() {
  return (
    <Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column className="text-center text-xl font-medium">
            PERMINTAAN KONSULTASI
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="p-0">
          <Grid.Column>
            <p>
              Kepada Yth<label className="ml-5 mr-2">:</label>Nama Dokter <br />
              Dengan hormat <br />
              <br />
              Mohon bantuan sejawat untuk: <br />
              1. Konsultasi tindakan medis yang diperlukan pasien saat ini{' '}
              <br />
              <br />
              Atas pasien yang kami rawat dengan:
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <Table celled compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Kode</Table.HeaderCell>
                  <Table.HeaderCell>Diagnosis</Table.HeaderCell>
                  <Table.HeaderCell>Peringkat</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="pb-0">
          <Grid.Column>
            <label className="block">Keterangan Klinis saat ini:</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="3">
            <label className="block font-bold ml-5">Subjective</label>
          </Grid.Column>
          <Grid.Column>
            <label className="block">Data Subjective</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="3">
            <label className="block font-bold ml-5">Objective</label>
          </Grid.Column>
          <Grid.Column>
            <label className="block">Data Objective</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0">
          <Grid.Column width="3">
            <label className="block font-bold ml-5">Planning</label>
          </Grid.Column>
          <Grid.Column>
            <label className="block">Data Planning</label>
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
