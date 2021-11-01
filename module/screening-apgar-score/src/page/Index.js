import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ScreeningApgarScoreLabel from './Label';
import DumpData from './DumpData';

export default function Index() {
  const formLabel = ScreeningApgarScoreLabel.formLabel;
  const ScreeningData = DumpData.data.skrining_apgar_score;
  const kelahiranData = DumpData.data.pendukung_skrining;

  function renderHeaderData() {
    let headerRow1 = [],
      headerRow2 = [],
      headerRow3 = [];

    ScreeningData.map((data, index) => {
      headerRow1.push(
        <Table.HeaderCell key={index} className="text-center w-104">
          {data.tanggal} {data.jam}
        </Table.HeaderCell>
      );
      headerRow2.push(
        <Table.HeaderCell key={index} className="text-center w-104">
          {data.nama_personel}
        </Table.HeaderCell>
      );
      headerRow3.push(
        <Table.HeaderCell key={index} className="text-center w-104">
          <Button
            as={Link}
            to="/add-riwayat"
            icon="edit"
            color="blue"
            size="mini"
            content="Riwayat"
            labelPosition="left"
          />
          {data.hapus ? (
            data.tanggal_hapus
          ) : (
            <Button icon="trash" color="red" size="mini" />
          )}
        </Table.HeaderCell>
      );
      return null;
    });

    return {
      headerRow1: headerRow1,
      headerRow2: headerRow2,
      headerRow3: headerRow3,
    };
  }

  function renderCellKelahiranData() {
    return (
      <Table celled compact size="small">
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2}>
              <Button
                as={Link}
                to="/ubah-kelahiran"
                icon="edit"
                size="mini"
                color="blue"
              />{' '}
              Data Kelahiran
            </Table.Cell>
          </Table.Row>
          {formLabel.kelahiran.map((value, index) => {
            return (
              <Table.Row key={index} className="font-normal">
                <Table.Cell className="font-bold">{value.label}</Table.Cell>
                <Table.Cell>{kelahiranData[value.key]}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  function renderScreeningData(data, key) {
    switch (key) {
      case 'activity':
        return `${data[key].value} ${data[key].keterangan}`;

      case 'total':
      case 'kesimpulan':
        return data[key];

      case 'riwayat_tindakan':
        let riwayatTindakan = data[key];
        if (riwayatTindakan.length === 0) {
          return null;
        }
        return riwayatTindakan.map((value, index) => {
          let hapusRiwayat = value.hapus;
          return (
            <Table compact key={index}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="font-bold">
                    <label className="text-yellow-500">
                      {value.tanggal} {value.jam}
                    </label>
                    <br />
                    {value.nama_personel}
                  </Table.Cell>
                  <Table.Cell
                    className={
                      'font-bold ' +
                      (hapusRiwayat ? 'text-right' : 'text-center')
                    }
                  >
                    {hapusRiwayat ? (
                      <div>
                        Tanggal Hapus
                        <br />
                        <label className="text-yellow-500">
                          {value.tanggal_hapus} {value.jam_hapus}
                        </label>
                      </div>
                    ) : (
                      <Button icon="trash" size="mini" color="red" />
                    )}
                  </Table.Cell>
                </Table.Row>
                {Object.keys(value.detail).length > 0 &&
                  formLabel.riwayat.map((dt, idx) => {
                    let rows = [];
                    if (undefined === value.detail[dt.key]) {
                      return null;
                    }
                    rows.push(
                      <Table.Row key={idx}>
                        <Table.Cell colSpan={2}>
                          <div className="grid grid-cols-7">
                            <div
                              className={className('', {
                                'text-red-600 line-through': hapusRiwayat,
                              })}
                            >
                              {value.detail[dt.key].waktu}
                            </div>
                            <div
                              className={className('col-span-6', {
                                'text-red-600 line-through': hapusRiwayat,
                              })}
                            >
                              {dt.label}
                            </div>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );

                    if (
                      'medikasi_pada_bayi' === dt.key &&
                      Object.keys(value.detail[dt.key].detail).length > 0
                    ) {
                      dt.children.map((dtc, idc) => {
                        let medikasiDetail = value.detail[dt.key].detail;
                        rows.push(
                          <Table.Row key={idc}>
                            <Table.Cell colSpan={2}>
                              <div className="grid grid-cols-7">
                                <div
                                  className={className(
                                    'col-start-2 col-span-3 pl-5',
                                    {
                                      'text-red-600 line-through': hapusRiwayat,
                                    }
                                  )}
                                >
                                  {dtc.label}
                                </div>
                                <div
                                  className={className(
                                    'col-start-5 col-span-3',
                                    {
                                      'text-red-600 line-through': hapusRiwayat,
                                    }
                                  )}
                                >
                                  {medikasiDetail[dtc.key]}
                                </div>
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        );
                      });
                    }

                    return rows;
                  })}
              </Table.Body>
            </Table>
          );
        });

      default:
        return `${data[key].value} (${data[key].keterangan})`;
    }
  }

  function renderCellPemeriksaanData() {
    let rows = [];

    formLabel.pemeriksaan.map((value, index) => {
      let cols = [];
      cols.push(
        <Table.Cell
          key={index}
          className={className('w-96 sticky left-0 z-9 border-r-2', {
            'font-bold':
              _.indexOf(
                ['total', 'kesimpulan', 'riwayat_tindakan'],
                value.key
              ) > -1,
            'align-top': 'riwayat_tindakan' === value.key,
          })}
        >
          {value.label}
        </Table.Cell>
      );

      ScreeningData.map((data, idx) => {
        cols.push(
          <Table.Cell key={`${index}_${idx}`} className="w-104 text-center">
            {renderScreeningData(data, value.key)}
          </Table.Cell>
        );
      });

      rows.push(<Table.Row key={index}>{cols}</Table.Row>);
    });

    return rows;
  }

  return (
    <Fragment>
      <FooterActionsContainer>
        <div className="m-1">
          <Button as={Link} color="blue" to="/add" size="small">
            <Icon name="plus" />
            Tambah
          </Button>
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="tasks" className="text-lg -mt-4" />
        <Header.Content>
          Pengkajian Khusus
          <label className="mx-2">&bull;</label>
          {ScreeningApgarScoreLabel.headerLabel}
        </Header.Content>
      </Header>
      <Divider />
      {/* <TableContainer maxHeight="auto" className="mb-5">
        <Table
          celled
          striped
          compact
          className="border-separate border-0"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={2}>
                <Button icon="edit" size="mini" color="blue" /> Data Kelahiran
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderCellKelahiranData()}
          </Table.Body>
        </Table>
      </TableContainer> */}

      <TableContainer>
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block sticky top-0 z-10 border-b-2 min-w-max">
            <Table.Row>
              <Table.HeaderCell
                rowSpan={3}
                className="w-96 sticky left-0 z-9 border-r-2"
              >
                {renderCellKelahiranData()}
              </Table.HeaderCell>
              {renderHeaderData().headerRow1}
            </Table.Row>
            <Table.Row>{renderHeaderData().headerRow2}</Table.Row>
            <Table.Row>{renderHeaderData().headerRow3}</Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            {renderCellPemeriksaanData()}
          </Table.Body>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
