import React, { Fragment, useEffect, useRef } from 'react';
import MouseTrap from 'mousetrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  cariPemsanan,
  showDialogPemesanan,
  disableFormMaster,
  focusElementFilter,
  optionFilterPemesanan,
  datatableSelector,
} from '../index/redux/selector';
import {
  Modal,
  Grid,
  Form,
  Input,
  Segment,
  Button,
  Icon,
} from 'semantic-ui-react';
import {
  DatePicker,
  Select,
  SearchButton,
  Checkbox,
  PilihButton,
  useModuleTrans,
  DatatableServerSide,
  constDatatable,
} from '@simrs/components';

import {
  filterActions,
  masterActions,
} from '@simrs/main/src/modules/transaksi/farmasi';

import localAction from '../index/redux/actions';
import { tableName } from '../static';

const CariPemesanan = (props) => {
  const { resource, generateSelectedValue } = props;
  const dispatch = useDispatch();
  const trans = useModuleTrans();

  const tableRef = {
    tableInduk: useRef(),
    tableDet: useRef(),
  };

  const inputRef = {
    tgl_awal: useRef(),
    tgl_akhir: useRef(),
    use_tgl: useRef(),
    filter: useRef(),
    kata_kunci: useRef(),
    btnCari: useRef(),
    btn_pilih: useRef(),
    btn_batal: useRef(),
  };

  const post = useSelector((state) => cariPemsanan(state));
  const datatables = useSelector((state) => datatableSelector(state));
  const tablePemesanan = datatables[tableName.CARI_PEMESANAN];
  const tablePemesananDetail = datatables[tableName.DETAIL_PEMESANAN];

  const isShown = useSelector((state) => showDialogPemesanan(state));
  const isDisableMaster = useSelector((state) => disableFormMaster(state));
  const focusElement = useSelector((state) => focusElementFilter(state));
  const optionFilter = useSelector((state) => optionFilterPemesanan(state));

  const gridApi = () => {
    return tableRef.tableInduk.current.gridApi;
  };

  const columnApi = () => {
    return tableRef.tableInduk.current.columnApi;
  };

  const gridApiDet = () => {
    return tableRef.tableDet.current.gridApi;
  };

  useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        switch (focusElement) {
          case 'tgl_awal':
          case 'tgl_akhir':
            inputRef[focusElement].current.setFocus();
            break;

          default:
            inputRef[focusElement].current.focus();
            break;
        }
      }
    }
  }, [focusElement]);

  useEffect(() => {
    if (isShown) {
      dispatch(filterActions.onFocusElement(resource, 'btnCari'));
    }
  }, [isShown]);

  useEffect(() => {
    if (isShown) {
      MouseTrap.bindGlobal('alt+p', function (e) {
        e.preventDefault();

        inputRef.btn_pilih.current.focus();
        handleRowEnter();
      });

      MouseTrap.bindGlobal('f2', function (e) {
        e.preventDefault();
        tableRef.tableInduk.current.setFirstRowSelected();
      });

      MouseTrap.bindGlobal('alt+r', function (e) {
        e.preventDefault();
        reload(constDatatable.reloadType.purge);
      });
    }

    return () => {
      MouseTrap.unbind('alt+p');
      MouseTrap.unbind('f2');
      MouseTrap.unbind('alt+r');
    };
  }, [isShown]);

  useEffect(() => {
    if (tablePemesanan.isReload) {
      reload(tablePemesanan.reloadType);
    }
  }, [tablePemesanan]);

  useEffect(() => {
    if (tablePemesananDetail.isReload) {
      reloadDet(tablePemesananDetail.reloadType);
    }
  }, [tablePemesananDetail]);

  useEffect(() => {
    if (post.filtered_data > 0) {
      tableRef.tableInduk.current.setFirstRowSelected();
    }
  }, [post]);

  const onChangeInputHandler = (e) => {
    const { value, name, type, checked } = e.target;

    let val = value.toUpperCase();

    if (type === 'checkbox') {
      val = checked ? true : false;
    }

    dispatch(
      filterActions.onChangeInput(resource, {
        value: val,
        name,
        form: 'cari_pemesanan',
      })
    );
  };

  const onChangeSelect = (data) => {
    dispatch(
      localAction.onChangeSelectFilter(resource, {
        ...data,
        form: 'cari_pemesanan',
      })
    );
  };

  const onChangeDatetime = (field, date) => {
    dispatch(
      localAction.onFilterChangeTanggal(resource, {
        tgl: date,
        field: field,
        form: 'cari_pemesanan',
      })
    );
  };

  const onFocusElement = (e, element) => {
    if ('Enter' === e.key) {
      if (e.target.name) {
        e.preventDefault();
      }

      dispatch(filterActions.onFocusElement(resource, element));
    }
  };

  const onClose = () => {
    dispatch(filterActions.onCloseDialog(resource, { idx: 'pemesanan_modal' }));
  };

  const onSearch = () => {
    dispatch(localAction.onSubmitFilterPemesanan(resource, post));
  };

  const handlePilih = (e) => {
    handleRowEnter();
  };

  /** Data Table Main */
  const columnDefs = () => {
    return [
      {
        headerName: trans('header.table.nomor_transaksi'),
        field: 'no_transaksi',
        cellRenderer: 'loadingRenderer',
        sortable: true,
        width: 200,
      },
      {
        headerName: trans('header.table.tanggal'),
        field: 'tanggal_transaksi',
        sortable: true,
        cellStyle: { 'text-align': 'center' },
        cellRenderer: 'dateRenderer',
        cellClass: 'ag-date-cell',
        width: 110,
      },
      {
        headerName: trans('header.table.supplier'),
        field: 'nama_supplier',
        sortable: true,
      },
      {
        headerName: trans('header.table.unit'),
        sortable: true,
        field: 'nama_unit',
      },
      {
        headerName: trans('header.table.status_terpenuhi'),
        sortable: true,
        field: 'status_terpenuhi',
      },
    ];
  };

  const getDataSource = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};

        let payload = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
        };

        dispatch(localAction.findPemesanan.request(resource, payload, params));
      },
    };
  };

  const reload = (reloadType) => {
    if (reloadType === constDatatable.reloadType.purge) {
      gridApi().purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      gridApi().refreshInfiniteCache();
    }
  };

  const getRowNodeId = (item) => {
    return item.id;
  };

  const onSelectedRow = (row) => {
    if (row.node.isSelected()) {
      dispatch(
        localAction.onSelectedData(resource, {
          form: 'cari_pemesanan',
          value: row.data,
        })
      );
    }
  };

  const handleRowEnter = () => {
    const selectedRows = gridApi().getSelectedRows();
    if (selectedRows.length > 0) {
      onSelect(selectedRows[0]);
    }
  };

  const onSelect = (selectedData) => {
    dispatch(localAction.setPemesanan(resource, selectedData));
    onClose();
  };

  /** Data Table Detail */
  const columnDefsDet = () => {
    return [
      {
        headerName: trans('header.column.nama_barang'),
        field: 'nama_barang',
        sortable: false,
        width: 200,
      },
      {
        headerName: trans('header.table.jumlah_pesan'),
        field: 'jumlah_pesan',
        sortable: false,
      },
      {
        headerName: trans('header.table.terpenuhi'),
        sortable: false,
        field: 'jumlah_terpenuhi',
      },
    ];
  };

  const getDataSourceDet = () => {
    return {
      rowCount: null,
      getRows: (params) => {
        const sortModel =
          params.sortModel.length > 0 ? params.sortModel[0] : {};
        let payload = {
          length: 25,
          start: params.startRow,
          sort_name: sortModel.colId ? sortModel.colId : '',
          sort_order: sortModel.colId ? sortModel.sort : '',
        };

        dispatch(localAction.setItemPemesanan(resource, payload, params));
      },
    };
  };

  const reloadDet = (reloadType) => {
    if (reloadType === constDatatable.reloadType.purge) {
      gridApiDet().purgeInfiniteCache();
    } else if (reloadType === constDatatable.reloadType.refresh) {
      gridApiDet().refreshInfiniteCache();
    }
  };

  return (
    <Fragment>
      <Modal
        open={isShown}
        onClose={onClose}
        size="large"
        closeOnEscape={false}
        closeOnDimmerClick={false}
      >
        <Modal.Content>
          <Grid className="content-grid">
            <Grid.Row>
              <Grid.Column>
                <Segment padded>
                  <Form>
                    <Form.Group widths="16">
                      <Form.Field width="3">
                        <label>{trans('label.field.tanggal_transaksi')}</label>
                      </Form.Field>
                      <Form.Field width="3" style={{ padding: 0 }}>
                        <DatePicker
                          name="tgl_awal"
                          inputRef={inputRef.tgl_awal}
                          selected={post.tgl_awal}
                          disabled={!isDisableMaster}
                          onChange={(date) =>
                            onChangeDatetime('tgl_awal', date)
                          }
                          onSelect={(e) =>
                            dispatch(
                              filterActions.onFocusElement(
                                resource,
                                'tgl_akhir'
                              )
                            )
                          }
                          onKeyDown={(e) => onFocusElement(e, 'tgl_akhir')}
                          dateFormat="dd/MM/yyyy"
                          isClearable={!isDisableMaster ? false : true}
                        />
                      </Form.Field>
                      <Form.Field width="1">
                        <label>{trans('label.field.s_d')}</label>
                      </Form.Field>
                      <Form.Field width="3" style={{ padding: 0 }}>
                        <DatePicker
                          name="tgl_akhir"
                          inputRef={inputRef.tgl_akhir}
                          selected={post.tgl_akhir}
                          disabled={!isDisableMaster}
                          onChange={(date) =>
                            onChangeDatetime('tgl_akhir', date)
                          }
                          onKeyDown={(e) => onFocusElement(e, 'use_tgl')}
                          onSelect={(e) =>
                            dispatch(
                              filterActions.onFocusElement(resource, 'use_tgl')
                            )
                          }
                          dateFormat="dd/MM/yyyy"
                          minDate={post.tgl_awal}
                          isClearable={!isDisableMaster ? false : true}
                        />
                      </Form.Field>
                      <Form.Field width="2" style={{ paddingTop: 3 }}>
                        <Checkbox
                          inputRef={inputRef.use_tgl}
                          name="use_tgl"
                          value={post.use_tgl}
                          checked={post.use_tgl ? true : false}
                          disabled={!isDisableMaster}
                          onChange={onChangeInputHandler}
                          onKeyDown={(e) => onFocusElement(e, 'filter')}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths="16">
                      <Form.Field width="3">
                        <label>{trans('label.field.filter')}</label>
                      </Form.Field>
                      <Form.Field width="7" style={{ padding: 0 }}>
                        <Select
                          name="filter"
                          placeholder={trans('label.field.filter')}
                          inputRef={inputRef.filter}
                          isDisabled={!isDisableMaster}
                          onChange={(selected) => onChangeSelect(selected)}
                          value={generateSelectedValue(
                            post.filter_idx,
                            post.filter
                          )}
                          onKeyDown={(e) => onFocusElement(e, 'kata_kunci')}
                          options={optionFilter}
                          isClearable={false}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths="16">
                      <Form.Field width="3">
                        <label>{trans('label.field.kata_kunci')}</label>
                      </Form.Field>
                      <Form.Field width="7" style={{ padding: 0 }}>
                        <Input
                          name="filter_value"
                          ref={inputRef.kata_kunci}
                          value={post.filter_value || ''}
                          disabled={!isDisableMaster}
                          onChange={onChangeInputHandler}
                          onKeyDown={(e) => onFocusElement(e, 'btnCari')}
                        />
                      </Form.Field>
                      <Form.Field width="3">
                        <SearchButton
                          disabled={!isDisableMaster}
                          onClick={onSearch}
                          inputRef={inputRef.btnCari}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="10">
                <DatatableServerSide
                  ref={tableRef.tableInduk}
                  columns={columnDefs()}
                  name={tableName.CARI_PEMESANAN}
                  navigateToSelect={true}
                  datasource={getDataSource()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="335px"
                  sizeColumnsToFit={false}
                  onRowEntered={handleRowEnter}
                  onRowSelected={onSelectedRow}
                  getRowNodeId={getRowNodeId}
                />
              </Grid.Column>
              <Grid.Column width="6">
                <DatatableServerSide
                  ref={tableRef.tableDet}
                  columns={columnDefsDet()}
                  name={tableName.DETAIL_PEMESANAN}
                  navigateToSelect={false}
                  datasource={getDataSourceDet()}
                  rowBuffer={0}
                  maxConcurrentDatasourceRequests={1}
                  infiniteInitialRowCount={1}
                  cacheBlockSize={25}
                  containerHeight="335px"
                  sizeColumnsToFit={false}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <PilihButton onClick={handlePilih} inputRef={inputRef.btn_pilih} />
          <Button
            ref={inputRef.btn_batal}
            name="Batal Pilih"
            size="mini"
            color="blue"
            onClick={onClose}
          >
            <Icon name="undo" />
            {trans('label.btn.cancel')}
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

CariPemesanan.propTypes = {
  resource: PropTypes.string,
};

export default CariPemesanan;
