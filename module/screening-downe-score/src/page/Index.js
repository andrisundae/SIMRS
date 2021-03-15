import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';
import ScreeningDowneScoreLabel from './Label';

export default function Index() {
  const formLabel = ScreeningDowneScoreLabel.formLabel;

  function renderHeaderData() {
    let headerRow1 = [],
      headerRow2 = [],
      headerRow3 = [];

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
                <Table.Cell></Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
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
          {ScreeningDowneScoreLabel.headerLabel}
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
