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
import { formatter, toastr } from '@simrs/common';
import {
  useCreatePenunjangDetail,
  useEditPenunjangDetail,
} from '@simrs/billing/src/fetcher/penunjang';
import { Input } from '@simrs/components';
import { TagihanPasien } from '@simrs/billing/src/Components';
import {
  selectedSelector,
  disabledElement,
  statusFormSelector,
  focusElementSelector,
} from '../pemenuhan/redux/selectors';
import {
  add,
  edit,
  select,
  showLoader,
  hideLoader,
  cancel,
  fullfillmentConfirmation,
} from '../pemenuhan/redux/slice';
import CariTindakan from '../components/CariTindakan';
import FooterActions from '../components/FooterActions';
import PelaksanaSelector from '../components/PelaksanaSelector';

function FormPenunjang({
  innerRef,
  kunjungan = {},
  kunjunganUnit = {},
  isResetStatusPemenuhan,
  pasien = {},
  onReloadPenunjang,
  onReloadTindakan,
}) {
  const dispatch = useDispatch();
  const t = useModuleTrans();
  const appActions = useAppAction();

  const [showCariTindakan, setShowCariTindakan] = useState(false);

  const disabledInput = useSelector((state) =>
    disabledElement(state, 'form-pemenuhan-penunjang')
  );
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const focusElement = useSelector(focusElementSelector);
  const { reset, getValues, setValue, ...methods } = useForm({
    defaultValues: {
      jumlah: 0,
      biaya: 0,
      total_biaya: 0,
      total_biaya_penunjang: 0,
    },
  });
  const inputRef = {
    kode_panggil: useRef(),
  };

  // Mutation query
  const createMutation = useCreatePenunjangDetail();
  const editMutation = useEditPenunjangDetail();

  // Effect untuk selected form
  useEffect(() => {
    if (!_.isEmpty(selected)) {
      reset({
        tanggal: dayjs(selected.tanggal).toDate(),
        kelas: selected.kelas,
        nama_layanan: selected.nama_layanan,
        total_biaya: formatter.currency(selected.total_biaya),
        biaya: formatter.currency(selected.tarif),
        kode_panggil: selected.kode_panggil,
        kelompok: selected.kelompok,
        jumlah: selected.jumlah?.toString(),
        total_biaya_penunjang: formatter.currency(
          kunjunganUnit.total_biaya_penunjang
        ),
        id_pelaksana: !_.isEmpty(selected.pelaksana)
          ? {
              value: selected.pelaksana?.id,
              label: selected.pelaksana?.nama,
            }
          : null,
      });
    }
  }, [
    kunjunganUnit.total_biaya_penunjang,
    reset,
    selected,
    selected.jumlah,
    selected.kelas,
    selected.kelompok,
    selected.kode_panggil,
    selected.nama_layanan,
    selected.tanggal,
    selected.tarif,
    selected.total_biaya,
  ]);

  // Effect untuk selected form
  useEffect(() => {
    if (!_.isEmpty(kunjunganUnit.total_biaya_penunjang)) {
      setValue(
        'total_biaya_penunjang',
        formatter.currency(kunjunganUnit.total_biaya_penunjang)
      );
    }
  }, [kunjunganUnit.total_biaya_penunjang, setValue]);

  const hideCariTindakanHandler = useCallback(
    () => setShowCariTindakan(false),
    []
  );
  const showCariTindakanHandler = useCallback(
    () => setShowCariTindakan(true),
    []
  );

  const selectTindakanHandler = useCallback(
    (selected) => {
      const values = getValues();
      reset({
        ...values,
        kode_panggil: selected.kode_panggil,
        kelas: selected.nama_kelas,
        kelompok: selected.nama_kelompok,
        nama_layanan: selected.nama_layanan,
        biaya: selected.tarif,
        jumlah: 1,
        total_biaya: selected.tarif,
        total_biaya_penunjang: selected.tarif,
        id_tindakan: selected.id,
        id_kelas: selected.id_kelas,
      });
      setShowCariTindakan(false);
    },
    [reset, getValues]
  );

  const submitHandler = useCallback(
    (values) => {
      const jam = dayjs(values.jam).format('HH:mm');
      const tanggal = formatter.dateFormatDB(
        values.tanggal,
        `YYYY-MM-DD ${jam}:ss`
      );
      const payload = {
        id_tindakan: values.id_tindakan,
        tgl: tanggal,
        tgl_lahir: formatter.dateFormatDB(pasien.tgl_lahir),
        id_unit_layanan: kunjunganUnit?.id_unit_layanan,
        id_kelas: values.id_kelas,
        jumlah: 1,
        id_pelaksana: values.id_pelaksana?.value,
        id_kunjungan_unit: kunjunganUnit.id,
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
              ? 'Tindakan berhasil ditambahkan.'
              : 'Tindakan berhasil diubah.'
          );
          onReloadTindakan();
          onReloadPenunjang();
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

  const keyDownKodePanggilHandler = (e) => {
    e.preventDefault();
    if (13 === e.which) {
      showCariTindakanHandler();
    }
  };

  // Effect untuk selected data ketika sesudah simpan
  useEffect(() => {
    if (createMutation.data && !createMutation.isLoading) {
      if (createMutation.data.data?.status) {
        dispatch(select(createMutation.data.data?.data));
      }
    }
  }, [createMutation.data, createMutation.isLoading, dispatch]);

  // Effect untuk focus element
  useEffect(() => {
    if (statusForm === add.type || statusForm === edit.type) {
      if (focusElement) {
        if (!_.isEmpty(inputRef[focusElement]?.current)) {
          inputRef[focusElement]?.current.focus();
        }
      }
    }
  }, [focusElement, inputRef, statusForm]);

  useEffect(() => {
    if (statusForm === cancel.type && _.isEmpty(selected)) {
      dispatch(fullfillmentConfirmation());
    }
  }, [dispatch, innerRef, selected, statusForm]);

  return (
    <>
      <FormProvider setValue={setValue} {...methods}>
        <Form
          id="form-pemenuhan-penunjang"
          size="mini"
          onSubmit={methods.handleSubmit(submitHandler)}
          ref={innerRef}
        >
          <Grid columns="2" className="mt-3">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1 flex items-center">
                    <Grid.Column width="4" className="-top-1">
                      <label>{t('tanggal')}</label>
                    </Grid.Column>
                    <Grid.Column width="7">
                      <DatePickerHF
                        name="tanggal"
                        rules={{ required: 'Harus diisi' }}
                        disabled
                      />
                    </Grid.Column>
                    <Grid.Column width="1" className="-top-1">
                      <label>{t('jam')}</label>
                    </Grid.Column>
                    <Grid.Column width="4">
                      <TimePickerHF
                        name="jam"
                        rules={{ required: 'Harus diisi' }}
                        disabled
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="">
                      <label>{t('kode_panggil')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="">
                      <Input
                        name="kode_panggil"
                        ref={inputRef.kode_panggil}
                        onKeyDown={keyDownKodePanggilHandler}
                        action={{
                          content: 'Cari',
                          onClick: showCariTindakanHandler,
                          disabled: disabledInput,
                          color: 'blue',
                          type: 'button',
                        }}
                        disabled={disabledInput}
                        rules={{ required: 'Harus diisi' }}
                        // value={data.kode_panggil}
                        // onChange={this.inputChangeHandler}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('kelompok')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="kelompok" disabled={disabledInput} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('nama_layanan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="nama_layanan" disabled={disabledInput} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('kelas')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="kelas" disabled={disabledInput} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('pelaksana')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <PelaksanaSelector
                        idUnitLayanan={kunjunganUnit?.id_unit_layanan}
                        isDisabled={disabledInput}
                      />
                      {/* <ReactSelect
                        name="pelaksana"
                        placeholder={t('pelaksana')}
                        options={[]}
                        isDisabled={disabledInput}
                      /> */}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('jumlah_tindakan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="jumlah" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('biaya_per_tindakan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input name="biaya" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('total_biaya')}</label>
                    </Grid.Column>
                    <Grid.Column width="7">
                      <Input name="total_biaya" disabled />
                    </Grid.Column>
                    <Grid.Column width="5" className="p-0 pl-4">
                      <Dropdown
                        text="Pelaksana"
                        icon="users"
                        floating
                        labeled
                        button
                        fluid
                        className="icon float-right mr-4"
                        style={{
                          paddingTop: 6,
                          paddingBottom: 6,
                          // marginRight: 7,
                        }}
                        direction="left"
                      >
                        <Dropdown.Menu>
                          <Dropdown.Item
                            // onClick={onShowPelaksanaTambahan}
                            icon="user"
                            text={t('pelaksana_tambahan')}
                          />
                          <Dropdown.Item
                            // onClick={onShowPelaksanaKomponen}
                            icon="list"
                            text={t('pelaksana_komponen')}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('total_biaya_penunjang')}</label>
                    </Grid.Column>
                    <Grid.Column width="7">
                      <Input name="total_biaya_penunjang" disabled />
                    </Grid.Column>
                    <Grid.Column width="5" className="p-0 pl-4">
                      <Button
                        color="orange"
                        size="mini"
                        style={{ paddingTop: 6, paddingBottom: 6 }}
                        className="float-right mr-4"
                        onClick={() => {}}
                        fluid
                      >
                        <Icon name="sitemap" />
                        Tree
                      </Button>
                      {/* <Dropdown
                      text="Pelaksana"
                      icon="users"
                      floating
                      labeled
                      button
                      className="icon float-right mr-4"
                      style={{
                        paddingTop: 6,
                        paddingBottom: 6,
                        // marginRight: 7,
                      }}
                      direction="left"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          // onClick={onShowPelaksanaTambahan}
                          icon="user"
                          text={t('pelaksana_tambahan')}
                        />
                        <Dropdown.Item
                          // onClick={onShowPelaksanaKomponen}
                          icon="list"
                          text={t('pelaksana_komponen')}
                        />
                      </Dropdown.Menu>
                    </Dropdown> */}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pt-2">
              <Grid.Column width={16}>
                <TagihanPasien
                  keringanan={kunjungan?.keringanan || 0}
                  bayar={kunjungan?.bayar || 0}
                  pengembalian={kunjungan?.pengembalian || 0}
                  biaya={kunjungan?.biaya || 0}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <FooterActions
            isResetStatusPemenuhan={isResetStatusPemenuhan}
            idKunjunganUnit={kunjunganUnit.id}
            onResetForm={reset}
            getValues={getValues}
            formRef={innerRef}
            mutationLoading={createMutation.isLoading}
            onReloadPenunjang={onReloadPenunjang}
            onReloadTindakan={onReloadTindakan}
          />
        </Form>
      </FormProvider>
      {showCariTindakan && (
        <CariTindakan
          show={showCariTindakan}
          onHide={hideCariTindakanHandler}
          idUnitLayanan={kunjunganUnit?.id_unit_layanan}
          idKelas={kunjunganUnit?.id_kelas}
          onSelect={selectTindakanHandler}
        />
      )}
    </>
  );
}

FormPenunjang.propTypes = {
  kunjungan: PropTypes.object,
  kunjunganUnit: PropTypes.object,
  pasien: PropTypes.object,
  innerRef: PropTypes.object,
  isResetStatusPemenuhan: PropTypes.bool,
  onReloadPenunjang: PropTypes.func,
  onReloadTindakan: PropTypes.func,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <FormPenunjang innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
