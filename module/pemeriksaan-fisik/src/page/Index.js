import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
} from 'semantic-ui-react';

import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

import AnamnesisAsal from './AnamnesisAsal';
import PemeriksaanFisikAsal from './PemeriksaanFisikAsal';
import PenunjangAsal from './PenunjangAsal';
import KUTTVAwal from './KUTTVAwal';

export default function Index() {
  const history = useHistory();

  const [isOpenModalTemplate, setIsOpenModalTemplate] = useState(false);
  const [kelompok, setKelompok] = useState('umum');

  const [isOpenAnamnesisAsal, setIsOpenAnamnesisAsal] = useState(false);
  const [isOpenPemeriksaanFisikAsal, setIsOpenPemeriksaanFisikAsal] = useState(
    false
  );
  const [isOpenPenunjangAsal, setIsOpenPenunjangAsal] = useState(false);
  const [isOpenKUTTVAwal, setIsOpenKUTTVAwal] = useState(false);

  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button
            color="blue"
            size="small"
            onClick={() => {
              setKelompok('anastesi');
              setIsOpenModalTemplate(!isOpenModalTemplate);
            }}
          >
            <Icon name="plus" />
            Anastesi
          </Button>
          <Button
            color="blue"
            className="ml-2"
            size="small"
            onClick={() => {
              setKelompok('bersalin');
              setIsOpenModalTemplate(!isOpenModalTemplate);
            }}
          >
            <Icon name="plus" />
            Bersalin
          </Button>
          <Button
            color="blue"
            className="ml-2"
            size="small"
            onClick={() => {
              setKelompok('bayi');
              setIsOpenModalTemplate(!isOpenModalTemplate);
            }}
          >
            <Icon name="plus" />
            Bayi
          </Button>
          <Button
            color="blue"
            className="ml-2"
            size="small"
            onClick={() => {
              setKelompok('umum');
              setIsOpenModalTemplate(!isOpenModalTemplate);
            }}
          >
            <Icon name="plus" />
            Umum
          </Button>
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="stethoscope" className="text-lg -mt-4" />
        Pemeriksaan Fisik
      </Header>
      <Divider />
      <Accordion fluid styled>
        <Accordion.Title
          className="text-white bg-green-900 border"
          active={isOpenAnamnesisAsal}
          onClick={() => setIsOpenAnamnesisAsal(!isOpenAnamnesisAsal)}
        >
          <Icon name="dropdown" />
          Anamnesis Asal (IGD / Rawat Jalan)
        </Accordion.Title>
        <Accordion.Content active={isOpenAnamnesisAsal}>
          <AnamnesisAsal />
        </Accordion.Content>

        <Accordion.Title
          className="text-white bg-green-800 border"
          active={isOpenPemeriksaanFisikAsal}
          onClick={() =>
            setIsOpenPemeriksaanFisikAsal(!isOpenPemeriksaanFisikAsal)
          }
        >
          <Icon name="dropdown" />
          PemeriksaanFisik Asal (IGD / Rawat Jalan)
        </Accordion.Title>
        <Accordion.Content active={isOpenPemeriksaanFisikAsal}>
          <PemeriksaanFisikAsal />
        </Accordion.Content>

        <Accordion.Title
          className="text-white bg-green-700 border"
          active={isOpenPenunjangAsal}
          onClick={() => setIsOpenPenunjangAsal(!isOpenPenunjangAsal)}
        >
          <Icon name="dropdown" />
          Pemeriksaan Penunjag Asal (IGD / Rawat Jalan)
        </Accordion.Title>
        <Accordion.Content active={isOpenPenunjangAsal}>
          <PenunjangAsal />
        </Accordion.Content>

        <Accordion.Title
          className="text-white bg-green-600 border"
          active={isOpenKUTTVAwal}
          onClick={() => setIsOpenKUTTVAwal(!isOpenKUTTVAwal)}
        >
          <Icon name="dropdown" />
          Keadaan Umum & TTV Awal
        </Accordion.Title>
        <Accordion.Content active={isOpenKUTTVAwal}>
          <KUTTVAwal />
        </Accordion.Content>
      </Accordion>
      <Header attached="top" block className="mt-5">
        Pemeriksaan Fisik
      </Header>
      <Segment attached>
        <TableContainer maxHeightMinus="75">
          <Table
            striped
            celled
            compact
            className="border-separate border-0 table-fixed"
          >
            <Table.Header className="block sticky top-0 z-10 border-b-2 min-w-max">
              <Table.Row>
                <Table.HeaderCell className="text-center py-2 w-12">
                  #
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center py-2 w-28">
                  Perintah
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center py-2 w-32">
                  Kelompok
                </Table.HeaderCell>
                <Table.HeaderCell className="py-2 w-80">
                  Tanggal & Pelaksana
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center py-2 w-40">
                  Anemia
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center py-2 w-40">
                  Icterus
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center py-2 w-40">
                  Cyanosis
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center py-2 w-40">
                  Dispneau
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="block min-w-max">
              <Table.Row>
                <Table.Cell
                  colSpan="10"
                  className="sticky top-11 z-10 bg-gray-100"
                >
                  <Label ribbon color="teal">
                    Anggrek • Kelas 3 • Kelompok Umum
                  </Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="text-center w-12">1</Table.Cell>
                <Table.Cell className="text-center w-28">
                  <Button
                    as={Link}
                    icon="folder open"
                    color="blue"
                    size="mini"
                    to="/detail"
                  />
                  <Button
                    icon="trash alternate"
                    color="red"
                    size="mini"
                    className="ml-2"
                  />
                </Table.Cell>
                <Table.Cell className="text-center w-32">Umum</Table.Cell>
                <Table.Cell className="w-80">
                  08/10/2020 09:18 • LINDA FDPH, dr., Biomed., SpPD
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="text-center w-12">2</Table.Cell>
                <Table.Cell className="text-center w-28">
                  <Button icon="folder open" color="blue" size="mini" />
                  <Button
                    icon="trash alternate"
                    color="red"
                    size="mini"
                    className="ml-2"
                  />
                </Table.Cell>
                <Table.Cell className="text-center w-32">Umum</Table.Cell>
                <Table.Cell className="w-80">
                  07/10/2020 13:34 • DINNA AGUSTINA, S.Kep, Ns.
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
                <Table.Cell className="text-center w-40">
                  - (Negatif)
                </Table.Cell>
              </Table.Row>
              {[...Array(7)].map((i, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell className="text-center w-12">
                    {idx + 3}
                  </Table.Cell>
                  <Table.Cell className="text-center w-28">
                    <Button icon="folder open" color="blue" size="mini" />
                    <Button
                      icon="trash alternate"
                      color="red"
                      size="mini"
                      className="ml-2"
                    />
                  </Table.Cell>
                  <Table.Cell className="text-center w-32">Umum</Table.Cell>
                  <Table.Cell className="w-80">
                    07/10/2020 13:34 • DINNA AGUSTINA, S.Kep, Ns.
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">
                    - (Negatif)
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">
                    - (Negatif)
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">
                    - (Negatif)
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">
                    - (Negatif)
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </TableContainer>
      </Segment>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="fullscreen"
        open={isOpenModalTemplate}
        onClose={() => setIsOpenModalTemplate(!isOpenModalTemplate)}
      >
        <Modal.Header className="text-xl">
          <Icon name="folder open" className="mr-4" /> Gunakan data yang ada /
          pilih data kosong
        </Modal.Header>
        <Modal.Content scrolling>
          <Table definition striped celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="w-44" />
                <Table.HeaderCell className="text-center">
                  Tempat Layanan
                </Table.HeaderCell>
                <Table.HeaderCell>Kelompok</Table.HeaderCell>
                <Table.HeaderCell className="text-center">
                  Tanggal & Pelaksana
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center">
                  Anemia
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center">
                  Icterus
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center">
                  Cyanosis
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center">
                  Dispneau
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="text-center">
                  <Button icon labelPosition="left" color="blue">
                    <Icon name="copy" />
                    Gunakan
                  </Button>
                </Table.Cell>
                <Table.Cell className="text-center">IGD</Table.Cell>
                <Table.Cell className="text-center">Umum</Table.Cell>
                <Table.Cell>
                  07/10/2020 10:24 • DWI WAHYUNI NOVITA ULFA, A.Md.Kep.
                </Table.Cell>
                <Table.Cell className="text-center">- (Negatif)</Table.Cell>
                <Table.Cell className="text-center">- (Negatif)</Table.Cell>
                <Table.Cell className="text-center">- (Negatif)</Table.Cell>
                <Table.Cell className="text-center">- (Negatif)</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsOpenModalTemplate(!isOpenModalTemplate)}>
            <Icon name="times" />
            Tutup
          </Button>
          <Button
            onClick={() => {
              history.push({
                pathname: '/add',
                search: `kelompok=${kelompok}`,
              });
            }}
          >
            <Icon name="pencil alternate" />
            Data Kosong
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
