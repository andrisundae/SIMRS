import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal, Icon, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import {
  DatatableServerSide,
  useModuleTrans,
  useDatatable,
  SelectedButton,
  CancelButton,
} from '@simrs/components';
import { useHistoryTempatTidur } from '@simrs/billing/src/fetcher';
import { staticConst } from '../../static';
import { selectedKunjunganSelector } from '../../reducer/selector';

const ListRuangan = ({ innerRef }) => {
  const t = useModuleTrans();
  const { id_kunjungan_unit: idKunjunganUnit } = useSelector(
    selectedKunjunganSelector
  );
  console.log(idKunjunganUnit);
  const { gridApi, emptySource, getRowNodeId, onGridReady } = useDatatable();
  const { data, isLoading, status } = useHistoryTempatTidur(idKunjunganUnit);

  const columns = [
    {
      headerName: t('tanggal'),
      field: 'tanggal',
      sortable: true,
      cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
      cellRenderer: 'dateRenderer',
      cellClass: 'ag-date-cell',
    },
    {
      headerName: t('ruangan'),
      field: 'ruangan',
    },
    {
      headerName: t('kelas'),
      field: 'kelas',
    },
    {
      headerName: t('dpjp'),
      field: 'dpjp',
    },
    {
      headerName: t('tarif'),
      field: 'tarif',
      cellRenderer: 'currencyRenderer',
      cellClass: 'ag-number-cell',
    },
    {
      headerName: t('hp'),
      field: 'hp',
    },
  ];

  const dataSource = useMemo(() => {
    if (!data || status === 'error' || status === 'loading') {
      return emptySource;
    }

    return {
      rowCount: null,
      getRows: (params) => {
        params.successCallback(data, data.length);
      },
    };
  }, [emptySource, data, status]);

  React.useEffect(() => {
    if (gridApi && idKunjunganUnit && status === 'success') {
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi, dataSource, status, idKunjunganUnit]);

  return (
    <DatatableServerSide
      dataSource={emptySource}
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_HISTORY_TEMPAT_TIDUR}
      navigateToSelect={true}
      rowBuffer={0}
      maxConcurrentDatasourceRequests={1}
      infiniteInitialRowCount={1}
      cacheBlockSize={100}
      containerHeight="200px"
      getRowNodeId={getRowNodeId}
      sizeColumnsToFit={true}
      // onRowDoubleClicked={this.onRowDoubleClickHandler}
      // onRowEntered={this.onRowEnteredHandler}
      onGridReady={onGridReady}
    />
  );
};

ListRuangan.propTypes = {
  data: PropTypes.object,
  innerRef: PropTypes.object,
  dataSource: PropTypes.object,
  onRowSelected: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <ListRuangan innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
