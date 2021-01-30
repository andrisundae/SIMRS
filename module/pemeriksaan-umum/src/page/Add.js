import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Form,
  Button,
  Modal,
  Grid,
  Select,
  Dropdown,
  Header,
  Label,
  Segment,
  Divider,
  Input,
  Table,
} from 'semantic-ui-react';

export default function Add() {
  const history = useHistory();

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" /> Tambah Pemeriksaan Umum
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <Grid>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column>
                  <label className="block font-bold mt-2">
                    Tanggal Pemeriksaan
                  </label>
                </Grid.Column>
                <Grid.Column>
                  <input />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Field>
          <Header attached="top" block>
            Keadaan Umum
          </Header>
          <Segment attached>
            <div className="block font-bold">
              <label>AVPU</label>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Alert</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Verbal</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Pain</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Unresponsive</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label className="inline-block">Total</label>
                  <Label className="float-right">+/+/+/+</Label>
                  <Divider />
                </Form.Field>
              </div>
            </div>
            <div className="block font-bold">
              <label>GCS</label>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Eye</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Verbal</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Motorik</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label className="inline-block">Total</label>
                  <Label className="float-right">
                    Moderate
                    <Label.Detail className="border-l border-gray-400 pl-3">
                      10
                    </Label.Detail>
                  </Label>
                  <Divider />
                </Form.Field>
              </div>
            </div>
            <Form.Field>
              <label>Kesadaran</label>
              <Select clearable options={[]} />
              <Label basic className="border-0 pl-0">
                Kesadaran terpilih otomatis sesuai nilai total GCS, namun dapat
                diubah sesuai keadaan pasien setelah GCS diisi.
              </Label>
            </Form.Field>
            <Form.Field>
              <label>Catatan</label>
              <textarea
                rows="2"
                placeholder="Isikan catatan lain disini jika perlu, termasuk keterangan nilai x pada GCS"
              ></textarea>
            </Form.Field>
          </Segment>
          <Header attached="top" block>
            TTV
          </Header>
          <Segment attached>
            <div className="block font-bold mb-2">
              <label>Tekanan Darah</label>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Systolic</label>
                  <Input
                    labelPosition="right"
                    type="number"
                    placeholder="Tidak diperlukan"
                    action
                  >
                    <input />
                    <Label>mm/Hg</Label>
                    <Button icon color="red">
                      <Icon name="minus" />
                    </Button>
                  </Input>
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Diastolic</label>
                  <Input
                    labelPosition="right"
                    type="number"
                    placeholder="Tidak diperlukan"
                    action
                  >
                    <input />
                    <Label>mm/Hg</Label>
                    <Button icon color="red">
                      <Icon name="minus" />
                    </Button>
                  </Input>
                </Form.Field>
              </div>
            </div>
            <div className="block font-bold mb-2">
              <label>Nadi</label>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Frekuensi</label>
                  <Input
                    labelPosition="right"
                    type="number"
                    placeholder="Tidak diperlukan"
                  >
                    <input />
                    <Label>bpm</Label>
                  </Input>
                </Form.Field>
              </div>
              <div className="block mt-2 ml-5">
                <Form.Field>
                  <label>Kekuatan</label>
                  <Select clearable options={[]} />
                </Form.Field>
              </div>
            </div>
            <Form.Field>
              <label>Frekuensi Pernafasan</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
                action
              >
                <input />
                <Label>x/menit</Label>
                <Button icon color="red">
                  <Icon name="minus" />
                </Button>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Suhu</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
              >
                <input />
                <Label>{'\u00b0'}C</Label>
              </Input>
            </Form.Field>
          </Segment>
          <Header attached="top" block>
            Status Emergency
          </Header>
          <Segment attached>
            <Form.Field>
              <Select
                clearable
                options={[
                  {
                    key: 0,
                    text: 'Tidak diperlukan',
                    value: 1,
                  },
                  {
                    key: 1,
                    text: (
                      <div className="block mr-5">
                        Merah (Prioritas I)
                        <Label basic className="border-0 p-0 -m-1 float-right">
                          <div className="w-14 h-6 bg-green-600 border"></div>
                        </Label>
                      </div>
                    ),
                    value: 2,
                  },
                ]}
                defaultValue={2}
              />
              <Label basic className="border-0 pl-0">
                Status Emergency terpilih otomatis sesuai parameter pemeriksaan,
                namun dapat diubah sesuai keadaan pasien.
              </Label>
            </Form.Field>
          </Segment>
          <Header attached="top" block>
            Antropometri
          </Header>
          <Segment attached>
            <Form.Field>
              <label>Tinggi Badan</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diukur"
              >
                <input />
                <Label>cm</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Berat Badan</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak ditimbang"
              >
                <input />
                <Label>kg</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>BMI</label>
              <Select clearable disabled placeholder="-" options={[]} />
            </Form.Field>
            <Form.Field>
              <label>Lingkar Kepala Bayi</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
              >
                <input />
                <Label>cm</Label>
              </Input>
            </Form.Field>
          </Segment>
          <Header attached="top" block>
            Pemeriksaan Lain
          </Header>
          <Segment attached>
            <Form.Field>
              <label>GDA</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
                action
              >
                <input />
                <Label>mg/dL</Label>
                <Button icon color="red">
                  <Icon name="minus" />
                </Button>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>
                Pemakaian O<sub>2</sub>
              </label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
              >
                <input />
                <Label>
                  mmH<sub>2</sub>O
                </Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>
                Saturasi O<sub>2</sub>
              </label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
              >
                <input />
                <Label>%</Label>
              </Input>
            </Form.Field>
          </Segment>
          <Header attached="top" block>
            INTAKE
          </Header>
          <Segment attached>
            <Form.Field>
              <label>Sonde / Oral</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
              >
                <input />
                <Label>CC</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Transfusi</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak diperlukan"
              >
                <input />
                <Label>CC</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Obat</label>
              <Table compact celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nama</Table.HeaderCell>
                    <Table.HeaderCell width="4">Jumlah Pakai</Table.HeaderCell>
                    <Table.HeaderCell collapsing>
                      <Icon className="cursor-pointer" name="plus" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Input labelPosition="right" action>
                        <input />
                        <Button icon color="blue">
                          <Icon name="search" />
                        </Button>
                      </Input>
                    </Table.Cell>
                    <Table.Cell>
                      <input />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        className="cursor-pointer"
                        name="delete"
                        color="red"
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form.Field>
            <Form.Field>
              <label>Terapi Injeksi</label>
              <Table compact celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nama</Table.HeaderCell>
                    <Table.HeaderCell width="4">Jumlah Pakai</Table.HeaderCell>
                    <Table.HeaderCell collapsing>
                      <Icon className="cursor-pointer" name="plus" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Input labelPosition="right" action>
                        <input />
                        <Button icon color="blue">
                          <Icon name="search" />
                        </Button>
                      </Input>
                    </Table.Cell>
                    <Table.Cell>
                      <input />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        className="cursor-pointer"
                        name="delete"
                        color="red"
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form.Field>
            <Form.Field>
              <label>Cairan Infus</label>
              <Table compact celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nama</Table.HeaderCell>
                    <Table.HeaderCell width="4">Jumlah Pakai</Table.HeaderCell>
                    <Table.HeaderCell collapsing>
                      <Icon className="cursor-pointer" name="plus" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Input labelPosition="right" action>
                        <input />
                        <Button icon color="blue">
                          <Icon name="search" />
                        </Button>
                      </Input>
                    </Table.Cell>
                    <Table.Cell>
                      <input />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        className="cursor-pointer"
                        name="delete"
                        color="red"
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form.Field>
            <Form.Field>
              <label>Obat Lainnya</label>
              <Table compact celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nama</Table.HeaderCell>
                    <Table.HeaderCell width="4">Jumlah Pakai</Table.HeaderCell>
                    <Table.HeaderCell collapsing>
                      <Icon className="cursor-pointer" name="plus" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Input labelPosition="right" action>
                        <input />
                        <Button icon color="blue">
                          <Icon name="search" />
                        </Button>
                      </Input>
                    </Table.Cell>
                    <Table.Cell>
                      <input />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        className="cursor-pointer"
                        name="delete"
                        color="red"
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form.Field>
          </Segment>
          <Header attached="top" block>
            OUTPUT
          </Header>
          <Segment attached>
            <Form.Field>
              <label>Urine</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak dilakukan pemeriksaan"
              >
                <input />
                <Label>CC</Label>
              </Input>
            </Form.Field>
            <div className="block ml-10">
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Frekuensi</label>
                  <Input
                    labelPosition="right"
                    type="number"
                    placeholder="Tidak diperlukan"
                  >
                    <input />
                    <Label>x/hari</Label>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <label>Warna</label>
                  <Select
                    clearable
                    placeholder="Tidak diperlukan"
                    options={[]}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Konsistensi</label>
                  <Select
                    clearable
                    placeholder="Tidak diperlukan"
                    options={[]}
                  />
                </Form.Field>
              </Form.Group>
            </div>
            <div className="block font-bold">
              <label>Faeces</label>
              <div className="block mt-2 ml-10">
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Frekuensi</label>
                    <Input
                      labelPosition="right"
                      type="number"
                      placeholder="Tidak diperlukan"
                    >
                      <input />
                      <Label>x/hari</Label>
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label>Warna</label>
                    <Select
                      clearable
                      placeholder="Tidak diperlukan"
                      options={[]}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Konsistensi</label>
                    <Select
                      clearable
                      placeholder="Tidak diperlukan"
                      options={[]}
                    />
                  </Form.Field>
                </Form.Group>
              </div>
            </div>
            <Form.Field>
              <label>Muntah</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak ada"
              >
                <input />
                <Label>CC</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Perdarahan Cairan Drainage Luka</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak ada"
              >
                <input />
                <Label>CC</Label>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Perdarahan Cairan NGT Terbuka</label>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Tidak ada"
              >
                <input />
                <Label>CC</Label>
              </Input>
            </Form.Field>
          </Segment>
        </Form>
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
