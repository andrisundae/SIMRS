import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  cariMaster,
  showDialogTransaksi,
  disableFormMaster,
  focusElementFilter,
  optionFilterTransaksi,
} from '../index/redux/selector';
import { Grid, Form, Input, Segment } from 'semantic-ui-react';
import {
  DatePicker,
  Select,
  SearchButton,
  Checkbox,
  useModuleTrans,
} from '@simrs/components';

import {
  filterActions,
  CariTransaksi as CariTransaksiContainer,
} from '@simrs/main/src/modules/transaksi/farmasi';

import localAction from '../index/redux/actions';
import { tableName } from '../static';

const CariTransaksi = (props) => {
  const { resource, generateSelectedValue } = props;
  const dispatch = useDispatch();
  const trans = useModuleTrans();

  const post = useSelector((state) => cariMaster(state));
  const isDisableMaster = useSelector((state) => disableFormMaster(state));
  const focusElement = useSelector((state) => focusElementFilter(state));
  const isShown = useSelector((state) => showDialogTransaksi(state));
  const optionFilter = useSelector((state) => optionFilterTransaksi(state));

  const inputRef = {
    tgl_awal: useRef(),
    tgl_akhir: useRef(),
    use_tgl: useRef(),
    filter: useRef(),
    kata_kunci: useRef(),
    btnCari: useRef(),
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
        form: 'cari_master',
      })
    );
  };

  const onChangeDatetime = (field, date) => {
    dispatch(
      localAction.onFilterChangeTanggal(resource, {
        tgl: date,
        field: field,
        form: 'cari_master',
      })
    );
  };

  const onChangeSelect = (data) => {
    dispatch(
      localAction.onChangeSelectFilter(resource, {
        ...data,
        form: 'cari_master',
      })
    );
  };

  const onSearch = () => {
    dispatch(filterActions.onSubmitFilterTransaksi(resource, post));
  };

  const onFocusElement = (e, element) => {
    if ('Enter' === e.key) {
      if (e.target.name) {
        e.preventDefault();
      }

      dispatch(filterActions.onFocusElement(resource, element));
    }
  };

  const columnDefs = () => {
    return [
      {
        headerName: trans('header.table.nomor_transaksi'),
        field: 'nomor_transaksi',
        sortable: true,
        width: 200,
      },
      {
        headerName: trans('header.table.tanggal'),
        field: 'tanggal',
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
    ];
  };

  return (
    <Fragment>
      <CariTransaksiContainer
        resource={resource}
        show={isShown}
        columnDefs={columnDefs()}
        tableName={tableName.CARI_TRANSAKSI}
      >
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
                    disabled={isDisableMaster}
                    onSelect={(e) =>
                      dispatch(
                        filterActions.onFocusElement(resource, 'tgl_akhir')
                      )
                    }
                    onChange={(date) => onChangeDatetime('tgl_awal', date)}
                    onKeyDown={(e) => onFocusElement(e, 'tgl_akhir')}
                    dateFormat="dd/MM/yyyy"
                    isClearable={isDisableMaster ? false : true}
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
                    disabled={isDisableMaster}
                    onChange={(date) => onChangeDatetime('tgl_akhir', date)}
                    onSelect={(e) =>
                      dispatch(
                        filterActions.onFocusElement(resource, 'use_tgl')
                      )
                    }
                    onKeyDown={(e) => onFocusElement(e, 'use_tgl')}
                    dateFormat="dd/MM/yyyy"
                    minDate={post.tgl_awal}
                    isClearable={isDisableMaster ? false : true}
                  />
                </Form.Field>
                <Form.Field width="2" style={{ paddingTop: 3 }}>
                  <Checkbox
                    inputRef={inputRef.use_tgl}
                    name="use_tgl"
                    value={post.use_tgl}
                    checked={post.use_tgl ? true : false}
                    disabled={isDisableMaster}
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
                    isDisabled={isDisableMaster}
                    onChange={(selected) => onChangeSelect(selected)}
                    value={generateSelectedValue(post.filter_idx, post.filter)}
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
                    disabled={isDisableMaster}
                    onChange={onChangeInputHandler}
                    onKeyDown={(e) => onFocusElement(e, 'btnCari')}
                  />
                </Form.Field>
                <Form.Field width="3">
                  <SearchButton
                    disabled={isDisableMaster}
                    onClick={onSearch}
                    inputRef={inputRef.btnCari}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </CariTransaksiContainer>
    </Fragment>
  );
};

export default CariTransaksi;
