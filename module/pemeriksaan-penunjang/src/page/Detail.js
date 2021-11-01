import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import {
  Header,
  Divider,
  Icon,
  Table,
  Button,
  Grid,
  Segment,
  Modal,
} from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';

export default function Detail({ readOnly = false }) {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(history.location.search);
  const kodePenunjang = query.get('kode');

  function renderPemeriksaan() {
    switch (kodePenunjang) {
      case 'PK':
        return (
          <Table celled compact size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Layanan</Table.HeaderCell>
                <Table.HeaderCell>Pemeriksaan</Table.HeaderCell>
                <Table.HeaderCell>Hasil</Table.HeaderCell>
                <Table.HeaderCell>Satuan</Table.HeaderCell>
                <Table.HeaderCell>Batas Normal</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        );

      case 'RAD':
      case 'PA':
      case 'OK':
        return (
          <Table celled compact size="small">
            <Table.Body>
              <Table.Row className="bg-white">
                <Table.Cell
                  rowSpan="2"
                  width="1"
                  className="text-center border-r align-top pt-3"
                >
                  <Icon
                    className="cursor-pointer"
                    bordered
                    inverted
                    name="file image outline"
                    color="blue"
                  />
                </Table.Cell>
                <Table.Cell colSpan="2" className="p-3">
                  <label className="font-bold">
                    Nama Tindakan {kodePenunjang}
                  </label>
                  <label className="float-right">Tidak ada file</label>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white">
                {false === readOnly && (
                  <Table.Cell width="1" className="text-center align-top pt-3">
                    <Icon
                      className="cursor-pointer"
                      bordered
                      inverted
                      name="edit"
                      color="blue"
                    />
                  </Table.Cell>
                )}
                <Table.Cell
                  colSpan={false === readOnly ? 1 : 2}
                  className={className('p-3', {
                    'px-8': true === readOnly,
                  })}
                >
                  <label>16/12/2020 21:51</label> ~ Nama Dokter
                  <Divider className="my-2" />
                  <div>
                    {'OK' === kodePenunjang ? (
                      <Fragment>
                        <div className="font-bold mb-1">Laporan Operasi</div>
                        <div>Hasil Laporan Operasi</div>

                        <div className="font-bold mb-1 mt-5">
                          Instruksi Pasca Operasi
                        </div>
                        <div>Isian Instruksi Pasca Operasi</div>
                      </Fragment>
                    ) : (
                      'Hasil ' + kodePenunjang
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        );

      default:
        return null;
    }
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="file alternate outline" className="mr-4" /> Detail Penunjang
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Segment>
                <label className="font-bold">PERMINTAAN</label>
                <Table celled compact size="small">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="4" className="font-bold">
                        Tanggal
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="font-bold">Perujuk</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="font-bold">Pengentri</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <label className="font-bold">PEMENUHAN</label>
                <Table celled compact size="small">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="5" className="font-bold">
                        Tanggal
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="font-bold">Pelaksana</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="font-bold">Pengentri</Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="font-bold">
                        Penanggung Jawab
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Header dividing className="text-lg mt-1">
          <Icon
            name="file alternate outline"
            className="text-lg mr-0 -mt-3.5"
          />{' '}
          Diagnosis
        </Header>
        <Table celled compact size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tanggal</Table.HeaderCell>
              <Table.HeaderCell>Pelaksana</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Kode - Nama</Table.HeaderCell>
              <Table.HeaderCell>Peringkat</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Header dividing className="text-lg mt-1">
          <Icon
            name="file alternate outline"
            className="text-lg mr-0 -mt-3.5"
          />{' '}
          Pemeriksaan
        </Header>
        {renderPemeriksaan()}
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon="undo"
          content="Kembali"
          onClick={() => history.goBack()}
        />
      </Modal.Actions>
    </Fragment>
  );
}
