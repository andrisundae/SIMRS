import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { Segment, Header, Divider, Table } from 'semantic-ui-react';
import TableContainer from './TableContainer';

export default function DetailPenunjang() {
  const history = useHistory();

  const dumpDataPenunjang = [
    1,
    '18019835',
    'EVA HESMI EMIAWATI, SDRI',
    'R. TRANSIT ISOLASI COVID-19',
    '17/12/2020 00:27',
    '17/12/2020 01:27',
    '',
    '17/12/2020 01:30',
  ];

  return (
    <Fragment>
      <Header as="h4">LAB. PK</Header>
      <Divider />
      <Segment className="m-0 -mb-0.5 bg-gray-100 font-bold">
        DAFTAR PASIEN
        {/* <Icon link name="sync alternate" className="float-right" /> */}
      </Segment>
      <TableContainer>
        <Table className="mt-0 table-fixed" celled striped selectable sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">No.</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">No. RM</Table.HeaderCell>
              <Table.HeaderCell>Nama Pasien</Table.HeaderCell>
              <Table.HeaderCell>Asal</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Permintaan</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Isi Hasil</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Interpretasi
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Publikasi</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {[...Array(3)].map((i, idx) => (
              <Table.Row
                key={idx}
                onClick={() => history.push('/detail-rekam-medis/penunjang')}
              >
                {[...Array(8)].map((ic, idxc) => (
                  <Table.Cell key={idxc}>
                    {idx !== 0 ? 'Etc.' : dumpDataPenunjang[idxc]}
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
