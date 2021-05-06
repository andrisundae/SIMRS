import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import className from 'classname';
import {
  Icon,
  Form,
  Button,
  Modal,
  Table,
  Divider,
  Header,
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
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';
import { data } from './TempData';

export default function IsiHasil() {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const kodePenunjang = query.get('kode');
  const tindakan = query.get('tindakan');

  function renderPemeriksaan() {
    switch (kodePenunjang) {
      case 'PK':
        return (
          <Table striped celled compact className="border-separate table-fixed">
            <Table.Header className="block min-w-max sticky -top-3.5 z-10 border-t-2 border-b-2">
              <Table.Row>
                <Table.HeaderCell className="w-24">Layanan</Table.HeaderCell>
                <Table.HeaderCell className="w-100">
                  Pemeriksaan
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-48">
                  Hasil
                </Table.HeaderCell>
                <Table.HeaderCell className="text-center w-48">
                  Satuan
                </Table.HeaderCell>
                <Table.HeaderCell className="w-64">
                  Batas Normal
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="block min-w-max">
              {data.map((dt, idx) => {
                let rows = [],
                  hasil = dt.hasil_periksa;

                rows.push(
                  <Table.Row key={idx}>
                    <Table.Cell colSpan={5} className="font-bold">
                      {dt.nama}
                    </Table.Cell>
                  </Table.Row>
                );

                if (hasil.length > 0) {
                  hasil.map((h, ih) => {
                    rows.push(
                      <Table.Row key={`${idx}_${ih}`}>
                        <Table.Cell className="w-24"></Table.Cell>
                        <Table.Cell className="w-100">
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                null != h.NamaPemeriksaan
                                  ? h.NamaPemeriksaan.replace(/ /g, '&nbsp;')
                                  : '&nbsp;',
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell className="text-center font-bold w-48">
                          {h.satuan !== '' && <Input className="w-40" />}
                        </Table.Cell>
                        <Table.Cell className="text-center w-48">
                          {h.satuan}
                        </Table.Cell>
                        <Table.Cell className="w-64">{h.Normal}</Table.Cell>
                      </Table.Row>
                    );
                  });
                }

                return rows;
              })}
            </Table.Body>
          </Table>
        );

      case 'RAD':
      case 'PA':
      case 'OK':
        return (
          <Form>
            <Form.Field>
              <label>Dokumen</label>
              <Table striped celled compact size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Tanggal & Pengentri</Table.HeaderCell>
                    <Table.HeaderCell>Nama</Table.HeaderCell>
                    <Table.HeaderCell>Keterangan</Table.HeaderCell>
                    <Table.HeaderCell>Tanggal Hapus</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center">
                      Tidak ada dokumen
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form.Field>
            <Divider />
            {'OK' === kodePenunjang ? (
              <Fragment>
                <Form.Field>
                  <label>Laporan Operasi : {tindakan}</label>
                  <TextArea rows="6" />
                </Form.Field>
                <Form.Field>
                  <label>Instruksi Pasca Operasi</label>
                  <TextArea rows="6" />
                </Form.Field>
              </Fragment>
            ) : (
              <Form.Field>
                <label>Interpretasi Hasil : {tindakan}</label>
                <TextArea rows="6" />
              </Form.Field>
            )}
          </Form>
        );

      default:
        return null;
    }
  }

  return (
    <Fragment>
      <Modal.Header className="text-xl">
        <Icon name="edit" className="mr-4" /> Isi Hasil{' '}
        {'PK' === kodePenunjang
          ? 'Lab. PK'
          : `(${kodePenunjang} | ${tindakan})`}
      </Modal.Header>
      <Modal.Content scrolling className="pt-3">
        {renderPemeriksaan()}
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
    </Fragment>
  );
}
