import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import {
  Header,
  Segment,
  Divider,
  Icon,
  Button,
  Table,
  Modal,
} from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function DokumenKRSContainer() {
  const history = useHistory();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalObservasi, setIsModalObservasi] = useState(false);

  return (
    <Fragment>
      <Header className="text-lg">Dokumen</Header>
      <Divider />

      <Header className="text-lg">Gambar</Header>
      <Divider />

      <Header className="text-lg">Lainnya</Header>
      <Divider />
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="text-center w-28">
              Perintah
            </Table.HeaderCell>
            <Table.HeaderCell>Dokumen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="text-center w-28">
              <Icon
                name="file alternate"
                bordered
                inverted
                color="blue"
                className="cursor-pointer"
                onClick={() => setIsModalObservasi(!isModalObservasi)}
              />
            </Table.Cell>
            <Table.Cell>Lembar Observasi Pasien</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="small"
        open={isModalObservasi}
        onClose={() => setIsModalObservasi(!isModalObservasi)}
      >
        <Modal.Header className="text-xl">
          <Icon name="file alternate" className="mr-2" />
          Observasi Pasien
        </Modal.Header>
        <Modal.Content></Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalObservasi(!isModalObservasi)}>
            <Icon name="close" />
            Tutup
          </Button>
          <Button color="blue" onClick={() => {}}>
            <Icon name="file alternate" />
            Lihat
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
