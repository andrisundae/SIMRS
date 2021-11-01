import React, { useState, useRef, useEffect } from 'react';
import className from 'classname';
import { Icon, Table } from 'semantic-ui-react';
import dayjs from 'dayjs';
import CustomComponent from '@simrs/rekam-medis/src/custom-component/CustomComponent';
import ComponentFunction from '../ComponentFunction';
import { AnamnesisLabel } from '../../../LabelData';
import TableContainer from '@simrs/rekam-medis/src/custom-component/TableContainer';
import ReactTable from '@simrs/rekam-medis/src/custom-component/ReactTable';
import { BuildAnamnesisParams } from '../anamnesis';

export default function AnamnesisMultiSelect(props) {
  const FormGroup = CustomComponent.SelectData.FormGroup;
  const anamnesisRef = useRef(null);

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

  return (
    <FormGroup
      ref={(selectData) => (anamnesisRef.current = selectData)}
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
            const nl2br = ComponentFunction.nl2br;
            let result = [];
            if (Object.keys(selectedData).length > 0) {
              result = [
                ComponentFunction.RenderSelectedData(
                  0,
                  AnamnesisLabel.sumber_informasi,
                  level + 1,
                  selectedData.sumber_informasi instanceof Array
                    ? nl2br(selectedData.sumber_informasi.join('\n'))
                    : selectedData.sumber_informasi
                ),
                ComponentFunction.RenderSelectedData(
                  1,
                  AnamnesisLabel.keluhan_utama,
                  level + 1,
                  nl2br(selectedData.keluhan_utama)
                ),
                ComponentFunction.RenderSelectedData(
                  2,
                  AnamnesisLabel.riwayat_penyakit_sekarang,
                  level + 1,
                  nl2br(selectedData.riwayat_penyakit_sekarang)
                ),
                ComponentFunction.RenderSelectedData(
                  3,
                  AnamnesisLabel.status_psikologi,
                  level + 1,
                  selectedData.status_psikologi
                ),
                ComponentFunction.RenderSelectedData(
                  4,
                  AnamnesisLabel.kelainan_fisik,
                  level + 1,
                  selectedData.kelainan_fisik
                ),
                ComponentFunction.RenderSelectedData(
                  5,
                  AnamnesisLabel.alat_bantu,
                  level + 1,
                  selectedData.alat_bantu
                ),
                ComponentFunction.RenderSelectedData(
                  6,
                  AnamnesisLabel.riwayat_penyakit_dahulu,
                  level + 1,
                  nl2br(selectedData.riwayat_penyakit_dahulu)
                ),
                ComponentFunction.RenderSelectedData(
                  7,
                  AnamnesisLabel.riwayat_alergi.parent,
                  level + 1,
                  ''
                ),
                ComponentFunction.RenderSelectedData(
                  8,
                  AnamnesisLabel.riwayat_alergi.obat,
                  level + 2,
                  selectedData.riwayat_alergi.obat
                ),
                ComponentFunction.RenderSelectedData(
                  9,
                  AnamnesisLabel.riwayat_alergi.makanan,
                  level + 2,
                  nl2br(selectedData.riwayat_alergi.makanan)
                ),
                ComponentFunction.RenderSelectedData(
                  10,
                  AnamnesisLabel.riwayat_alergi.lainnya,
                  level + 2,
                  nl2br(selectedData.riwayat_alergi.lainnya)
                ),
                ComponentFunction.RenderSelectedData(
                  11,
                  AnamnesisLabel.riwayat_alergi.reaksi_alergi,
                  level + 2,
                  nl2br(selectedData.riwayat_alergi_reaksi)
                ),
                ComponentFunction.RenderSelectedData(
                  12,
                  AnamnesisLabel.riwayat_obat_luar,
                  level + 1,
                  nl2br(selectedData.riwayat_obat)
                ),
                ComponentFunction.RenderSelectedData(
                  13,
                  AnamnesisLabel.riwayat_penyakit_keluarga,
                  level + 1,
                  nl2br(selectedData.riwayat_penyakit_keluarga)
                ),
                ComponentFunction.RenderSelectedData(
                  14,
                  AnamnesisLabel.riwayat_sosial.parent,
                  level + 1,
                  '' === selectedData.riwayat_lain.merokok ||
                    '' === selectedData.riwayat_lain.alkohol ||
                    '' === selectedData.riwayat_lain.obat_penenang ||
                    '' === selectedData.riwayat_lain.pekerjaan
                    ? ComponentFunction.EmptyLabel('ada')
                    : ''
                ),
                '' !== selectedData.riwayat_lain.merokok &&
                  ComponentFunction.RenderSelectedData(
                    15,
                    AnamnesisLabel.riwayat_sosial.merokok,
                    level + 2,
                    selectedData.riwayat_lain.merokok
                  ),
                '' !== selectedData.riwayat_lain.alkohol &&
                  ComponentFunction.RenderSelectedData(
                    16,
                    AnamnesisLabel.riwayat_sosial.alkohol,
                    level + 2,
                    selectedData.riwayat_lain.alkohol
                  ),
                '' !== selectedData.riwayat_lain.obat_penenang &&
                  ComponentFunction.RenderSelectedData(
                    17,
                    AnamnesisLabel.riwayat_sosial.obat_penenang,
                    level + 2,
                    selectedData.riwayat_lain.obat_penenang
                  ),
                '' !== selectedData.riwayat_lain.pekerjaan &&
                  ComponentFunction.RenderSelectedData(
                    18,
                    AnamnesisLabel.riwayat_sosial.lainnya,
                    level + 2,
                    selectedData.riwayat_lain.pekerjaan
                  ),
              ];
            }
            return result;
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
                id: 'checkbox',
                Header: '',
                sort: false,
                className: className('text-center w-14', {}),
                Cell: ({ row }) => {
                  const data = row.original,
                    isSelected = data.kode === selectedData.kode,
                    iconName = isSelected
                      ? 'check circle outline'
                      : 'circle outline';

                  return <Icon name={iconName} size="large" />;
                },
              },
              {
                Header: 'Tempat Layanan',
                accessor: 'tempat_layanan',
                className: className('text-center w-40', {}),
              },
              {
                Header: 'Kelas',
                accessor: 'kelas',
                className: className('text-center w-36', {}),
              },
              {
                Header: 'Tanggal & Pelaksana',
                className: className('w-60', {}),
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
                Header: 'Keluhan Utama',
                accessor: 'keluhan_utama',
                className: className('w-80', {}),
              },
              {
                Header: 'Riwayat Penyakit Sekarang',
                accessor: 'riwayat_penyakit_sekarang',
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
                className: className('bg-transparent', {
                  'border-white': isSelected,
                }),
              };
            }}
            onRowClick={({ original }) => {
              setSelectedData(
                ComponentFunction.onSelectItem(selectedData, original, {
                  forceUpdate: forceUpdate,
                  selectData: anamnesisRef,
                })
              );
            }}
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
