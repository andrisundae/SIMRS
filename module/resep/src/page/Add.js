import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Header,
  Segment,
  Grid,
  Checkbox,
  Table,
  Select,
  Input,
  TextArea,
} from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

const initialState = {
  obat: {
    kode: '',
    nama: '',
    satuan: '',
  },
  obatRacikan: {
    jenisRacikan: '',
    obat: [],
  },
};

export default function Add() {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalObatOpen, setIsModalObatOpen] = useState(false);
  const [isAddRacikan, setIsAddRacikan] = useState(false);
  const [resep, setResep] = useState([]);
  const [obat, setObat] = useState(initialState.obat);
  const [obatRacikan, setObatRacikan] = useState(initialState.obatRacikan);

  function resetFormState() {
    setObat(initialState.obat);
    setObatRacikan(initialState.obatRacikan);
  }

  function handleModal(racikan = false) {
    resetFormState();
    setIsAddRacikan(racikan);
    setIsModalOpen(!isModalOpen);
  }

  function renderButtonPilihObat() {
    return (
      <Grid.Row className="pt-1.5 pb-0">
        <Grid.Column width="3" className="font-bold mt-2">
          Obat
        </Grid.Column>
        <Grid.Column className="text-right">
          {!isAddRacikan && (
            <Button
              icon="list"
              content="Pilih Obat"
              color="blue"
              size="small"
              onClick={() => setIsModalObatOpen(!isModalObatOpen)}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    );
  }

  function renderAddObat() {
    return (
      <Fragment>
        <Grid columns="equal">
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold">
              Alergi Obat
            </Grid.Column>
            <Grid.Column>Paracetamol</Grid.Column>
          </Grid.Row>
          {!isAddRacikan && (
            <Fragment>
              {renderButtonPilihObat()}
              <Grid.Row className="pt-1.5 pb-0">
                <Grid.Column width="3" className="font-bold mt-2">
                  Kode Barang
                </Grid.Column>
                <Grid.Column>
                  <Input fluid>
                    <input
                      readOnly
                      className="cursor-not-allowed bg-gray-200"
                      value={obat.kode}
                    />
                  </Input>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="pt-1.5 pb-0">
                <Grid.Column width="3" className="font-bold mt-2">
                  Nama Barang
                </Grid.Column>
                <Grid.Column>
                  <Input fluid>
                    <input
                      readOnly
                      className="cursor-not-allowed bg-gray-200"
                      value={obat.nama}
                    />
                  </Input>
                </Grid.Column>
              </Grid.Row>
            </Fragment>
          )}
          {isAddRacikan && (
            <Grid.Row className="pt-1.5 pb-0">
              <Grid.Column width="3" className="font-bold mt-2">
                Jenis Racikan
              </Grid.Column>
              <Grid.Column>
                <Select fluid options={[]} />
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold mt-2">
              Jumlah
            </Grid.Column>
            <Grid.Column width="4">
              <Input type="number" fluid />
            </Grid.Column>
            {!isAddRacikan && (
              <Grid.Column>
                <Input fluid>
                  <input
                    readOnly
                    className="cursor-not-allowed bg-gray-200"
                    value={obat.satuan}
                  />
                </Input>
              </Grid.Column>
            )}
          </Grid.Row>
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold mt-2">
              Etiket
            </Grid.Column>
            <Grid.Column>
              <Select
                fluid
                options={[{ key: 0, text: 'Lainnya', value: 'Lainnya' }]}
                defaultValue="Lainnya"
              />
              <TextArea
                className="w-full p-3 border border-gray-300"
                rows="2"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-2 pb-0">
            <Grid.Column width="3" className="font-bold mt-1">
              Aturan Makan
            </Grid.Column>
            <Grid.Column className="mt-1">
              <Segment compact className="inline mb-0 py-2 px-4">
                <Checkbox label="Sebelum Makan" />
              </Segment>
              <Segment compact className="inline mb-0 py-2 px-4 mx-1.5">
                <Checkbox label="Saat Makan" />
              </Segment>
              <Segment compact className="inline mb-0 py-2 px-4">
                <Checkbox label="Sesudah Makan" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          {!isAddRacikan && (
            <Grid.Row className="mt-1">
              <Grid.Column
                width="3"
                verticalAlign="top"
                className="font-bold mt-2"
              >
                Catatan
              </Grid.Column>
              <Grid.Column>
                <TextArea
                  className="w-full p-3 border border-gray-300"
                  rows="4"
                />
              </Grid.Column>
            </Grid.Row>
          )}
          {isAddRacikan && renderButtonPilihObat()}
        </Grid>
        {isAddRacikan && (
          <Table striped celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nama Barang</Table.HeaderCell>
                <Table.HeaderCell className="text-center w-16">
                  Jumlah
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-56">
                  Satuan
                </Table.HeaderCell>
                <Table.HeaderCell className="w-72">Catatan</Table.HeaderCell>
                <Table.HeaderCell className="text-center w-20">
                  <Button
                    icon="plus"
                    color="blue"
                    size="mini"
                    onClick={() => setIsModalObatOpen(!isModalObatOpen)}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {obatRacikan.obat.map((v, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      {v.kode} - {v.nama}
                    </Table.Cell>
                    <Table.Cell className="text-center w-16">
                      <Input className="w-16" />
                    </Table.Cell>
                    <Table.Cell className="text-center w-56">
                      {v.satuan}
                    </Table.Cell>
                    <Table.Cell className="text-center w-72">
                      <Input className="w-72" />
                    </Table.Cell>
                    <Table.Cell className="text-center w-20">
                      <Button
                        icon="trash"
                        color="red"
                        size="mini"
                        onClick={() => {
                          setObatRacikan((prevState) => ({
                            ...prevState,
                            obat: (() => {
                              prevState.obat.splice(i, 1);
                              return [...prevState.obat];
                            })(),
                          }));
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" /> Tambah Resep
      </Modal.Header>
      <Modal.Content scrolling>
        <Grid columns="equal">
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold mt-2">
              Status Cito
            </Grid.Column>
            <Grid.Column>
              <Segment compact className="p-2.5">
                <Checkbox label="Cito" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold mt-2">
              Status KRS
            </Grid.Column>
            <Grid.Column>
              <Segment compact className="p-2.5">
                <Checkbox label="Segera KRS" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold mt-2">
              Dokter
            </Grid.Column>
            <Grid.Column>
              <Select fluid options={[]} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold mt-2">
              Unit Farmasi
            </Grid.Column>
            <Grid.Column>
              <Select fluid options={[]} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-1.5 pb-0">
            <Grid.Column width="3" className="font-bold">
              Alergi Obat
            </Grid.Column>
            <Grid.Column>Paracetamol</Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-1 pb-0">
            <Grid.Column className="text-right">
              <Button
                icon="plus"
                content="Tambah Obat"
                color="blue"
                size="small"
                onClick={() => {
                  handleModal();
                  setTimeout(setIsModalObatOpen(!isModalObatOpen), 1000);
                }}
              />
              <Button
                icon="plus"
                content="Tambah Obat Racikan"
                color="blue"
                size="small"
                onClick={() => handleModal(true)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <TableContainer className="mt-6" maxHeight="370">
          <Table
            striped
            celled
            compact
            className="border-separate border-0 table-fixed"
          >
            <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
              <Table.Row>
                <Table.HeaderCell className="text-center w-20 sticky left-0 z-9 border-r-2">
                  #
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-28">
                  Kode
                </Table.HeaderCell>
                <Table.HeaderCell className="w-100">
                  Nama Barang
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-32">
                  Jumlah
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-32">
                  Satuan
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-72">
                  Etiket
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-72">
                  Aturan Makan
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-72">
                  Catatan
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="block min-w-max">
              {[...Array(20)].map((v, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell className="text-center w-20 sticky left-0 z-9 border-r-2">
                      <Button icon="close" color="red" size="mini" />
                    </Table.Cell>
                    <Table.Cell className="text-center w-28">067{i}</Table.Cell>
                    <Table.Cell className="w-100">
                      Ondansentron larutan injeksi 2 mg / mL (ampul @ 2 mL)
                    </Table.Cell>
                    <Table.Cell className="text-center w-32"></Table.Cell>
                    <Table.Cell className="text-center w-32">ampul</Table.Cell>
                    <Table.Cell className="text-center w-72"></Table.Cell>
                    <Table.Cell className="text-center w-72"></Table.Cell>
                    <Table.Cell className="text-center w-72"></Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </TableContainer>
      </Modal.Content>
      <Modal.Actions>
        <Button icon="times" content="Batal" onClick={() => history.goBack()} />
        <Button icon="save" content="Simpan" color="green" onClick={() => {}} />
      </Modal.Actions>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={isModalOpen}
        onClose={() => handleModal()}
      >
        <Modal.Header className="text-xl">
          <Icon.Group className="mr-4">
            <Icon name="pills" />
            <Icon corner="bottom right" name="plus" />
          </Icon.Group>
          Tambah Obat
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row className="pb-0">
              <Grid.Column>
                <Segment
                  compact
                  className={className('float-right mb-0 -mt-3 py-2 px-4', {
                    'bg-blue-500': isAddRacikan,
                  })}
                >
                  <Checkbox
                    label={
                      <label
                        className={className('font-bold', {
                          'text-white': isAddRacikan,
                        })}
                      >
                        Racikan
                      </label>
                    }
                    checked={isAddRacikan}
                    onChange={(e, { checked }) => {
                      resetFormState();
                      setIsAddRacikan(checked);
                    }}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {renderAddObat()}
        </Modal.Content>
        <Modal.Actions>
          <Button icon="undo" content="Kembali" onClick={() => handleModal()} />
          <Button icon="pills" content="Tambahkan" color="blue" />
        </Modal.Actions>
      </Modal>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={isModalObatOpen}
        onClose={() => setIsModalObatOpen(!isModalObatOpen)}
      >
        <Modal.Header className="text-xl">
          <Icon.Group className="mr-4">
            <Icon name="pills" />
            <Icon corner="bottom right" name="plus" />
          </Icon.Group>
          Pilih Obat
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                action={{ icon: 'search', content: 'Cari', color: 'blue' }}
              />
            </Form.Field>
            <Form.Field>
              <TableContainer>
                <Table
                  striped
                  celled
                  compact
                  selectable
                  size="small"
                  className="border-separate border-0 table-fixed"
                >
                  <Table.Header className="block min-w-max sticky top-0 z-10 border-b-2">
                    <Table.Row>
                      <Table.HeaderCell className="text-center w-28">
                        Kode
                      </Table.HeaderCell>
                      <Table.HeaderCell className="w-102">
                        Nama
                      </Table.HeaderCell>
                      <Table.HeaderCell className="text-center w-72">
                        Satuan
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body className="block min-w-max">
                    {[...Array(5)].map((v, i) => {
                      return (
                        <Table.Row
                          key={i}
                          className="cursor-pointer"
                          onClick={() => {
                            if (!isAddRacikan) {
                              setObat((prevState) => ({
                                ...prevState,
                                kode: '0202' + i,
                                nama:
                                  'Bioteq ureteral DJ stent set OO 5 /26 GW 0,028',
                                satuan: 'TABLET SALUT SELAPUT',
                              }));
                            } else {
                              setObatRacikan((prevState) => ({
                                ...prevState,
                                obat: (() => {
                                  let value = {
                                    kode: '0202' + i,
                                    nama:
                                      'Bioteq ureteral DJ stent set OO 5 /26 GW 0,028',
                                    satuan: 'TABLET SALUT SELAPUT',
                                  };
                                  return [...prevState.obat, value];
                                })(),
                              }));
                            }
                            setIsModalObatOpen(!isModalObatOpen);
                          }}
                        >
                          <Table.Cell className="text-center w-28">
                            0202{i}
                          </Table.Cell>
                          <Table.Cell className="w-102">
                            Bioteq ureteral DJ stent set OO 5 /26 GW 0,028'
                          </Table.Cell>
                          <Table.Cell className="text-center w-72">
                            TABLET SALUT SELAPUT
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </TableContainer>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="close"
            content="Tutup"
            onClick={() => setIsModalObatOpen(!isModalObatOpen)}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
