import React from 'react';
import PropTypes from 'prop-types';
import { DatatableServerSide, useModuleTrans } from '@simrs/components';
import { staticConst } from '../static';

const PelaksanaKomponenTable = ({
  dataSource,
  data,
  innerRef,
  onGetPelaksanaOptions,
}) => {
  const trans = useModuleTrans();
  const isEditable = (params) => {
    if (params.data && params.data.id_penanggung_jawab) {
      return false;
    }
    return true;
  };

  const columns = [
    {
      headerName: trans('komponen'),
      field: 'nama_komponen',
      cellRenderer: 'loadingRenderer',
      sortable: true,
    },
    {
      headerName: trans('keterangan'),
      field: 'keterangan',
      sortable: true,
    },
    {
      headerName: trans('spesialisasi'),
      field: 'id_spesialisasi',
      cellRenderer: (params) => {
        const options = params.options || [];
        const findSpesialisasi = options.find(
          (item) => item.value === params.value
        );
        if (findSpesialisasi) {
          return findSpesialisasi.label;
        }
        if (params.data && params.data.nama_spesialisasi) {
          return params.data.nama_spesialisasi;
        }
        return '-';
      },
      cellRendererParams: {
        options: data.spesialisasi,
      },
      cellEditor: 'dropdownSelectRenderer',
      cellEditorParams: {
        options: data.spesialisasi,
      },
      width: '200',
      editable: isEditable,
    },
    {
      headerName: trans('pelaksana'),
      field: 'id_pelaksana',
      cellRenderer: (params) => {
        const options =
          params.data && params.data.pelaksanaOptions
            ? params.data.pelaksanaOptions
            : [];
        const findPelaksana = options.find(
          (item) => item.value === params.value
        );
        if (findPelaksana) {
          return findPelaksana.label;
        }
        if (params.data && params.data.nama_pelaksana) {
          return params.data.nama_pelaksana;
        }
        return '-';
      },
      cellEditor: 'dropdownSelectRenderer',
      cellEditorParams: {
        options: 'pelaksanaOptions',
        onGuiAttached: (row) => onGetPelaksanaOptions(row),
      },
      width: '200',
      editable: isEditable,
    },
  ];

  const getRowNodeId = (row) => row.id_tindakan_komponen;

  React.useEffect(() => {
    if (innerRef.current) {
      const gridApi = innerRef.current.gridApi;
      if (gridApi) {
        gridApi.setDatasource({
          rowCount: null,
          getRows: (res) => res.successCallback(dataSource, dataSource.length),
        });
      }
    }
  }, [dataSource, innerRef]);

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_PELAKSANA_KOMPONEN}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={10}
      containerHeight="160px"
      getRowNodeId={getRowNodeId}
      autoSizeColumn={true}
    />
  );
};

PelaksanaKomponenTable.propTypes = {
  data: PropTypes.object,
  dataSource: PropTypes.array,
  onGetPelaksanaOptions: PropTypes.func,
  innerRef: PropTypes.object,
};

export default React.forwardRef((props, ref) => (
  <PelaksanaKomponenTable innerRef={ref} {...props} />
));
