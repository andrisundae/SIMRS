import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import className from 'classname';
import _ from 'lodash';
import DatePicker from '@simrs/components/src/input/DatePicker';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ReactTable from '@simrs/rekam-medis/src/custom-component/ReactTable';
import { checkedIcon } from '../util/helper';
import {
  jenisLayananChange,
  tempatLayananChange,
  tanggalChange,
  shiftChange,
  isPasienSayaChange,
  idDokterChange,
  sortChange,
} from '../reducer/content';
import {
  Header,
  Divider,
  Table,
  Input,
  Button,
  Label,
  Checkbox,
  Message,
  Icon,
  Form,
} from 'semantic-ui-react';
import {
  useAntrianKunjungan,
  useStatusMedisAntrian,
  useSidebarAntrianKunjungan,
  useSidebarJumlahPasien,
} from '@simrs/rekam-medis/src/fetcher/antrianKunjungan';

export default function DetailUmum() {
  const history = useHistory();
  const tableInstance = useRef(null);

  const {
    jenisLayanan,
    tempatLayanan,
    tanggal,
    shift,
    isPasienSaya,
    idDokter,
    sort,
  } = useSelector((state) => state.content);
  const dispatch = useDispatch();

  const [combineData, setCombineData] = useState([]);

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
  });

  const {
    data: statusMedisData,
    isLoading: statusMedisLoading,
  } = useStatusMedisAntrian({
    idTempatLayanan: tempatLayanan.id,
  });

  useEffect(() => {
    if (!sidebarAntrianKunjunganLoading && !sidebarJumlahPasienLoading) {
      if (sidebarAntrianKunjunganData.non_penunjang.length > 0) {
        let tempData = [];
        sidebarAntrianKunjunganData.non_penunjang.map((v) => {
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

  useEffect(() => {
    if (undefined !== statusMedisData && statusMedisData.length > 0) {
      if (
        undefined !== antrianKunjunganData &&
        antrianKunjunganData.length > 0
      ) {
        let tempData = antrianKunjunganData;
        tempData.map((v, i) => {
          let statusMedisIdx = _.findIndex(statusMedisData, [
            'kode_kunjungan_tl',
            v.kode_kunjungan_tl,
          ]);

          tempData[i].medis_anamnesis = checkedIcon(
            statusMedisData[statusMedisIdx].medis_anamnesis
          );
          tempData[i].medis_cppt = checkedIcon(
            statusMedisData[statusMedisIdx].medis_cppt
          );
          tempData[i].non_medis_anamnesis = checkedIcon(
            statusMedisData[statusMedisIdx].non_medis_anamnesis
          );
          tempData[i].non_medis_pemeriksaanUmum = checkedIcon(
            statusMedisData[statusMedisIdx].non_medis_pemeriksaan_umum
          );
          tempData[i].non_medis_pemeriksaanFisik = checkedIcon(
            statusMedisData[statusMedisIdx].non_medis_pemeriksaan_fisik
          );
          tempData[i].non_medis_cppt = checkedIcon(
            statusMedisData[statusMedisIdx].non_medis_cppt
          );
        });
        setCombineData(tempData);
      }
    }
    if (
      combineData.length > 0 &&
      (statusMedisLoading || antrianKunjunganLoading)
    ) {
      setCombineData([]);
    }
  }, [antrianKunjunganData, statusMedisData]);

  const loaderIcon = <Icon loading name="spinner" />;
  let tableFixed =
    !antrianKunjunganLoading &&
    undefined !== antrianKunjunganData &&
    antrianKunjunganData.length > 0 &&
    !statusMedisLoading &&
    statusMedisData.length > 0;

  return (
    <Fragment>
      <Header className="mt-0">{tempatLayanan.nama}</Header>
      <Divider />
      {'rawat_jalan' !== jenisLayanan && (
        <Message info icon onDismiss={() => {}}>
          <Icon name="info circle" />
          <Message.Content>
            <Message.Header>Informasi</Message.Header>
            <Message.List>
              <Message.Item>
                Status Pemeriksaan Umum dan CPPT{' '}
                {'rawat_inap' === jenisLayanan && 'dari Perawat / Bidan'}{' '}
                diperoleh berdasarkan shift.
              </Message.Item>
              {'rawat_inap' === jenisLayanan && (
                <Message.Item>
                  Tanda {checkedIcon(1)} (hitam) menunjukkan data diambil dari
                  ruangan saat ini, sedangkan tanda {checkedIcon(2, 'red')}{' '}
                  (merah) menunjukkan data diambil dari ruangan sebelumnya.
                </Message.Item>
              )}
            </Message.List>
          </Message.Content>
        </Message>
      )}
      <Form>
        <Form.Group inline>
          {'rawat_jalan' !== jenisLayanan && (
            <Fragment>
              <Form.Field>
                <label className="float-left mt-2.5">
                  Status berdasarkan:{' '}
                </label>
                {/* <Input type="date" className="float-left" /> */}
                <div className="inline-block p-0 border-0">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(tanggal)}
                    onChange={(date) =>
                      dispatch(tanggalChange(date.toString()))
                    }
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <Button
                  className={className('py-1.5 px-3 rounded-r-none ml-2 mr-0', {
                    'bg-blue-500 text-white font-bold': 'pagi' === shift,
                  })}
                  basic={'pagi' !== shift}
                  onClick={() => dispatch(shiftChange('pagi'))}
                >
                  Pagi{' '}
                  <Label className="ml-2" color="teal">
                    07:00 - 14:00
                  </Label>
                </Button>
                <Button
                  className={className('py-1.5 px-3 rounded-none mr-0', {
                    'bg-blue-500 text-white font-bold': 'siang' === shift,
                  })}
                  basic={'siang' !== shift}
                  onClick={() => dispatch(shiftChange('siang'))}
                >
                  Siang{' '}
                  <Label className="ml-2" color="teal">
                    07:00 - 21:00
                  </Label>
                </Button>
                <Button
                  className={className('py-1.5 px-3 rounded-l-none', {
                    'bg-blue-500 text-white font-bold': 'malam' === shift,
                  })}
                  basic={'malam' !== shift}
                  onClick={() => dispatch(shiftChange('malam'))}
                >
                  Malam{' '}
                  <Label className="ml-2" color="teal">
                    07:00 - 07:00
                  </Label>
                </Button>
                <Button
                  className="ml-3"
                  color="blue"
                  content="Tampilkan"
                  icon="search"
                />
              </Form.Field>
            </Fragment>
          )}
          {'rawat_jalan' === jenisLayanan && (
            <Form.Field>
              <Checkbox
                toggle
                checked={isPasienSaya}
                label={<label className="font-semibold">Pasien Saya</label>}
                onChange={(e, { checked }) => {
                  dispatch(isPasienSayaChange(checked));
                  dispatch(idDokterChange(checked ? '1712001' : ''));
                  // tableInstance.current.setGlobalFilter(checked ? '1712001' : '')
                  tableInstance.current.setFilter(
                    'kode_dokter',
                    checked ? '1712001' : ''
                  );
                }}
              />
            </Form.Field>
          )}
        </Form.Group>
      </Form>
      <TableContainer maxHeightMinus="80">
        <ReactTable
          ref={tableInstance}
          celled
          striped
          selectable
          sortable
          compact
          useSorting
          isLoading={
            antrianKunjunganLoading || statusMedisLoading ? true : false
          }
          data={combineData}
          defaultSorted={[{ id: 'tanggal', desc: true }]}
          hideColumns={['kode_dokter']}
          columns={[
            {
              Header: 'kode_dokter_hidden',
              accessor: 'kode_dokter',
            },
            {
              Header: '#',
              rowSpan: 3,
              columns: [
                {
                  Header: '#_hidden',
                  columns: [
                    {
                      id: 'iteration',
                      Header: '#_hidden',
                      sort: false,
                      className: className('text-center w-14', {
                        'sticky left-0 ': tableFixed,
                      }),
                    },
                  ],
                },
              ],
            },
            {
              Header: 'No. RM',
              rowSpan: 3,
              columns: [
                {
                  Header: 'norm_hidden',
                  columns: [
                    {
                      Header: 'norm_hidden',
                      accessor: 'norm',
                      className: className('text-center w-28', {
                        'sticky left-14 ': tableFixed,
                      }),
                    },
                  ],
                },
              ],
            },
            {
              Header: 'Nama',
              rowSpan: 3,
              columns: [
                {
                  Header: 'pasien_hidden',
                  columns: [
                    {
                      Header: 'pasien_hidden',
                      accessor: 'pasien',
                      className: className('w-96', {
                        'sticky ': tableFixed,
                      }),
                      style: {
                        left: tableFixed ? '10.5rem' : '',
                      },
                    },
                  ],
                },
              ],
            },
            {
              Header: 'Kelas',
              rowSpan: 3,
              columns: [
                {
                  Header: 'kelas_hidden',
                  columns: [
                    {
                      Header: 'kelas_hidden',
                      accessor: 'kelas',
                      className: className('text-center w-32', {
                        'sticky  border-r-2': tableFixed,
                      }),
                      style: {
                        left: tableFixed ? '34.5rem' : '',
                      },
                    },
                  ],
                },
              ],
            },
            {
              Header: 'DPJP',
              rowSpan: 3,
              columns: [
                {
                  Header: 'dpjp_hidden',
                  columns: [
                    {
                      Header: 'dpjp_hidden',
                      accessor: 'nama_dokter',
                      className: 'w-96',
                    },
                  ],
                },
              ],
            },
            {
              Header: 'Status',
              sort: false,
              columns: [
                {
                  Header: 'Medis',
                  sort: false,
                  columns: [
                    {
                      id: 'medisA',
                      Header: 'A',
                      sort: false,
                      accessor: 'medis_anamnesis',
                      className: 'text-center w-14',
                    },
                    {
                      id: 'medisCPPT',
                      Header: 'CPPT',
                      sort: false,
                      accessor: 'medis_cppt',
                      className: 'text-center w-16',
                    },
                  ],
                  className: 'text-center',
                },
                {
                  Header: 'Perawat/Bidan',
                  sort: false,
                  columns: [
                    {
                      id: 'nonMedisA',
                      Header: 'A',
                      sort: false,
                      accessor: 'non_medis_anamnesis',
                      className: 'text-center w-14',
                    },
                    {
                      Header: 'PU',
                      sort: false,
                      accessor: 'non_medis_pemeriksaanUmum',
                      className: 'text-center w-14',
                    },
                    {
                      Header: 'PF',
                      sort: false,
                      accessor: 'non_medis_pemeriksaanFisik',
                      className: 'text-center w-14',
                    },
                    {
                      id: 'nonMedisCPPT',
                      Header: 'CPPT',
                      sort: false,
                      accessor: 'non_medis_cppt',
                      className: 'text-center w-16',
                    },
                  ],
                  className: 'text-center',
                },
              ],
              className: 'text-center',
            },
            {
              Header: 'Tanggal',
              rowSpan: 3,
              columns: [
                {
                  Header: 'tanggal_hidden',
                  columns: [
                    {
                      Header: 'tanggal_hidden',
                      accessor: 'tanggal',
                      className: 'text-center w-40',
                    },
                  ],
                },
              ],
            },
            {
              Header: 'Penjamin',
              rowSpan: 3,
              columns: [
                {
                  Header: 'penjamin_hidden',
                  columns: [
                    {
                      Header: 'penjamin_hidden',
                      accessor: 'penjamin',
                      className: 'text-center w-60',
                    },
                  ],
                },
              ],
            },
            {
              Header: 'Alamat',
              rowSpan: 3,
              columns: [
                {
                  Header: 'alamat_hidden',
                  columns: [
                    {
                      Header: 'alamat_hidden',
                      accessor: 'alamat',
                      className: 'w-96',
                    },
                  ],
                },
              ],
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
          cellRowClassName="cursor-pointer"
          onRowClick={() => history.push('/detail-rekam-medis/umum')}
          renderLoader={() => (
            <Table.Row>
              <Table.Cell colSpan={14} className="text-center py-5">
                {loaderIcon} Memuat data..
              </Table.Cell>
            </Table.Row>
          )}
          renderNoData={() => (
            <Table.Row>
              <Table.Cell colSpan={14} className="text-center py-5">
                Tidak ada data.
              </Table.Cell>
            </Table.Row>
          )}
        />
      </TableContainer>
    </Fragment>
  );
}
