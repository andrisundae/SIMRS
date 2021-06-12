import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import {
  Header,
  Divider,
  Icon,
  Form,
  Table,
  Button,
  Grid,
  Segment,
  Message,
  TextArea,
} from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';
import { data } from './TempData';
import { formatHasilLab } from '../utils/helper';

export default function Index() {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(history.location.search);
  const kodePenunjang = query.get('kode');

  function renderPemeriksaan() {
    switch (kodePenunjang) {
      case 'PK':
        return (
          <Fragment>
            <Table celled compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="w-24">Layanan</Table.HeaderCell>
                  <Table.HeaderCell>Pemeriksaan</Table.HeaderCell>
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
              <Table.Body>
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
                          <Table.Cell></Table.Cell>
                          <Table.Cell>
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  null != h.NamaPemeriksaan
                                    ? h.NamaPemeriksaan.replace(/ /g, '&nbsp;')
                                    : '&nbsp;',
                              }}
                            />
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            {formatHasilLab(h.hasilperiksa)}
                          </Table.Cell>
                          <Table.Cell className="text-center">
                            {h.satuan}
                          </Table.Cell>
                          <Table.Cell>{h.Normal}</Table.Cell>
                        </Table.Row>
                      );
                    });
                  }

                  return rows;
                })}
              </Table.Body>
            </Table>
            <Divider />
            <Form className="mb-10">
              <Form.Field>
                <label>Interpretasi Hasil Laboratorium PK</label>
                <TextArea rows={10} readOnly />
              </Form.Field>
            </Form>
          </Fragment>
        );

      case 'RAD':
      case 'PA':
      case 'OK':
        return (
          <Table celled compact size="small">
            <Table.Body>
              <Table.Row className="bg-white">
                <Table.Cell
                  rowSpan="2"
                  className="text-center border-r align-top pt-3 w-24"
                >
                  <Icon
                    className="cursor-pointer"
                    bordered
                    inverted
                    name="edit"
                    color="blue"
                    onClick={() => {
                      const query = new URLSearchParams();
                      query.append('kode', kodePenunjang);
                      query.append('tindakan', 'Nama Tindakan');

                      history.push({
                        pathname: location.pathname + '/isi-hasil',
                        search: query.toString(),
                      });
                    }}
                  />
                  <Icon
                    className="cursor-pointer"
                    bordered
                    inverted
                    name="file image outline"
                    color="blue"
                    onClick={() => {
                      const query = new URLSearchParams();
                      query.append('kode', kodePenunjang);
                      query.append('tindakan', 'Nama Tindakan');

                      history.push({
                        pathname: location.pathname + '/dokumen',
                        search: query.toString(),
                      });
                    }}
                  />
                </Table.Cell>
                <Table.Cell colSpan="2" className="p-3">
                  <label className="font-bold">
                    Nama Tindakan {kodePenunjang}
                  </label>
                  <label className="float-right">Tidak ada file</label>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white">
                <Table.Cell className="text-center align-top pt-3 w-20">
                  <Icon
                    className="cursor-pointer"
                    bordered
                    inverted
                    name="trash"
                    color="red"
                  />
                </Table.Cell>
                <Table.Cell className={className('p-3 px-8', {})}>
                  <label>16/12/2020 21:51</label> ~ Nama Dokter
                  <Divider className="my-2" />
                  <div>
                    {'OK' === kodePenunjang ? (
                      <Fragment>
                        <div className="font-bold mb-1">Laporan Operasi</div>
                        <div>Hasil Laporan Operasi</div>

                        <div className="font-bold mb-1 mt-5">
                          Instruksi Pasca Operasi
                        </div>
                        <div>Isian Instruksi Pasca Operasi</div>
                      </Fragment>
                    ) : (
                      'Hasil ' + kodePenunjang
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        );

      default:
        return null;
    }
  }

  return (
    <Fragment>
      {'PK' === kodePenunjang && (
        <FooterActionsContainer>
          <div className="m-1">
            <Button
              icon="edit"
              content="Isi Hasil"
              color="blue"
              onClick={() => {
                const query = new URLSearchParams();
                query.append('kode', kodePenunjang);
                query.append('tindakan', 'Nama Tindakan');

                history.push({
                  pathname: location.pathname + '/isi-hasil',
                  search: query.toString(),
                });
              }}
            />
          </div>
        </FooterActionsContainer>
      )}
      <Header className="mt-0">
        <Icon name="tasks" className="text-lg -mt-4" />
        <Header.Content>Isi Hasil</Header.Content>
      </Header>
      <Divider />
      <Message floating className="bg-blue-500 text-white">
        <Message.Content>
          <label className="font-bold text-lg">
            Apakah hasil pemeriksaan dibutuhkan segera tanpa interpretasi?
          </label>
          <div className="float-right -mt-1">
            <Button
              icon="check"
              color="green"
              size="mini"
              className="mr-2"
              content="Ya"
            />
            <Button icon="close" color="red" size="mini" content="Tidak" />
          </div>
        </Message.Content>
      </Message>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Segment>
              <label className="font-bold">PERMINTAAN</label>
              <Table celled compact size="small">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="4" className="font-bold">
                      Tanggal
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">Perujuk</Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">Pengentri</Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <label className="font-bold">PEMENUHAN</label>
              <Table celled compact size="small">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="5" className="font-bold">
                      Tanggal
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">Pelaksana</Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">Pengentri</Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-bold">
                      Penanggung Jawab
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Header dividing className="text-lg mt-1">
        <Icon name="file alternate outline" className="text-lg mr-0 -mt-3.5" />{' '}
        Diagnosis
      </Header>
      <Table celled compact size="small">
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
      <Header dividing className="text-lg mt-1">
        <Icon name="file alternate outline" className="text-lg mr-0 -mt-3.5" />{' '}
        Pemeriksaan
      </Header>
      {renderPemeriksaan()}
    </Fragment>
  );
}
