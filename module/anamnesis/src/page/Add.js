import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Form,
  Button,
  Modal,
  Checkbox,
  Header,
  Divider,
  Table,
  Segment,
} from 'semantic-ui-react';

export default function Add() {
  const history = useHistory();

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" /> Tambah Anamnesis
      </Modal.Header>
      <Modal.Content scrolling>
        <div className="grid grid-cols-3 gap-10">
          <div>
            <Segment className="sticky top-0 bg-gray-50 shadow-md">
              <Header size="small">
                <Icon name="user" className="text-lg -mt-4" />
                Data Pasien
              </Header>
              <Divider />
              <Table basic="very" compact>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell
                      className="border-t-0 border-b font-semibold"
                      width="5"
                    >
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
            </Segment>
          </div>
          <div className="col-span-2">
            <Form>
              <Form.Field>
                <label>Sumber Informasi</label>
                <div className="block">
                  <Checkbox
                    label="Auto-anamnesis"
                    value="Auto-anamnesis"
                    checked={false}
                    onChange={() => {}}
                  />
                </div>
                <div className="block mt-2">
                  <Checkbox
                    label="Allo-anamnesis"
                    value="Allo-anamnesis"
                    checked={false}
                    onChange={() => {}}
                  />
                </div>
                <div className="pl-4">
                  <div className="block mt-2">
                    <Checkbox
                      radio
                      label="Keluarga Pasien"
                      name="alloAnamnesis"
                      value="Keluarga Pasien"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="block mt-2">
                    <Checkbox
                      radio
                      label="Tetangga"
                      name="alloAnamnesis"
                      value="Tetangga"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="block mt-2">
                    <Checkbox
                      radio
                      label="Aparat Desa"
                      name="alloAnamnesis"
                      value="Aparat Desa"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="block mt-2">
                    <Checkbox
                      radio
                      label="Aparat Kepolisian"
                      name="alloAnamnesis"
                      value="Aparat Kepolisian"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                  <input
                    className="mt-2"
                    placeholder="Nama yang bersangkutan"
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <label>Keluhan Utama</label>
                <textarea></textarea>
              </Form.Field>
              <Form.Field>
                <label>Riwayat Penyakit Sekarang</label>
                <textarea></textarea>
              </Form.Field>
            </Form>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          to="/"
          onClick={() => {
            history.goBack();
          }}
        >
          <Icon name="times" />
          Batal
        </Button>
        <Button color="green">
          <Icon name="save" />
          Simpan
        </Button>
      </Modal.Actions>
    </Fragment>
  );
}
