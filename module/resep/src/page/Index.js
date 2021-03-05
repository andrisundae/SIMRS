import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function Index() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button icon="plus" content="Tambah" color="blue" />
          <Button icon="copy" content="Salin" color="blue" />
        </div>
      </FooterActionsContainer>
      <Header className="mt-0">
        <Icon name="list alternate outline" className="text-lg -mt-4" />
        <Header.Content>Resep</Header.Content>
      </Header>
      <Divider />
      <TableContainer maxHeight="35%">
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
            <Table.Row>
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
                  onClick={() => {}}
                >
                  <Table.Cell className="text-center w-40">
                    ER20100317{i}
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">
                    FARMASI RJ
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">
                    14/10/2020 07:26
                  </Table.Cell>
                  <Table.Cell className="text-center w-48">TERATAI</Table.Cell>
                  <Table.Cell className="text-center w-20">3</Table.Cell>
                  <Table.Cell className="w-96">
                    PRAVIKO RAHMADHO, dr.
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">DIPENUHI</Table.Cell>
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
      <div className="flex mt-5">
        <div className="w-3/6 float-left pr-2">
          <label className="block font-bold">Detail E-Resep</label>
          <label className="block mb-2">
            (ER201003178 / 14-10-2020 07:26 / PRAVIKO RAHMADHO, dr. )
          </label>
          <TableContainer maxHeightMinus="80">
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
        <div className="w-3/6 float-right pl-2">
          <label className="block font-bold">Detail Pemenuhan</label>
          <label className="block mb-2">
            (S201003562 / 14-10-2020 07:32 / SRI UTAMI )
          </label>
          <TableContainer maxHeightMinus="80">
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
                    Catatan E-Resep
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
                      <Table.Cell className="w-96">
                        SEDIAAN TIDAK MENCUKUPI
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Fragment>
  );
}
