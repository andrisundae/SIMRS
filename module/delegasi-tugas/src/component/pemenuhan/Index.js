import React, { Fragment, useState } from 'react';
import className from 'classname';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import { Table, Button, Modal, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <TopMenu
        title="Antrian Delegasi Tugas"
        leftMenus={[{ text: 'Menu Utama', icon: 'chevron left', to: '/main' }]}
      />
      <MainContent>
        <div className="m-5">
          <TableContainer maxHeightMinus="100">
            <Table
              striped
              celled
              size="small"
              className="border-separate border-0 table-fixed"
            >
              <Table.Header className="block sticky top-0 z-10 border-b-2 min-w-max">
                <Table.Row>
                  <Table.HeaderCell className="w-80 sticky left-0 z-10 border-r-2">
                    Dokter
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-48 text-center">
                    Tempat Layanan
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-28 text-center">
                    Kelas
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-40 text-center">
                    Tanggal MRS
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-40 text-center">
                    No RM
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">
                    Nama Pasien
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">DPJP</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="block min-w-max">
                <Table.Row
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  <Table.Cell className="w-80 sticky left-0 z-10 border-r-2">
                    SUDJATMOKO, dr., SpB
                  </Table.Cell>
                  <Table.Cell className="w-48 text-center">ANGGREK</Table.Cell>
                  <Table.Cell className="w-28 text-center">2</Table.Cell>
                  <Table.Cell className="w-40 text-center">
                    14/10/2020 22:59
                  </Table.Cell>
                  <Table.Cell className="w-40 text-center">20125091</Table.Cell>
                  <Table.Cell className="w-96">MULYATI, NY</Table.Cell>
                  <Table.Cell className="w-96">
                    LINDA FDPH, dr., Biomed., SpPD
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </TableContainer>
          <div className="border-2 -mt-1 p-3 left-10 font-bold bg-gray-100">
            Jumlah Data 1
          </div>
        </div>

        <Modal
          closeIcon
          closeOnDimmerClick={false}
          centered={false}
          size="large"
          open={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
        >
          <Modal.Header className="text-xl">
            Konfirmasi Pendelegasian Tugas
          </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row className="pb-0">
                <Grid.Column>
                  Anda setuju menerima pendelegasian tugas untuk pasien ini?
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  No RM
                </Grid.Column>
                <Grid.Column>20125091</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  Nama Pasien / JK
                </Grid.Column>
                <Grid.Column>MULYATI, NY / P</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  Umur
                </Grid.Column>
                <Grid.Column>39 Tahun, 2 Bulan, 1 Hari</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  Dirawat di ruang / Kelas
                </Grid.Column>
                <Grid.Column>ANGGREK / 2</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  DPJP
                </Grid.Column>
                <Grid.Column>LINDA FDPH, dr., Biomed., SpPD</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  Pendelegasian ini diberikan mulai
                </Grid.Column>
                <Grid.Column>10/02/2020 - Sampai KRS</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column width="4" className="font-bold">
                  Alasan
                </Grid.Column>
                <Grid.Column>Tidak diisi</Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button icon="check" color="green" content="Ya" />
            <Button icon="trash" color="red" content="Tidak" />
            <Button
              icon="times"
              content="Batal"
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
          </Modal.Actions>
        </Modal>
      </MainContent>
    </Fragment>
  );
}
