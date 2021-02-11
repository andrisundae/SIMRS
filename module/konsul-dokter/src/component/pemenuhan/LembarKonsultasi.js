import React, { Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';

export default function LembarKonsultasi() {
  return (
    <Fragment>
      <Grid>
        <Grid.Row className="pb-0">
          <Grid.Column className="text-center text-xl font-medium">
            Nama Rumah Sakit
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="p-0">
          <Grid.Column className="text-center text-lg">
            Alamat Rumah Sakit
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="text-center text-xl font-medium">
            LEMBAR KONSULTASI
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="p-0">
          <Grid.Column className="text-center">
            <label className="block float-right">
              Administrator LINKAR (09/02/2021 11:35)
            </label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0 pt-2 border-t border-black">
          <Grid.Column width="2">No. RM</Grid.Column>
          <Grid.Column>
            : <label className="inline-block font-bold ml-1">20125091</label>
          </Grid.Column>
          <Grid.Column width="2">Tgl. Pelayanan</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">14/10/2020 20:18</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0 pt-1">
          <Grid.Column width="2">Nama / JK</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">MULYATI, NY / P</label>
          </Grid.Column>
          <Grid.Column width="2">Asal Kunjungan</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">IGD RS</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0 pt-1">
          <Grid.Column width="2">Tgl. Lahir</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">10/01/1952</label>
          </Grid.Column>
          <Grid.Column width="2">Penjamin</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">BPJS NON PBI</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0 pt-1">
          <Grid.Column width="2">Umur</Grid.Column>
          <Grid.Column>
            :{' '}
            <label className="inline-block ml-1">
              69 tahun, 0 bulan, 30 hari
            </label>
          </Grid.Column>
          <Grid.Column width="2">Tempat Layanan</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">ANGGREK</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pb-0 pt-1">
          <Grid.Column width="2">Alamat</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">KAUMAN, PUGERAN</label>
          </Grid.Column>
          <Grid.Column width="2">Tgl. MRS</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">14/10/2020 22:59</label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" className="pt-1 pb-2 border-b border-black">
          <Grid.Column width="2"></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column width="2">Tgl. KRS</Grid.Column>
          <Grid.Column>
            : <label className="inline-block ml-1">-</label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
}
