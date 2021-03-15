import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Table,
  Segment,
  Select,
  Checkbox,
  Radio,
  List,
  Grid,
  TextArea,
  Input,
} from 'semantic-ui-react';
import _ from 'lodash';

const FikasiList = [
  { key: 0, text: 'Alkohol 90%', value: 'Alkohol 90%' },
  { key: 1, text: 'Alkohol 50%', value: 'Alkohol 50%' },
  { key: 2, text: 'NB Formalin', value: 'NB Formalin' },
];

const BahanSediaanList = [
  { key: 0, text: 'Biopsi', value: 'Biopsi' },
  { key: 1, text: 'Cairan', value: 'Cairan' },
  { key: 2, text: 'Kerokan', value: 'Kerokan' },
  { key: 3, text: 'Operasi', value: 'Operasi' },
  { key: 4, text: 'Smear', value: 'Smear' },
  { key: 5, text: 'Sputum', value: 'Sputum' },
  { key: 6, text: 'Urin', value: 'Urin' },
];

const KontrasepsiList = [
  { key: 0, text: 'Pil', value: 'Pil' },
  { key: 1, text: 'Injeksi', value: 'Injeksi' },
  { key: 2, text: 'IUD', value: 'IUD' },
  { key: 3, text: 'Norplant / Susuk', value: 'Norplant / Susuk' },
  { key: 4, text: 'Cervical Cap', value: 'Cervical Cap' },
  { key: 5, text: 'Spermisida', value: 'Spermisida' },
  { key: 6, text: 'Kondom Laki-laki', value: 'Kondom Laki-laki' },
  { key: 7, text: 'Kondom Perempuan', value: 'Kondom Perempuan' },
];

export default function Add() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const kodePenunjang = query.get('kode');

  const [isModalOpen, setIsModalOpen] = useState(false);

  function renderDiagnosis(opt = {}) {
    let className = undefined !== opt.className ? opt.className : '';
    let freeText = undefined !== opt.className ? opt.className : false;

    return (
      <Form.Field className={className}>
        <label>
          Diagnosis
          <Button
            className="float-right"
            content="Pilih Diagnosis"
            color="blue"
            icon="list"
            size="tiny"
            labelPosition="left"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </label>
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tanggal</Table.HeaderCell>
              <Table.HeaderCell>Pelaksana</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Kode - Nama</Table.HeaderCell>
              <Table.HeaderCell>Peringkat</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body></Table.Body>
        </Table>
        {freeText && (
          <TextArea
            rows="2"
            placeholder="Ketikkan disini jika ada diagnosis tambahan atau keterangan lain"
          />
        )}
      </Form.Field>
    );
  }

  function renderPemeriksaanPA() {
    return (
      <Fragment>
        <Form.Field>
          <Grid>
            <Grid.Row columns="equal" className="pb-0">
              <Grid.Column width="3" className="font-bold">
                Fiksasi
              </Grid.Column>
              <Grid.Column>
                {FikasiList.map((v, i) => {
                  return (
                    <label
                      key={i}
                      className={className('block', {
                        'mt-3': v.key > 0,
                      })}
                    >
                      <Checkbox label={v.text} value={v.value} />
                    </label>
                  );
                })}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal" className="mt-2">
              <Grid.Column width="3" className="font-bold">
                Bahan Sediaan
              </Grid.Column>
              <Grid.Column>
                {BahanSediaanList.map((v, i) => {
                  return (
                    <label
                      key={i}
                      className={className('block', {
                        'mt-3': v.key > 0,
                      })}
                    >
                      <Checkbox label={v.text} value={v.value} />
                    </label>
                  );
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>
        <Form.Field>
          <label>Keterangan Klinik</label>
        </Form.Field>
        {renderDiagnosis({ className: 'ml-5', freeText: true })}
        <Form.Field>
          <label>
            <Checkbox label="Lama Kontrasepsi dan Haid Terakhis" />
          </label>
        </Form.Field>
        <Form.Field className="ml-8">
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column width="4" className="font-bold">
                Kontrasepsi dan Berapa Lama
              </Grid.Column>
              <Grid.Column>
                {KontrasepsiList.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className={className('', {
                        'mt-3': v.key > 0,
                      })}
                    >
                      <Grid className="mt-0.5">
                        <Grid.Row columns="equal" className="py-2">
                          <Grid.Column width="4" className="mt-1.5">
                            <Checkbox label={v.text} value={v.value} />
                          </Grid.Column>
                          <Grid.Column>
                            <Input size="small" className="w-16 mr-1" /> Tahun
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>
                  );
                })}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column width="4" className="font-bold mt-1.5">
                Haid Hari Terakhir Tanggal
              </Grid.Column>
              <Grid.Column>
                <Input size="small" className="w-48" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>
      </Fragment>
    );
  }

  function renderPemeriksaanNonPA() {
    return (
      <Fragment>
        {renderDiagnosis()}
        <Form.Field>
          <label>Pemeriksaan</label>
          <List celled className="border-l border-r">
            <List.Item className="cursor-pointer">
              <List.Icon name="square outline" className="text-2xl" />
              <List.Content className="py-1.5">HEMATOLOGI</List.Content>
            </List.Item>
            <List.Item className="cursor-pointer pl-10">
              <List.Icon name="square outline" className="text-2xl" />
              <List.Content className="py-1.5">
                HEMATOLOGY ANALIZER 3 DIFF
                <label className="text-right float-right w-52">40.000,00</label>
                <label className="text-center float-right w-52">
                  NON KELAS
                </label>
              </List.Content>
            </List.Item>
            <List.Item className="cursor-pointer pl-10 bg-blue-500 text-white">
              <List.Icon name="check square outline" className="text-2xl" />
              <List.Content className="pt-1.5">
                DARAH LENGKAP 5 DIFF
                <label className="text-right float-right w-52">60.000,00</label>
                <label className="text-center float-right w-52">
                  NON KELAS
                </label>
              </List.Content>
            </List.Item>
          </List>
        </Form.Field>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" /> Tambah Pemeriksaan Penunjang
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <label>
              <Checkbox label="Pemeriksaan Cito" />
              <Segment compact floated="right" className="m-0 -mt-2 py-2 px-4">
                <Radio label="PA" />
              </Segment>
              <Segment compact floated="right" className="m-0 -mt-2 py-2 px-4">
                <Radio label="OK" />
              </Segment>
              <Segment compact floated="right" className="m-0 -mt-2 py-2 px-4">
                <Radio label="RAD" />
              </Segment>
              <Segment compact floated="right" className="m-0 -mt-2 py-2 px-4">
                <Radio label="PK" />
              </Segment>
            </label>
          </Form.Field>
          <Form.Field>
            <label>Dokter Perujuk</label>
            <Select search options={[]} />
          </Form.Field>
          {'PA' !== kodePenunjang && renderPemeriksaanNonPA()}
          {'PA' === kodePenunjang && renderPemeriksaanPA()}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => history.goBack()}>
          <Icon name="times" />
          Batal
        </Button>
        <Button color="green" onClick={() => {}}>
          <Icon name="save" />
          Simpan
        </Button>
      </Modal.Actions>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <Modal.Header>Pilih Diagnosis</Modal.Header>
        <Modal.Content>
          <Table celled compact size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tanggal</Table.HeaderCell>
                <Table.HeaderCell>Pelaksana</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Kode - Nama</Table.HeaderCell>
                <Table.HeaderCell>Peringkat</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>
            <Icon name="times" />
            Tutup
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
