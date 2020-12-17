import React, { Fragment } from 'react';
import { Segment, Header, Divider, Table, Icon, List } from 'semantic-ui-react';

export default function DetailPenunjang() {
  return (
    <Fragment>
      <Header as="h5" className="mt-0">
        <Icon name="file alternate outline" className="text-base -mt-3" />
        PEMERIKSAAN PENUNJANG
      </Header>
      <Divider />
      <Segment inverted color="blue" className="-mt-1 tracking-wider">
        Hasil telah dipublikasi oleh{' '}
        <span
          className="font-bold"
          style={{ textShadow: 'rgb(0, 0, 0) 2px 1px' }}
        >
          TRI YULIA KURNIASARI, A.Md.A.K.{' '}
        </span>
        pada tanggal{' '}
        <span
          className="font-bold"
          style={{ textShadow: 'rgb(0, 0, 0) 2px 1px' }}
        >
          17/12/2020 08:01
        </span>
      </Segment>
      <Table basic="very" size="small" compact className="pl-4 -mt-1">
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
      <Header as="h5" className="mt-0">
        <Icon name="list alternate outline" className="text-base -mt-3" />
        DAFTAR PEMERIKSAAN
      </Header>
      <Divider />
    </Fragment>
  );
}
