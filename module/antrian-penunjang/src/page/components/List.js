import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Mousetrap from 'mousetrap';
import copy from 'copy-to-clipboard';
import _ from 'lodash';
import {
  DatatableServerSide,
  useModuleTrans,
  constDatatable,
  confirmation,
} from '@simrs/components';
import { useQueryClient } from 'react-query';
import { useListAntrianPenunjang } from '@simrs/billing/src/fetcher';
import { utils, formatter } from '@simrs/common';
import { staticConst } from '../../static';
// import { moduleSelector } from '../../redux/reducer/selector';
// import { ready } from '../../redux/reducer';

const List = ({ innerRef, params = {} }) => {
  const t = useModuleTrans();
  const history = useHistory();
  const queryClient = useQueryClient();
  const [enabled, setEnabled] = useState(false);
  // const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();
  const gridRef = useRef();

  const formattedParams = useMemo(() => {
    return utils.cleanBlankValue({
      ...params,
      start_date: formatter.dateFormatDB(params.start_date),
      end_date: formatter.dateFormatDB(params.end_date),
    });
  }, [params]);

  const { data, isLoading, status } = useListAntrianPenunjang(formattedParams, {
    enabled,
  });

  const reloadHandler = useCallback(() => {
    queryClient.invalidateQueries([
      '/billing/antrian/penunjang',
      formattedParams,
    ]);
  }, [formattedParams, queryClient]);

  const getRowNodeId = useCallback((row) => row.id, []);

  const [columns] = useState([
    {
      headerName: t('cito'),
      field: 'st_cito',
      valueFormatter: ({ value }) => {
        return value === 1 ? 'Ya' : 'Tidak';
      },
    },
    {
      headerName: t('tanggal_kunjungan'),
      field: 'tgl_mulai',
      sortable: true,
      cellStyle: { 'text-align': 'center' },
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('asal_pasien'),
      field: 'nama_unit_asal',
    },
    {
      headerName: t('tujuan_tempat_layanan'),
      field: 'nama_unit_layanan',
    },
    {
      headerName: t('no_antrian'),
      field: 'no_antrian',
    },
    {
      headerName: t('norm'),
      field: 'norm',
    },
    {
      headerName: t('nama_pasien'),
      field: 'nama_pasien',
    },
    {
      headerName: t('alamat_desa'),
      field: 'alamat',
    },
    {
      headerName: t('status_pasien'),
      field: 'nama_status_pasien',
    },
    {
      headerName: t('kelas'),
      field: 'nama_kelas',
    },
    {
      headerName: t('isi_permintaan'),
      field: 'permintaan',
    },
    {
      headerName: t('st_penunjang'),
      field: 'st_status_penunjang',
    },
    {
      headerName: t('dokter_tujuan'),
      field: 'nama_dokter_tujuan_penunjang',
    },
  ]);

  // const dataSource = useMemo(() => {
  //   if (!data || status === 'error' || status === 'loading') {
  //     return emptySource;
  //   }

  //   return {
  //     rowCount: null,
  //     getRows: (params) => {
  //       params.successCallback(data, data.length);
  //     },
  //   };
  // }, [emptySource, data, status]);

  // // Set datasource dari api
  // useEffect(() => {
  //   if (gridApi && data && status === 'success') {
  //     console.log('sdfdsf');
  //     gridApi.setDatasource(dataSource);
  //   }
  // }, [gridApi, dataSource, status, data]);

  // useEffect(() => {
  //   if (gridApi) {
  //     if (isLoading) {
  //       gridApi.showLoadingOverlay();
  //     } else {
  //       gridApi.hideOverlay();
  //     }
  //   }
  // }, [gridApi, isLoading]);

  const goToPemenuhan = useCallback(
    (item) =>
      history.push(
        `/billing/transaksi/penunjang/pemenuhan/${item.id}?route=_billing_transaksi_penunjang&st_status_penunjang=${item.st_status_penunjang}`
      ),
    [history]
  );

  const doubleClickRowHandler = useCallback(
    (params) => {
      const statusPenunjang = _.toUpper(params.data.st_status_penunjang);
      if (statusPenunjang === 'DIPENUHI') {
        confirmation({
          title: t(`common:dialog.confirmation.title`, false),
          message: `Permintaan ${params.data.permintaan} sudah dipenuhi, apakah ingin di perbaharui ?`,
          buttons: [
            t(`common:dialog.action.yes`, false),
            t(`common:dialog.action.no`, false),
          ],
          onOk: () => goToPemenuhan(params.data),
        });
      } else if (statusPenunjang === 'PERMINTAAN') {
        goToPemenuhan(params.data);
      }
    },
    [goToPemenuhan, t]
  );
  const copyRowHandler = useCallback((gridApi, data) => {
    copy(data.norm);
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      if (isLoading) {
        gridRef.current?.gridApi?.showLoadingOverlay();
      } else {
        gridRef.current?.gridApi?.hideOverlay();
      }
    }
  }, [isLoading, gridRef]);

  useEffect(() => {
    if (gridRef.current && enabled) {
      if (status === 'success' && _.isEmpty(data)) {
        gridRef.current?.gridApi?.showNoRowsOverlay();
      } else {
        if (!isLoading) {
          gridRef.current?.gridApi?.hideOverlay();
        }
      }
    }
  }, [data, isLoading, status, gridRef, enabled]);

  useEffect(() => {
    if (gridRef.current && !enabled) {
      setEnabled(true);
    }
  }, [enabled, gridRef]);

  const getRowClass = useCallback(({ data }) => {
    const status = _.toUpper(data.st_status_penunjang);
    if (status === 'DIPENUHI') {
      return 'text-red-600';
    } else if (status === 'DITOLAK') {
      return 'text-green-600';
    }
    return '';
  }, []);

  const selectedFirstRow = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.setFirstRowSelected();
    }
  }, []);

  useEffect(() => {
    const key = process.platform === 'darwin' ? 'ctrl' : 'alt';
    Mousetrap.bind(`${key}+r`, () => {
      reloadHandler();
    });

    Mousetrap.bind('f2', () => {
      selectedFirstRow();
    });

    return () => {
      Mousetrap.unbind(`${key}+r`);
      Mousetrap.unbind(`${key}+f2`);
    };
  }, [reloadHandler, selectedFirstRow]);

  return (
    <DatatableServerSide
      ref={gridRef}
      columns={columns}
      name={staticConst.TABLE_ANTRIAN_PENUNJANG}
      navigateToSelect={true}
      // rowBuffer={0}
      // maxConcurrentDatasourceRequests={1}
      // infiniteInitialRowCount={1}
      // cacheBlockSize={100}
      containerHeight="330px"
      getRowNodeId={getRowNodeId}
      // sizeColumnsToFit={true}
      // onGridReady={onGridReady}
      contextMenuItems={[
        {
          title: 'Copy Norm',
          icon: 'copy outline',
          onClick: copyRowHandler,
        },
      ]}
      onRowDoubleClicked={doubleClickRowHandler}
      rowModelType={constDatatable.rowModelType.clientSide}
      rowData={data || []}
      getRowClass={getRowClass}
    />
  );
};

List.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  params: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <List innerRef={ref || innerRef} {...props} />;
});

export default memo(Component, utils.compare);
