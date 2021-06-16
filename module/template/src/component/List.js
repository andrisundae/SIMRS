import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import className from 'classname';
import {
  Table,
  Icon,
  Header,
  Divider,
  Form,
  Input,
  Button,
} from 'semantic-ui-react';
import _ from 'lodash';
import TableContainer from '@module/antrian-rekam-medis/src/component/TableContainer';
import ReactTable, {
  RTCustomFilter,
} from '@module/antrian-rekam-medis/src/util/ReactTable';
import { useTemplateDokumen } from '@simrs/rekam-medis/src/fetcher/templateDokumen';
import {
  loaderIcon,
  checkedIcon,
} from '@module/antrian-rekam-medis/src/util/helper';
import dayjs from 'dayjs';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';

import { filterDokumenChange, filteredDataChange } from '../reducer/content';

export default function List() {
  const location = useLocation();
  const history = useHistory();
  const tableInstance = useRef(null);

  const { filterDokumen, filteredData } = useSelector((state) => state.content);
  const [filterState, setFilterState] = useState(false);
  const dispatch = useDispatch();

  const {
    data: templateData,
    isLoading: templateLoading,
  } = useTemplateDokumen();

  function doFilter(e) {
    if (e.constructor === String) {
      dispatch(filterDokumenChange(e));
      dispatch(
        filteredDataChange(RTCustomFilter(e, templateData, ['kode', 'nama']))
      );
      setFilterState(e ? true : false);
    } else {
      if (13 === e.keyCode) {
        dispatch(filterDokumenChange(e.target.value));
        dispatch(
          filteredDataChange(
            RTCustomFilter(e.target.value, templateData, ['kode', 'nama'])
          )
        );
        setFilterState(e.target.value ? true : false);
      }
    }
  }

  useEffect(() => {
    if (document.getElementById('filter_name')) {
      document.getElementById('filter_name').value = filterDokumen;
    }
  }, []);

  let tableFixed =
    !templateLoading &&
    templateData.length > 0 &&
    filterState &&
    filteredData.length > 0;

  return (
    <>
      <FooterActionsContainer>
        <div className="m-1">
          <Button as={Link} color="blue" to="/template/add" size="small">
            <Icon name="plus" />
            Tambah
          </Button>
        </div>
      </FooterActionsContainer>

      <Header className="mt-0">
        <Icon name="file alternate outline" className="text-lg -mt-4" />
        <Header.Content>Data Format Dokumen Rekam Medis</Header.Content>
      </Header>
      <Divider />
      <Form className="mb-2">
        <Form.Field>
          <Input
            id="filter_name"
            size="small"
            type="text"
            autoComplete="off"
            action={{
              icon: 'search',
              color: 'blue',
              onClick: () => {
                doFilter(document.getElementById('filter_name')?.value);
              },
            }}
            placeholder="Ketikkan Nama Template lalu tekan Enter atau tombol untuk mencari..."
            onKeyUp={(e) => doFilter(e)}
          />
        </Form.Field>
      </Form>
      <TableContainer>
        <ReactTable
          ref={tableInstance}
          celled
          striped
          compact
          isLoading={templateLoading}
          data={templateData}
          filterState={filterState}
          filterData={filteredData}
          filterDataKey="kode"
          noResultFilter={true}
          columns={[
            {
              id: 'perintah',
              Header: 'Perintah',
              className: 'text-center w-40',
              Cell: ({ row }) => {
                return (
                  <>
                    <Icon
                      name="edit outline"
                      bordered
                      inverted
                      color="blue"
                      className="cursor-pointer"
                      onClick={() => history.push('/template/edit')}
                    />
                    <Icon
                      name="copy outline"
                      bordered
                      inverted
                      color="blue"
                      className="cursor-pointer"
                    />
                    {!row.original.kodeTemplate && (
                      <Icon
                        name="trash alternate outline"
                        bordered
                        inverted
                        color="red"
                        className="cursor-pointer"
                      />
                    )}
                  </>
                );
              },
            },
            {
              Header: 'Tanggal & Pembuat',
              className: 'w-60',
              Cell: ({ row }) => {
                const rowData = row.original;
                return (
                  <>
                    {dayjs(rowData.tStamp).format('DD/MM/YYYY HH:mm')} <br />{' '}
                    {rowData.personel}
                  </>
                );
              },
            },
            {
              Header: 'Nama',
              style: { width: '65%' },
              accessor: 'nama',
            },
            {
              Header: 'Aktif',
              className: 'text-center w-24',
              Cell: ({ row }) => {
                return checkedIcon(row.original.aktif, {
                  customZero: {
                    name: 'close',
                    color: 'red',
                  },
                });
              },
            },
            {
              Header: 'Tanggal Hapus',
              className: 'text-center w-48',
              cellClasName: 'text-red-500',
              Cell: ({ row }) => {
                return (
                  row.original.stBatal === 1 &&
                  dayjs(row.original.tglBatal).format('DD/MM/YYYY HH:mm')
                );
              },
            },
          ]}
          tableClassName={className('', {
            'border-separate border-0 table-fixed': tableFixed,
          })}
          headerClassName={className('', {
            'block min-w-max sticky top-0 z-10 border-b-2': tableFixed,
          })}
          bodyClassName={className('', {
            'block min-w-max': tableFixed,
          })}
          renderLoader={() => (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center py-5">
                {loaderIcon} Memuat data..
              </Table.Cell>
            </Table.Row>
          )}
          renderNoData={() => (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center py-5">
                Tidak ada data.
              </Table.Cell>
            </Table.Row>
          )}
        />
      </TableContainer>
    </>
  );
}
