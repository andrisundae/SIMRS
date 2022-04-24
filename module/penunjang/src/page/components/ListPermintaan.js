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
import { select as onSelect, cancel, add } from '../permintaan/redux/slice';
import {
  selectedSelector,
  statusFormSelector,
  disabledElement,
} from '../permintaan/redux/selectors';
import { staticConst } from '../../static';

const ListPermintaan = ({ innerRef, data = [], loading, onReload }) => {
  const dispatch = useDispatch();
  const t = useModuleTrans();
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const disabledGrid = useSelector((state) =>
    disabledElement(state, staticConst.TABLE_PERMINTAAN_PENUNJANG)
  );

  const getRowNodeId = useCallback((row) => row.id, []);

  const columns = useMemo(() => {
    return [
      {
        headerName: t('tanggal_permintaan'),
        field: 'tanggal',
        sortable: true,
        cellStyle: { 'text-align': 'center', 'background-color': '#f5f7f7' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
      },
      {
        headerName: t('unit_layanan'),
        field: 'nama_unit_layanan',
      },
      {
        headerName: t('nama_pasien'),
        field: 'nama_pasien',
      },
      {
        headerName: t('total_permintaan'),
        field: 'biaya',
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t('status'),
        field: 'st_status_penunjang',
      },
      {
        headerName: t('dokter_perujuk'),
        field: 'nama_dokter_peminta_penunjang',
      },
      {
        headerName: t('unit_layanan_perujuk'),
        field: 'nama_unit_asal',
      },
      {
        headerName: t('dokter_tujuan'),
        field: 'nama_dokter_tujuan_penunjang',
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
    Mousetrap.bindGlobal(`${key}+r`, (e) => {
      e.preventDefault();
      onReload();
    });

    Mousetrap.bindGlobal('f2', (e) => {
      e.preventDefault();
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
      name={staticConst.TABLE_PERMINTAAN_PENUNJANG}
      navigateToSelect={true}
      containerHeight="300px"
      getRowNodeId={getRowNodeId}
      rowModelType={constDatatable.rowModelType.clientSide}
      rowData={data}
      onRowSelected={rowSelectedHandler}
      onModelUpdated={modelUpdatedHandler}
      disabled={disabledGrid}
    />
  );
};

ListPermintaan.propTypes = {
  innerRef: PropTypes.object,
  loading: PropTypes.bool,
  data: PropTypes.array,
  onReload: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <ListPermintaan innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
