import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classname';
import { useSelector, useDispatch } from 'react-redux';
import {
  Message,
  Header,
  Divider,
  Table,
  Input,
  Dropdown,
  Button,
} from 'semantic-ui-react';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ReactTable, {
  RTCustomFilter,
} from '@simrs/rekam-medis/src/custom-component/ReactTable';
import { loaderIcon } from '@module/antrian-rekam-medis/src//util/helper';
import { useAntrianPasienPulang } from '@simrs/rekam-medis/src/fetcher/antrianPasienPulang';

export default function ContentPasienPulang() {
  const history = useHistory();
  const tableInstance = useRef(null);

  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const { filter, fragment } = useSelector((state) => state.pasienpulang);
  const dispatch = useDispatch();

  const {
    data: antrianKlaimData,
    isLoading: antrianKlaimLoading,
  } = useAntrianPasienPulang({
    kodeJenisLayanan: fragment.kode_jenis_layanan,
  });

  useEffect(() => {
    if (undefined !== antrianKlaimData.tempatLayanans) {
      const dts = Object.keys(
        antrianKlaimData?.tempatLayanans?.['003001']?.kunjunganTLs
      ).map((k) => {
        return antrianKlaimData?.tempatLayanans?.['003001']?.kunjunganTLs[k];
      });

      setData(dts);
    }
  }, [antrianKlaimLoading]);

  function doFilter(e) {
    if (e.constructor === String) {
      setFilteredData(RTCustomFilter(e, data, ['norm', 'pasien']));
    } else {
      if (13 === e.keyCode) {
        setFilteredData(
          RTCustomFilter(e.target.value, data, ['norm', 'pasien'])
        );
      }
    }
  }

  let tableFixed = false; //!antrianKlaimLoading && data.length > 0;

  return (
    <div className="col-start-2 col-span-full p-4 overflow-y-auto">
      <Message className="font-bold bg-blue-500 text-white">
        Entri data pasien pulang hanya bisa dilakukan melalui halaman ini.
      </Message>
      <div>
        <Header className="mt-2 text-base float-left">IGD</Header>
        <Input
          id="filter_norm"
          className="float-right"
          size="small"
          type="text"
          autoComplete="off"
          action={{
            icon: 'search',
            color: 'blue',
            onClick: () => {
              doFilter(document.getElementById('filter_norm')?.value);
            },
          }}
          placeholder="No. RM"
          onKeyUp={(e) => doFilter(e)}
        />
      </div>
      <Divider className="clear-both" />
      <TableContainer maxHeightMinus="80">
        <ReactTable
          ref={tableInstance}
          celled
          striped
          compact
          useSorting
          isLoading={antrianKlaimLoading}
          data={data}
          filterData={filteredData}
          filterDataKey="kodekunjtl"
          hideColumns={[
            ...('002' !== fragment.kode_jenis_layanan ? ['resume_medis'] : []),
          ]}
          columns={[
            {
              id: 'iteration',
              Header: 'No',
              sort: false,
            },
            {
              id: 'perintah',
              Header: 'Perintah',
              sort: false,
              className: 'text-center w-40',
              Cell: ({ row }) => {
                return (
                  <Dropdown
                    as={Button}
                    basic
                    text="Pilih"
                    className="link item"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item>Entri Data</Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          const rowData = row.original;
                          const query = new URLSearchParams();
                          query.append('norm', rowData.norm);
                          query.append('pasien', rowData.pasien);
                          query.append('jenis_kelamin', rowData.jkl);
                          query.append('tempat_layanan', rowData.tl);

                          history.push({
                            pathname: '/antrian/pasien-pulang/dokumen-klaim',
                            search: query.toString(),
                          });
                        }}
                      >
                        Buat Dokumen Klaim
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                );
              },
            },
            {
              Header: 'No RM',
              sort: false,
              accessor: 'norm',
            },
            {
              Header: 'Pasien',
              sort: false,
              accessor: 'pasien',
            },
            {
              Header: 'DPJP',
              sort: false,
              accessor: 'dpjp',
            },
            {
              Header: 'Dokumen Klaim',
              sort: false,
              accessor: 'dokumen_klaim',
            },
            {
              Header: 'Resume Medis',
              sort: false,
              accessor: 'resume_medis',
            },
            {
              Header: 'Tanggal',
              sort: false,
              accessor: 'tanggal',
            },
            {
              Header: 'Penjamin',
              sort: false,
              accessor: 'penjamin',
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
    </div>
  );
}
