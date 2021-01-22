import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Icon, Label } from 'semantic-ui-react';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';

export default function TableData() {
  return (
    <Fragment>
      <TableContainer maxHeightMinus="70">
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block sticky top-0 z-10 border-b-2 min-w-max">
            <Table.Row>
              <Table.HeaderCell
                rowSpan="3"
                className="text-center w-16 sticky left-0 z-10"
              >
                #
              </Table.HeaderCell>
              <Table.HeaderCell
                rowSpan="3"
                className="text-center w-28 sticky left-16 z-10"
              >
                Perintah
              </Table.HeaderCell>
              <Table.HeaderCell
                rowSpan="3"
                className="w-96 sticky left-44 z-10 border-r-2"
              >
                Tanggal & Pelaksana
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="11" className="text-center">
                Keadaan Umum
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="6" className="text-center">
                TTV
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3" className="text-center w-64">
                Status Emergency
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="4" className="text-center">
                Antropometri
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="3" className="text-center">
                Pemeriksaan Lain
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="6" className="text-center">
                INTAKE
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="10" className="text-center">
                OUTPUT
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="3" className="text-center w-44">
                Tanggal Hapus
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan="5" className="text-center">
                AVPU
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="4" className="text-center">
                GCS
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Kesadaran
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Catatan
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="2" className="text-center">
                Tekanan Darah
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="2" className="text-center">
                Denyut Nadi
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Pernafasan
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Suhu
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Tinggi Badan
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Berat Badan
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                BMI
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Lingkar Kepala Bayi
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                GDA
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Pemakaian O2
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                SaO2
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Sonde / Oral
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Transfusi
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Obat
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Terapi Injeksi
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Cairan Infus
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Lainnya
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="4" className="text-center">
                Urine
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="3" className="text-center">
                Faeces
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Muntah
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Pendarahan Cairan Drainage Luka
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" className="text-center w-40">
                Pendarahan Cairan NGT Terbuka
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell className="text-center w-40">
                Alert
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Verbal
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Pain
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Unresponsive
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Total
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Eye
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Verbal
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Motorik
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Total
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Systolic
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Diastolic
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Frekuensi
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Kekuatan
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Jumlah
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Frekuensi
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Warna
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Konsistensi
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Frekuensi
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Warna
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center w-40">
                Konsistensi
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            <Table.Row>
              <Table.Cell
                colSpan="45"
                className="sticky z-10 bg-gray-100"
                style={{ top: '10.5rem' }}
              >
                <Label
                  ribbon
                  color="teal"
                  className="sticky -ml-8 -left-4 z-10"
                >
                  Anggrek • Kelas 3 • 14/10/2020
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                1
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">14/10/2020 22:04</span>
                <br />
                SEPI RIYADI PUGUH PRASETYO, A.Md.Kep.
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">113</Table.Cell>
              <Table.Cell className="text-center w-40">78</Table.Cell>
              <Table.Cell className="text-center w-40">84</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-64">
                Hijau (False Emergency ESI V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 22:04
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                2
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">14/10/2020 15:24</span>
                <br />
                DONY PRASETIAWAN,A.Md.Kep
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">4</Table.Cell>
              <Table.Cell className="text-center w-40">5</Table.Cell>
              <Table.Cell className="text-center w-40">6</Table.Cell>
              <Table.Cell className="text-center w-40">15 (Minor)</Table.Cell>
              <Table.Cell className="text-center w-40">
                Compos Mentis
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">120</Table.Cell>
              <Table.Cell className="text-center w-40">72</Table.Cell>
              <Table.Cell className="text-center w-40">76</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-40">
                Hijau (Prioritas V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 15:24
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                3
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">14/10/2020 11:50</span>
                <br />
                PEMBAYUN SRI RETNANINGTYAS, A.Md.FT
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">4</Table.Cell>
              <Table.Cell className="text-center w-40">5</Table.Cell>
              <Table.Cell className="text-center w-40">6</Table.Cell>
              <Table.Cell className="text-center w-40">15 (Minor)</Table.Cell>
              <Table.Cell className="text-center w-40">
                Compos Mentis
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">120</Table.Cell>
              <Table.Cell className="text-center w-40">72</Table.Cell>
              <Table.Cell className="text-center w-40">76</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-40">
                Hijau (Prioritas V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 15:24
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                4
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">14/10/2020 11:50</span>
                <br />
                PEMBAYUN SRI RETNANINGTYAS, A.Md.FT
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">4</Table.Cell>
              <Table.Cell className="text-center w-40">5</Table.Cell>
              <Table.Cell className="text-center w-40">6</Table.Cell>
              <Table.Cell className="text-center w-40">15 (Minor)</Table.Cell>
              <Table.Cell className="text-center w-40">
                Compos Mentis
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">120</Table.Cell>
              <Table.Cell className="text-center w-40">72</Table.Cell>
              <Table.Cell className="text-center w-40">76</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-40">
                Hijau (Prioritas V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 15:24
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                5
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">14/10/2020 11:50</span>
                <br />
                PEMBAYUN SRI RETNANINGTYAS, A.Md.FT
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">4</Table.Cell>
              <Table.Cell className="text-center w-40">5</Table.Cell>
              <Table.Cell className="text-center w-40">6</Table.Cell>
              <Table.Cell className="text-center w-40">15 (Minor)</Table.Cell>
              <Table.Cell className="text-center w-40">
                Compos Mentis
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">120</Table.Cell>
              <Table.Cell className="text-center w-40">72</Table.Cell>
              <Table.Cell className="text-center w-40">76</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-40">
                Hijau (Prioritas V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 15:24
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell
                colSpan="45"
                className="sticky z-10 bg-gray-100"
                style={{ top: '10.5rem' }}
              >
                <Label
                  ribbon
                  color="teal"
                  className="sticky -ml-8 -left-4 z-10"
                >
                  Anggrek • Kelas 3 • 13/10/2020
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                6
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">13/10/2020 15:20</span>
                <br />
                GHUFRON DEDI SETIAWAN, A.Md.Kep.
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">113</Table.Cell>
              <Table.Cell className="text-center w-40">78</Table.Cell>
              <Table.Cell className="text-center w-40">84</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-64">
                Hijau (False Emergency ESI V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 22:04
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                7
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">13/10/2020 15:20</span>
                <br />
                GHUFRON DEDI SETIAWAN, A.Md.Kep.
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">113</Table.Cell>
              <Table.Cell className="text-center w-40">78</Table.Cell>
              <Table.Cell className="text-center w-40">84</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-64">
                Hijau (False Emergency ESI V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 22:04
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                8
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-48 z-9 border-r-2">
                <span className="text-yellow-600">13/10/2020 15:20</span>
                <br />
                GHUFRON DEDI SETIAWAN, A.Md.Kep.
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">113</Table.Cell>
              <Table.Cell className="text-center w-40">78</Table.Cell>
              <Table.Cell className="text-center w-40">84</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-64">
                Hijau (False Emergency ESI V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 22:04
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                9
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">13/10/2020 15:20</span>
                <br />
                GHUFRON DEDI SETIAWAN, A.Md.Kep.
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">113</Table.Cell>
              <Table.Cell className="text-center w-40">78</Table.Cell>
              <Table.Cell className="text-center w-40">84</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-64">
                Hijau (False Emergency ESI V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 22:04
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="text-center w-16 sticky left-0 z-9">
                10
              </Table.Cell>
              <Table.Cell className="text-center w-28 sticky left-16 z-9">
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="w-96 sticky left-44 z-9 border-r-2">
                <span className="text-yellow-600">13/10/2020 15:20</span>
                <br />
                GHUFRON DEDI SETIAWAN, A.Md.Kep.
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">113</Table.Cell>
              <Table.Cell className="text-center w-40">78</Table.Cell>
              <Table.Cell className="text-center w-40">84</Table.Cell>
              <Table.Cell className="text-center w-40">Kuat</Table.Cell>
              <Table.Cell className="text-center w-40">20</Table.Cell>
              <Table.Cell className="text-center w-40">36,5</Table.Cell>
              <Table.Cell className="text-center w-64">
                Hijau (False Emergency ESI V)
                <br />
                <div className="w-14 h-6 bg-green-600 mt-1 m-auto border"></div>
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak diukur</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak ditimbang
              </Table.Cell>
              <Table.Cell className="text-center w-40">-</Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak dilakukan pemeriksaan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                Tidak diperlukan
              </Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-40">Tidak ada</Table.Cell>
              <Table.Cell className="text-center w-44">
                14/10/2020 22:04
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
