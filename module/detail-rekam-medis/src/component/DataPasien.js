import React, { Fragment, useState } from 'react';
import { Header, Divider, Table, Icon, List, Message } from 'semantic-ui-react';

export default function DataPasien() {
  const [list1, setList1] = useState(false);
  const [list2, setList2] = useState(false);

  function showChild(id) {
    switch (id) {
      case 1:
        setList1(!list1);
        break;

      case 2:
        setList2(!list2);
        break;

      default:
        break;
    }
  }

  return (
    <Fragment>
      <Header className="mt-0">
        <Icon name="user" className="text-lg -mt-4" />
        Data Pasien
      </Header>
      <Divider />
      <Message info icon>
        <Icon name="info circle" />
        <Message.Content>
          <Message.Header>Informasi</Message.Header>
          Data medis kunjungan ini terhubung dengan kunjungan di{' '}
          <strong>Blablabla</strong> tanggal <strong>17/12/2020 08:01</strong>
        </Message.Content>
      </Message>
      <Table basic="very" compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="border-t-0 border-b font-semibold" width="3">
              No. Rekam Medis
            </Table.Cell>
            <Table.Cell className="border-t-0 border-b font-semibold">
              20136359
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="border-t-0 border-b font-semibold">
              Nama
            </Table.Cell>
            <Table.Cell className="border-t-0 border-b">
              SITI NUR FADIYAH
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="border-t-0 font-semibold">
              Jenis Kelamin
            </Table.Cell>
            <Table.Cell className="border-t-0">P</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Header size="small">
        <Icon name="history" className="text-base -mt-3" />
        Riwayat Diagnosis 6 bulan terakhir
      </Header>
      <Divider />
      <Message info icon size="small" onDismiss={() => {}}>
        <Message.Content>
          <Message.List>
            <Message.Item>
              Jika ini adalah kunjungan Rawat Jalan, Riwayat Diagnosis yang
              ditampilkan hanya dari tempat layanan ini.
            </Message.Item>
            <Message.Item>
              Jika ini bukan kunjungan Rawat Jalan, Riwayat Diagnosis yang
              ditampilkan adalah dari semua jenis layanan.
            </Message.Item>
          </Message.List>
        </Message.Content>
      </Message>
      <Table striped celled compact size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="py-2">#</Table.HeaderCell>
            <Table.HeaderCell className="py-2">Tempat Layanan</Table.HeaderCell>
            <Table.HeaderCell className="text-center py-2">
              Tanggal MRS
            </Table.HeaderCell>
            <Table.HeaderCell className="text-center py-2">
              Peringkat
            </Table.HeaderCell>
            <Table.HeaderCell className="py-2">Diagnosis</Table.HeaderCell>
            <Table.HeaderCell className="py-2">Pelaksana</Table.HeaderCell>
            <Table.HeaderCell className="text-center py-2">
              Tanggal
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="font-semibold">1</Table.Cell>
            <Table.Cell>KULIT & KELAMIN</Table.Cell>
            <Table.Cell className="text-center">15/12/2020 10:07</Table.Cell>
            <Table.Cell className="text-center">Utama</Table.Cell>
            <Table.Cell>L20 - ATOPIC DERMATITIS</Table.Cell>
            <Table.Cell>IVONY NILASARI, dr., SpKK</Table.Cell>
            <Table.Cell className="text-center">15/12/2020 10:59</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-semibold">2</Table.Cell>
            <Table.Cell>Etc.</Table.Cell>
            <Table.Cell className="text-center">Etc.</Table.Cell>
            <Table.Cell className="text-center">Etc.</Table.Cell>
            <Table.Cell>Etc.</Table.Cell>
            <Table.Cell>Etc.</Table.Cell>
            <Table.Cell className="text-center">Etc.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Header size="small">
        <Icon name="history" className="text-base -mt-3" />
        Riwayat Obat 6 bulan terakhir
      </Header>
      <Divider />
      <List celled verticalAlign="middle" size="small">
        <List.Item
          className="p-3 border-t-0 cursor-pointer rounded-md hover:bg-gray-100 focus:bg-gray-100"
          onClick={() => showChild(1)}
        >
          <List.Content>
            <List.Header className="font-normal">
              <Icon
                name={'caret ' + (list1 ? 'up' : 'down')}
                className="float-right"
              />
              15/12/2020 11:19 • S201203882 • IVONY NILASARI, dr., SpKK
            </List.Header>
            {list1 ? (
              <List.Description>
                <Table striped celled compact className="mt-3">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="4">Botol plastik 50 mL</Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell width="1" className="text-center">
                        1.00
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Chloramex kapsul 500 mg</Table.Cell>
                      <Table.Cell>apt</Table.Cell>
                      <Table.Cell className="text-center">2.00</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Etc.</Table.Cell>
                      <Table.Cell>Etc.</Table.Cell>
                      <Table.Cell className="text-center">Etc.</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </List.Description>
            ) : null}
          </List.Content>
        </List.Item>
        <List.Item
          className="p-3 border-b-0 cursor-pointer rounded-md hover:bg-gray-100 focus:bg-gray-100"
          onClick={() => showChild(2)}
        >
          <List.Content>
            <List.Header className="font-normal">
              <Icon
                name={'caret ' + (list2 ? 'up' : 'down')}
                className="float-right"
              />
              16/12/2020 12:19 • S201203883 • IVONY NILASARI, dr., SpKK
            </List.Header>
            {list2 ? (
              <List.Description>
                <Table striped celled compact className="mt-3">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="4">Synarcus krim 0,025 %</Table.Cell>
                      <Table.Cell>
                        UE+VASCLOR PAGI MALAM BERCAK GATAL DAN LUKA UJUNG JARI
                        KAKI
                      </Table.Cell>
                      <Table.Cell width="1" className="text-center">
                        2.00
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>One scrub galon 5 liter</Table.Cell>
                      <Table.Cell>UE SABUN</Table.Cell>
                      <Table.Cell className="text-center">50.00</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Etc.</Table.Cell>
                      <Table.Cell>Etc.</Table.Cell>
                      <Table.Cell className="text-center">Etc.</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </List.Description>
            ) : null}
          </List.Content>
        </List.Item>
      </List>
    </Fragment>
  );
}
