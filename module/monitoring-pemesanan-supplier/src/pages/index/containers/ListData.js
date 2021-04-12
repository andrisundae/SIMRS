import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { Trans } from 'react-i18next';

import { DatatableServerSide } from '@simrs/components';

import { filterMaster, listData } from '../redux/selector';

import { tableName } from '../../static';
import localActions from '../redux/actions';

const useDatatable = () => {
  const [gridApi, setGridApi] = useState(null);

  const getRowNodeId = (row) => row.id;
  const emptySource = {
    rowCount: null,
    getRows: (rowParams) => rowParams.successCallback([], 0),
  };
  const gridReadyHandler = useCallback(
    (params) => {
      setGridApi(params.api);
      params.api.setDatasource(emptySource);
    },
    [emptySource]
  );

  return {
    gridApi,
    setGridApi,
    getRowNodeId,
    onGridReady: gridReadyHandler,
  };
};

const linkTo = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const { url } = useRouteMatch();

  const handleSelect = () => {
    dispatch(localActions.onSelectedData({ data }));
  };

  return (
    <Link to={`${url}/${props.value}`}>
      <button
        className="ui primary button"
        style={{ padding: '5px 5px', fontSize: 10 }}
        onClick={handleSelect}
      >
        <Trans i18nKey="_farmasi_informasi_monitoring_pemesanan:label.btn.detail_penerimaan" />
      </button>
    </Link>
  );
};

const ListData = ({ trans, resource, dataSource }) => {
  const dispatch = useDispatch();
  const { gridApi, getRowNodeId, onGridReady } = useDatatable();
  const filter = useSelector(filterMaster);
  const list = useSelector(listData);

  const tableRef = {
    listData: useRef(),
  };

  const columnDefs = () => {
    return [
      {
        headerName: trans(`header.column.no`),
        field: 'no',
        cellRenderer: 'loadingRenderer',
        sortable: false,
        width: 70,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      },
      {
        headerName: trans('header.column.no_pemesanan'),
        field: 'no_transaksi',
        sortable: true,
        width: 200,
      },
      {
        headerName: trans('header.column.tanggal'),
        field: 'tanggal_transaksi',
        sortable: true,
        cellStyle: { 'text-align': 'center' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
        width: 110,
      },
      {
        headerName: trans('header.column.unit_pemesan'),
        sortable: true,
        field: 'nama_unit',
      },
      {
        headerName: trans('header.column.supplier'),
        field: 'nama_supplier',
        sortable: true,
      },
      {
        headerName: trans('header.column.status_terpenuhi'),
        sortable: true,
        field: 'status_terpenuhi',
      },
      {
        headerName: trans('header.column.detail_pemesanan'),
        sortable: true,
        field: 'id',
        cellStyle: { 'text-align': 'center' },
        cellRenderer: 'linkTo',
        width: 90,
      },
    ];
  };

  const filteredSource = {
    rowCount: null,
    getRows: (rowParams) => {
      let data = list;

      if (data.length > 0 && filter.idSupplier) {
        data = data.filter((x) => x.id_supplier === filter.idSupplier);
      }

      if (data.length > 0 && filter.idUnitPemesan) {
        data = data.filter((x) => x.id_unit === filter.idUnitPemesan);
      }

      rowParams.successCallback(data, data.length);
    },
  };

  useEffect(() => {
    if (gridApi && !filter.idSupplier && !filter.idUnitPemesan) {
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi, filter.idSupplier, dataSource, !filter.idUnitPemesan]);

  useEffect(() => {
    if (gridApi && (filter.idSupplier || filter.idUnitPemesan)) {
      gridApi.setDatasource(filteredSource);
    }
  }, [filter.idSupplier, gridApi, filter.idUnitPemesan, filteredSource]);

  return (
    <Fragment>
      <DatatableServerSide
        ref={tableRef.listData}
        columns={columnDefs()}
        name={tableName.PEMESANAN}
        navigateToSelect={false}
        rowBuffer={0}
        maxConcurrentDatasourceRequests={1}
        infiniteInitialRowCount={1}
        cacheBlockSize={25}
        frameworkComponents={{
          linkTo: linkTo,
        }}
        containerHeight="335px"
        sizeColumnsToFit={true}
        onGridReady={onGridReady}
        getRowNodeId={getRowNodeId}
      />
    </Fragment>
  );
};

export default ListData;
