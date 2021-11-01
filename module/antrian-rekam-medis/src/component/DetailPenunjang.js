import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Header, Divider, Table, Icon } from 'semantic-ui-react';
import className from 'classname';
import _ from 'lodash';
import ReactTable from '@simrs/rekam-medis/src/custom-component/ReactTable';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import {
  jenisLayananChange,
  tempatLayananChange,
  sortChange,
} from '../reducer/content';
import {
  useAntrianKunjungan,
  useStatusMedisAntrian,
  useSidebarAntrianKunjungan,
  useSidebarJumlahPasien,
} from '@simrs/rekam-medis/src/fetcher/antrianKunjungan';

export default function DetailPenunjang() {
  const history = useHistory();

  const { jenisLayanan, tempatLayanan, sort } = useSelector(
    (state) => state.content
  );
  const dispatch = useDispatch();

  const {
    data: sidebarAntrianKunjunganData,
    isLoading: sidebarAntrianKunjunganLoading,
  } = useSidebarAntrianKunjungan();

  const {
    data: sidebarJumlahPasienData,
    isLoading: sidebarJumlahPasienLoading,
  } = useSidebarJumlahPasien();

  const {
    data: antrianKunjunganData,
    isLoading: antrianKunjunganLoading,
    mutate: antrianKunjunganMutate,
  } = useAntrianKunjungan({
    idTempatLayanan: tempatLayanan.id,
    penunjang: true,
  });

  useEffect(() => {
    if (!sidebarAntrianKunjunganLoading && !sidebarJumlahPasienLoading) {
      if (sidebarAntrianKunjunganData.penunjang.length > 0) {
        let tempData = [];
        sidebarAntrianKunjunganData.penunjang.map((v) => {
          v.unit_layanans.map((u) => {
            let indexQty = _.findIndex(sidebarJumlahPasienData, [
              'unit_id',
              u.id,
            ]);
            if (-1 < indexQty) {
              tempData.push({ ...u, jenisLayanan: v.alias });
            }
          });
        });
        dispatch(jenisLayananChange(tempData[0].jenisLayanan));
        dispatch(tempatLayananChange(tempData[0]));
      }
    }
  }, [sidebarAntrianKunjunganLoading, sidebarJumlahPasienLoading]);

  const loaderIcon = <Icon loading name="spinner" />;
  let tableFixed =
    !antrianKunjunganLoading &&
    undefined !== antrianKunjunganData &&
    antrianKunjunganData.length > 0;

  return (
    <Fragment>
      <Header className="mt-0">{tempatLayanan.nama}</Header>
      <Divider />
      <TableContainer maxHeightMinus="80">
        <ReactTable
          celled
          striped
          selectable
          sortable
          compact
          useSorting
          isLoading={antrianKunjunganLoading}
          data={antrianKunjunganData}
          columns={[
            {
              id: 'iteration',
              Header: '#',
              sort: false,
              className: className(
                'text-center hover:bg-gray-50 cursor-default w-14',
                {
                  'sticky left-0 z-9': tableFixed,
                }
              ),
            },
            {
              Header: 'No. RM',
              accessor: 'norm',
              className: className('text-center w-28', {
                'sticky left-14 z-9': tableFixed,
              }),
            },
            {
              Header: 'Nama Pasien',
              accessor: 'pasien',
              className: className('w-96', {
                'sticky z-9 border-r-2': tableFixed,
              }),
              style: {
                left: tableFixed ? '10.5rem' : '',
              },
            },
            {
              Header: 'Asal',
              accessor: 'asal',
              className: 'w-60',
            },
            {
              Header: 'Permintaan',
              accessor: 'tanggal',
              className: 'text-center w-44',
            },
            {
              Header: 'Isi Hasil',
              accessor: 'tanggal_isi_hasil',
              className: 'text-center w-44',
            },
            {
              Header: 'Interpretasi',
              accessor: 'tanggal_interpretasi',
              className: 'text-center w-44',
            },
            {
              Header: 'Publikasi',
              accessor: 'tanggal_publikasi',
              className: 'text-center w-44',
            },
          ]}
          tableClassName={className('', {
            'border-separate border-0 table-fixed': tableFixed,
          })}
          headerClassName={className('', {
            'block min-w-max sticky top-0 z-10 border-b-2': tableFixed,
          })}
          bodyClassName={className('', {
            'block min-w-max': true === tableFixed,
          })}
          cellRowClassName="cursor-pointer"
          onRowClick={() => history.push('/detail-rekam-medis/penunjang')}
          renderLoader={() => (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center py-5">
                {loaderIcon} Memuat data..
              </Table.Cell>
            </Table.Row>
          )}
          renderNoData={() => (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center py-5">
                Tidak ada data.
              </Table.Cell>
            </Table.Row>
          )}
        />
      </TableContainer>
    </Fragment>
  );
}
