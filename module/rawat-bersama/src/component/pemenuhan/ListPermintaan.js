import React, { Fragment, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import className from 'classname';
import { Segment, Table, Checkbox } from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function Index() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <Segment compact className="p-2.5">
        <Checkbox label="Tampilkan permintaan saya" />
      </Segment>
      <TableContainer maxHeightMinus="100">
        <Table
          striped
          celled
          size="small"
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block sticky top-0 z-10 border-b-2 min-w-max">
            <Table.Row>
              <Table.HeaderCell className="w-52 text-center sticky left-0 z-10">
                Tempat Layanan
              </Table.HeaderCell>
              <Table.HeaderCell className="w-28 text-center sticky left-52 z-10 border-r-2">
                Kelas
              </Table.HeaderCell>
              <Table.HeaderCell className="w-40 text-center">
                Tanggal MRS
              </Table.HeaderCell>
              <Table.HeaderCell className="w-40 text-center">
                No RM
              </Table.HeaderCell>
              <Table.HeaderCell className="w-96">Nama Pasien</Table.HeaderCell>
              <Table.HeaderCell className="w-96">DPJP</Table.HeaderCell>
              <Table.HeaderCell className="w-96">
                Kerjasama Antar Medis
              </Table.HeaderCell>
              <Table.HeaderCell className="w-40 text-center">
                Tanggal Permintaan
              </Table.HeaderCell>
              <Table.HeaderCell className="w-96">Petugas</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            <Table.Row>
              <Table.Cell className="w-52 text-center sticky left-0 z-10">
                ANGGREK
              </Table.Cell>
              <Table.Cell className="w-28 text-center sticky left-52 z-10 border-r-2">
                2
              </Table.Cell>
              <Table.Cell className="w-40 text-center text-yellow-500">
                14/10/2020 22:59
              </Table.Cell>
              <Table.Cell className="w-40 text-center">20125091</Table.Cell>
              <Table.Cell className="w-96">MULYATI, NY</Table.Cell>
              <Table.Cell className="w-96">
                LINDA FDPH, dr., Biomed., SpPD
              </Table.Cell>
              <Table.Cell className="w-96">
                SUDJATMOKO, dr., SpB <br />
                BAMBANG RESPATI, dr., SpKJ
              </Table.Cell>
              <Table.Cell className="w-40 text-center text-yellow-500">
                08/02/2021 14:30
              </Table.Cell>
              <Table.Cell className="w-96">Administrator LINKAR</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableContainer>
      <div className="border-2 -mt-1 p-3 left-10 font-bold bg-gray-100">
        1 dari total rawat bersama 1
      </div>
    </Fragment>
  );
}
