import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Icon } from 'semantic-ui-react';
import { DatePicker, Select } from '@simrs/components';

import {
  filterMaster,
  optionsMaster,
  focusElementMaster,
} from '../redux/selector';

import localAction from '../redux/actions';

const Master = (props) => {
  const dispatch = useDispatch();
  const { trans, resource } = props;

  const inputRef = {
    tgl_awal: useRef(),
    tgl_akhir: useRef(),
    supplier: useRef(),
    unitPemesan: useRef(),
    btnTampil: useRef(),
  };

  const focusElement = useSelector(focusElementMaster);
  const filter = useSelector(filterMaster);
  const options = useSelector(optionsMaster);

  useEffect(() => {
    dispatch(localAction.openForm(resource));
  }, [dispatch]);

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

  const dateChange = (date, target) => {
    dispatch(localAction.onDateChange(resource, { date, target }));
  };

  const selectChange = (data, target) => {
    dispatch(localAction.onSelectChange(resource, { data, target }));
  };

  const onfocusElement = (e, target) => {
    if (13 === e.which) {
      if (e.target.name) {
        e.preventDefault();
      }

      dispatch(localAction.onFocusElement(resource, target));
    }
  };

  const generateSelectedValue = (value, label) => {
    return value && label ? { value, label } : null;
  };

  const tampilkanData = (e) => {
    dispatch(localAction.onSubmitTampilPemesanan(resource, filter));
  };

  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group widths="16">
          <Form.Field width="3">
            <label>{trans('label.field.tanggal_transaksi')}</label>
          </Form.Field>
          <Form.Field width="3" style={{ padding: 0 }}>
            <DatePicker
              name="tgl_awal"
              inputRef={inputRef.tgl_awal}
              selected={filter.tgl_awal}
              onChange={(date) => dateChange(date, 'tgl_awal')}
              onKeyDown={(e) => onfocusElement(e, 'tgl_akhir')}
              dateFormat="dd/MM/yyyy"
              isClearable={true}
            />
          </Form.Field>
          <Form.Field width="1">
            <label>{trans('label.field.s_d')}</label>
          </Form.Field>
          <Form.Field width="3" style={{ padding: 0 }}>
            <DatePicker
              name="tgl_akhir"
              inputRef={inputRef.tgl_akhir}
              selected={filter.tgl_akhir}
              onChange={(date) => dateChange(date, 'tgl_akhir')}
              onKeyDown={(e) => onfocusElement(e, 'btnTampil')}
              dateFormat="dd/MM/yyyy"
              minDate={filter.tgl_awal}
              isClearable={true}
            />
          </Form.Field>
          <Form.Field width="2" style={{ paddingTop: 3 }}>
            <Button
              ref={inputRef.btnTampil}
              name="btn_tampil"
              color="blue"
              size="mini"
              onClick={tampilkanData}
            >
              <Icon name="search" />
              {trans('label.btn.tampil')}
            </Button>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="16">
          <Form.Field width="3">
            <label>{trans('label.field.supplier')}</label>
          </Form.Field>
          <Form.Field width="5" style={{ padding: 0 }}>
            <Select
              name="supplier"
              placeholder={trans('label.field.supplier')}
              inputRef={inputRef.supplier}
              onChange={(e) => selectChange(e, 'supplier')}
              value={generateSelectedValue(filter.idSupplier, filter.supplier)}
              onKeyDown={(e) => onfocusElement(e, 'unitPenerima')}
              options={options.supplier}
              isClearable={false}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="16" style={{ marginBottom: 0 }}>
          <Form.Field width="3">
            <label>{trans('label.field.unit_pemesan')}</label>
          </Form.Field>
          <Form.Field width="5" style={{ padding: 0 }}>
            <Select
              name="unit_pemesan"
              placeholder={trans('label.field.unit_pemesan')}
              inputRef={inputRef.unitPemesan}
              onChange={(e) => selectChange(e, 'unitPemesan')}
              value={generateSelectedValue(
                filter.idUnitPemesan,
                filter.unitPemesan
              )}
              options={options.unitPemesan}
              isClearable={false}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default Master;
