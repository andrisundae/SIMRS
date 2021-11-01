import React, { useState, useReducer, useRef, useEffect } from 'react';
import className from 'classname';
import CustomComponent from '@simrs/rekam-medis/src/custom-component/CustomComponent';
import ComponentFunction from './ComponentFunction';
import { Icon, Table } from 'semantic-ui-react';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ReactTable from '@simrs/rekam-medis/src/custom-component/ReactTable';

const MasterDiagnosisTempData = [
  {
    kode: '00.0',
    nama: 'Therapeutic ultrasound',
  },
  {
    kode: '00.01',
    nama: 'Therapeutic ultrasound of vessels of head and neck',
  },
  {
    kode: '00.02',
    nama: 'Therapeutic ultrasound of heart',
  },
  {
    kode: '00.03',
    nama: 'Therapeutic ultrasound of peripheral vascular vessels',
  },
  {
    kode: '00.09',
    nama: 'Other therapeutic ultrasound',
  },
];

export default function MasterDiagnosis(props) {
  const FormGroup = CustomComponent.SelectData.FormGroup;
  const diagnosisRef = useRef(null);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [data, setData] = useState(MasterDiagnosisTempData);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  let level = props.level;

  useEffect(() => {
    forceUpdate();
  }, [selectedData]);

  function doSearch(value) {
    ComponentFunction.DoFilterAutoComplete(data, value, (response) => {
      setFilteredData(response);
    });
  }

  const tableColumns = [
    {
      id: 'checkbox',
      Header: '',
      sort: false,
      className: className('text-center w-14', {}),
      Cell: ({ row }) => {
        const data = row.original,
          index = selectedData
            .map((e) => {
              return e.kode;
            })
            .indexOf(data.kode),
          iconName = index > -1 ? 'check square outline' : 'square outline';
        return <Icon name={iconName} size="large" />;
      },
    },
    {
      Header: 'Kode',
      accessor: 'kode',
      className: className('text-center', {}),
    },
    {
      Header: 'Diagnosis',
      accessor: 'nama',
      className: className('', {}),
    },
  ];

  return (
    <FormGroup
      ref={(selectData) => (diagnosisRef.current = selectData)}
      multiSelect
      name={props.name}
      form={props.form}
      label={props.label}
      level={level}
      style={props.style}
    >
      <div>
        {(() => {
          if (
            null !== diagnosisRef.current &&
            undefined !== diagnosisRef.current?.getSelectedData()
          ) {
            const selectedData = diagnosisRef.current.getSelectedData();
            return (
              <Table celled compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">Kode</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Nama</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {selectedData.map((v, i) => {
                    return (
                      <Table.Row key={i}>
                        <Table.Cell textAlign="center">{v.kode}</Table.Cell>
                        <Table.Cell>{v.nama}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            );
          }
        })()}
      </div>
      <>
        <ComponentFunction.AutoComplete
          id="diagnosis"
          placeholder="Ketikkan Kode atau Nama Diagnosis lalu tekan Enter / Tombol Cari untuk mencari..."
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              doSearch(e.target.value);
            }
          }}
          onButtonClick={(e) => {
            doSearch(e);
          }}
        />
        <ComponentFunction.RenderSelectedDataTable
          data={selectedData}
          columns={tableColumns}
          getRowProps={() => {
            return {
              className: 'bg-blue-600 text-white',
            };
          }}
          getCellProps={() => {
            return {
              className: 'bg-transparent border-white',
            };
          }}
          onRowClick={(data) => {
            let params = {
              kode: data.kode,
              nama: data.nama,
            };
            setSelectedData(
              ComponentFunction.onSelectItem(selectedData, params, {
                forceUpdate: forceUpdate,
                selectData: diagnosisRef,
              })
            );
          }}
        />
        <TableContainer maxHeightMinus="80">
          <ReactTable
            getProps={() => {
              id: 'parent';
            }}
            celled
            striped
            selectable
            compact
            data={filteredData}
            filterData={selectedData}
            filterDataKey="kode"
            reverseFilter={true}
            columns={tableColumns}
            cellRowClassName="cursor-pointer"
            getCellProps={() => {
              return {
                className: 'bg-transparent',
              };
            }}
            onRowClick={({ original }) => {
              let params = {
                kode: original.kode,
                nama: original.nama,
              };
              setSelectedData(
                ComponentFunction.onSelectItem(selectedData, params, {
                  forceUpdate: forceUpdate,
                  selectData: diagnosisRef,
                })
              );
            }}
            renderLoader={() => (
              <Table.Row>
                <Table.Cell colSpan={3} className="text-center py-5">
                  <Icon loading name="spinner" /> Memuat data..
                </Table.Cell>
              </Table.Row>
            )}
            renderNoData={() => (
              <Table.Row>
                <Table.Cell colSpan={3} className="text-center py-5">
                  Tidak ada data.
                </Table.Cell>
              </Table.Row>
            )}
          />
        </TableContainer>
      </>
    </FormGroup>
  );
}
