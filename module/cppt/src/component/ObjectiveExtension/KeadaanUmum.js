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

export default function KeadaanUmum() {
  const history = useHistory();

  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan={2}>Tanggal & Pelaksana</Table.HeaderCell>
          <Table.HeaderCell colSpan={5} className="text-center bg-green-200">
            AVPU
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={4} className="text-center bg-blue-200">
            GCS
          </Table.HeaderCell>
          <Table.HeaderCell rowSpan={2} className="text-center bg-blue-200">
            Kesadaran
          </Table.HeaderCell>
          <Table.HeaderCell rowSpan={2} className="text-center bg-blue-200">
            Catatan
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell className="text-center bg-green-200">
            Alert
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-green-200">
            Verbal
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-green-200">
            Pain
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-green-200">
            Unresponsive
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-green-200">
            Total
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-blue-200">
            Eye
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-blue-200">
            Verbal
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-blue-200">
            Motorik
          </Table.HeaderCell>
          <Table.HeaderCell className="text-center bg-blue-200">
            Total
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
              <Table.Cell className="text-center bg-green-100">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center bg-green-100">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center bg-green-100">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center bg-green-100">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center bg-green-100">-</Table.Cell>
              <Table.Cell className="text-center bg-blue-100">4</Table.Cell>
              <Table.Cell className="text-center bg-blue-100">5</Table.Cell>
              <Table.Cell className="text-center bg-blue-100">6</Table.Cell>
              <Table.Cell className="text-center bg-blue-100">
                15 (Minor)
              </Table.Cell>
              <Table.Cell className="text-center bg-blue-100">
                Compos Mentis
              </Table.Cell>
              <Table.Cell className="text-center bg-blue-100">
                Tidak diperlukan
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
