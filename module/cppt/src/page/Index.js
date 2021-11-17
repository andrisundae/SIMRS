import React, { Fragment, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Header,
  Icon,
  Divider,
  Accordion,
  Segment,
  Table,
  Button,
  Label,
  Modal,
  Grid,
  Checkbox,
} from 'semantic-ui-react';

import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';

export default function Index() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button
            icon="plus"
            content="Tambah"
            color="blue"
            size="small"
            onClick={() => history.push('/cppt/add')}
          />
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="list" className="text-lg -mt-4" />
        CPPT
      </Header>
      <Divider />
      <Grid className="block mb-1 sticky -top-4 z-10 bg-white shadow-md">
        <Grid.Row columns="equal" className="py-2">
          <Grid.Column>
            <Segment compact className="p-2.5">
              <Checkbox label="CPPT saya" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Button
              icon="linkify"
              content="Rangkaian CPPT"
              color="blue"
              className="float-right"
              onClick={() => history.push('/cppt/rangkaian')}
            />
            <Button
              icon="check square outline"
              content="CPPT yang sudah diverifikasi"
              color="blue"
              className="float-right"
              onClick={() =>
                history.push({
                  pathname: '/cppt/verified',
                  search: 'page=1',
                })
              }
            />
            <Button
              icon="history"
              content="CPPT sebelumnya"
              color="blue"
              className="float-right"
              onClick={() => history.push('/cppt/previous')}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
                          <Table.Cell className="text-center">Akhir</Table.Cell>
                          <Table.Cell>
                            O34.2 - MATERNAL CARE DUE TO UTEINE SCAR FROM
                            PREVIOUS SURGERY
                          </Table.Cell>
                          <Table.Cell className="text-center">Utama</Table.Cell>
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
    </Fragment>
  );
}
