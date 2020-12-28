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
      <Header className="mt-0">Lab. PK</Header>
      <Divider />
      {/* <TableContainer> */}
      <Table className="mt-4" celled striped selectable sortable compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              textAlign="center"
              className="py-2 hover:bg-gray-50 cursor-default"
            >
              #
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" className="py-2">
              No. RM
            </Table.HeaderCell>
            <Table.HeaderCell className="py-2">Nama Pasien</Table.HeaderCell>
            <Table.HeaderCell className="py-2">Asal</Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              className="py-2"
              sorted="ascending"
            >
              Permintaan
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" className="py-2">
              Isi Hasil
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" className="py-2">
              Interpretasi
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" className="py-2">
              Publikasi
            </Table.HeaderCell>
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
      {/* </TableContainer> */}
    </Fragment>
  );
}
