import React, { useCallback, memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  DatatableServerSide,
  useModuleTrans,
  constDatatable,
} from '@simrs/components';
import { useTindakanLain } from '@simrs/billing/src/fetcher/tindakanLain';
import { select as onSelect, cancel, add } from '../index/redux/slice';
import {
  selectedSelector,
  statusFormSelector,
  disabledElement,
} from '../index/redux/selectors';
import { staticConst } from '../../static';

const layananLainGetter = (params) => {
  if (!params.data) {
    return '';
  }

  return params.data?.layanan_lain?.nama;
};

const ListTindakanLainDetail = ({ innerRef }) => {
  const dispatch = useDispatch();
  const t = useModuleTrans();
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const disabledGrid = useSelector((state) =>
    disabledElement(state, staticConst.TABLE_TINDAKAN_LAIN_DETAIL)
  );

  const { data } = useTindakanLain(
    { id: selected.id },
    { enabled: !!selected.id }
  );

  const getRowNodeId = useCallback((row) => row.id, []);

  const columns = useMemo(() => {
    return [
      {
        headerName: t('nama'),
        field: 'nama',
        valueGetter: layananLainGetter,
      },
      {
        headerName: t('layanan'),
        field: 'layanan',
      },
      {
        headerName: t('jumlah'),
        field: 'jumlah',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t('tarif'),
        field: 'tarif',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t('total'),
        field: 'total',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t('keterangan'),
        field: 'keterangan',
      },
    ];
  }, []);

  const rowSelectedHandler = useCallback(
    (params) => {
      if (params.node.isSelected()) {
        dispatch(onSelect(params.data));
      }
    },
    [dispatch]
  );

  // const modelUpdatedHandler = useCallback(
  //   (params) => {
  //     if (statusForm === onSelect.type && !_.isEmpty(selected)) {
  //       const node = params.api.getRowNode(selected.id);
  //       if (node) {
  //         if (!node.isSelected()) {
  //           innerRef.current?.selectRow(selected.id);
  //         }
  //       }
  //     }
  //   },
  //   [innerRef, selected, statusForm]
  // );

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_TINDAKAN_LAIN_DETAIL}
      navigateToSelect={true}
      containerHeight="163px"
      getRowNodeId={getRowNodeId}
      rowModelType={constDatatable.rowModelType.clientSide}
      rowData={data?.items || []}
      onRowSelected={rowSelectedHandler}
      // onModelUpdated={modelUpdatedHandler}
      disabled={disabledGrid}
    />
  );
};

ListTindakanLainDetail.propTypes = {
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <ListTindakanLainDetail innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
