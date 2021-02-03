import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  cariDetail,
  showDialogItem,
  disableFormDetail,
  focusElementFilter,
} from '../index/redux/selector';
import { Grid, Form, Input, Segment } from 'semantic-ui-react';
import { SearchButton, useModuleTrans } from '@simrs/components';

import {
  filterActions,
  CariDetail as CariDetailComponent,
} from '@simrs/main/src/modules/transaksi/farmasi';

import localAction from '../index/redux/actions';
import { tableName } from '../static';

const CariDetail = (props) => {
  const { resource } = props;
  const dispatch = useDispatch();
  const trans = useModuleTrans();

  const post = useSelector((state) => cariDetail(state));
  const isDisableDetail = useSelector((state) => disableFormDetail(state));
  const focusElement = useSelector((state) => focusElementFilter(state));
  const isShown = useSelector((state) => showDialogItem(state));
  const tableRef = useRef();

  const inputRef = {
    filter_value: useRef(),
    btnCari: useRef(),
  };

  useEffect(() => {
    if (isShown) {
      if (inputRef[focusElement]) {
        if (inputRef[focusElement].current) {
          inputRef[focusElement].current.focus();
        }
      }
    }
  }, [isShown, focusElement]);

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
        form: 'cari_detail',
      })
    );
  };

  const onSearch = () => {
    dispatch(filterActions.onSubmitFilterDetail(resource, post));
  };

  const keyHanlder = (e) => {
    if (13 === e.which) {
      onSearch();
    }

    if (40 === e.which) {
      e.preventDefault();
      tableRef.current.setFirstRowSelected();
      dispatch(filterActions.onFocusElement(resource, ''));
    }
  };

  const columnDefs = () => {
    return [
      {
        headerName: trans('header.column.kode_barang'),
        field: 'barcode',
        sortable: true,
        width: 200,
      },
      {
        headerName: trans('header.column.nama_barang'),
        field: 'nama',
        sortable: true,
      },
    ];
  };

  return (
    <Fragment>
      <CariDetailComponent
        resource={resource}
        show={isShown}
        columnDefs={columnDefs()}
        tableName={tableName.BARANG_LIST}
        tableRef={tableRef}
      >
        <Grid.Column>
          <Segment padded>
            <Form>
              <Form.Group widths="16">
                <Form.Field width="3">
                  <label>{trans('label.field.nama_barang')}</label>
                </Form.Field>
                <Form.Field width="6" style={{ padding: 0 }}>
                  <Input
                    name="filter_value"
                    ref={inputRef.filter_value}
                    value={post.filter_value || ''}
                    onChange={onChangeInputHandler}
                    disabled={!isDisableDetail}
                    onKeyDown={(e) => keyHanlder(e, 'btnCari')}
                  />
                </Form.Field>
                <Form.Field width="3">
                  <SearchButton
                    onClick={onSearch}
                    inputRef={inputRef.btnCari}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </CariDetailComponent>
    </Fragment>
  );
};

export default CariDetail;
