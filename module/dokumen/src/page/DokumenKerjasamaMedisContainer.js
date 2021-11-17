import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import {
  Segment,
  Header,
  Divider,
  Icon,
  Button,
  Table,
} from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';

export default function DokumenKerjasaMedisContainer() {
  const history = useHistory();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Fragment>
      <Header className="text-lg">Konsul</Header>
      <Divider />
      <TableContainer maxHeight="250">
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
            <Table.Row>
              <Table.HeaderCell className="text-center w-28">
                Perintah
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-48">
                Tempat Layanan
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-28">
                Kelas
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal
              </Table.HeaderCell>
              <Table.HeaderCell className="w-96">Asal</Table.HeaderCell>
              <Table.HeaderCell className="w-96">Tujuan</Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal Hapus
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            {[...Array(10)].map((v, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell className="text-center w-28">
                    <Icon
                      name="file alternate"
                      bordered
                      inverted
                      color="blue"
                      className="cursor-pointer"
                    />
                  </Table.Cell>
                  <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
                  <Table.Cell className="text-center w-28">3</Table.Cell>
                  <Table.Cell className="text-center w-40">
                    06/05/2020 14:14
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    AZIS ABDULLAH, dr., SpS
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    ARIES SUBIANTO, dr., SpP
                  </Table.Cell>
                  <Table.Cell className="text-center w-40"></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableContainer>

      <Header className="text-lg">Rawat Bersama</Header>
      <Divider />
      <TableContainer maxHeight="250">
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
            <Table.Row>
              <Table.HeaderCell className="text-center w-28">
                Perintah
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-48">
                Tempat Layanan
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-28">
                Kelas
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal
              </Table.HeaderCell>
              <Table.HeaderCell className="w-96">Asal</Table.HeaderCell>
              <Table.HeaderCell className="w-96">Tujuan</Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal Hapus
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            {[...Array(10)].map((v, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell className="text-center w-28">
                    <Icon
                      name="file alternate"
                      bordered
                      inverted
                      color="blue"
                      className="cursor-pointer"
                    />
                  </Table.Cell>
                  <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
                  <Table.Cell className="text-center w-28">3</Table.Cell>
                  <Table.Cell className="text-center w-40">
                    06/05/2020 14:14
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    AZIS ABDULLAH, dr., SpS
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    ARIES SUBIANTO, dr., SpP
                  </Table.Cell>
                  <Table.Cell className="text-center w-40"></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableContainer>

      <Header className="text-lg">Alih DPJP</Header>
      <Divider />
      <TableContainer maxHeight="250">
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
            <Table.Row>
              <Table.HeaderCell className="text-center w-28">
                Perintah
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-48">
                Tempat Layanan
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-28">
                Kelas
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal
              </Table.HeaderCell>
              <Table.HeaderCell className="w-96">Asal</Table.HeaderCell>
              <Table.HeaderCell className="w-96">Tujuan</Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal Hapus
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            {[...Array(10)].map((v, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell className="text-center w-28">
                    <Icon
                      name="file alternate"
                      bordered
                      inverted
                      color="blue"
                      className="cursor-pointer"
                    />
                  </Table.Cell>
                  <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
                  <Table.Cell className="text-center w-28">3</Table.Cell>
                  <Table.Cell className="text-center w-40">
                    06/05/2020 14:14
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    AZIS ABDULLAH, dr., SpS
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    ARIES SUBIANTO, dr., SpP
                  </Table.Cell>
                  <Table.Cell className="text-center w-40"></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableContainer>

      <Header className="text-lg">Delegasi Tugas</Header>
      <Divider />
    </Fragment>
  );
}
