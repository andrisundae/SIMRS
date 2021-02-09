import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Button,
  Modal,
  Form,
  TextArea,
  Table,
  Grid,
  Segment,
  Divider,
  Input,
} from 'semantic-ui-react';
import _ from 'lodash';
import LembarKonsultasi from './LembarKonsultasi';
import LembarPermintaan from './LembarPermintaan';

export default function IsiHasil() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="plus" className="mr-4" />
        Isi Hasil Konsul
      </Modal.Header>
      <Modal.Content scrolling>
        <div className="block ml-4 mr-4">
          <LembarKonsultasi />
        </div>
        <Segment className="mt-10 border-black">
          <LembarPermintaan />
        </Segment>
        <Divider />
        <Form>
          <Form.Field>
            <label>Subjective</label>
            <TextArea rows="3" />
          </Form.Field>
          <Form.Field>
            <label>Objective</label>
            <TextArea rows="3" />
          </Form.Field>
          <Form.Field>
            <label>Diagnosis</label>
            <Table celled compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Diagnosis</Table.HeaderCell>
                  <Table.HeaderCell>Peringkat</Table.HeaderCell>
                  <Table.HeaderCell width="1" className="text-center">
                    <Button
                      icon="plus"
                      size="mini"
                      color="blue"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Form.Field>
          <Form.Field>
            <label>Planning Data</label>
            <TextArea rows="3" />
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
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <Modal.Header className="text-xl">Cari & Pilih Diagnosis</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row className="pb-0">
              <Grid.Column>
                <Input
                  placeholder="Ketikkan Kode atau Nama Diagnosis lalu tekan Enter untuk mencari..."
                  fluid
                  action={{
                    color: 'blue',
                    icon: 'search',
                    content: 'Cari',
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pl-4 pr-4">
              <Table celled compact size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Kode</Table.HeaderCell>
                    <Table.HeaderCell>ICD X</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>
            </Grid.Row>
          </Grid>
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
