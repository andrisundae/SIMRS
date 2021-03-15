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
  Select,
} from 'semantic-ui-react';
import _ from 'lodash';

export default function Rangkaian() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="linkify" className="mr-4" /> Rangkaian CPPT
      </Modal.Header>
      <Modal.Content scrolling>
        <Segment className="block mt-0 sticky z-11 -top-6 shadow-md">
          <Select
            options={[
              { key: 0, text: '-- Fiter PPA --', value: 'pilih' },
              { key: 1, text: 'Medis', value: 'Medis' },
              { key: 2, text: 'Paramedis', value: 'Paramedis' },
              { key: 3, text: 'Nutrisionis', value: 'Nutrisionis' },
              { key: 4, text: 'Bidan', value: 'Bidan' },
              { key: 5, text: 'Fisioterapis', value: 'Fisioterapis' },
              { key: 6, text: 'Apoteker', value: 'Apoteker' },
            ]}
            defaultValue="pilih"
          />
        </Segment>
        {[...Array(5)].map((v, i) => {
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
