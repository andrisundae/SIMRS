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
        Pengkajian Khusus - TRIAGE
      </Header>
      <Divider />
      <Header attached="top" block className="mt-3">
        Admin Linkar
        <div className="inline-block float-right">14/01/2021 14:29</div>
      </Header>
      <Segment attached className="mb-3">
        <Grid>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">Tanggal Pemeriksaan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">14/01/2021 14:29</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block mt-2 font-bold">STATUS EMERGENCY</label>
            </Grid.Column>
            <Grid.Column>
              <label className="inline-block bg-red-600 p-2 text-white font-bold">
                Merah (Prioritas I)
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">AIRWAY</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Paten, Stridor, Lainnya</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">BREATHING</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Pola nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Teratur</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Jenis nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Pernafasan perut</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">RR</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">20 x/menit</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">
                Gangguan pola nafas
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Apneu, Bradipneu (20 x/menit)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Perkusi paru</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Redup</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Suara nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Vesiclar, Wheezing</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Otot bantu nafas</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Cuping hidung</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">CIRCULATION</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Akral</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Hangat</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Tensi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">160 mmHg / 90 mmHg</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold ml-8">Nadi</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Frekuensi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">88 bpm</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Kekuatan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Kuat</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">CRT</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">{'< 2 detik'}</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">
                Riwayat kehilangan cairan dalam jumlah besar
              </label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Diare, Luka bakar</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Kelembaban kulit</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Lembab</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Tugor kulit</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Baik</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Luka bakar</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">20 %</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Perkusi jantung</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Ictus</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Auskultasi jantung</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Murmur</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold">DISABILITY</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block"></label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">AVPU</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Table striped celled compact>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell className="text-center">
                        Alert
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center">
                        Verbal
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center">
                        Pain
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center">
                        Unresponsive
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell className="text-center">+</Table.Cell>
                      <Table.Cell className="text-center">+</Table.Cell>
                      <Table.Cell className="text-center">-</Table.Cell>
                      <Table.Cell className="text-center">-</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">GCS</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">
                <Table striped celled compact>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell className="text-center">
                        Eyes
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center">
                        Verbal
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center">
                        Motorik
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center">
                        Kesadaran
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center">
                        Catatan
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell className="text-center">4</Table.Cell>
                      <Table.Cell className="text-center">5</Table.Cell>
                      <Table.Cell className="text-center">6</Table.Cell>
                      <Table.Cell className="text-center">
                        Compos Mentis
                      </Table.Cell>
                      <Table.Cell className="text-center">Lainnya</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold ml-8">Extermitas</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Sensorik</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Ya</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Motorik</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Ya</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold ml-8">Kekuatan otot</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Tangan kanan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">5 (Kekuatan kontraksi yang penuh)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Tangan kiri</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">5 (Kekuatan kontraksi yang penuh)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Kaki kanan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">5 (Kekuatan kontraksi yang penuh)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-16">Kaki kiri</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">5 (Kekuatan kontraksi yang penuh)</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pb-0">
            <Grid.Column>
              <label className="block font-bold">EXPOSURE</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Pendarahan</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Test</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Fraktur</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Test</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Parase</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Test</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="pb-0">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Plegi</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Test</label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width="4">
              <label className="block font-bold ml-8">Paraperesis</label>
            </Grid.Column>
            <Grid.Column>
              <label className="block">Test</label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
}
