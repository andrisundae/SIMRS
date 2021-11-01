import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
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
  Input,
  TextArea,
} from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';

export default function Copy() {
  const history = useHistory();
  const maxHeight = window.innerHeight > 768 ? 280 : 200;

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="sticky note outline" className="mr-4" /> Data Resep
      </Modal.Header>
      <Modal.Content scrolling>
        <TableContainer maxHeight={maxHeight}>
          <Table
            striped
            celled
            compact
            className="border-separate border-0 table-fixed"
          >
            <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
              <Table.Row>
                <Table.HeaderCell className="text-center w-20">
                  #
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-40">
                  No. E-Resep
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-40">
                  Unit Farmasi
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-40">
                  Tanggal
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-48">
                  Tempat Layanan
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-20">
                  Kelas
                </Table.HeaderCell>
                <Table.HeaderCell className="w-96">Dokter</Table.HeaderCell>
                <Table.HeaderCell className="text-center w-40">
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-40">
                  Catatan
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-40">
                  Cito
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-40">
                  Segera KRS
                </Table.HeaderCell>
                <Table.HeaderCell className="w-96">
                  Personel Input
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="block min-w-max">
              {[...Array(20)].map((v, i) => {
                return (
                  <Table.Row
                    key={i}
                    className="cursor-pointer"
                    onClick={() => alert('Show Detail Resep')}
                  >
                    <Table.Cell className="text-center w-20">
                      <Button
                        icon="copy outline"
                        color="blue"
                        size="mini"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          alert('Goto Add with Copy Resep');
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell className="text-center w-40">
                      ER20100317{i}
                    </Table.Cell>
                    <Table.Cell className="text-center w-40">
                      FARMASI RJ
                    </Table.Cell>
                    <Table.Cell className="text-center w-40">
                      14/10/2020 07:26
                    </Table.Cell>
                    <Table.Cell className="text-center w-48">
                      TERATAI
                    </Table.Cell>
                    <Table.Cell className="text-center w-20">3</Table.Cell>
                    <Table.Cell className="w-96">
                      PRAVIKO RAHMADHO, dr.
                    </Table.Cell>
                    <Table.Cell className="text-center w-40">
                      DIPENUHI
                    </Table.Cell>
                    <Table.Cell className="text-center w-40"></Table.Cell>
                    <Table.Cell className="text-center w-40">TIDAK</Table.Cell>
                    <Table.Cell className="text-center w-40">TIDAK</Table.Cell>
                    <Table.Cell className="w-96">
                      PRAVIKO RAHMADHO, dr.
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </TableContainer>
        <div className="mt-5">
          <label className="block font-bold">Detail E-Resep</label>
          <TableContainer maxHeight={maxHeight}>
            <Table
              striped
              celled
              compact
              className="border-separate border-0 table-fixed"
            >
              <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
                <Table.Row>
                  <Table.HeaderCell className="w-100">Obat</Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-36">
                    Jumlah
                  </Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-36">
                    Satuan
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-80">Etiket</Table.HeaderCell>
                  <Table.HeaderCell className="w-96">
                    Aturan Makan
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">
                    Catatan Pesan
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="block min-w-max">
                {[...Array(20)].map((v, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell className="w-100">
                        Ondansentron larutan injeksi 2 mg / mL (ampul @ 2 mL)
                      </Table.Cell>
                      <Table.Cell className="text-center w-36">4.00</Table.Cell>
                      <Table.Cell className="text-center w-36">
                        ampul
                      </Table.Cell>
                      <Table.Cell className="w-80">3 x 1</Table.Cell>
                      <Table.Cell className="w-96"></Table.Cell>
                      <Table.Cell className="w-96"></Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </TableContainer>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button icon="undo" content="Batal" onClick={() => history.goBack()} />
        <Button icon="edit" content="Data Kosong" color="blue" />
      </Modal.Actions>
    </Fragment>
  );
}
