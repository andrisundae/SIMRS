import React, { useCallback, memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Mousetrap from 'mousetrap';
import {
  DatatableServerSide,
  useModuleTrans,
  constDatatable,
} from '@simrs/components';
import { select as onSelect, cancel, add } from '../pemenuhan/redux/slice';
import {
  selectedSelector,
  statusFormSelector,
  disabledElement,
} from '../pemenuhan/redux/selectors';
import { staticConst } from '../../static';

const ListPenunjang = ({
  innerRef,
  unitLayanan,
  statusPenunjang = '',
  data = [],
  loading,
  onReload,
}) => {
  const dispatch = useDispatch();
  const t = useModuleTrans();
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const disabledGrid = useSelector((state) =>
    disabledElement(state, staticConst.TABLE_PENUNJANG)
  );

  const formattedData = useMemo(() => {
    if (_.isEmpty(data)) {
      return [];
    }
    return data.map((row) => {
      return {
        ...row,
        unit_layanan: unitLayanan,
        jumlah: statusPenunjang === staticConst.PERMINTAAN ? 0 : row.jumlah,
      };
    });
  }, [data, statusPenunjang, unitLayanan]);

  const getRowNodeId = useCallback((row) => row.id, []);

  const columns = useMemo(() => {
    return [
      {
        headerName: t('tanggal'),
        field: 'tgl',
        sortable: true,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
      },
      {
        headerName: t('unit_layanan'),
        field: 'unit_layanan',
      },
      {
        headerName: t('nama_layanan'),
        field: 'nama_layanan',
      },
      {
        headerName: t('kelas'),
        field: 'kelas',
      },
      {
        headerName: t('pelaksana'),
        field: 'pelaksana',
        valueFormatter: ({ value }) => {
          return value?.nama || '';
        },
      },
      {
        headerName: t('tarif'),
        field: 'tarif',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
        headerClass: 'ag-right-aligned-header',
      },
      {
        headerName: t('jumlah'),
        field: 'jumlah',
        headerClass: 'ag-right-aligned-header',
      },
      {
        headerName: t('total_biaya'),
        field: 'total_biaya',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
        headerClass: 'ag-right-aligned-header',
      },
      {
        headerName: t('petugas'),
        field: 'petugas',
      },
    ];
  }, []);

  useEffect(() => {
    if (innerRef.current) {
      if (loading) {
        innerRef.current?.gridApi?.showLoadingOverlay();
      } else {
        innerRef.current?.gridApi?.hideOverlay();
      }
    }
  }, [loading, innerRef]);

  useEffect(() => {
    if (innerRef.current) {
      if (!loading && _.isEmpty(data)) {
        innerRef.current?.gridApi?.showNoRowsOverlay();
      } else {
        if (!loading) {
          innerRef.current?.gridApi?.hideOverlay();
        }
      }
    }
  }, [data, loading, innerRef]);

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
    Mousetrap.bind(`${key}+r`, () => {
      onReload();
    });

    Mousetrap.bind('f2', () => {
      selectedFirstRow();
    });

    return () => {
      Mousetrap.unbind(`${key}+r`);
      Mousetrap.unbind(`${key}+f2`);
    };
  }, [onReload, selectedFirstRow]);

  useEffect(() => {
    if (statusForm === cancel.type && !_.isEmpty(selected)) {
      innerRef.current?.selectRow(selected.id);
    }
  }, [innerRef, onReload, selected, selectedFirstRow, statusForm]);

  useEffect(() => {
    if (statusForm === add.type) {
      innerRef.current?.clearSelectedRow();
    }
  }, [innerRef, statusForm]);

  return (
    <DatatableServerSide
      ref={innerRef}
      columns={columns}
      name={staticConst.TABLE_PENUNJANG}
      navigateToSelect={true}
      cacheBlockSize={100}
      containerHeight="165px"
      getRowNodeId={getRowNodeId}
      sizeColumnsToFit={true}
      rowModelType={constDatatable.rowModelType.clientSide}
      rowData={formattedData}
      onRowSelected={rowSelectedHandler}
      onModelUpdated={modelUpdatedHandler}
      disabled={disabledGrid}
    />
  );
};

ListPenunjang.propTypes = {
  innerRef: PropTypes.object,
  idKunjunganUnit: PropTypes.string,
  loading: PropTypes.bool,
  unitLayanan: PropTypes.string,
  kelas: PropTypes.string,
  statusPenunjang: PropTypes.string,
  data: PropTypes.array,
  onReload: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <ListPenunjang innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
