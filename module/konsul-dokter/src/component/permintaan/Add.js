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

      case 'CPPT':
        return (
          <Table celled compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tanggal</Table.HeaderCell>
                <Table.HeaderCell>Pelaksana</Table.HeaderCell>
                <Table.HeaderCell>Subjective</Table.HeaderCell>
                <Table.HeaderCell>Objective</Table.HeaderCell>
                <Table.HeaderCell>Planning</Table.HeaderCell>
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
        Tambah Konsul Dokter
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <label>Kepada</label>
            <Select clearable options={[]} />
          </Form.Field>
          <Form.Field>
            <label>Mohon bantuan sejawat untuk</label>
            <TextArea
              rows={2}
              value="Konsultasi tindakan medis yang diperlukan pasien saat ini"
            />
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
            <label>
              Keterangan Klinis saat ini
              <Button
                className="float-right"
                content="Pilih CPPT"
                color="blue"
                icon="list"
                size="tiny"
                labelPosition="left"
                onClick={() => handleModal('CPPT')}
              />
            </label>
            <div className="ml-5">
              <Form.Field>
                <label>Subjective</label>
              </Form.Field>
              <Form.Field>
                <label>Objective</label>
              </Form.Field>
              <Form.Field>
                <label>Planning</label>
              </Form.Field>
            </div>
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
