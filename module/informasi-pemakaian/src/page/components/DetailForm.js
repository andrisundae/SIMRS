import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import _ from 'lodash';
import { Grid, Form, Segment, Divider, Header } from 'semantic-ui-react';
import { useModuleTrans, messageBox, ReactSelect } from '@simrs/components';
// import { utils } from '@simrs/common';
import { Input } from '@simrs/components';
// import { TagihanPasien } from '@simrs/billing/src/Components';
// import { selectedKunjunganSelector } from '../../redux/reducer/selector';

function DetailForm() {
  const t = useModuleTrans();
  const methods = useForm();
  const inputRef = {
    kodeBarang: useRef(),
    namaBarang: useRef(),
    jenisBarang: useRef(),
    satuanBarang: useRef(),
    stok: useRef(),
    jumlahPakai: useRef(),
  };
  const formRef = useRef();
  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <FormProvider {...methods}>
      <Form size="mini" onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        <Segment size="mini">
          <Grid columns="2" className="mt-1">
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1">
                    <Grid.Column width="5">
                      <label>{t('Kode Barang')}</label>
                    </Grid.Column>
                    <Grid.Column width="9">
                      <Input
                        ref={inputRef.kodeBarang}
                        name="kode-barang"
                        rules={{ required: 'Harus diisi' }}
                        disabled
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="5">
                      <label>{t('Nama Barang')}</label>
                    </Grid.Column>
                    <Grid.Column width="9">
                      <Input
                        ref={inputRef.namaBarang}
                        name="nama-barang"
                        rules={{ required: 'Harus diisi' }}
                        disabled
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="5">
                      <label>{t('Jenis Barang')}</label>
                    </Grid.Column>
                    <Grid.Column width="9">
                      <Input
                        ref={inputRef.jenisBarang}
                        name="jenis-barang"
                        rules={{ required: 'Harus diisi' }}
                        disabled
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="5">
                      <label>{t('Satuan Barang')}</label>
                    </Grid.Column>
                    <Grid.Column width="9">
                      <Input
                        ref={inputRef.satuanBarang}
                        name="satuan-barang"
                        rules={{ required: 'Harus diisi' }}
                        disabled
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('Stok')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input ref={inputRef.stok} name="stok" disabled />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="py-1">
                    <Grid.Column width="4">
                      <label>{t('Jumlah Pakai')}</label>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input
                        ref={inputRef.jumlahPakai}
                        name="jumlah-pakai"
                        disabled
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="form-row">
                    <Grid.Column width="4" className="field">
                      <label>{t('Keterangan')}</label>
                    </Grid.Column>
                    <Grid.Column width="12" className="field">
                      <ReactSelect
                        ref={inputRef.keterangan}
                        name="unit-penerima"
                        placeholder={t('keterangan')}
                        options={[]}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </FormProvider>
  );
}

export default DetailForm;
