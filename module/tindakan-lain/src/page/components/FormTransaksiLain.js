import React, { useRef, useCallback, useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import _ from 'lodash';
import { Grid, Form, Dropdown, Button, Icon } from 'semantic-ui-react';
import dayjs from 'dayjs';
import {
  useModuleTrans,
  DatePickerHF,
  TimePickerHF,
  useAppAction,
} from '@simrs/components';
// import { formatter, toastr } from '@simrs/common';
import {
  useCreateTindakanLain,
  useEditTindakanLain,
} from '@simrs/billing/src/fetcher/tindakanLain';
import { Input, CurrencyInputHF } from '@simrs/components';
// import { TagihanPasien } from '@simrs/billing/src/Components';
import {
  selectedSelector,
  disabledElement,
  statusFormSelector,
  focusElementSelector,
} from '../index/redux/selectors';
import {
  add,
  edit,
  select,
  showLoader,
  hideLoader,
  cancel,
} from '../index/redux/slice';
import FooterActions from '../components/FooterActions';

function FormTransaksiLain({ innerRef }) {
  const dispatch = useDispatch();
  const t = useModuleTrans();
  const appActions = useAppAction();

  const [showCariTindakan, setShowCariTindakan] = useState(false);

  const disabledInput = useSelector((state) =>
    disabledElement(state, 'form-transaksi-lain')
  );
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const focusElement = useSelector(focusElementSelector);
  const methods = useForm({
    defaultValues: {
      nama: '',
      kode: '',
      alamat: '',
      desa: '',
      keterangan: '',
      total_biaya: 0,
      bayar: 0,
      uang_diterima: 0,
      kembali: 0,
    },
  });
  const inputRef = {
    kode_panggil: useRef(),
  };

  const createMutation = useCreateTindakanLain();
  const editMutation = useEditTindakanLain();

  // Effect untuk selected form
  useEffect(() => {
    if (!_.isEmpty(selected)) {
      methods.reset({
        tanggal: dayjs(selected.tanggal).toDate(),
        kode: selected.kode,
        nama: selected.nama,
        alamat: selected.alamat,
        desa: selected.desa.nama,
        total_biaya: parseFloat(selected.totalBiaya),
        bayar: parseFloat(selected.bayar),
        uang_diterima: parseFloat(selected.uangDiterima),
        kembali: parseFloat(selected.kembali),
        keterangan: selected.keterangan,
      });
    }
  }, [methods.reset, selected]);

  const submitHandler = useCallback(
    (values) => {
      const jam = dayjs(values.jam).format('HH:mm');
      const tanggal = formatter.dateFormatDB(
        values.tanggal,
        `YYYY-MM-DD ${jam}:ss`
      );
      const payload = {
        tanggal: formatter.dateFormatDB(values.tanggal),
        kode: values.kode,
        nama: values.nama,
        alamat: values.alamat,
        desa: values.desa,
        total_biaya: values.total_biaya,
        bayar: values.bayar,
        uang_diterima: values.uang_diterima,
        keterangan: values.keterangan,
      };
      const mutation = statusForm === add.type ? createMutation : editMutation;
      if (statusForm === edit.type) {
        payload.id = selected.id;
      }
      dispatch(showLoader());
      mutation.mutate(payload, {
        onSuccess: () => {
          // console.log(response.data?.data?.data);
          toastr.success(
            statusForm === add.type
              ? 'Transaksi lain berhasil disimpan.'
              : 'Transaksi lain berhasil diubah.'
          );
          // onReloadTindakan();
          // onReloadPenunjang();
          appActions.activateMainMenu();
        },
        onError: (error) => {
          toastr.warning(
            error && error.message ? error.message : 'Terjadi masalah server'
          );
        },
        onSettled: () => dispatch(hideLoader()),
      });
    },
    [
      appActions,
      createMutation,
      dispatch,
      editMutation,
      kunjunganUnit.id,
      kunjunganUnit.id_unit_layanan,
      onReloadPenunjang,
      onReloadTindakan,
      pasien.tgl_lahir,
      selected.id,
      statusForm,
    ]
  );

  return (
    <FormProvider {...methods}>
      <Form
        id="form-transaksi-lain"
        size="mini"
        onSubmit={methods.handleSubmit(submitHandler)}
        ref={innerRef}
      >
        <Grid columns="2" className="mt-3">
          <Grid.Row>
            <Grid.Column>
              <Grid>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="3">
                    <label>{t('nomor')}</label>
                  </Grid.Column>
                  <Grid.Column width="5">
                    <Input name="kode" disabled={disabledInput} />
                  </Grid.Column>
                  <Grid.Column width="2" className="-top-1">
                    <label>{t('tanggal')}</label>
                  </Grid.Column>
                  <Grid.Column width="6">
                    <DatePickerHF
                      name="tanggal"
                      rules={{ required: 'Harus diisi' }}
                      disabled
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="3" className="">
                    <label>{t('nama')}</label>
                  </Grid.Column>
                  <Grid.Column width="13" className="">
                    <Input
                      name="nama"
                      ref={inputRef.nama}
                      // onKeyDown={keyDownKodePanggilHandler}
                      disabled={disabledInput}
                      rules={{ required: 'Harus diisi' }}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="3">
                    <label>{t('alamat')}</label>
                  </Grid.Column>
                  <Grid.Column width="13">
                    <Input name="alamat" disabled={disabledInput} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="3">
                    <label>{t('desa')}</label>
                  </Grid.Column>
                  <Grid.Column width="13">
                    <Input name="desa" disabled={disabledInput} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="4">
                    <label>{t('total_biaya')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <CurrencyInputHF name="total_biaya" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="4">
                    <label>{t('pembayaran')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <CurrencyInputHF name="bayar" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="4">
                    <label>{t('penerimaan')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <CurrencyInputHF name="uang_diterima" disabled />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="py-1 items-center">
                  <Grid.Column width="4">
                    <label>{t('kembali')}</label>
                  </Grid.Column>
                  <Grid.Column width="12">
                    <CurrencyInputHF name="kembali" disabled />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <FooterActions
          onResetForm={reset}
          getValues={getValues}
          formRef={innerRef}
          mutationLoading={createMutation.isLoading || editMutation.isLoading}
          // onReloadPenunjang={onReloadPenunjang}
          // onReloadTindakan={onReloadTindakan}
        />
      </Form>
    </FormProvider>
  );
}

FormTransaksiLain.propTypes = {
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <FormTransaksiLain innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
