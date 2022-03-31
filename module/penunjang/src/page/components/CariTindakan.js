import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { Grid, Form, Modal, Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  DatatableServerSide,
  CancelButton,
  constDatatable,
  SelectedButton,
  SearchButton,
  useModuleTrans,
} from '@simrs/components';
import { utils } from '@simrs/common';
import { useDebounceValue } from '@simrs/components/src/hook';
import { useTindakanSuggestion } from '@simrs/billing/src/fetcher';
import { staticConst } from '../../static';

const CariTindakan = ({
  show,
  onHide,
  idUnitLayanan,
  idKelas,
  idInstalasi,
  onSelect,
}) => {
  const gridRef = useRef();
  const searchInputRef = useRef();
  const t = useModuleTrans();
  const [search, setSearch] = useState();
  const [enabled, setEnabled] = useState(false);

  const debouncedSearch = useDebounceValue(search, 500);

  const columns = useMemo(
    () => [
      {
        headerName: t('kode_panggil'),
        field: 'kode_panggil',
        cellRenderer: 'loadingRenderer',
        sortable: true,
        width: 110,
      },
      {
        headerName: t('kelompok'),
        field: 'nama_kelompok',
        width: 110,
        sortable: true,
      },
      {
        headerName: t('nama_layanan'),
        field: 'nama_layanan',
        sortable: true,
        width: 200,
      },
      {
        headerName: t('kelas'),
        field: 'nama_kelas',
        width: 120,
      },
      {
        headerName: t('tarif'),
        field: 'tarif',
        width: 120,
        cellRenderer: 'currencyRenderer',
        cellClass: 'ag-number-cell',
      },
      {
        headerName: t('tanggal_aktif'),
        field: 'tgl_aktif_tarif',
        width: 120,
        cellRenderer: 'dateRenderer',
      },
      {
        headerName: t('nama_versi_tarif'),
        field: 'nama_versi_tarif',
        width: 120,
      },
    ],
    [t]
  );

  const params = useMemo(() => {
    return utils.cleanBlankValue({
      length: 25,
      start: 0,
      // sort_name: sortModel.colId ? sortModel.colId : '',
      // sort_order: sortModel.colId ? sortModel.sort : '',
      id_unit_layanan: idUnitLayanan,
      id_instalasi: idInstalasi,
      st_cito: 0,
      id_kelas: idKelas,
      search: debouncedSearch,
    });
  }, [debouncedSearch, idInstalasi, idKelas, idUnitLayanan]);

  const { data, isLoading, status } = useTindakanSuggestion(params, {
    enabled,
  });

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

  const getRowNodeId = useCallback((row) => row.id, []);

  const searchChangeHandler = useCallback((e) => setSearch(e.target.value), []);

  const doubleClickRowHandler = useCallback(
    (params) => {
      if (typeof onSelect === 'function') {
        onSelect(params.data);
      }
    },
    [onSelect]
  );

  const pressEnterRowHandler = useCallback(
    (params) => {
      if (typeof onSelect === 'function') {
        onSelect(params.data);
      }
    },
    [onSelect]
  );

  return (
    <Modal
      dimmer="inverted"
      open={show}
      onClose={onHide}
      // size="small"
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <Icon name="search" />
        {t('cari_layanan')}
      </Modal.Header>
      <Modal.Content className="bg-gray-100">
        <Grid className="content-grid">
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group widths="16" style={{ marginBottom: 0 }}>
                  <Form.Field width="14">
                    <label>{t('nama_layanan')}</label>
                    <Input
                      ref={searchInputRef}
                      name="search"
                      // onKeyDown={this.searchKeyDownHandler}
                      value={search}
                      onChange={searchChangeHandler}
                    />
                  </Form.Field>
                  <SearchButton
                    // onClick={this.onSubmitHandler}
                    style={{ top: '41%', right: 0, position: 'absolute' }}
                  />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <DatatableServerSide
                ref={gridRef}
                columns={columns}
                name={staticConst.TABLE_CARI_TINDAKAN}
                navigateToSelect={true}
                // datasource={this.dataSource()}
                containerHeight="335px"
                onRowDoubleClicked={doubleClickRowHandler}
                onRowEntered={pressEnterRowHandler}
                // sizeColumnsToFit={true}
                getRowNodeId={getRowNodeId}
                rowModelType={constDatatable.rowModelType.clientSide}
                rowData={data || []}
                // autoSizeColumn={false}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <SelectedButton onClick={onHide} />
        <CancelButton onClick={onHide} />
      </Modal.Actions>
    </Modal>
  );
};

CariTindakan.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
  idUnitLayanan: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  idKelas: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  idInstalasi: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

export default CariTindakan;
