import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import className from 'classname';
import { Header, Divider, Icon, Table, Button } from 'semantic-ui-react';
import _ from 'lodash';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ScreeningADLLabel from './Label';
import DumpData from './DumpData';

export default function Index() {
  const formLabel = ScreeningADLLabel.formLabel;
  const [sample, setSample] = useState([]);

  function buildData() {
    let tempData = DumpData.data.skrining_adl;
    tempData.map((data, index) => {
      Object.keys(data).map((key) => {
        if (data[key].constructor === Object) {
          tempData[index][key] = `${data[key].value} (${data[key].keterangan})`;
        }
      });
    });

    setSample(tempData);
  }

  useEffect(() => {
    buildData();
  }, []);

  function renderHeaderData() {
    let headerRow1 = [],
      headerRow2 = [],
      headerRow3 = [];

    sample.map((data, index) => {
      headerRow1.push(
        <Table.HeaderCell key={index} className="text-center w-96">
          {data.tanggal} {data.jam}
        </Table.HeaderCell>
      );
      headerRow2.push(
        <Table.HeaderCell key={index} className="text-center w-96">
          {data.nama_personel}
        </Table.HeaderCell>
      );
      headerRow3.push(
        <Table.HeaderCell key={index} className="text-center w-96">
          {data.hapus ? (
            data.tanggal_hapus + ' ' + data.jam_hapus
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

  function renderCellData() {
    let rows = [];

    formLabel.map((value, index) => {
      let cols = [];
      cols.push(
        <Table.Cell
          key={index}
          className={className('w-80 sticky left-0 z-9 border-r-2', {
            'font-bold': 'total' === value.key || 'kesimpulan' === value.key,
          })}
        >
          {value.label}
        </Table.Cell>
      );

      sample.map((data, idx) => {
        cols.push(
          <Table.Cell
            key={`${index}_${idx}`}
            className={className('w-96 text-center', {
              'font-bold': 'total' === value.key || 'kesimpulan' === value.key,
            })}
          >
            {data[value.key]}
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
          {ScreeningADLLabel.headerLabel}
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
                rowSpan={3}
                className="w-80 sticky left-0 z-9 border-r-2"
              >
                Parameter
              </Table.HeaderCell>
              {renderHeaderData().headerRow1}
            </Table.Row>
            <Table.Row>{renderHeaderData().headerRow2}</Table.Row>
            <Table.Row>{renderHeaderData().headerRow3}</Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            {renderCellData()}
          </Table.Body>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
