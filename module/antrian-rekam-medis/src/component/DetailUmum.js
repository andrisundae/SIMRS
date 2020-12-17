import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import {
  Segment,
  Header,
  Divider,
  Table,
  Input,
  Button,
  Label,
  Checkbox,
} from 'semantic-ui-react';
import TableContainer from './TableContainer';

export default function DetailUmum() {
  const history = useHistory();

  const dumpDataUmum = [
    1,
    '18068204',
    'SUWARMAN, TN',
    '3',
    'ALFIYANNUL AKHSAN, dr., SpB (K) Onk',
    0,
    0,
    1,
    1,
    1,
    1,
    '15/12/2020 11:32',
    'BPJS MANDIRI',
    'Nogosari, NOGOSARI',
  ];

  return (
    <Fragment>
      <Header as="h4">R. PAJAJARAN</Header>
      <Divider />
      <Segment inverted color="blue">
        Info
      </Segment>
      <Divider />
      <Segment secondary>Info Checkbox Color</Segment>
      <Input placeholder="Tanggal" />
      <Button.Group basic className="ml-4">
        <Button active className="py-1.5 px-3">
          Pagi{' '}
          <Label className="ml-4" color="teal">
            07:00 - 14:00
          </Label>
        </Button>
        <Button className="py-1.5 px-3">
          Siang{' '}
          <Label className="ml-4" color="teal">
            07:00 - 21:00
          </Label>
        </Button>
        <Button className="py-1.5 px-3">
          Malam{' '}
          <Label className="ml-4" color="teal">
            07:00 - 07:00
          </Label>
        </Button>
      </Button.Group>
      <Button
        className="ml-4"
        color="blue"
        content="Tampilkan"
        icon="search"
        labelPosition="left"
      />
      <Divider />
      <Segment compact>
        <Checkbox label="Tampilkan Antrian Saya" />
      </Segment>
      <Segment className="m-0 -mb-0.5 bg-gray-100 font-bold">
        DAFTAR PASIEN
        {/* <Icon link name="sync alternate" className="float-right" /> */}
      </Segment>
      <TableContainer>
        <Table className="mt-0 table-fixed" celled striped selectable sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                rowSpan="3"
                sorted="ascending"
                className="text-center"
              >
                No.
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3" className="text-center">
                No. RM
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3">Pasien</Table.HeaderCell>
              <Table.HeaderCell rowSpan="3" className="text-center">
                Kelas
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3">DPJP</Table.HeaderCell>
              <Table.HeaderCell colSpan="6" className="text-center">
                Status
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3" className="text-center">
                Tanggal
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3" className="text-center">
                Penjamin
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3">Alamat</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Medis</Table.HeaderCell>
              <Table.HeaderCell colSpan="4">Perawat / Bidan</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>A</Table.HeaderCell>
              <Table.HeaderCell>CPPT</Table.HeaderCell>
              <Table.HeaderCell>A</Table.HeaderCell>
              <Table.HeaderCell>PU</Table.HeaderCell>
              <Table.HeaderCell>PF</Table.HeaderCell>
              <Table.HeaderCell>CPPT</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {[...Array(8)].map((i, idx) => (
              <Table.Row
                key={idx}
                onClick={() => history.push('/detail-rekam-medis/umum')}
              >
                {[...Array(14)].map((ic, idxc) => (
                  <Table.Cell key={idxc}>
                    {idx !== 0 ? 'Etc.' : dumpDataUmum[idxc]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
