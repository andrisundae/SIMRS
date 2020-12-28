import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Divider,
  Icon,
  Table,
  Button,
  Label,
  Modal,
} from 'semantic-ui-react';

export default function Index() {
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false);

  return (
    <Fragment>
      <Header className="mt-0">
        <Icon name="tasks" className="text-lg -mt-4" />
        Anamnesis
      </Header>
      <Divider />
      <div className="fixed right-6 bottom-4">
        <Button as={Link} color="blue" to="/add" className="mr-0">
          <Icon name="plus" />
          Tambah
        </Button>
      </div>
      <div
        className="border rounded overflow-x-auto"
        style={{ height: 'calc(100vh - 180px)' }}
      >
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block sticky top-0 z-10 min-w-max">
            <Table.Row>
              <Table.HeaderCell className="py-2.5 w-12 border-b-2">
                #
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-28 border-b-2 text-center">
                Perintah
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-40 border-b-2 text-center bg-gray-100">
                Tanggal <Icon name="caret down" />
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-72 border-b-2 ">
                Pelaksana
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-96 border-b-2">
                Keluhan Utama
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            <Table.Row className="sticky top-11 block z-10">
              <Table.Cell
                colSpan="5"
                className="bg-gray-100"
                style={{ width: 868 }}
              >
                <Label ribbon color="teal">
                  Mataram • Kelas 3 • 05/12/2020 17:34
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">1</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button
                  as={Link}
                  icon="folder open"
                  color="blue"
                  size="mini"
                  to="/detail"
                />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                  onClick={() => {
                    setDeleteConfirmIsOpen(true);
                  }}
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">Batuk</Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">2</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Table.Cell>
            </Table.Row>
            <Table.Row className="sticky top-11 block z-10">
              <Table.Cell
                colSpan="5"
                className="bg-gray-100"
                style={{ width: 868 }}
              >
                <Label ribbon color="teal">
                  Mataram • Kelas 3 • 04/12/2020 17:34
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">3</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">4</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">5</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">6</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">7</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">8</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">9</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">10</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row className="sticky top-11 block z-10">
              <Table.Cell
                colSpan="5"
                className="bg-gray-100"
                style={{ width: 868 }}
              >
                <Label ribbon color="teal">
                  Mataram • Kelas 3 • 03/12/2020 17:34
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">11</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">12</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">13</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="tiny"
        open={deleteConfirmIsOpen}
        onClose={() => {
          setDeleteConfirmIsOpen(false);
        }}
      >
        <Modal.Header className="text-xl">
          <Icon name="trash alternate" className="mr-4" /> Hapus Anamnesis
          <div className="block mt-2">
            <Label color="teal" ribbon className="-left-10">
              Mataram • Kelas 3 • 05/12/2020 17:34
            </Label>
          </div>
        </Modal.Header>
        <Modal.Content>
          <p>
            Anamnesis "
            <strong>
              05/12/2020 17:34 • Gigih Setijawan, dr., Sp.P., MARS.
            </strong>
            " akan dihapus.
          </p>
          <p className="mt-4">Apakah anda yakin?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            to="/"
            onClick={() => {
              setDeleteConfirmIsOpen(false);
            }}
          >
            <Icon name="times" />
            Batal
          </Button>
          <Button color="red" autoFocus>
            <Icon name="trash alternate" />
            Hapus
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
