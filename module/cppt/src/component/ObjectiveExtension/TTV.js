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

export default function TTV() {
  const history = useHistory();

  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tanggal & Pelaksana</Table.HeaderCell>
          <Table.HeaderCell className="text-center">
            Tekanan Darah
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center">
            Denyut Nadi
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center">
            Pernafasan
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center">Suhu</Table.HeaderCell>
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
              <Table.Cell className="text-center">84/54 mmHg</Table.Cell>
              <Table.Cell className="text-center">76 (Kuat)</Table.Cell>
              <Table.Cell className="text-center">20 x/menit</Table.Cell>
              <Table.Cell className="text-center">36,1 {'\u00b0'}C</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
