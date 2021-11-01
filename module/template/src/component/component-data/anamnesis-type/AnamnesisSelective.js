import React, { useState, useRef, useEffect } from 'react';
import className from 'classname';
import { Icon, Table } from 'semantic-ui-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import CustomComponent from '@simrs/rekam-medis/src/custom-component/CustomComponent';
import ComponentFunction from '../ComponentFunction';
import { AnamnesisLabel } from '../../../LabelData';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ReactTable from '@simrs/rekam-medis/src/custom-component/ReactTable';
import { BuildAnamnesisParams } from '../anamnesis';

export default function AnamnesisSelective(props) {
  const FormGroup = CustomComponent.SelectData.FormGroup;
  const anamnesisRef = useRef(null);
  const nl2br = ComponentFunction.nl2br;

  const { data, forceUpdate } = props.params;
  const [selectedData, setSelectedData] = useState({});
  const [formatedData, setFormatedData] = useState([]);

  let level = props.level;

  useEffect(() => {
    const buildData = data.map((v) => {
      return BuildAnamnesisParams(v, props);
    });
    setFormatedData(buildData);
  }, []);

  useEffect(() => {
    forceUpdate();
  }, [selectedData]);

  function renderShowData(obj, customDataLabel = null) {
    var className = undefined !== obj.className ? obj.className : '',
      selectedData = obj.selectedData,
      params = undefined !== obj.params ? obj.params : '',
      customStyle = undefined !== obj.customStyle ? obj.customStyle : '';

    var styles = {
      color: '#fff',
      backgroundColor: '#337ab7',
    };

    if ('' === params) {
      let customKeys = `${
        null !== customDataLabel ? _.toLower(customDataLabel) : ''
      }${_.toLower(className)}`;
      return nl2br(customDataLabel);
      // return (
      //   <span key={customKeys} className={className} style={customStyle}>
      //     {nl2br(customDataLabel)}
      //   </span>
      // );
    } else {
      var property = Object.keys(params.keyValue)[0],
        dataLabel =
          null === customDataLabel
            ? params.keyValue[property]
            : customDataLabel,
        index = params.index;

      params['forceUpdate'] = forceUpdate;

      return nl2br(dataLabel);

      // return (
      //   <div
      //     key={`${property}${index}`}
      //     className={`${className} border`}
      //     style={
      //       selectedData[0] !== undefined &&
      //       selectedData[0].key === index &&
      //       selectedData[0].hasOwnProperty(property)
      //         ? styles
      //         : {}
      //     }
      //     onClick={() => {
      //       console.log(params)
      //       // anamnesisRef.current.onSelectCell(params);
      //     }}
      //   >
      //     {nl2br(dataLabel)}
      //   </div>
      // );
    }
  }

  function buildSelectedParams(data, index, keyValue) {
    var uniqueKey = {
      kode: data.kode,
      tempat_layanan: data.tempat_layanan,
      kode_ppa: data.kode_ppa,
      time_stamp: data.time_stamp,
      nama_personel: data.nama_personel,
    };

    return {
      index: index,
      uniqueKey: uniqueKey,
      keyValue: {
        [keyValue]:
          data[keyValue] instanceof Array
            ? data[keyValue].join('\n')
            : data[keyValue],
      },
    };
  }

  console.log(formatedData);

  return (
    <FormGroup
      ref={(selectData) => (anamnesisRef.current = selectData)}
      selective
      name={props.name}
      form={props.form}
      label={props.label}
      level={level}
      style={props.style}
    >
      <div>
        {(() => {
          if (
            null !== anamnesisRef.current &&
            undefined !== anamnesisRef.current?.getSelectedData()
          ) {
            const selectedData = anamnesisRef.current.getSelectedData();
            return null;
          }
        })()}
      </div>
      <>
        <TableContainer maxHeightMinus="80">
          <ReactTable
            celled
            striped
            selected
            compact
            data={formatedData}
            columns={[
              {
                Header: 'Tempat Layanan',
                accessor: 'tempat_layanan',
                className: className('cursor-not-allowed text-center w-60', {}),
              },
              {
                Header: 'Kelas',
                accessor: 'kelas',
                className: className('cursor-not-allowed text-center w-40', {}),
              },
              {
                Header: 'PPA',
                className: className('cursor-not-allowed text-center w-40', {}),
                Cell: ({ row }) => {
                  const data = row.original;
                  return _.startCase(data.status_ppa.kode);
                },
              },
              {
                Header: 'Tanggal & Pelaksana',
                className: className('cursor-not-allowed w-96', {}),
                Cell: ({ row }) => {
                  const data = row.original;
                  return (
                    <span>
                      {data.time_stamp}
                      <br />
                      {data.nama_personel}
                    </span>
                  );
                },
              },
              {
                Header: 'Sumber Informasi',
                className: className('text-center w-80', {}),
                dataKey: 'sumber_informasi',
                Cell: ({ row }) => {
                  const data = row.original;
                  return renderShowData({
                    selectedData: selectedData,
                    params: buildSelectedParams(
                      data,
                      row.index,
                      'sumber_informasi'
                    ),
                  });
                },
              },
              {
                Header: 'Keluhan Utama',
                className: className('text-center w-106', {}),
                dataKey: 'keluhan_utama',
                Cell: ({ row }) => {
                  const data = row.original;
                  return renderShowData({
                    selectedData: selectedData,
                    params: buildSelectedParams(
                      data,
                      row.index,
                      'keluhan_utama'
                    ),
                  });
                },
              },
            ]}
            getRowProps={(row) => {
              const data = row.original,
                isSelected = data.kode === selectedData.kode;
              return {
                className: className('cursor-pointer', {
                  'bg-blue-600 text-white': isSelected,
                }),
              };
            }}
            getCellProps={(cell) => {
              const rowData = cell.row.original,
                isSelected = rowData.kode === selectedData.kode;
              return {
                onClick: () => {
                  console.log(cell);
                },
                className: className('bg-transparent', {
                  'border-white': isSelected,
                }),
              };
            }}
            // onRowClick={({ original }) => {
            //   const params = BuildAnamnesisParams(original, props)
            //   setSelectedData(
            //     ComponentFunction.onSelectItem(selectedData, params, {
            //       forceUpdate: forceUpdate,
            //       selectData: anamnesisRef
            //     })
            //   )
            // }}
            tableClassName={className(
              'border-separate border-0 table-fixed',
              {}
            )}
            headerClassName={className(
              'block min-w-max sticky top-0 z-10 border-b-2',
              {}
            )}
            bodyClassName={className('block min-w-max', {})}
            renderLoader={() => (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center py-5">
                  <Icon loading name="spinner" /> Memuat data..
                </Table.Cell>
              </Table.Row>
            )}
            renderNoData={() => (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center py-5">
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
