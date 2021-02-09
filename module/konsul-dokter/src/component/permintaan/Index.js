import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function Index() {
  const location = useLocation();

  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button
            as={Link}
            color="blue"
            to={`${location.pathname}/add`}
            size="small"
          >
            <Icon name="plus" />
            Tambah
          </Button>
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="tasks" className="text-lg -mt-4" />
        <Header.Content>
          Kerjasama Medis
          <label className="mx-2">&bull;</label>
          Konsul Dokter
        </Header.Content>
      </Header>
      <Divider />
      <TableContainer>
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block sticky top-0 z-10 border-b-2 min-w-max">
            <Table.Row>
              <Table.HeaderCell>Tempat Layanan</Table.HeaderCell>
              <Table.HeaderCell>Kelas</Table.HeaderCell>
              <Table.HeaderCell>Tanggal</Table.HeaderCell>
              <Table.HeaderCell>Petugas</Table.HeaderCell>
              <Table.HeaderCell>Asal Konsul</Table.HeaderCell>
              <Table.HeaderCell>Tujuan Konsul</Table.HeaderCell>
              <Table.HeaderCell>Status Hasil</Table.HeaderCell>
              <Table.HeaderCell>Tanggal Hapus</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max"></Table.Body>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
