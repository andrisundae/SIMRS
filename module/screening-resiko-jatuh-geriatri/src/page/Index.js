import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';
import ScreeningJatuhGeriatriLabel from './Label';

export default function Index() {
  const formLabel = ScreeningJatuhGeriatriLabel.formLabel;

  function renderCellData() {
    let rows = [];

    formLabel.map((value, index) => {
      let cols = [];
      cols.push(
        <Table.Cell
          key={index}
          className={className('w-80 sticky left-0 z-9 border-r-2', {
            'font-bold': 'total' === value.key || 'kesimpulan' === value.key,
            'align-top': 'intervensi' === value.key,
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
          {ScreeningJatuhGeriatriLabel.headerLabel}
          <label className="mx-2">&bull;</label>
          {ScreeningJatuhGeriatriLabel.descriptionLabel}
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
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            {renderCellData()}
          </Table.Body>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
