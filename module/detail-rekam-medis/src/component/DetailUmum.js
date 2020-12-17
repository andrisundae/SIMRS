import React, { Fragment, useState } from 'react';
import { Header, Divider, Table, Icon, List, Grid } from 'semantic-ui-react';

export default function DetailUmum() {
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
      <Header as="h5" className="mt-0">
        <Icon name="user" className="text-base -mt-3" />
        DATA PASIEN
      </Header>
      <Divider />
      <Table basic="very" size="small" compact className="pl-4 -mt-3">
        <Table.Body>
          <Table.Row>
            <Table.Cell className="border-t-0 border-b font-black" width="3">
              No. Rekam Medis
            </Table.Cell>
            <Table.Cell className="border-t-0 border-b font-black">
              20136359
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="border-t-0 border-b font-black">
              Nama
            </Table.Cell>
            <Table.Cell className="border-t-0 border-b">
              SITI NUR FADIYAH
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="border-t-0 font-black">
              Jenis Kelamin
            </Table.Cell>
            <Table.Cell className="border-t-0">P</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Header as="h5" className="mt-0">
        <Icon name="history" className="text-base -mt-3" />
        RIWAYAT DIAGNOSIS 6 BULAN TERAKHIR
      </Header>
      <Divider />
      <div className="pl-4">
        <List bulleted>
          <List.Item>
            Jika rawat jalan, riwayat diagnosis yang ditampilkan adalah hanya
            dari tempat layanan ini.
          </List.Item>
          <List.Item>
            Jika non rawat jalan, riwayat diagnosis yang ditampilkan adalah dari
            semua jenis layanan.
          </List.Item>
        </List>
        <Table striped celled compact size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                Tempat Layanan
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Tanggal MRS
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Peringkat</Table.HeaderCell>
              <Table.HeaderCell>Diagnosis</Table.HeaderCell>
              <Table.HeaderCell>Pelaksana</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Tanggal Diagnosis
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">KULIT & KELAMIN</Table.Cell>
              <Table.Cell textAlign="center">15/12/2020 10:07</Table.Cell>
              <Table.Cell textAlign="center">Utama</Table.Cell>
              <Table.Cell>L20 - ATOPIC DERMATITIS</Table.Cell>
              <Table.Cell>IVONY NILASARI, dr., SpKK</Table.Cell>
              <Table.Cell textAlign="center">15/12/2020 10:59</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">Etc.</Table.Cell>
              <Table.Cell textAlign="center">Etc.</Table.Cell>
              <Table.Cell textAlign="center">Etc.</Table.Cell>
              <Table.Cell>Etc.</Table.Cell>
              <Table.Cell>Etc.</Table.Cell>
              <Table.Cell textAlign="center">Etc.</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <Header as="h5">
        <Icon name="history" className="text-base -mt-3" />
        RIWAYAT OBAT 6 BULAN TERAKHIR
      </Header>
      <Divider />
      <List className="pl-4" celled verticalAlign="middle">
        <List.Item className="p-3 cursor-pointer" onClick={() => showChild(1)}>
          <List.Content floated="right">
            <Icon name={'chevron ' + (list1 ? 'up' : 'down')} />
          </List.Content>
          <List.Content>
            <span className="text-red-500">15/12/2020 11:19</span> / S201203882
            / IVONY NILASARI, dr., SpKK
          </List.Content>
        </List.Item>
        <List.Item
          className={'mb-2 ml-5 mr-10 border-0 ' + (list1 ? 'block' : 'hidden')}
        >
          <List.Content>
            <Table striped celled compact size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="4">Botol plastik 50 mL</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell width="1" textAlign="center">
                    1.00
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Chloramex kapsul 500 mg</Table.Cell>
                  <Table.Cell>apt</Table.Cell>
                  <Table.Cell textAlign="center">2.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Etc.</Table.Cell>
                  <Table.Cell>Etc.</Table.Cell>
                  <Table.Cell textAlign="center">Etc.</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </List.Content>
        </List.Item>
        <List.Item className="p-3 cursor-pointer" onClick={() => showChild(2)}>
          <List.Content floated="right">
            <Icon name={'chevron ' + (list2 ? 'up' : 'down')} />
          </List.Content>
          <List.Content>
            <span className="text-red-500">16/12/2020 12:19</span> / S201203883
            / IVONY NILASARI, dr., SpKK
          </List.Content>
        </List.Item>
        <List.Item
          className={'mb-2 ml-5 mr-10 border-0 ' + (list2 ? 'block' : 'hidden')}
        >
          <List.Content>
            <Table striped celled compact size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="4">Synarcus krim 0,025 %</Table.Cell>
                  <Table.Cell>
                    UE+VASCLOR PAGI MALAM BERCAK GATAL DAN LUKA UJUNG JARI KAKI
                  </Table.Cell>
                  <Table.Cell width="1" textAlign="center">
                    2.00
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>One scrub galon 5 liter</Table.Cell>
                  <Table.Cell>UE SABUN</Table.Cell>
                  <Table.Cell textAlign="center">50.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Etc.</Table.Cell>
                  <Table.Cell>Etc.</Table.Cell>
                  <Table.Cell textAlign="center">Etc.</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </List.Content>
        </List.Item>
      </List>
    </Fragment>
  );
}
