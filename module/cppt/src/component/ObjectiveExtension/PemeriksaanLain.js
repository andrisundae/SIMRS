import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  TextArea,
} from 'semantic-ui-react';
import _ from 'lodash';

export default function PemeriksaanLain() {
  const history = useHistory();

  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tanggal & Pelaksana</Table.HeaderCell>
          <Table.HeaderCell className="text-center">GDA</Table.HeaderCell>
          <Table.HeaderCell className="text-center">
            Pemakaian O<sub>2</sub>
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center">
            SaO<sub>2</sub>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[...Array(5)].map((v, i) => {
          return (
            <Table.Row key={i}>
              <Table.Cell>
                13/10/2020 14:03
                <label className="mx-2">&bull;</label>
                YUDHA MEIRIZA KARTIKA, dr., SpOG
              </Table.Cell>
              <Table.Cell className="text-center">Tidak diperlukan</Table.Cell>
              <Table.Cell className="text-center">Tidak diperlukan</Table.Cell>
              <Table.Cell className="text-center">Tidak diperlukan</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
