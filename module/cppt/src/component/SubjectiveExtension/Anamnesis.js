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

export default function Anamnesis() {
  const history = useHistory();

  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tanggal & Pelaksana</Table.HeaderCell>
          <Table.HeaderCell>Keluhan Utama</Table.HeaderCell>
          <Table.HeaderCell>Riwayat Penyakit Sekarang</Table.HeaderCell>
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
              <Table.Cell>
                nyeri perut bawah, mual,muntah, keluar darah kemarin sore keluar
                darah flek2, keputihan, gatal
              </Table.Cell>
              <Table.Cell>
                ibu mengatakan hamil yang ke 4, anak hidup 3, persalinan sesar
                1x, atk usia 5 tahun, HPHT : 25-6-2020, HPL : 28-3-2021 nyeri
                perut bawah, mual,muntah, keluar darah kemarin sore keluar darah
                flek2,sekarang sudah tidak keluar, keputihan, gatal
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
