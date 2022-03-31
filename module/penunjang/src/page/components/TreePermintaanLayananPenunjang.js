import React, { useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Grid, Segment, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';

import { useModuleTrans, CancelButton, SaveButton } from '@simrs/components';
import { formatter, toastr } from '@simrs/common';
import { useDebounceValue } from '@simrs/components/src/hook';
import {
  usePermintaanLayanan,
  useCreatePermintaanPenunjang,
  // usePenunjangDetail,
} from '@simrs/billing/src/fetcher/penunjang';
import Table from './Table';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { postPermintaanSelector } from '../permintaan/redux/selectors';

const TreePermintaanLayananPenunjang = ({ show, onHide }) => {
  const searchRef = useRef();
  const queryClient = useQueryClient();
  const t = useModuleTrans();

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [search, setSearch] = useState('');
  const postPermintaan = useSelector(postPermintaanSelector);

  // const {
  //   data: penunjangDetails,
  //   isLoading: penunjangDetailsLoading,
  // } = usePenunjangDetail(data?.id);

  // const tindakanIds = useMemo(() => {
  //   if (!penunjangDetails) {
  //     return [];
  //   }
  //   return Array.isArray(penunjangDetails)
  //     ? penunjangDetails.map((row) => row.id_tindakan)
  //     : [];
  // }, [penunjangDetails]);

  
  // useEffect(() => {
  //   setSelectedRowIds(tindakanIds)
  // }, [tindakanIds])
  

  const { data: dataPermintaan, isLoading } = usePermintaanLayanan({
    id_unit_layanan: postPermintaan?.id_unit_layanan,
    id_kelas: postPermintaan?.id_kelas,
    id_instalasi: postPermintaan?.id_instalasi,
  });

  const permintaanMutation = useCreatePermintaanPenunjang();

  const submitPermintaanHandler = useCallback(() => {
    if (!selectedRowIds.length) {
      toastr.warning('Belum ada tindakan yang dipilih');
    } else {
      const detail = [];
      selectedRowIds.forEach((id) => {
        detail.push({
          id_tindakan: id,
          tgl: postPermintaan?.tanggal,
          tgl_lahir: postPermintaan?.tgl_lahir,
          id_unit_layanan: postPermintaan?.id_unit_layanan,
          id_kelas: postPermintaan?.id_kelas,
          jumlah: 1,
          id_pelaksana: 0,
        });
      });
      const params = { ...postPermintaan, detail };
      permintaanMutation.mutate(params, {
        onSuccess: () => {
          // console.log(response.data?.data?.data);
          toastr.success('Permintaan berhasil dilakukan.');
          queryClient.invalidateQueries([
            '/billing/transaksi/penunjang/view',
            { id: postPermintaan?.id_kunjungan_unit },
          ]);
          onHide();
          // history.go(
          //   `/billing/transaksi/penunjang/permintaan/${postPermintaan?.id_kunjungan_unit}`,
          //   { reload: true }
          // );
          // history.goBack();
        },
        onError: (error) => {
          toastr.warning(
            error && error.message ? error.message : 'Terjadi masalah server'
          );
        },
      });
    }
  }, [onHide, permintaanMutation, postPermintaan, queryClient, selectedRowIds]);

  const formattedData = useMemo(() => {
    if (!dataPermintaan) {
      return [];
    }
    const data = dataPermintaan.map((row) => {
      const newRow = {
        id: row.id_kelompok,
        nama: row.nama_kelompok,
        expanded: true,
        subRows: [],
        isSelected: selectedRowIds.includes(row.id_kelompok),
      };
      if (!_.isEmpty(row.layanan)) {
        const subRows = row.layanan.map((item) => {
          return {
            id: item.id,
            nama: item.nama_layanan,
            versi_tarif: item.nama_versi_tarif,
            kelas: item.nama_kelas,
            tgl_aktif_tarif: item.tgl_aktif_tarif,
            tarif: parseFloat(item.tarif),
            kode_panggil: item.kode_panggil,
            isSelected: selectedRowIds.includes(item.id),
          };
        });
        newRow.subRows = subRows;
      }
      return newRow;
    });
    return data;
  }, [dataPermintaan, selectedRowIds]);

  const debouncedSearch = useDebounceValue(search, 500);

  const handleInputChange = useCallback((e) => {
    const { value } = e.currentTarget;
    setSearch(value);
  }, []);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) {
      return formattedData;
    }

    const res = formattedData.reduce((acc, a) => {
      const ch =
        a.subRows &&
        a.subRows.filter((b) => b.nama.toLowerCase().includes(debouncedSearch));
      if (ch && ch.length) {
        acc.push({ ...a, subRows: ch });
      } else if (a.nama.includes(debouncedSearch)) {
        acc.push({ ...a });
      }
      return acc;
    }, []);
    return res;
  }, [debouncedSearch, formattedData]);

  const selectedChangeHandler = useCallback(
    (checked, row) => {
      const isExist = selectedRowIds.includes(row.original?.id);
      if (checked) {
        if (!isExist) {
          setSelectedRowIds((prevState) => [...prevState, row.original?.id]);
        }
      } else {
        if (isExist) {
          setSelectedRowIds((prevState) => {
            return prevState.filter((id) => id !== row.original?.id);
          });
        }
      }
    },
    [selectedRowIds]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tindakan',
        accessor: 'nama',
        Cell: ({ row }) => {
          const paddingLeft = !row.canExpand ? 3.6 : 1.5;
          return (
            <div
              className={`flex items-center h-10 relative`}
              style={{ paddingLeft: `${row.depth * paddingLeft}rem` }}
            >
              {row.canExpand ? (
                <span {...row.getToggleRowExpandedProps({})}>
                  {row.isExpanded ? (
                    <Icon
                      className="mr-0 text-gray-200"
                      size="large"
                      name="minus square outline"
                    />
                  ) : (
                    <Icon
                      className="mr-0 text-gray-200"
                      size="large"
                      name="plus square outline"
                    />
                  )}
                </span>
              ) : (
                <div>{''}</div>
              )}
              {row.canExpand && <div className="border-b w-5" />}
              {row.canExpand ? null : (
                <>
                  <div className="border-l h-10" />
                  <div className="border-b w-3" />
                </>
              )}
              <div className="flex items-center space-x-2">
                <div className="flex flex-col relative">
                  <IndeterminateCheckbox
                    {...row.getToggleRowSelectedProps()}
                    data={row}
                    onAfterChanged={selectedChangeHandler}
                  />
                  {row.canExpand && (
                    <div
                      className="border-l h-3 absolute"
                      style={{ left: 8, top: 17 }}
                    />
                  )}
                </div>
                <span className={`${row.canExpand ? 'text-lg font-bold' : ''}`}>
                  {row.values?.nama}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Kelas',
        accessor: 'kelas',
        Cell: ({ row }) => {
          if (row.canExpand) {
            return null;
          }
          return <span>{row.values.kelas}</span>;
        },
        textAlign: 'center',
      },
      {
        Header: 'Tarif',
        accessor: 'tarif',
        Cell: ({ row }) => {
          if (row.canExpand) {
            return null;
          }
          return <span>{formatter.currency(row.values.tarif)}</span>;
        },
        textAlign: 'right',
      },
      {
        Header: 'Tanggal Aktif',
        accessor: 'tgl_aktif_tarif',
        Cell: ({ row }) => {
          if (row.canExpand) {
            return null;
          }
          return (
            <span>
              {formatter.dateFormatClient(
                row.values.tgl_aktif_tarif,
                'DD/MM/YYYY'
              )}
            </span>
          );
        },
        textAlign: 'center',
      },
    ],
    [selectedChangeHandler]
  );

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="large"
    >
      <Modal.Header className="p-3">
        <Icon name="plus" />
        {t('permintaan_layanan_penunjang')}
      </Modal.Header>
      <Modal.Content scrolling className="bg-gray-100 px-5 pb-8">
        <Segment loading={isLoading || permintaanMutation.isLoading} className="w-full">
          <Grid.Row className="mb-5">
            <Grid.Column>
              <Input
                ref={searchRef}
                fluid
                value={search}
                onChange={handleInputChange}
              />
            </Grid.Column>
          </Grid.Row>
          <Table
            columns={columns}
            data={filteredData}
            onSelectedRow={selectedChangeHandler}
          />
        </Segment>
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <SaveButton
            loading={permintaanMutation.isLoading}
            onClick={submitPermintaanHandler}
          />
          <CancelButton onClick={onHide} />
        </div>
      </Modal.Actions>
    </Modal>
  );
};

TreePermintaanLayananPenunjang.propTypes = {
  data: PropTypes.array,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return (
    <TreePermintaanLayananPenunjang innerRef={ref || innerRef} {...props} />
  );
});

export default React.memo(Component);
