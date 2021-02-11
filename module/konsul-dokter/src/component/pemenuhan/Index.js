import React, { Fragment, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import className from 'classname';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import { Header, Divider, Icon, Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function Index() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <TopMenu
        title="Antrian Konsul"
        leftMenus={[{ text: 'Menu Utama', icon: 'chevron left', to: '/main' }]}
      />
      <MainContent>
        <div className="m-5">
          <TableContainer maxHeightMinus="100">
            <Table
              striped
              celled
              className="border-separate border-0 table-fixed"
            >
              <Table.Header className="block sticky top-0 z-10 border-b-2 min-w-max">
                <Table.Row>
                  <Table.HeaderCell className="w-28 text-center">
                    Perintah
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">
                    Tujuan Konsul
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">
                    Asal Konsul
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-80 text-center">
                    Tempat Layanan
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-40 text-center">
                    No RM
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">
                    Nama Pasien
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-40 text-center">
                    Tanggal Hasil
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="block min-w-max">
                <Table.Row>
                  <Table.Cell className="w-28 text-center">
                    <Button
                      as={Link}
                      to={`${location.pathname}/isi-hasil`}
                      icon="reply"
                      size="mini"
                      color="blue"
                    />
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    PUJI KURNIAWAN, dr., SpTHT-KL
                  </Table.Cell>
                  <Table.Cell className="w-96">ANDREAGO, dr.</Table.Cell>
                  <Table.Cell className="w-80 text-center">IGD</Table.Cell>
                  <Table.Cell className="w-40 text-center">19116067</Table.Cell>
                  <Table.Cell className="w-96">
                    BERNADA RURIT VERONI, NY
                  </Table.Cell>
                  <Table.Cell className="w-40 text-center">
                    23/05/2019 14:21
                  </Table.Cell>
                </Table.Row>
                <Table.Row
                  className="cursor-pointer"
                  onClick={() =>
                    history.push(`${location.pathname}/hasil-konsul`)
                  }
                >
                  <Table.Cell className="w-28 text-center"></Table.Cell>
                  <Table.Cell className="w-96 font-bold text-blue-600">
                    PUJI KURNIAWAN, dr., SpTHT-KL
                  </Table.Cell>
                  <Table.Cell className="w-96">ANDREAGO, dr.</Table.Cell>
                  <Table.Cell className="w-80 text-center">IGD</Table.Cell>
                  <Table.Cell className="w-40 text-center">19116067</Table.Cell>
                  <Table.Cell className="w-96">
                    BERNADA RURIT VERONI, NY
                  </Table.Cell>
                  <Table.Cell className="w-40 text-center">
                    23/05/2019 14:21
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </TableContainer>
          <div className="border-2 -mt-1 p-3 left-10 font-bold bg-gray-100">
            1 dari total konsul 1
          </div>
        </div>
      </MainContent>
    </Fragment>
  );
}
