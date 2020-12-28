import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import {
  Header,
  Divider,
  Table,
  Input,
  Button,
  Label,
  Checkbox,
  Message,
  Icon,
  Form,
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
      <Header className="mt-0">Anggrek</Header>
      <Divider />
      <Message info icon onDismiss={() => {}}>
        <Icon name="info circle" />
        <Message.Content>
          <Message.Header>Informasi</Message.Header>
          <Message.List>
            <Message.Item>
              Status Pemeriksaan Umum dan CPPT diperoleh dari Perawat / Bidan.
            </Message.Item>
            <Message.Item>
              Tanda <Icon name="check" color="black" /> (hitam) menunjukkan data
              diambil dari ruangan saat ini, sedangkan tanda{' '}
              <Icon name="check" color="red" /> (merah) menunjukkan data diambil
              dari ruangan sebelumnya.
            </Message.Item>
          </Message.List>
        </Message.Content>
      </Message>
      <Form className="inline-block">
        <Form.Group inline>
          <Form.Field>
            <label className="float-left mt-2.5">Status berdasarkan: </label>
            <Input placeholder="Tanggal" className="float-left" />
            <Button.Group basic className="ml-3">
              <Button active className="py-1.5 px-3">
                Pagi{' '}
                <Label className="ml-2" color="teal">
                  07:00 - 14:00
                </Label>
              </Button>
              <Button className="py-1.5 px-3">
                Siang{' '}
                <Label className="ml-2" color="teal">
                  07:00 - 21:00
                </Label>
              </Button>
              <Button className="py-1.5 px-3">
                Malam{' '}
                <Label className="ml-2" color="teal">
                  07:00 - 07:00
                </Label>
              </Button>
            </Button.Group>
            <Button
              className="ml-3"
              color="blue"
              content="Tampilkan"
              icon="search"
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Checkbox
        toggle
        label={<label className="font-semibold">Pasien Saya</label>}
      />
      {/* <TableContainer> */}
      <Table className="mt-4" celled striped selectable sortable compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              rowSpan="3"
              className="text-center hover:bg-gray-50 cursor-default py-2"
            >
              #
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="3" className="text-center py-2">
              No. RM
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="3">Nama</Table.HeaderCell>
            <Table.HeaderCell rowSpan="3" className="text-center py-2">
              Kelas
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="3" className="py-2">
              DPJP
            </Table.HeaderCell>
            <Table.HeaderCell
              colSpan="6"
              className="text-center hover:bg-gray-50 cursor-default py-2"
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              rowSpan="3"
              sorted="ascending"
              className="text-center py-2"
            >
              Tanggal
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="3" className="text-center py-2">
              Penjamin
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="3" className="py-2">
              Alamat
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              colSpan="2"
              className="hover:bg-gray-50 cursor-default text-center py-2"
            >
              Medis
            </Table.HeaderCell>
            <Table.HeaderCell
              colSpan="4"
              className="hover:bg-gray-50 cursor-default text-center py-2"
            >
              Perawat / Bidan
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell className="hover:bg-gray-50 cursor-default text-center py-2">
              A
            </Table.HeaderCell>
            <Table.HeaderCell className="hover:bg-gray-50 cursor-default text-center py-2">
              CPPT
            </Table.HeaderCell>
            <Table.HeaderCell className="hover:bg-gray-50 cursor-default text-center py-2">
              A
            </Table.HeaderCell>
            <Table.HeaderCell className="hover:bg-gray-50 cursor-default text-center py-2">
              PU
            </Table.HeaderCell>
            <Table.HeaderCell className="hover:bg-gray-50 cursor-default text-center py-2">
              PF
            </Table.HeaderCell>
            <Table.HeaderCell className="hover:bg-gray-50 cursor-default text-center py-2">
              CPPT
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...Array(8)].map((i, idx) => (
            <Table.Row
              key={idx}
              className="cursor-pointer"
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
      {/* </TableContainer> */}
    </Fragment>
  );
}
