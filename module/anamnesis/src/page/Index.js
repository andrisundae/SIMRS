import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import className from 'classname';
import _ from 'lodash';
import dayjs from 'dayjs';
import {
  Header,
  Divider,
  Icon,
  Table,
  Button,
  Label,
  Modal,
} from 'semantic-ui-react';
import FooterActionsContainer from '@simrs/components/src/layout/FooterActionsContainer';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ReactTable from '@simrs/rekam-medis/src/custom-component/ReactTable';
import { useAnamnesis } from '@simrs/rekam-medis/src/fetcher/anamnesis';
import { detailDataChange } from '../reducer/anamnesis';

export default function Index() {
  const { detailData } = useSelector((state) => state.anamnesis);
  const dispatch = useDispatch();

  const tableInstance = useRef(null);
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState({});
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false);

  const { data: anamnesisData, isLoading: anamnesisLoading } = useAnamnesis({
    kodeKunjunganTL: 100,
  });

  let tableFixed =
    !anamnesisLoading &&
    undefined !== anamnesisData &&
    anamnesisData.length > 0;

  useEffect(() => {
    if (anamnesisData?.length > 0) {
      const tempData = [];
      anamnesisData.map((v) => {
        const obj = {
          tanggal: dayjs(v.tanggal).format('DD-MM-YYYY'),
          kelas: v.kelas,
          nama_tempat_layanan: v.nama_tempat_layanan,
        };

        if (_.findIndex(tempData, obj) === -1) {
          tempData.push(obj);
        }
      });

      if (tempData.length > 0) {
        tempData.map((v, i) => {
          const subs = [];
          anamnesisData.map((a) => {
            const obj = {
              tanggal: dayjs(a.tanggal).format('DD-MM-YYYY'),
              kelas: a.kelas,
              nama_tempat_layanan: a.nama_tempat_layanan,
            };

            if (JSON.stringify(v) === JSON.stringify(obj)) {
              subs.push(a);
            }
          });
          tempData[i].subRows = subs;
        });
      }
      setData(tempData);
    }
  }, [anamnesisData]);

  const defaultExpanded = data.map((element, index) => {
    return { [index]: true };
  });

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
        Anamnesis
      </Header>
      <Divider />
      <TableContainer>
        <ReactTable
          ref={tableInstance}
          celled
          striped
          sortable
          compact
          useSorting
          useCustomExpanded={true}
          isLoading={anamnesisLoading}
          data={data}
          defaultExpanded={defaultExpanded}
          defaultSorted={[{ id: 'tanggal', desc: true }]}
          columns={[
            {
              id: 'iteration',
              Header: '#',
              sort: false,
              colSpan: 5,
              className: className('text-center w-12', {
                'sticky left-0': tableFixed,
              }),
              customCellClassName: 'bg-gray-100 sticky top-11 z-10',
              customCell: (data) => {
                return (
                  <Label
                    ribbon
                    color="teal"
                    className="sticky -ml-8 -left-4 z-10"
                  >
                    {data.nama_tempat_layanan} <span className="mx-1">•</span>{' '}
                    Kelas {data.kelas} <span className="mx-1">•</span>{' '}
                    {data.tanggal}
                  </Label>
                );
              },
            },
            {
              id: 'perintah',
              Header: 'Perintah',
              sort: false,
              className: className('text-center w-28', {
                'sticky left-12': tableFixed,
              }),
              Cell: ({ row }) => {
                if (row.depth > 0) {
                  const rowData = row.original;
                  return (
                    <>
                      <Button
                        as={Link}
                        icon="folder open"
                        color="blue"
                        size="mini"
                        to="/detail"
                        onClick={() => {
                          dispatch(detailDataChange(rowData));
                          // localStorage.setItem(
                          //   'anamnesis-detail-data',
                          //   JSON.stringify(rowData)
                          // );
                        }}
                      />
                      <Button
                        icon="trash alternate"
                        color="red"
                        size="mini"
                        className="ml-2"
                        onClick={() => {
                          setDeleteData(rowData);
                          setDeleteConfirmIsOpen(true);
                        }}
                      />
                    </>
                  );
                } else {
                  return null;
                }
              },
            },
            {
              Header: 'Tanggal',
              accessor: 'tanggal',
              className: className('text-center w-44', {
                'sticky left-40 border-r-2': tableFixed,
              }),
              Cell: ({ value }) => dayjs(value).format('DD-MM-YYYY HH:mm'),
            },
            {
              Header: 'Pelaksana',
              accessor: 'nama_personel',
              className: className('w-100'),
            },
            {
              Header: 'Keluhan Utama',
              accessor: 'keluhan_utama',
              className: className('w-106'),
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
                {<Icon loading name="spinner" />} Memuat data..
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

      {/* <TableContainer className="mt-5">
        <Table
          striped
          celled
          compact
          className="border-separate border-0 table-fixed"
        >
          <Table.Header className="block sticky top-0 z-10 min-w-max">
            <Table.Row>
              <Table.HeaderCell className="py-2.5 w-12 border-b-2">
                #
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-28 border-b-2 text-center">
                Perintah
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-40 border-b-2 text-center bg-gray-100">
                Tanggal <Icon name="caret down" />
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-72 border-b-2 ">
                Pelaksana
              </Table.HeaderCell>
              <Table.HeaderCell className="py-2.5 w-96 border-b-2">
                Keluhan Utama
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="block min-w-max">
            <Table.Row>
              <Table.Cell
                colSpan="5"
                className="bg-gray-100 sticky top-11 z-10"
                // style={{ width: 868 }}
              >
                <Label
                  ribbon
                  color="teal"
                  className="sticky -ml-8 -left-4 z-10"
                >
                  Mataram • Kelas 3 • 05/12/2020 17:34
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">1</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button
                  as={Link}
                  icon="folder open"
                  color="blue"
                  size="mini"
                  to="/detail"
                />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                  onClick={() => {
                    setDeleteConfirmIsOpen(true);
                  }}
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">Batuk</Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">2</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell
                colSpan="5"
                className="bg-gray-100 sticky top-11 z-10"
                // style={{ width: 868 }}
              >
                <Label
                  ribbon
                  color="teal"
                  className="sticky -ml-8 -left-4 z-10"
                >
                  Mataram • Kelas 3 • 04/12/2020 17:34
                </Label>
              </Table.Cell>
            </Table.Row>
            <Table.Row verticalAlign="top">
              <Table.Cell className="font-semibold w-12">3</Table.Cell>
              <Table.Cell className="text-center w-28">
                <Button icon="folder open" color="blue" size="mini" />
                <Button
                  icon="trash alternate"
                  color="red"
                  size="mini"
                  className="ml-2"
                />
              </Table.Cell>
              <Table.Cell className="text-center w-40">
                05/12/2020 17:34
              </Table.Cell>
              <Table.Cell className="w-72">
                Gigih Setijawan, dr., Sp.P., MARS.
              </Table.Cell>
              <Table.Cell className="w-96">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableContainer> */}

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        centered={false}
        size="tiny"
        open={deleteConfirmIsOpen}
        onClose={() => {
          setDeleteData({});
          setDeleteConfirmIsOpen(false);
        }}
      >
        <Modal.Header className="text-xl">
          <Icon name="trash alternate" className="mr-4" /> Hapus Anamnesis
          <div className="block mt-2">
            <Label color="teal" ribbon className="-left-10">
              {Object.keys(deleteData).length > 0 && (
                <span>
                  {deleteData?.nama_tempat_layanan}
                  <span className="mx-1">•</span>
                  Kelas {deleteData?.kelas}
                  <span className="mx-1">•</span>
                  {dayjs(deleteData?.tanggal).format('DD/MM/YYYY HH:mm')}
                </span>
              )}
            </Label>
          </div>
        </Modal.Header>
        <Modal.Content>
          {Object.keys(deleteData).length > 0 && (
            <>
              <p>
                Anamnesis "
                <strong>
                  {dayjs(deleteData?.tanggal).format('DD/MM/YYYY HH:mm')}
                  <span className="mx-1">•</span>
                  {deleteData?.nama_personel}
                </strong>
                " akan dihapus.
              </p>
              <p className="mt-4">Apakah anda yakin?</p>
            </>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            to="/"
            onClick={() => {
              setDeleteData({});
              setDeleteConfirmIsOpen(false);
            }}
          >
            <Icon name="times" />
            Batal
          </Button>
          <Button color="red" autoFocus>
            <Icon name="trash alternate" />
            Hapus
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}
