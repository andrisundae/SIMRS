import React, { useCallback, memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import { useQueryClient } from 'react-query';
import {
  DatatableServerSide,
  useModuleTrans,
  constDatatable,
} from '@simrs/components';
import { useListTindakanLain } from '@simrs/billing/src/fetcher/tindakanLain';
import { select as onSelect, cancel, add } from '../index/redux/slice';
import {
  selectedSelector,
  statusFormSelector,
  disabledElement,
} from '../index/redux/selectors';
import { staticConst } from '../../static';

const desaGetter = (params) => {
  if (!params.data) {
    return '';
  }

  return params.data?.desa?.nama;
};

const ListTransaksiLain = ({ innerRef }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const t = useModuleTrans();
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const disabledGrid = useSelector((state) =>
    disabledElement(state, staticConst.TABLE_TINDAKAN_LAIN)
  );

  const { data, isLoading } = useListTindakanLain({});

  const getRowNodeId = useCallback((row) => row.id, []);

  const columns = useMemo(() => {
    return [
      {
        headerName: t('tanggal'),
        field: 'tanggal',
        sortable: true,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
      },
      {
        headerName: t('kode'),
        field: 'kode',
      },
      {
        headerName: t('nama'),
        field: 'nama',
      },
      {
        headerName: t('alamat'),
        field: 'alamat',
      },
      {
        headerName: t('desa'),
        field: 'desa',
        valueGetter: desaGetter,
      },
      {
        headerName: t('total_biaya'),
        field: 'totalBiaya',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t('pembayaran'),
        field: 'bayar',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t('penerimaan'),
        field: 'uangDiterima',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
    ];
  }, []);

  const reloadHandler = useCallback(() => {
    queryClient.invalidateQueries(['/billing/transaksi/tindakanLain/view', {}]);
  }, [queryClient]);

  useEffect(() => {
    if (innerRef.current) {
      if (isLoading) {
        innerRef.current?.gridApi?.showLoadingOverlay();
      } else {
        innerRef.current?.gridApi?.hideOverlay();
      }
    }
  }, [isLoading, innerRef]);

  useEffect(() => {
    if (innerRef.current) {
      if (!isLoading && _.isEmpty(data?.data)) {
        innerRef.current?.gridApi?.showNoRowsOverlay();
      }
    }
  }, [data, isLoading, innerRef]);

  const rowSelectedHandler = useCallback(
    (params) => {
      if (params.node.isSelected()) {
        dispatch(onSelect(params.data));
      }
    },
    [dispatch]
  );

  const modelUpdatedHandler = useCallback(
    (params) => {
      if (statusForm === onSelect.type && !_.isEmpty(selected)) {
        const node = params.api.getRowNode(selected.id);
        if (node) {
          if (!node.isSelected()) {
            innerRef.current?.selectRow(selected.id);
          }
        }
      }
    },
    [innerRef, selected, statusForm]
  );

  const selectedFirstRow = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.setFirstRowSelected();
    }
  }, [innerRef]);

  useEffect(() => {
    const key = process.platform === 'darwin' ? 'ctrl' : 'alt';
    Mousetrap.bindGlobal(`${key}+r`, (e) => {
      e.preventDefault();
      reloadHandler();
    });

    Mousetrap.bindGlobal('f2', (e) => {
      e.preventDefault();
      selectedFirstRow();
    });

    return () => {
      Mousetrap.unbind(`${key}+r`);
      Mousetrap.unbind(`${key}+f2`);
    };
  }, [reloadHandler, selectedFirstRow]);

  useEffect(() => {
    if (statusForm === cancel.type && !_.isEmpty(selected)) {
      innerRef.current?.selectRow(selected.id);
    }
  }, [innerRef, selected, selectedFirstRow, statusForm]);

  useEffect(() => {
    if (statusForm === add.type) {
      innerRef.current?.clearSelectedRow();
    }
  }, [innerRef, statusForm]);

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_TINDAKAN_LAIN}
      navigateToSelect={true}
      containerHeight="163px"
      getRowNodeId={getRowNodeId}
      rowModelType={constDatatable.rowModelType.clientSide}
      rowData={data?.data || []}
      onRowSelected={rowSelectedHandler}
      onModelUpdated={modelUpdatedHandler}
      disabled={disabledGrid}
    />
  );
};

ListTransaksiLain.propTypes = {
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <ListTransaksiLain innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
