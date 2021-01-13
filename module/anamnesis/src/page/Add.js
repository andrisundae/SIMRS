import React, { Fragment, useState } from 'react';
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
  Input,
} from 'semantic-ui-react';
import _ from 'lodash';

export default function Add() {
  const history = useHistory();

  const [isOpenModalObat, setIsOpenModalObat] = useState(false);

  const statusPsikologiItems = [
    'sedih',
    'senang',
    'takut',
    'tegang',
    'tenang',
    'menderita penyakit yang membahayakan dirinya sendiri',
    'menderita penyakit yang membahayakan lingkungannya',
    'menderita penyakit yang membahayakan dirinya sendiri dan lingkungannya',
  ];
  const kelainanFisikItems = [
    'tidak ada',
    'bisu',
    'bisu-tuli',
    'buta',
    'kecacatan neurologis/psikiatri',
    'tuli',
  ];
  const alatBantuItems = [
    'tidak ada',
    'branchart',
    'kursi roda',
    'kruk',
    'tongkat',
  ];

  function cariObat(e) {}

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
                    checked={true}
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
                <textarea rows="2"></textarea>
              </Form.Field>
              <Form.Field>
                <label>Riwayat Penyakit Sekarang</label>
                <textarea rows="2"></textarea>
              </Form.Field>
              <Form.Field>
                <label>Status Psikologi</label>
                {statusPsikologiItems.map((v, i) => {
                  return (
                    <div key={i} className="block mt-2">
                      <Checkbox
                        label={_.upperFirst(v)}
                        value={v}
                        checked={false}
                        onChange={() => {}}
                      />
                    </div>
                  );
                })}
              </Form.Field>
              <Form.Group>
                <Form.Field>
                  <div className="block mt-2">
                    <Checkbox
                      label="Lainnya"
                      value="Lainnya"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                </Form.Field>
                <Form.Field>
                  <input type="text" />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Kelainan Fisik</label>
                {kelainanFisikItems.map((v, i) => {
                  return (
                    <div key={i} className="block mt-2">
                      <Checkbox
                        label={_.upperFirst(v)}
                        value={_.upperFirst(v)}
                        checked={false}
                        onChange={() => {}}
                      />
                    </div>
                  );
                })}
              </Form.Field>
              <Form.Group>
                <Form.Field>
                  <div className="block mt-2">
                    <Checkbox
                      label="Kelainan Fisik"
                      value="Kelainan Fisik"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                </Form.Field>
                <Form.Field>
                  <input type="text" />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Alat Bantu</label>
                {alatBantuItems.map((v, i) => {
                  return (
                    <div key={i} className="block mt-2">
                      <Checkbox
                        label={_.upperFirst(v)}
                        value={_.upperFirst(v)}
                        checked={false}
                        onChange={() => {}}
                      />
                    </div>
                  );
                })}
              </Form.Field>
              <Form.Group>
                <Form.Field>
                  <div className="block mt-2">
                    <Checkbox
                      label="Lainnya"
                      value="Lainnya"
                      checked={false}
                      onChange={() => {}}
                    />
                  </div>
                </Form.Field>
                <Form.Field>
                  <input type="text" />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Riwayat Penyakit Yang Pernah Diderita</label>
                <textarea rows="2"></textarea>
              </Form.Field>
              <Form.Field>
                <label>
                  Riwayat Alergi (Lanjutkan menambah TANPA MENGHAPUS data alergi
                  yang sudah ada)
                </label>
                <div className="ml-5 mt-5">
                  <Form.Field>
                    <Table basic="very" compact>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>
                            Obat
                            <Icon
                              className="float-right cursor-pointer"
                              name="plus"
                              onClick={() =>
                                setIsOpenModalObat(!isOpenModalObat)
                              }
                            />
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            AMOXICILLIN
                            <Icon
                              className="float-right cursor-pointer"
                              name="delete"
                              color="red"
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            CO-AMOXICLAV
                            <Icon
                              className="float-right cursor-pointer"
                              name="delete"
                              color="red"
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Form.Field>
                  <Form.Field>
                    <label>Makanan</label>
                    <textarea rows="2"></textarea>
                  </Form.Field>
                  <Form.Field>
                    <label>Lain-lain</label>
                    <textarea rows="2"></textarea>
                  </Form.Field>
                  <Form.Field>
                    <label>Reaksi alergi</label>
                    <textarea rows="2"></textarea>
                  </Form.Field>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="block mt-2 font-bold">
                  <Checkbox
                    label="Obat yang dibawa pasien dari luar RS"
                    value=""
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
                <textarea
                  className="mt-3"
                  rows="2"
                  placeholder="Tidak ditanyakan"
                ></textarea>
              </Form.Field>
              <Form.Field>
                <label>Riwayat Penyakit Keluarga</label>
                <textarea rows="2"></textarea>
              </Form.Field>
              <Form.Field>
                <label>Riwayat Sosial</label>
              </Form.Field>
              <div className="ml-5 mb-5">
                <Form.Field>
                  <div className="block mt-2 font-bold">
                    <Checkbox
                      label="Riwayat Merokok"
                      value=""
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-10">
                    <Table basic="very" compact>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Jumlah</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Lama</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="block mt-2 font-bold">
                    <Checkbox
                      label="Riwayat Minum-minuman Beralkohol"
                      value=""
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-10">
                    <Table basic="very" compact>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Jenis</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Jumlah</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Lama</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="block mt-2 font-bold">
                    <Checkbox
                      label="Riwayat Penggunaan Obat Penenang (Diluar Yang Diresepkan Dokter)"
                      value=""
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-10">
                    <Table basic="very" compact>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Jenis</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Jumlah</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Lama</Table.Cell>
                          <Table.Cell>
                            <input />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="block mt-2 font-bold">
                    <Checkbox
                      label="Riwayat Lainnya"
                      value=""
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3 ml-10">
                    <textarea
                      rows="2"
                      placeholder="termasuk pekerjaan yang berhubungan dengan zat-zat berbahaya"
                    ></textarea>
                  </div>
                </Form.Field>
              </div>
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

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="tiny"
        open={isOpenModalObat}
        onClose={() => setIsOpenModalObat(!isOpenModalObat)}
      >
        <Modal.Header className="text-xl">
          <Icon name="pills" className="mr-4" /> Obat
        </Modal.Header>
        <Modal.Content>
          <Input
            action={{ icon: 'search', onClick: cariObat }}
            fluid
            placeholder="Cari..."
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsOpenModalObat(!isOpenModalObat)}>
            <Icon name="times" />
            Batal
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
