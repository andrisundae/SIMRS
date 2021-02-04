import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Form, Grid, Input, Button, Icon } from 'semantic-ui-react';
import { DatePicker, Select, useModuleTrans } from '@simrs/components';
// import CariTransaksi from '../components/CariTransaksi';
import {
  initMaster,
  postMaster,
  statusFormMaster,
  disableFormMaster,
  showDialogPemesanan,
  showDialogTransaksi,
} from '../redux/selector';

import {
  masterActions,
  // isDisableForm,
  // isDisableFormDetail,
  filterActions,
  masterActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

import localAction from '../redux/actions';
import CariPemesanan from '../../components/CariPemesanan';
import CariTransaksi from '../../components/CariTransaksi';

const MasterForm = ({ resource, focusElement, t }) => {
  const dispatch = useDispatch();
  const trans = useModuleTrans();

  const inputRef = {
    no_transaksi: React.useRef(),
    cari_transaksi: React.useRef(),
    tanggal_transaksi: React.useRef(),
    no_pemesanan: React.useRef(),
    tanggal_pemesanan: React.useRef(),
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
  const showPemesanan = useSelector((state) => showDialogPemesanan(state));
  const showTransaksi = useSelector((state) => showDialogTransaksi(state));

  const isDisabledInput = () => {
    let disabled = !isDisableMaster;

    if (!disabled && post.no_pemesanan === '') {
      disabled = true;
    }

    return disabled;
  };

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

  const onChangeSelect = (data) => {
    dispatch(
      localAction.onChangeSelect(resource, { ...data, field: 'hitung_ppn' })
    );
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
        <Grid columns="3">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{trans('label.field.no_transaksi')}</label>
                  </Grid.Column>
                  <Grid.Column width="6" className="field">
                    <Input
                      name="no_transaksi"
                      ref={inputRef.no_transaksi}
                      value={initValue.nomor_transaksi || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column width="6" className="left aligned">
                    <Button
                      ref={inputRef.cari_transaksi}
                      name="cari_transaksi"
                      size="mini"
                      color="blue"
                      onClick={() => onSearch('master_modal')}
                      disabled={
                        isDisableMaster ||
                        statusForm === masterActionTypes.FILLED
                      }
                    >
                      <Icon name="search" />
                      {trans('label.btn.cari_transaksi')}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{trans('label.field.tanggal_transaksi')}</label>
                  </Grid.Column>
                  <Grid.Column width="6" className="field">
                    <Input
                      name="tanggal_transaksi"
                      ref={inputRef.tanggal_transaksi}
                      value={initValue.tanggal_transaksi || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{trans('label.field.no_pemesanan')}</label>
                  </Grid.Column>
                  <Grid.Column width="6" className="field">
                    <Input
                      name="no_pemesanan"
                      ref={inputRef.no_pemesanan}
                      value={post.no_pemesanan || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column width="6" className="left aligned">
                    <Button
                      ref={inputRef.cari_transaksi}
                      name="cari_pemesanan"
                      size="mini"
                      color="blue"
                      onClick={() => onSearch('pemesanan_modal')}
                      disabled={!isDisableMaster}
                    >
                      <Icon name="search" />
                      {trans('label.btn.cari_pemesanan')}
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="4" className="field">
                    <label>{trans('label.field.tanggal_pemesanan')}</label>
                  </Grid.Column>
                  <Grid.Column width="6" className="field">
                    <Input
                      name="tanggal_pemesanan"
                      ref={inputRef.tanggal_pemesanan}
                      value={post.tanggal_pemesanan || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.supplier')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="supplier"
                      ref={inputRef.supplier}
                      value={post.supplier || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.unit_penerima')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <Input
                      name="unit_penerima"
                      ref={inputRef.unit_penerima}
                      value={post.unit_penerima || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
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
                      disabled={isDisabledInput()}
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
                      disabled={isDisabledInput()}
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
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.tanggal_jt')}</label>
                  </Grid.Column>
                  <Grid.Column width="9" className="field">
                    <DatePicker
                      name="tanggal_jatuh_tempo"
                      inputRef={inputRef.tanggal_jatuh_tempo}
                      dateFormat="dd/MM/yyyy"
                      disabled={isDisabledInput()}
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
                      onChange={(selected) => onChangeSelect(selected)}
                      isClearable={false}
                      isDisabled={isDisabledInput()}
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
      {showPemesanan && (
        <CariPemesanan
          resource={resource}
          generateSelectedValue={generateSelectedValue}
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
