import React, { useRef, useCallback, useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import _ from 'lodash';
import { Grid, Form, Dropdown, Button, Icon } from 'semantic-ui-react';
import dayjs from 'dayjs';
import {
  useModuleTrans,
  ReactSelect,
  DatePickerHF,
  TimePickerHF,
} from '@simrs/components';
// import { utils } from '@simrs/common';
import { Input } from '@simrs/components';
import { TagihanPasien } from '@simrs/billing/src/Components';
// import { useMutationKunjungan } from '@simrs/billing/src/fetcher/kunjungan';
import {
  selectedSelector,
  disabledElement,
  statusFormSelector,
} from '../pemenuhan/redux/selectors';
import { add } from '../pemenuhan/redux/slice';
import CariTindakan from '../components/CariTindakan';

function FormPenunjang({ innerRef, kunjungan = {}, kunjunganUnit = {} }) {
  const t = useModuleTrans();
  const dispatch = useDispatch();
  const [showCariTindakan, setShowCariTindakan] = useState(false);
  const disabledInput = useSelector((state) =>
    disabledElement(state, 'form-pemenuhan-penunjang')
  );
  const selected = useSelector(selectedSelector);
  const statusForm = useSelector(statusFormSelector);
  const { reset, getValues, ...methods } = useForm();
  const inputRef = {
    norm: React.useRef(),
  };
  // const mutation = useMutationKunjungan()
  const onSubmit = useCallback((values) => {
    // mutation.mutate(values, {onSuccess: (data) => {
    //   console.log(data);
    // }})
    // console.log(values);
  }, []);

  useEffect(() => {
    reset({
      tanggal: dayjs(selected?.tanggal).toDate(),
      kelas: selected?.kelas,
      nama_layanan: selected?.nama_layanan,
      total_biaya: selected?.total_biaya,
      biaya: selected?.tarif,
      kode_panggil: selected?.kode_panggil,
      kelompok: selected?.kelompok,
      jumlah: selected?.jumlah?.toString(),
    });
  }, [
    reset,
    selected.jumlah,
    selected.kelas,
    selected.kelompok,
    selected.kode_panggil,
    selected.nama_layanan,
    selected.tanggal,
    selected.tarif,
    selected.total_biaya,
  ]);

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
      });
      setShowCariTindakan(false);
    },
    [getValues, reset]
  );

  return (
    <>
      <FormProvider {...methods}>
        <Form
          id="form-pemenuhan-penunjang"
          size="mini"
          onSubmit={methods.handleSubmit(onSubmit)}
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
                        // ref={inputRef.id_tindakan}
                        // onKeyDown={keyDownKodePanggilHandler}
                        action={{
                          content: 'Cari',
                          onClick: showCariTindakanHandler,
                          disabled: disabledInput,
                          color: 'blue',
                          type: 'button',
                        }}
                        disabled={disabledInput}
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
                      <ReactSelect
                        name="pelaksana"
                        placeholder={t('pelaksana')}
                        options={[]}
                        isDisabled={disabledInput}
                      />
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
  innerRef: PropTypes.object,
};

const Component = React.forwardRef((props, ref) => {
  const innerRef = React.useRef();
  return <FormPenunjang innerRef={ref || innerRef} {...props} />;
});

export default memo(Component);
