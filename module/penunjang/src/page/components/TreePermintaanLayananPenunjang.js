import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Grid, Segment, Input } from 'semantic-ui-react';
import _ from 'lodash';

import { useModuleTrans, CancelButton, SaveButton } from '@simrs/components';
import { formatter } from '@simrs/common';
import { useDebounceValue } from '@simrs/components/src/hook';
import { usePermintaanLayanan } from '@simrs/billing/src/fetcher/penunjang';
// import { useKunjunganAktifRawatInap } from '@simrs/billing/src/fetcher';
// import { staticConst } from '../../static';
import Table from './Table';
import IndeterminateCheckbox from './IndeterminateCheckbox';

const TreePermintaanLayananPenunjang = ({
  innerRef,
  onRowSelected,
  show,
  onHide,
  idPasien,
}) => {
  // const methods = useForm();
  const t = useModuleTrans();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [search, setSearch] = useState('');

  const { data: dataPermintaan } = usePermintaanLayanan();

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
        isSelected: selectedRowIds.includes(row.id_kelompok)
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
            isSelected: selectedRowIds.includes(item.id)
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
      // {
      //   // Build our expander column
      //   id: 'expander', // Make sure it has an ID
      //   // Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
      //   //   <span {...getToggleAllRowsExpandedProps()}>
      //   //     {isAllRowsExpanded ? (
      //   //       <Icon name="minus square outline" />
      //   //     ) : (
      //   //       <Icon name="plus square outline" />
      //   //     )}
      //   //   </span>
      //   // ),
      //   Cell: ({ row }) =>
      //     // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
      //     // to build the toggle for expanding a row
      //     row.canExpand ? (
      //       <span
      //         {...row.getToggleRowExpandedProps({
      //           style: {
      //             // We can even use the row.depth property
      //             // and paddingLeft to indicate the depth
      //             // of the row
      //             paddingLeft: `${row.depth * 2}rem`,
      //           },
      //         })}
      //       >
      //         {row.isExpanded ? (
      //           <Icon size="large" name="minus square outline" />
      //         ) : (
      //           <Icon size="large" name="plus square outline" />
      //         )}
      //       </span>
      //     ) : null,
      //   textAlign: 'center',
      //   width: 30,
      //   collapsing: true,
      // },
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
      size={700}
      // style={{ width: 500 }}
    >
      <Modal.Header className="p-3">
        <Icon name="plus" />
        {t('permintaan_layanan_penunjang')}
      </Modal.Header>
      <Modal.Content scrolling className="bg-gray-100 px-5 pb-8 shadow-lg">
        {/* <div className="">
          
        </div> */}
        <Segment className="w-full">
          {/* <Tree
            // ref={treeRef}
            // defaultExpandAll={false}
            defaultExpandAll
            // defaultExpandedKeys={defaultExpandedKeys}
            // motion={motion}
            height={600}
            itemHeight={20}
            style={{ border: '1px solid #000' }}
            treeData={getTreeData()}
          /> */}
          <Grid.Row className="mb-5">
            <Grid.Column>
              <Input fluid value={search} onChange={handleInputChange} />
            </Grid.Column>
          </Grid.Row>
          <Table
            columns={columns}
            data={filteredData}
            onSelectedRow={selectedChangeHandler}
          />
        </Segment>
        {/* <TreeView
          // ref={this.tree}
          className="myCls"
          showLine
          navigation
          selectable
          // onExpand={this._onExpand}
          // onSelect={this._onSelect}
          treeData={getTreeData()}
          // selectedKeys={selectedKeys}
          // expandedKeys={expandedKeys}
          // disabled={!isDisableForm}
        /> */}
      </Modal.Content>
      <Modal.Actions className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <SaveButton />
          <CancelButton onClick={onHide} />
        </div>
      </Modal.Actions>
    </Modal>
  );
};

TreePermintaanLayananPenunjang.propTypes = {
  data: PropTypes.object,
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
