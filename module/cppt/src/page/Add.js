import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Icon,
  Form,
  Button,
  Modal,
  Header,
  Segment,
  Input,
  Checkbox,
  Table,
  Select,
  TextArea,
} from 'semantic-ui-react';
import _ from 'lodash';
import SubjectiveExtension from '../component/SubjectiveExtension';
import ObjectiveExtension from '../component/ObjectiveExtension';

export default function Add() {
  const history = useHistory();
  const [isExtSubjective, setIsExtSubjective] = useState(false);
  const [isExtObjective, setIsExtObjective] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="list" className="mr-4" /> Tambah CPPT
      </Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <Segment compact className="p-2.5 font-bold">
              <Checkbox label="SBAR" />
            </Segment>
          </Form.Field>
          <Form.Field>
            <label>Dokter</label>
            <Select options={[]} />
          </Form.Field>
          <Form.Field>
            <label>
              Subjective Data
              <Button
                icon="table"
                className="float-right"
                size="mini"
                color="blue"
                onClick={() => setIsExtSubjective(!isExtSubjective)}
              />
            </label>
            {isExtSubjective && (
              <div className="w-full h-80 pr-0.5 overflow-auto border-2">
                <SubjectiveExtension />
              </div>
            )}
            <TextArea rows="8" />
          </Form.Field>
          <Form.Field>
            <label>
              Objective Data
              <Button
                icon="table"
                className="float-right"
                size="mini"
                color="blue"
                onClick={() => setIsExtObjective(!isExtObjective)}
              />
            </label>
            {isExtObjective && (
              <div className="w-full h-80 pr-0.5 overflow-auto border-2">
                <ObjectiveExtension />
              </div>
            )}
            <TextArea rows="8" />
          </Form.Field>
          <Form.Field>
            <label>Diagnosis</label>
            <Table celled compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Kode - Nama</Table.HeaderCell>
                  <Table.HeaderCell>Peringkat</Table.HeaderCell>
                  <Table.HeaderCell className="text-center w-20">
                    <Button
                      icon="plus"
                      color="blue"
                      size="tiny"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Form.Field>
          <Form.Field>
            <label>Planning</label>
            <TextArea rows="8" />
          </Form.Field>
          <Form.Field>
            <label>Instruction</label>
            <TextArea rows="8" />
          </Form.Field>
          <Form.Field>
            <label>Implementation</label>
            <TextArea rows="8" />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button icon="undo" content="Batal" onClick={() => history.goBack()} />
        <Button icon="save" content="Simpan" color="green" onClick={() => {}} />
      </Modal.Actions>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="large"
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <Modal.Header className="text-xl">
          <Icon name="list" className="mr-4" /> Cari & Pilih Diagnosis
        </Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Form.Field>
              <Input
                action={{ icon: 'search' }}
                placeholder="Ketikkan Kode atau Nama Diagnosis lalu tekan Enter / Icon untuk mencari..."
              />
            </Form.Field>
            <Form.Field></Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="close"
            content="Tutup"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
