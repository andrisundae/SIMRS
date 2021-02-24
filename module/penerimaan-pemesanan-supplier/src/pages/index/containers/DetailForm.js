import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Grid, Input, Segment } from 'semantic-ui-react';
import { DatePicker, useModuleTrans, CurrencyInput } from '@simrs/components';
// import CariDetail from '../components/CariDetail';

import {
  initMaster,
  postDetail,
  focusElementMaster,
  statusFormMaster,
  disableFormDetail,
  showDialogItem,
} from '../redux/selector';

import {
  detailActions,
  // isDisableForm,
  // isDisableFormDetail,
  filterActions,
  masterActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

import CariDetail from '../../components/CariDetail';

import localAction from '../redux/actions';

const DetailForm = ({ resource, focusElement, t }) => {
  const dispatch = useDispatch();
  const trans = useModuleTrans();

  const post = useSelector((state) => postDetail(state));
  const isDisableDetail = useSelector((state) => disableFormDetail(state));
  const isShown = useSelector((state) => showDialogItem(state));

  const inputRef = {
    kode_barang: React.useRef(),
    nama_barang: React.useRef(),
    satuan_terkecil: React.useRef(),
    jumlah_pesan: React.useRef(),
    jumlah_terima_sbl: React.useRef(),
    no_batch: React.useRef(),
    expired_date: React.useRef(),
    jumlah_terima: React.useRef(),
    harga_satuan: React.useRef(),
    diskon: React.useRef(),
    diskon_rp: React.useRef(),
    ppn: React.useRef(),
    ppn_rp: React.useRef(),
    total_harga: React.useRef(),
  };

  useEffect(() => {
    if (focusElement && inputRef[focusElement]) {
      if (inputRef[focusElement].current) {
        switch (focusElement) {
          case 'expired_date':
            inputRef[focusElement].current.setFocus();
            break;
          case 'jumlah_terima':
          case 'diskon':
          case 'harga_satuan':
          case 'diskon_rp':
            inputRef[focusElement].current.theInput.focus();
            break;
          default:
            inputRef[focusElement].current.focus();
            break;
        }
      }
    }
  }, [focusElement]);

  const isDisabledINput = () => {
    let disabled = !isDisableDetail;

    if (!disabled && post.no_pemesanan === '') {
      disabled = true;
    }

    return disabled;
  };

  const onChangeInputHandler = (e) => {
    const { value, name } = e.target;
    dispatch(detailActions.onChangeInput(resource, { value, name }));
  };

  const onChangeDatetime = (name, value) => {
    dispatch(detailActions.onChangeInput(resource, { value, name }));
  };

  const onChangeCurency = (name, e) => {
    let curency = e;
    curency = parseFloat(curency.replace(/\./g, '').replace(/,/g, '.'));

    dispatch(detailActions.onChangeInput(resource, { value: curency, name }));

    if (name === 'diskon') {
      dispatch(
        localAction.countDiskon(resource, {
          diskon: curency,
          name: 'diskon_rp',
        })
      );
    }

    if (name === 'diskon_rp') {
      dispatch(
        localAction.countDiskon(resource, { diskon: curency, name: 'diskon' })
      );
    }
  };

  const onFocusElement = (e, element) => {
    if ('Enter' === e.key) {
      if (e.target.name) {
        e.preventDefault();
      }

      dispatch(detailActions.onFocusElement(resource, element));
    }
  };

  return (
    <Fragment>
      <Form
        id="detail-penerimaan-pemesanan"
        onSubmit={(e) => e.preventDefault()}
        size="mini"
      >
        <Grid columns="3">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.kode_barang')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="kode_barang"
                      ref={inputRef.kode_barang}
                      value={post.kode_barang || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.nama_barang')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="nama_barang"
                      ref={inputRef.nama_barang}
                      value={post.nama_barang || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.satuan_terkecil')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="satuan_terkecil"
                      ref={inputRef.satuan_terkecil}
                      value={post.satuan_terkecil || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.jumlah_pesan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="jumlah_pesan"
                      ref={inputRef.jumlah_pesan}
                      value={post.jumlah_pesan || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.jumlah_terima_sbl')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="jumlah_terima_sbl"
                      ref={inputRef.jumlah_terima_sbl}
                      value={post.jumlah_terima_sbl || '0'}
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
                    <label>{trans('label.field.no_batch')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <Input
                      name="no_batch"
                      ref={inputRef.no_batch}
                      value={post.no_batch || ''}
                      disabled={isDisabledINput()}
                      onChange={onChangeInputHandler}
                      onKeyDown={(e) => onFocusElement(e, 'expired_date')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.expired_date')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <DatePicker
                      name="expired_date"
                      inputRef={inputRef.expired_date}
                      dateFormat="dd/MM/yyyy"
                      disabled={isDisabledINput()}
                      selected={post.expired_date}
                      onChange={(date) =>
                        onChangeDatetime('expired_date', date)
                      }
                      onSelect={(e) =>
                        dispatch(
                          detailActions.onFocusElement(
                            resource,
                            'jumlah_terima'
                          )
                        )
                      }
                      onKeyDown={(e) => onFocusElement(e, 'jumlah_terima')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.jumlah_terima')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <CurrencyInput
                      name="jumlah_terima"
                      inputRef={inputRef.jumlah_terima}
                      value={parseFloat(post.jumlah_terima)}
                      disabled={isDisabledINput()}
                      thousandSeparator="."
                      selectAllOnFocus={true}
                      onChange={(e) => onChangeCurency('jumlah_terima', e)}
                      onKeyDown={(e) => onFocusElement(e, 'harga_satuan')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.harga_satuan')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <CurrencyInput
                      name="harga_satuan"
                      inputRef={inputRef.harga_satuan}
                      value={parseFloat(post.harga_satuan)}
                      disabled={isDisabledINput()}
                      thousandSeparator="."
                      selectAllOnFocus={true}
                      onChange={(e) => onChangeCurency('harga_satuan', e)}
                      onKeyDown={(e) => onFocusElement(e, 'diskon')}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.diskon')}</label>
                  </Grid.Column>
                  <Grid.Column width="3" className="field">
                    <CurrencyInput
                      name="diskon"
                      inputRef={inputRef.diskon}
                      value={parseFloat(post.diskon)}
                      disabled={isDisabledINput()}
                      thousandSeparator="."
                      selectAllOnFocus={true}
                      onChange={(e) => onChangeCurency('diskon', e)}
                      onKeyDown={(e) => onFocusElement(e, 'diskon_rp')}
                    />
                  </Grid.Column>
                  <Grid.Column width="2">
                    <label>{trans('label.field.r_p')}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <CurrencyInput
                      name="diskon_rp"
                      inputRef={inputRef.diskon_rp}
                      value={parseFloat(post.diskon_rp)}
                      disabled={isDisabledINput()}
                      thousandSeparator="."
                      selectAllOnFocus={true}
                      onChange={(e) => onChangeCurency('diskon_rp', e)}
                      onKeyDown={(e) => onFocusElement(e, 'save')}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.ppn')}</label>
                  </Grid.Column>
                  <Grid.Column width="3" className="field">
                    <Input
                      name="ppn"
                      ref={inputRef.ppn}
                      value={post.ppn || ''}
                      disabled={true}
                    />
                  </Grid.Column>
                  <Grid.Column width="2">
                    <label>{trans('label.field.r_p')}</label>
                  </Grid.Column>
                  <Grid.Column width="5" className="field">
                    <CurrencyInput
                      name="ppn_rp"
                      inputRef={inputRef.ppn_rp}
                      value={parseFloat(post.ppn_rp)}
                      disabled={true}
                      thousandSeparator="."
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="form-row">
                  <Grid.Column width="6" className="field">
                    <label>{trans('label.field.total_harga')}</label>
                  </Grid.Column>
                  <Grid.Column width="10" className="field">
                    <CurrencyInput
                      name="total_harga"
                      inputRef={inputRef.total_harga}
                      value={parseFloat(post.total_harga)}
                      disabled={true}
                      thousandSeparator="."
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      {isShown && <CariDetail resource={resource} t={t} />}
    </Fragment>
  );
};

DetailForm.propTypes = {
  resource: PropTypes.string,
  focusElement: PropTypes.string,
};

export default DetailForm;
