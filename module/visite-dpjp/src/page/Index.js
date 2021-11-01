import React, { Fragment, useState } from 'react';
import className from 'classname';
import TopMenu from '@simrs/rekam-medis/src/component/TopMenu';
import MainContent from '@simrs/rekam-medis/src/component/MainContent';
import { Table, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';

export default function Index() {
  const [tmpData, setTmpData] = useState([...Array(10)]);

  return (
    <Fragment>
      <TopMenu
        title="Antrian Visite"
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
                  <Table.HeaderCell className="w-80 sticky left-0 z-10">
                    Dokter
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-48 text-center sticky left-80 z-10 border-r-2">
                    Tempat Layanan
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-28 text-center">
                    Kelas
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-40 text-center">
                    Tanggal
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-40 text-center">
                    No RM
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">Pasien</Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-24">
                    A
                  </Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-24">
                    PF
                  </Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-24">
                    CPPT
                  </Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-24">
                    AAM
                  </Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-24">
                    RPP
                  </Table.HeaderCell>
                  <Table.HeaderCell className="w-96">
                    DPJP Sebelumnya
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="block min-w-max">
                {tmpData.map((v, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="cursor-pointer"
                      onClick={() => {
                        alert('Ke Detail Kunjungan');
                      }}
                    >
                      <Table.Cell className="w-80 sticky left-0 z-9">
                        SUDJATMOKO, dr., SpB
                      </Table.Cell>
                      <Table.Cell className="w-48 text-center sticky left-80 z-9 border-r-2">
                        ANGGREK
                      </Table.Cell>
                      <Table.Cell className="w-28 text-center">2</Table.Cell>
                      <Table.Cell className="w-40 text-center">
                        14/10/2020 22:59
                      </Table.Cell>
                      <Table.Cell className="w-40 text-center">
                        20125091
                      </Table.Cell>
                      <Table.Cell className="w-96">MULYATI, NY</Table.Cell>
                      <Table.Cell className="text-center w-24">
                        <Icon name="check" />
                      </Table.Cell>
                      <Table.Cell className="text-center w-24"></Table.Cell>
                      <Table.Cell className="text-center w-24"></Table.Cell>
                      <Table.Cell className="text-center w-24"></Table.Cell>
                      <Table.Cell className="text-center w-24"></Table.Cell>
                      <Table.Cell className="w-96">
                        LINDA FDPH, dr., Biomed., SpPD
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </TableContainer>
          <div className="border-2 -mt-1 p-3 left-10 font-bold bg-gray-100">
            {tmpData.length} dari total visite {tmpData.length}
          </div>
        </div>
      </MainContent>
    </Fragment>
  );
}
