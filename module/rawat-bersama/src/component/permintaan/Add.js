import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Select,
  TextArea,
  Table,
  Grid,
} from 'semantic-ui-react';
import _ from 'lodash';

export default function Add() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  function handleModal(str = '') {
    setIsModalOpen(!isModalOpen);
    setModalType(str);
  }

  function renderModalContent() {
    switch (modalType) {
      case 'Diagnosis':
        return (
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
          </Table>
        );

      case 'Dokter':
        return (
          <Table celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nama Dokter</Table.HeaderCell>
                <Table.HeaderCell>Spesialisasi</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        );

      default:
        return null;
    }
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" />
        Tambah Rawat Bersama
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <label>Kepada</label>
            <Table celled compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Dokter</Table.HeaderCell>
                  <Table.HeaderCell>Spesialisasi</Table.HeaderCell>
                  <Table.HeaderCell width="1" className="text-center">
                    <Button icon="plus" size="mini" color="blue" />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>BAMBANG RESPATI, dr., SpKJ</Table.Cell>
                  <Table.Cell>DOKTER SPESIALIS KESEHATAN JIWA</Table.Cell>
                  <Table.Cell width="1" className="text-center">
                    <Button icon="delete" size="mini" color="red" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form.Field>
          <Form.Field>
            <Grid>
              <Grid.Row className="pb-0">
                <Grid.Column className="font-bold">
                  Mohon bantuan sejawat untuk melakukan perawatan bersama pasien
                  di bawah ini:
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  No Rekam Medik
                </Grid.Column>
                <Grid.Column>20125091</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  Nama Pasien / JK
                </Grid.Column>
                <Grid.Column>MULYATI, NY / L</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  Umur
                </Grid.Column>
                <Grid.Column>69 Tahun 1 Bulan 28 Hari</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  Dirawat di ruang / Kelas
                </Grid.Column>
                <Grid.Column>ANGGREK / 2</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal" className="pb-0">
                <Grid.Column width="4" className="font-bold">
                  DPJP
                </Grid.Column>
                <Grid.Column>
                  LINDA FDPH, dr., Biomed., SpPD / DOKTER SPESIALIS PD
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column
                  width="4"
                  className="font-bold"
                  verticalAlign="top"
                >
                  Keluhan Utama
                </Grid.Column>
                <Grid.Column verticalAlign="top">
                  <TextArea rows="2" placeholder="Tidak diisi" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Field>
          <Form.Field>
            <label>
              Diagnosis
              <Button
                className="float-right"
                content="Pilih Diagnosis"
                color="blue"
                icon="list"
                size="tiny"
                labelPosition="left"
                onClick={() => handleModal('Diagnosis')}
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
          </Form.Field>
          <Form.Field>
            <label>Terima kasih atas perhatian dan kerjasamanya.</label>
          </Form.Field>
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
        onClose={() => handleModal()}
      >
        <Modal.Header>Pilih {modalType}</Modal.Header>
        <Modal.Content>{renderModalContent()}</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleModal()}>
            <Icon name="times" />
            Tutup
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
