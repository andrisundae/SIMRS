import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Grid, Input, Button, Icon } from 'semantic-ui-react';
import { DatePicker, Select, useModuleTrans } from '@simrs/components';
import {
  initMaster,
  postMaster,
  statusFormMaster,
  disableFormMaster,
  showDialogTransaksi,
} from '../redux/selector';

import {
  masterActions,
  filterActions,
  masterActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

import localAction from '../redux/actions';
import CariTransaksi from '../../components/CariTransaksi';

const MasterForm = ({ resource, focusElement, t }) => {
  const dispatch = useDispatch();
  const trans = useModuleTrans();

  const inputRef = {
    no_transaksi: React.useRef(),
    cari_transaksi: React.useRef(),
    tanggal_transaksi: React.useRef(),
    supplier: React.useRef(),
    unit_penerima: React.useRef(),
    nomor_faktur: React.useRef(),
    tanggal_faktur: React.useRef(),
    tanggal_jatuh_tempo: React.useRef(),
    hitung_ppn: React.useRef(),
  };

  const initial = useSelector((state) => initMaster(state));
  const post = useSelector((state) => postMaster(state));

  const statusForm = useSelector((state) => statusFormMaster(state));
  const isDisableMaster = useSelector((state) => disableFormMaster(state));
  const showTransaksi = useSelector((state) => showDialogTransaksi(state));

  React.useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        switch (focusElement) {
          case 'tanggal_faktur':
          case 'tanggal_jatuh_tempo':
            inputRef[focusElement].current.setFocus();
            break;

          default:
            inputRef[focusElement].current.focus();
            break;
        }
      }
    }
  }, [focusElement]);

  const onChangeInputHandler = (e) => {
    const { value, name } = e.target;
    dispatch(masterActions.onChangeInput(resource, { value, name }));
  };

  const onChangeDatetime = (name, value) => {
    dispatch(masterActions.onChangeInput(resource, { value, name }));
  };

  const onChangeSelect = (data, field) => {
    dispatch(localAction.onChangeSelect(resource, { ...data, field }));
  };

  const onFocusElement = (e, element) => {
    if ('Enter' === e.key) {
      if (e.target.name) {
        e.preventDefault();
      }

      dispatch(masterActions.onFocusElement(resource, element));
    }
  };

  const onSearch = (dialog) => {
    dispatch(filterActions.onOpenDialog(resource, { form: dialog }));
  };

  const generateSelectedValue = (value, label) => {
    let result = null;

    if (label !== '' && value !== '') {
      result = { value, label };
    }

    return result;
  };

  let initValue = {
    nomor_transaksi: post.no_transaksi
      ? post.no_transaksi
      : initial.nomor_transaksi,
    tanggal_transaksi: post.tanggal_transaksi
      ? post.tanggal_transaksi
      : initial.tanggal_transaksi,
  };

  return (
    <Fragment>
      <Form
        id="master-penerimaan-pemesanan"
        onSubmit={(e) => e.preventDefault()}
        size="mini"
      >
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.no_transaksi')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="no_transaksi"
                      ref={inputRef.no_transaksi}
                      value={initValue.nomor_transaksi || ''}
                      disabled={
                        isDisableMaster ||
                        statusForm === masterActionTypes.FILLED
                      }
                      readOnly={true}
                      action={{
                        icon: 'search',
                        content: `${trans('label.input_action.cari')}`,
                        onClick: () => onSearch('master_modal'),
                        color: 'blue',
                        type: 'button',
                        disabled:
                          isDisableMaster ||
                          statusForm === masterActionTypes.FILLED,
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.tanggal_transaksi')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="tanggal_transaksi"
                      ref={inputRef.tanggal_transaksi}
                      value={initValue.tanggal_transaksi || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.supplier')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Select
                      options={initial.options_supplier}
                      name="supplier"
                      value={generateSelectedValue(
                        post.id_supplier,
                        post.supplier
                      )}
                      onChange={(selected) =>
                        onChangeSelect(selected, 'supplier')
                      }
                      isClearable={false}
                      isDisabled={!isDisableMaster}
                      onKeyDown={(e) => onFocusElement(e, 'unit_penerima')}
                      inputRef={inputRef.supplier}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.unit_penerima')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Select
                      options={initial.options_unit}
                      name="unit_penerima"
                      value={generateSelectedValue(
                        post.id_unit,
                        post.unit_penerima
                      )}
                      onChange={(selected) =>
                        onChangeSelect(selected, 'unit_penerima')
                      }
                      isClearable={false}
                      isDisabled={!isDisableMaster}
                      onKeyDown={(e) => onFocusElement(e, 'nomor_faktur')}
                      inputRef={inputRef.unit_penerima}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.no_faktur')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="nomor_faktur"
                      ref={inputRef.nomor_faktur}
                      value={post.nomor_faktur || ''}
                      onChange={onChangeInputHandler}
                      onKeyDown={(e) => onFocusElement(e, 'tanggal_faktur')}
                      disabled={!isDisableMaster}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.tanggal_faktur')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <DatePicker
                      name="tanggal_faktur"
                      inputRef={inputRef.tanggal_faktur}
                      dateFormat="dd/MM/yyyy"
                      disabled={!isDisableMaster}
                      selected={post.tanggal_faktur}
                      onSelect={(e) =>
                        dispatch(
                          masterActions.onFocusElement(
                            resource,
                            'tanggal_jatuh_tempo'
                          )
                        )
                      }
                      onChange={(date) =>
                        onChangeDatetime('tanggal_faktur', date)
                      }
                      onKeyDown={(e) =>
                        onFocusElement(e, 'tanggal_jatuh_tempo')
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.tanggal_jt')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <DatePicker
                      name="tanggal_jatuh_tempo"
                      inputRef={inputRef.tanggal_jatuh_tempo}
                      dateFormat="dd/MM/yyyy"
                      disabled={!isDisableMaster}
                      selected={post.tanggal_jatuh_tempo}
                      onSelect={(e) =>
                        dispatch(
                          masterActions.onFocusElement(resource, 'hitung_ppn')
                        )
                      }
                      onChange={(date) =>
                        onChangeDatetime('tanggal_jatuh_tempo', date)
                      }
                      onKeyDown={(e) => onFocusElement(e, 'hitung_ppn')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.hitung_ppn')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Select
                      options={initial.options_hitung_ppn}
                      name="hitung_ppn"
                      value={generateSelectedValue(
                        post.hitung_ppn,
                        post.hitung_ppn_label
                      )}
                      onChange={(selected) =>
                        onChangeSelect(selected, 'hitung_ppn')
                      }
                      isClearable={false}
                      isDisabled={!isDisableMaster}
                      onKeyDown={(e) => onFocusElement(e, 'save')}
                      inputRef={inputRef.hitung_ppn}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      {showTransaksi && (
        <CariTransaksi
          resource={resource}
          generateSelectedValue={generateSelectedValue}
          t={t}
        />
      )}
    </Fragment>
  );
};

MasterForm.propTypes = {
  resource: PropTypes.string,
  focusElement: PropTypes.string,
};

export default MasterForm;
