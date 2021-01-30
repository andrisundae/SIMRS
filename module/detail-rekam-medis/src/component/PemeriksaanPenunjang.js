import React, { Fragment } from 'react';
import { Message, Header, Divider, Table, Icon } from 'semantic-ui-react';

export default function PemeriksaanPenunjang() {
  return (
    <Fragment>
      <Header className="mt-0">
        <Icon name="file alternate outline" className="text-lg -mt-4" />
        Pemeriksaan Penunjang
      </Header>
      <Divider />
      <Message info icon>
        <Icon name="info circle" />
        <Message.Content>
          <Message.Header>Informasi</Message.Header>
          Hasil telah dipublikasikan oleh{' '}
          <strong>TRI YULIA KURNIASARI, A.Md.A.K. </strong>
          pada tanggal <strong>17/12/2020 08:01</strong>
        </Message.Content>
      </Message>
      <Table basic="very" compact className="pl-4 -mt-3">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="border-t-0 border-b font-black" width="3">
              Tanggal
            </Table.Cell>
            <Table.Cell className="border-t-0 border-b">
              17/12/2020 00:27
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="border-t-0 border-b font-black">
              Perujuk
            </Table.Cell>
            <Table.Cell className="border-t-0 border-b">
              ARIES SUBIANTO, dr., SpP
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="border-t-0 font-black">
              Tempat Layanan Asal
            </Table.Cell>
            <Table.Cell className="border-t-0">
              R. TRANSIT ISOLASI COVID-19
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Header size="small">
        <Icon name="list alternate outline" className="text-base -mt-3" />
        Daftar Pemeriksaan
      </Header>
      <Divider />
    </Fragment>
  );
}
