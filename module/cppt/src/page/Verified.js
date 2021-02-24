import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Form,
  Button,
  Modal,
  Header,
  Segment,
  Grid,
  Checkbox,
  Table,
} from 'semantic-ui-react';
import _ from 'lodash';

export default function Verified() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="check square outline" className="mr-4" /> CPPT yang sudah
        diverifikasi
      </Modal.Header>
      <Modal.Content scrolling>
        <div>
          <Icon
            name="caret left"
            color="blue"
            className="cursor-pointer fixed z-10 top-2/4 left-0 text-5xl m-0 p-0 bg-gray-300"
            onClick={() => alert('Previous Page')}
          />
          <Icon
            name="caret right"
            color="blue"
            className="cursor-pointer fixed z-10 top-2/4 right-0 text-5xl m-0 p-0 bg-gray-300"
            onClick={() => alert('Next Page')}
          />
        </div>
        <Segment className="block mt-0 sticky z-11 -top-6 shadow-md">
          <Grid columns="equal">
            <Grid.Row stretched>
              <Grid.Column width="3" className="font-bold">
                <div className="pb-3">VERIFIKASI</div>
                <div className="pb-3 pl-3">Tanggal</div>
                <div className="pl-3">Dokter Penanggung Jawab</div>
              </Grid.Column>
              <Grid.Column>
                <div className="pb-3">&nbsp;</div>
                <div className="pb-3">14/10/2020 07:54</div>
                <div>YUDHA MEIRIZA KARTIKA, dr., SpOG</div>
              </Grid.Column>
              <Grid.Column width="4" textAlign="center" verticalAlign="middle">
                <div>TTD</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {[...Array(3)].map((v, i) => {
          return (
            <Table key={i} celled compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="text-center w-16">
                    <Checkbox />
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan="2">
                    Tanggal & Nama Dokter
                    <label className="float-right">PPA</label>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell
                    rowSpan="3"
                    className="text-center border-r align-top"
                  >
                    <Icon
                      bordered
                      inverted
                      name="copy outline"
                      color="blue"
                      className="cursor-pointer"
                    />
                  </Table.Cell>
                  <Table.Cell className="w-6/12">
                    <label className="font-bold">Subjective Data</label>
                    <div className="mt-2">Isian Subjective</div>
                  </Table.Cell>
                  <Table.Cell className="w-6/12">
                    <label className="font-bold">Objective Data</label>
                    <div className="mt-2">Isian Objective</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <label className="font-bold">Diagnosis</label>
                    <div className="mt-2">
                      <Table celled compact>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell className="text-center w-24">
                              Status
                            </Table.HeaderCell>
                            <Table.HeaderCell>Kode - Nama</Table.HeaderCell>
                            <Table.HeaderCell className="text-center w-28">
                              Peringkat
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell className="text-center">
                              Akhir
                            </Table.Cell>
                            <Table.Cell>
                              O34.2 - MATERNAL CARE DUE TO UTEINE SCAR FROM
                              PREVIOUS SURGERY
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              Utama
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="align-top">
                    <label className="font-bold">Planning</label>
                    <div className="mt-2">Isian Objective</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <label className="font-bold">Instruction</label>
                    <div className="mt-2">Isian Subjective</div>
                  </Table.Cell>
                  <Table.Cell>
                    <label className="font-bold">Implementation</label>
                    <div className="mt-2">Isian Objective</div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          );
        })}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => history.goBack()}>
          <Icon name="undo" />
          Kembali
        </Button>
      </Modal.Actions>
    </Fragment>
  );
}
