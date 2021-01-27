import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';
import ScreeningNyeriDewasaLabel from './Label';
import tempData from './tempData';

export default function Index() {
  const formLabel = ScreeningNyeriDewasaLabel.formLabel;
  const sample = tempData.data.skrining_nyeri_wong_baker;

  function renderHeaderData() {
    let headerRow1 = [],
      headerRow2 = [],
      headerRow3 = [],
      headerRow4 = [];

    sample.map((data, index) => {
      headerRow1.push(
        <Table.HeaderCell key={index} className="text-center w-60">
          {data.tempat_layanan}
        </Table.HeaderCell>
      );
      headerRow2.push(
        <Table.HeaderCell key={index} className="text-center w-60">
          {data.tanggal}
        </Table.HeaderCell>
      );
      headerRow3.push(
        <Table.HeaderCell key={index} className="text-center w-60">
          {data.nama_personel}
        </Table.HeaderCell>
      );
      headerRow4.push(
        <Table.HeaderCell key={index} className="text-center w-60">
          {data.hapus ? (
            data.tanggal_hapus
          ) : (
            <Button icon="trash" color="red" size="small" />
          )}
        </Table.HeaderCell>
      );
      return null;
    });

    return {
      headerRow1: headerRow1,
      headerRow2: headerRow2,
      headerRow3: headerRow3,
      headerRow4: headerRow4,
    };
  }

  function renderCellData() {
    let rows = [];

    formLabel.map((value, index) => {
      let cols = [];
      if (value.key === 'obat_nyeri') {
        return null;
      }
      cols.push(
        <Table.Cell
          key={index}
          className={className('w-80 sticky left-0 z-9 border-r-2', {
            'align-top': 'intervensi' === value.key,
          })}
        >
          {value.label}
        </Table.Cell>
      );

      // sample.map((data, idx) => {
      //   if ('intervensi' !== value.key) {
      //     cols.push(
      //       <Table.Cell key={`${index}_${idx}`} className={className('w-60', {
      //         'font-bold': ('total' === value.key || 'kesimpulan' === value.key),
      //         'text-center': ('intervensi' !== value.key)
      //       })}>
      //         {data[value.key]}
      //       </Table.Cell>
      //     );
      //   } else {
      //     let finalInterpretasi = 'Tidak ada';

      //     if (JSON.parse(data.intervensi_list).length > 0) {
      //       let tempIntervensiList = JSON.parse(data.intervensi_list);
      //       if (_.indexOf(['-', ''], data.intervensi) === -1) {
      //         tempIntervensiList.push(data.intervensi);
      //       }
      //       finalInterpretasi = (
      //         <ul>
      //           {tempIntervensiList.map((dt, idt) => {
      //             return <li key={idt} className="ml-5 list-disc">{dt}</li>
      //           })}
      //         </ul>
      //       );
      //     } else {
      //       if (_.indexOf(['-', ''], data.intervensi) === -1) {
      //         finalInterpretasi = data.intervensi;
      //       }
      //     }

      //     cols.push(
      //       <Table.Cell key={`${index}_${idx}`} className={className('w-60 align-top', {
      //         'font-bold': ('total' === value.key || 'kesimpulan' === value.key),
      //         'text-center': ('Tidak ada' === finalInterpretasi)
      //       })}>
      //         {finalInterpretasi}
      //       </Table.Cell>
      //     );
      //   }
      // });

      rows.push(<Table.Row key={index}>{cols}</Table.Row>);
    });

    return rows;
  }

  return (
    <Fragment>
      <FooterActionsContainer a>
        <div className="m-1">
          <Button as={Link} color="blue" to="/add" size="small">
            <Icon name="plus" />
            Tambah
          </Button>
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="chart bar" className="text-lg -mt-4" />
        <Header.Content>
          Pengkajian khusus
          <label className="mx-2">&bull;</label>
          {ScreeningNyeriDewasaLabel.headerLabel}
          <label className="mx-2">&bull;</label>
          {ScreeningNyeriDewasaLabel.descriptionLabel}
        </Header.Content>
      </Header>
      <Divider />
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
                rowSpan={4}
                className="w-80 sticky left-0 z-9 border-r-2"
              >
                Parameter
              </Table.HeaderCell>
              {renderHeaderData().headerRow1}
            </Table.Row>
            <Table.Row>{renderHeaderData().headerRow2}</Table.Row>
            <Table.Row>{renderHeaderData().headerRow3}</Table.Row>
            <Table.Row>{renderHeaderData().headerRow4}</Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            {renderCellData()}
          </Table.Body>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
