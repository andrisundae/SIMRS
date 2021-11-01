import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';

export default function Index({
  tableContainer = true,
  tableFixed = true,
  tableHeaderFixed = true,
  headerLess = false,
  withOnLoad = false,
  withAdd = false,
  kodeKunjunganTL = '',
  columns = [
    'tempatLayanan',
    'kelas',
    'tglPermintaan',
    'petugas',
    'namaPenunjang',
    'tglIsiHasil',
    'tglInterpretasi',
  ],
  onRowClick = null,
}) {
  const history = useHistory();
  const location = useLocation();

  const Container = ({ children }) => {
    if (true === tableContainer) {
      return <TableContainer>{children}</TableContainer>;
    } else {
      return children;
    }
  };

  function handleAdd(kode = '') {
    const query = new URLSearchParams();
    query.append('kode', kode);

    history.push({
      pathname: location.pathname + '/add',
      search: query.toString(),
    });
  }

  function handleDetail(kode = '') {
    if ('/pemeriksaan-penunjang' === location.pathname) {
      const query = new URLSearchParams();
      query.append('kode', kode);

      history.push({
        pathname: location.pathname + '/detail',
        search: query.toString(),
      });
    } else {
      if (null !== onRowClick && onRowClick.constructor === Function) {
        onRowClick(kode);
      }
    }
  }

  return (
    <Fragment>
      {true === withAdd && (
        <FooterActionsContainer>
          <div className="m-1">
            <Button color="blue" size="small" onClick={() => handleAdd('PK')}>
              <Icon name="plus" />
              PK
            </Button>
            <Button
              className="ml-2"
              color="blue"
              size="small"
              onClick={() => handleAdd('RAD')}
            >
              <Icon name="plus" />
              RAD
            </Button>
            <Button
              className="ml-2"
              color="blue"
              size="small"
              onClick={() => handleAdd('OK')}
            >
              <Icon name="plus" />
              OK
            </Button>
            <Button
              className="ml-2"
              color="blue"
              size="small"
              onClick={() => handleAdd('PA')}
            >
              <Icon name="plus" />
              PA
            </Button>
          </div>
        </FooterActionsContainer>
      )}

      {false === headerLess && (
        <Fragment>
          <Header className="mt-0">
            <Icon name="file alternate outline" className="text-lg -mt-4" />
            <Header.Content>Pemeriksaan Penunjang</Header.Content>
          </Header>
          <Divider />
        </Fragment>
      )}
      <Container>
        <Table
          striped
          celled
          compact
          className={className('', {
            'border-separate border-0 table-fixed': true === tableFixed,
          })}
        >
          <Table.Header
            className={className('block min-w-max', {
              'sticky top-0 z-10 border-b-2': true === tableHeaderFixed,
            })}
          >
            <Table.Row>
              <Table.HeaderCell className="text-center w-48">
                Tempat Layanan
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-20">
                Kelas
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal Permintaan
              </Table.HeaderCell>
              <Table.HeaderCell className="w-96">Perujuk</Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Penunjang
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal Isi Hasil
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Tanggal Interpretasi
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            <Table.Row
              className="cursor-pointer"
              onClick={() => handleDetail('PK')}
            >
              <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
              <Table.Cell className="text-center w-20">3</Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 00:17
              </Table.Cell>
              <Table.Cell className="w-96">
                LINDA FDPH, dr., Biomed., SpPD
              </Table.Cell>
              <Table.Cell className="text-center w-40">LAB. PK</Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 07:27
              </Table.Cell>
              <Table.Cell className="text-center w-40"></Table.Cell>
            </Table.Row>
            <Table.Row
              className="cursor-pointer"
              onClick={() => handleDetail('RAD')}
            >
              <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
              <Table.Cell className="text-center w-20">3</Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 00:17
              </Table.Cell>
              <Table.Cell className="w-96">
                LINDA FDPH, dr., Biomed., SpPD
              </Table.Cell>
              <Table.Cell className="text-center w-40">RADIOLOGI</Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 07:27
              </Table.Cell>
              <Table.Cell className="text-center w-40"></Table.Cell>
            </Table.Row>
            <Table.Row
              className="cursor-pointer"
              onClick={() => handleDetail('OK')}
            >
              <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
              <Table.Cell className="text-center w-20">3</Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 00:17
              </Table.Cell>
              <Table.Cell className="w-96">
                LINDA FDPH, dr., Biomed., SpPD
              </Table.Cell>
              <Table.Cell className="text-center w-40">OK</Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 07:27
              </Table.Cell>
              <Table.Cell className="text-center w-40"></Table.Cell>
            </Table.Row>
            <Table.Row
              className="cursor-pointer"
              onClick={() => handleDetail('PA')}
            >
              <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
              <Table.Cell className="text-center w-20">3</Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 00:17
              </Table.Cell>
              <Table.Cell className="w-96">
                LINDA FDPH, dr., Biomed., SpPD
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Patologi Anatomi
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                14/10/2020 07:27
              </Table.Cell>
              <Table.Cell className="text-center w-40"></Table.Cell>
            </Table.Row>
            {[...Array(5)].map((v, i) => {
              return (
                <Table.Row
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  <Table.Cell className="text-center w-48">ANGGREK</Table.Cell>
                  <Table.Cell className="text-center w-20">3</Table.Cell>
                  <Table.Cell className="text-center w-40">
                    14/10/2020 00:17
                  </Table.Cell>
                  <Table.Cell className="w-96">
                    LINDA FDPH, dr., Biomed., SpPD
                  </Table.Cell>
                  <Table.Cell className="text-center w-40">-</Table.Cell>
                  <Table.Cell className="text-center w-40">
                    14/10/2020 07:27
                  </Table.Cell>
                  <Table.Cell className="text-center w-40"></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    </Fragment>
  );
}
